import { afterEach, beforeEach, describe, expect, it, jest } from "@jest/globals";
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { getDateKey } from "@/lib/date";

const mockToast = jest.fn();
const mockPush = jest.fn();
const mockRefresh = jest.fn();
const mockDispatch = jest.fn();
const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>;
let consoleErrorSpy: jest.SpiedFunction<typeof console.error>;

const createFetchResponse = (body: unknown, ok = true): Response =>
  ({
    ok,
    json: async () => body,
  }) as Response;

jest.mock("next-auth/react", () => ({
  useSession: () => ({ data: null }),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
}));

jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

jest.mock("@/app/rtk/store", () => ({
  useAppSelector: () => null,
}));

jest.mock("@/app/rtk/slices/importedFood", () => ({
  initialize: () => ({ type: "foodData/initialize" }),
}));

jest.mock("@/hooks/use-toast", () => ({
  useToast: () => ({ toast: mockToast }),
}));

jest.mock("@/components/ui/button", () => ({
  Button: ({ children, asChild, ...props }: any) => {
    if (asChild && children) {
      return children;
    }
    return <button {...props}>{children}</button>;
  },
}));

jest.mock("@/components/ui/input", () => ({
  Input: React.forwardRef<HTMLInputElement, any>(function MockInput(props, ref) {
    return <input ref={ref} {...props} />;
  }),
}));

jest.mock("@/components/ui/label", () => ({
  Label: ({ children, ...props }: any) => <label {...props}>{children}</label>,
}));

jest.mock("@/components/ui/popover", () => ({
  Popover: ({ children }: any) => <div>{children}</div>,
  PopoverTrigger: ({ children }: any) => <div>{children}</div>,
  PopoverContent: ({ children }: any) => <div>{children}</div>,
}));

jest.mock("@radix-ui/react-popover", () => ({
  PopoverClose: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));

jest.mock("@/components/ui/calendar", () => ({
  Calendar: () => <div>Calendar</div>,
}));

describe("AddNewRecordForm behavior", () => {
  const AddNewRecordForm = require("@/components/AddNewRecordForm").default;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    mockToast.mockReset();
    mockPush.mockReset();
    mockRefresh.mockReset();
    mockDispatch.mockReset();
    mockFetch.mockReset();
    global.fetch = mockFetch as unknown as typeof fetch;
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it("submits manual record input with normalized intakeDate", async () => {
    mockFetch.mockImplementationOnce(async () => createFetchResponse({ id: "record-1" }));

    render(<AddNewRecordForm item={null} />);

    fireEvent.change(screen.getByLabelText("Food Name"), {
      target: { value: "Soy Milk" },
    });
    fireEvent.change(screen.getByLabelText("Calories (kcals)"), {
      target: { value: "120" },
    });
    fireEvent.change(screen.getByLabelText("Carbs (g)"), {
      target: { value: "10" },
    });
    fireEvent.change(screen.getByLabelText("Fats (g)"), {
      target: { value: "4" },
    });
    fireEvent.change(screen.getByLabelText("Protein (g)"), {
      target: { value: "8" },
    });
    fireEvent.change(screen.getByLabelText("Food Size (g or ml)"), {
      target: { value: "250" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    const [url, options] = mockFetch.mock.calls[0];
    const payload = JSON.parse(String(options?.body));

    expect(url).toBe("/api/records/add-new");
    expect(options?.method).toBe("POST");
    expect(options?.headers).toEqual({
      "Content-Type": "application/json",
    });
    expect(payload).toEqual({
      foodName: "Soy Milk",
      calories: 120,
      carbs: 10,
      fats: 4,
      protein: 8,
      foodSize: 250,
      intakeDate: getDateKey(new Date()),
    });

    expect(mockDispatch).toHaveBeenCalledWith({ type: "foodData/initialize" });
    expect(mockToast).toHaveBeenCalledWith(
      expect.objectContaining({ description: "Record added successfully!" }),
    );
    expect(mockPush).toHaveBeenCalledWith("/dashboard");
    expect(mockRefresh).toHaveBeenCalled();
  });

  it("shows destructive toast when save api fails", async () => {
    mockFetch.mockImplementationOnce(async () =>
      createFetchResponse(
        { error: { message: "Failed to save record." } },
        false,
      ),
    );

    render(<AddNewRecordForm item={null} />);

    fireEvent.change(screen.getByLabelText("Food Name"), {
      target: { value: "Soy Milk" },
    });
    fireEvent.change(screen.getByLabelText("Calories (kcals)"), {
      target: { value: "120" },
    });
    fireEvent.change(screen.getByLabelText("Carbs (g)"), {
      target: { value: "10" },
    });
    fireEvent.change(screen.getByLabelText("Fats (g)"), {
      target: { value: "4" },
    });
    fireEvent.change(screen.getByLabelText("Protein (g)"), {
      target: { value: "8" },
    });
    fireEvent.change(screen.getByLabelText("Food Size (g or ml)"), {
      target: { value: "250" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          description: "Failed to save record.",
          variant: "destructive",
        }),
      );
    });

    expect(mockDispatch).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });
});
