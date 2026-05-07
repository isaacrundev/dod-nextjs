import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const mockToast = jest.fn();
const mockPush = jest.fn();
const mockRefresh = jest.fn();
const mockSignIn: jest.MockedFunction<
  (provider: string, options: Record<string, unknown>) => Promise<{ error?: string }>
> = jest.fn();
const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>;

const createFetchResponse = (body: unknown, ok = true): Response =>
  ({
    ok,
    json: async () => body,
  }) as Response;

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
}));

jest.mock("next-auth/react", () => ({
  signIn: (provider: string, options: Record<string, unknown>) =>
    mockSignIn(provider, options),
}));

jest.mock("@/hooks/use-toast", () => ({
  useToast: () => ({ toast: mockToast }),
}));

jest.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));

jest.mock("@/components/ui/input", () => ({
  Input: React.forwardRef<HTMLInputElement, any>(function MockInput(props, ref) {
    return <input ref={ref} {...props} />;
  }),
}));

describe("SignupForm behavior", () => {
  const SignupForm = require("@/components/SignupForm").default;

  beforeEach(() => {
    mockToast.mockReset();
    mockPush.mockReset();
    mockRefresh.mockReset();
    mockSignIn.mockReset();
    mockFetch.mockReset();
    global.fetch = mockFetch as unknown as typeof fetch;
  });

  it("submits signup, signs in, and redirects on success", async () => {
    mockFetch.mockImplementationOnce(async () => createFetchResponse({ ok: true }, true));
    mockSignIn.mockResolvedValue({ error: undefined });

    render(<SignupForm />);

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "user@example.com",
          password: "123456",
          confirmPassword: "123456",
        }),
      });
    });

    expect(mockSignIn).toHaveBeenCalledWith("credentials", {
      email: "user@example.com",
      password: "123456",
      redirect: false,
    });
    expect(mockToast).toHaveBeenCalledWith(
      expect.objectContaining({ description: "Sign up successfully!" }),
    );
    expect(mockPush).toHaveBeenCalledWith("/dashboard");
    expect(mockRefresh).toHaveBeenCalled();
  });

  it("shows destructive toast when signup api fails", async () => {
    mockFetch.mockImplementationOnce(async () =>
      createFetchResponse(
        { error: { message: "Email already existed!" } },
        false,
      ),
    );

    render(<SignupForm />);

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          description: "Email already existed!",
          variant: "destructive",
        }),
      );
    });

    expect(mockSignIn).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });
});
