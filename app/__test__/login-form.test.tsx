import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const mockToast = jest.fn();
const mockPush = jest.fn();
const mockRefresh = jest.fn();
const mockSignIn: jest.MockedFunction<
  (provider: string, options: Record<string, unknown>) => Promise<{ error?: string }>
> = jest.fn();

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

describe("LoginForm behavior", () => {
  const LoginForm = require("@/components/LoginForm").default;

  beforeEach(() => {
    mockToast.mockReset();
    mockPush.mockReset();
    mockRefresh.mockReset();
    mockSignIn.mockReset();
  });

  it("submits credentials and redirects on success", async () => {
    mockSignIn.mockResolvedValue({ error: undefined });

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith("credentials", {
        email: "user@example.com",
        password: "123456",
        redirect: false,
      });
    });

    expect(mockToast).toHaveBeenCalledWith(
      expect.objectContaining({ description: "Login successfully!" }),
    );
    expect(mockPush).toHaveBeenCalledWith("/dashboard");
    expect(mockRefresh).toHaveBeenCalled();
  });

  it("shows destructive toast on auth failure", async () => {
    mockSignIn.mockResolvedValue({ error: "Incorrect username/password" });

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          description: "Incorrect username/password",
          variant: "destructive",
        }),
      );
    });

    expect(mockPush).not.toHaveBeenCalled();
  });
});
