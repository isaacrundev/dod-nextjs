import { afterEach, beforeEach, describe, expect, it, jest } from "@jest/globals";
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import {
  buildOpenFoodFactsSearchUrl,
  getProductName,
  hasNextFoodSearchPage,
} from "@/lib/food-data";

const mockToast = jest.fn();
const mockUseSession = jest.fn();
const mockUseAppSelector = jest.fn();
const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>;
let consoleErrorSpy: jest.SpiedFunction<typeof console.error>;

const createFetchResponse = (body: unknown, ok = true): Response =>
  ({
    ok,
    json: async () => body,
  }) as Response;

jest.mock("next-auth/react", () => ({
  useSession: () => mockUseSession(),
}));

jest.mock("@/hooks/use-toast", () => ({
  useToast: () => ({ toast: mockToast }),
}));

jest.mock("@/app/rtk/store", () => ({
  useAppSelector: (selector: unknown) => mockUseAppSelector(selector),
}));

jest.mock("@/app/loading", () => function MockLoading() {
  return React.createElement("div", null, "Loading...");
});

jest.mock("@/components/ImportedFoodCard", () => ({
  __esModule: true,
  default: ({ item, setData, setIsImported }: any) =>
    React.createElement(
      "button",
      {
        type: "button",
        onClick: () => {
          setData(undefined);
          setIsImported(true);
        },
      },
      `Import ${item.product_name}`,
    ),
}));

jest.mock("@/components/AddNewRecordForm", () => ({
  __esModule: true,
  default: ({ item }: any) =>
    React.createElement("div", null, `Add form for ${item?.product_name ?? "unknown"}`),
}));

describe("food data helpers", () => {
  it("builds an encoded Open Food Facts search URL", () => {
    expect(buildOpenFoodFactsSearchUrl("soy milk", 2)).toBe(
      "https://world.openfoodfacts.org/cgi/search.pl?action=process&json=true&search_terms=soy%20milk&page=2",
    );
  });

  it("derives next-page availability from API metadata", () => {
    expect(
      hasNextFoodSearchPage({
        count: 120,
        page: 1,
        page_count: 50,
        page_size: 50,
        skip: 0,
        products: [],
      }),
    ).toBe(true);

    expect(
      hasNextFoodSearchPage({
        count: 100,
        page: 2,
        page_count: 50,
        page_size: 50,
        skip: 50,
        products: [],
      }),
    ).toBe(false);

    expect(hasNextFoodSearchPage(undefined)).toBe(false);
  });

  it("falls back product names safely", () => {
    expect(
      getProductName({
        _id: "1",
        product_name: "",
        product_name_en: "Greek Yogurt",
        product_name_fr: "",
        image_small_url: "",
        product_quantity: "",
        nutriments: {
          carbohydrates_100g: "0",
          fat_100g: "0",
          proteins_100g: "0",
          "energy-kcal_100g": "0",
        },
      }),
    ).toBe("Greek Yogurt");

    expect(
      getProductName({
        _id: "2",
        product_name: "豆漿",
        product_name_en: "",
        product_name_fr: "",
        image_small_url: "",
        product_quantity: "",
        nutriments: {
          carbohydrates_100g: "0",
          fat_100g: "0",
          proteins_100g: "0",
          "energy-kcal_100g": "0",
        },
      }),
    ).toBe("豆漿");
  });
});

describe("FoodData behavior", () => {
  const FoodData = require("@/components/FoodData").default;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    mockToast.mockReset();
    mockUseSession.mockReset();
    mockUseAppSelector.mockReset();
    mockFetch.mockReset();
    mockUseSession.mockReturnValue({ data: { user: { id: "user-1" } } });
    mockUseAppSelector.mockReturnValue({ product_name: "Imported Soy Milk" });
    global.fetch = mockFetch as unknown as typeof fetch;
    window.scrollTo = jest.fn();
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it("searches, paginates, and enters import flow", async () => {
    mockFetch
      .mockImplementationOnce(async () =>
        createFetchResponse({
          count: 120,
          page: 1,
          page_count: 3,
          page_size: 50,
          skip: 0,
          products: [
            {
              _id: "food-1",
              product_name: "Soy Milk",
              product_name_en: "",
              product_name_fr: "",
              image_small_url: "",
              product_quantity: "",
              nutriments: {
                carbohydrates_100g: "1",
                fat_100g: "2",
                proteins_100g: "3",
                "energy-kcal_100g": "4",
              },
            },
          ],
        }),
      )
      .mockImplementationOnce(async () =>
        createFetchResponse({
          count: 120,
          page: 2,
          page_count: 3,
          page_size: 50,
          skip: 50,
          products: [
            {
              _id: "food-2",
              product_name: "Oat Milk",
              product_name_en: "",
              product_name_fr: "",
              image_small_url: "",
              product_quantity: "",
              nutriments: {
                carbohydrates_100g: "1",
                fat_100g: "2",
                proteins_100g: "3",
                "energy-kcal_100g": "4",
              },
            },
          ],
        }),
      );

    render(<FoodData />);

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "soy milk" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Search" }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        buildOpenFoodFactsSearchUrl("soy milk", 1),
      );
    });

    expect(await screen.findByRole("button", { name: "Import Soy Milk" })).toBeInTheDocument();

    fireEvent.click(screen.getByText("Next"));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        buildOpenFoodFactsSearchUrl("soy milk", 2),
      );
    });

    expect(await screen.findByRole("button", { name: "Import Oat Milk" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Import Oat Milk" }));

    expect(await screen.findByText("Add form for Imported Soy Milk")).toBeInTheDocument();
  });

  it("shows toast and inline error when search fails", async () => {
    mockFetch.mockImplementation(async () => createFetchResponse({}, false));

    render(<FoodData />);

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "bad search" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Search" }));

    expect(
      await screen.findByText("Unable to fetch food data right now. Please try again."),
    ).toBeInTheDocument();

    expect(mockToast).toHaveBeenCalledWith(
      expect.objectContaining({
        description: "Unable to fetch food data right now. Please try again.",
        variant: "destructive",
      }),
    );
  });
});
