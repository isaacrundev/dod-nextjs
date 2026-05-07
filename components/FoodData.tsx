"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { FetchedFoodData } from "@/app";
import ImportedFoodCard from "./ImportedFoodCard";
import AddNewRecordForm from "./AddNewRecordForm";
import { useAppSelector } from "@/app/rtk/store";
import Loading from "@/app/loading";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { useToast } from "@/hooks/use-toast";
import {
  buildOpenFoodFactsSearchUrl,
  hasNextFoodSearchPage,
} from "@/lib/food-data";
import { reportError } from "@/lib/error-report";

export const foodInputSchema = z.object({
  foodName: z.string().min(3, { message: "Minimum length of Food Name is 3" }),
  protein: z.coerce
    .number()
    .nonnegative()
    .multipleOf(0.01, { message: "Up to 2 decimal place" }),
  fats: z.coerce
    .number()
    .nonnegative()
    .multipleOf(0.01, { message: "Up to 2 decimal place" }),
  carbs: z.coerce
    .number()
    .nonnegative()
    .multipleOf(0.01, { message: "Up to 2 decimal place" }),
  calories: z.coerce
    .number()
    .nonnegative()
    .multipleOf(0.01, { message: "Up to 2 decimal place" }),
  foodSize: z.coerce
    .number()
    .positive({ message: "food size can't be zero" })
    .int({ message: "Interger value only" }),
});

export type FoodInputSchema = z.infer<typeof foodInputSchema>;

const FoodData = () => {
  const { data: session } = useSession();
  const selector = useAppSelector((state) => state.importedFoodReducer);
  const [firstRender, setFirstRender] = useState(true);
  const [searchinput, setSearchinput] = useState("");
  const [page, setPage] = useState(1);
  const [searchData, setSearchData] = useState<FetchedFoodData | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [isImported, setIsImported] = useState(false);
  const [searchError, setSearchError] = useState("");
  const { toast } = useToast();

  const hasNextPage = hasNextFoodSearchPage(searchData);

  const getFoodData = async (searchTerm: string, currentPage: number) => {
    setIsLoading(true);
    setSearchError("");

    try {
      const res = await fetch(
        buildOpenFoodFactsSearchUrl(searchTerm, currentPage),
      );

      if (!res.ok) {
        throw new Error("Search failed");
      }

      setSearchData(await res.json());
    } catch (error) {
      reportError(error, "FoodData.getFoodData");
      setSearchData(undefined);
      setSearchError("Unable to fetch food data right now. Please try again.");
      toast({
        description: "Unable to fetch food data right now. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchinput(e.target.value);
  };

  const handleSearchClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchData(undefined);
    setPage(1);
    getFoodData(searchinput, 1);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevClick = () => {
    if (page <= 1 || isLoading) return;
    setPage((currentPage) => currentPage - 1);
  };

  const handleNextClick = () => {
    if (isLoading || !hasNextPage) return;
    setPage((currentPage) => currentPage + 1);
  };

  useEffect(() => {
    firstRender ? setFirstRender(false) : getFoodData(searchinput, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    scrollToTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchData]);

  return (
    <>
      {isImported ? (
        <AddNewRecordForm item={selector} />
      ) : (
        <div>
          <p className="mt-5 text-center text-xl">
            {session ? "Choose from food data" : "Food Search"}
          </p>

          <div className="mx-auto my-8">
            <form
              onSubmit={handleSearchClick}
              className="mx-auto flex max-w-sm gap-2"
            >
              <Input type="text" onChange={handleInputChange} />
              <Button
                disabled={isLoading || searchinput.trim() === ""}
                type="submit"
              >
                {isLoading ? "Searching..." : "Search"}
              </Button>
            </form>
          </div>
          {!isLoading && !searchData && !searchError && (
            <p className="flex items-center justify-center pt-10">
              Search result will appear here
            </p>
          )}
          {!isLoading && searchError && (
            <p className="flex items-center justify-center pt-10 text-red-500">
              {searchError}
            </p>
          )}
          {isLoading && <Loading />}

          <div className="grid grid-cols-1 gap-6 px-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {searchData &&
              searchData.products.map((item) => (
                <ImportedFoodCard
                  key={item._id}
                  item={item}
                  setData={setSearchData}
                  setIsImported={setIsImported}
                />
              ))}
          </div>
          <div className="flex justify-center gap-2 py-5">
            {searchData && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      className={`cursor-pointer ${page <= 1 || isLoading ? "pointer-events-none opacity-50" : ""}`}
                      onClick={handlePrevClick}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      className={`cursor-pointer ${isLoading || !hasNextPage ? "pointer-events-none opacity-50" : ""}`}
                      onClick={handleNextClick}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FoodData;
