import { afterEach, beforeEach, describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const mockToast = jest.fn();
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

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

jest.mock("@/hooks/use-toast", () => ({
  useToast: () => ({ toast: mockToast }),
}));

jest.mock("@/app/loading", () => function MockLoading() {
  return <div>Loading...</div>;
});

jest.mock("@/components/ui/button", () => ({
  Button: ({ children, asChild, ...props }: any) => {
    if (asChild && children) {
      return children;
    }
    return <button {...props}>{children}</button>;
  },
}));

jest.mock("@/components/ui/dialog", () => ({
  Dialog: ({ children }: any) => <div>{children}</div>,
  DialogTrigger: ({ children }: any) => <div>{children}</div>,
  DialogContent: ({ children }: any) => <div>{children}</div>,
  DialogHeader: ({ children }: any) => <div>{children}</div>,
  DialogTitle: ({ children }: any) => <div>{children}</div>,
  DialogDescription: ({ children }: any) => <div>{children}</div>,
  DialogClose: ({ children }: any) => <div>{children}</div>,
}));

jest.mock("@/components/ui/table", () => ({
  Table: ({ children }: any) => <table>{children}</table>,
  TableHeader: ({ children }: any) => <thead>{children}</thead>,
  TableBody: ({ children }: any) => <tbody>{children}</tbody>,
  TableRow: ({ children }: any) => <tr>{children}</tr>,
  TableHead: ({ children }: any) => <th>{children}</th>,
  TableCell: ({ children, colSpan }: any) => <td colSpan={colSpan}>{children}</td>,
}));

describe("HistoryTable behavior", () => {
  const HistoryTable = require("@/components/HistoryTable").default;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    mockToast.mockReset();
    mockFetch.mockReset();
    global.fetch = mockFetch as unknown as typeof fetch;
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it("loads records and deletes one row", async () => {
    mockFetch
      .mockImplementationOnce(async () =>
        createFetchResponse([
          {
            id: "record-1",
            foodName: "Soy Milk",
            protein: 3,
            carbs: 4,
            fats: 5,
            calories: 6,
            foodSize: 100,
            createAt: "2026-05-05T00:00:00.000Z",
          },
        ]),
      )
      .mockImplementationOnce(async () => createFetchResponse({ id: "record-1" }));

    render(<HistoryTable selectedDate={new Date("2026-05-05T00:00:00.000Z")} />);

    expect(await screen.findByText("Soy Milk")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getAllByText("6").length).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole("button", { name: "Delete Soy Milk" }));
    fireEvent.click(screen.getByRole("button", { name: "Yes" }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenNthCalledWith(2, "/api/records/id/record-1", {
        method: "DELETE",
      });
    });

    await waitFor(() => {
      expect(screen.queryByText("Soy Milk")).not.toBeInTheDocument();
    });

    expect(mockToast).toHaveBeenCalledWith(
      expect.objectContaining({ description: "Record deleted successfully!" }),
    );
  });

  it("shows destructive toast when initial load fails", async () => {
    mockFetch.mockImplementationOnce(async () => createFetchResponse({}, false));

    render(<HistoryTable selectedDate={new Date("2026-05-05T00:00:00.000Z")} />);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          description: "Unable to load records for this date.",
          variant: "destructive",
        }),
      );
    });
  });
});
