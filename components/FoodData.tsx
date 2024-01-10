"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { FetchedFoodData } from "@/app";
import { SyncLoader } from "react-spinners";
import ImportedFoodCard from "./ImportedFoodCard";
import AddNewRecordForm from "./AddNewRecordForm";
import { useAppSelector } from "@/app/rtk/store";

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
  const [pageCount, setPageCount] = useState<number>(0);
  const [data, setData] = useState<FetchedFoodData | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [isImported, setIsImported] = useState(false);

  const getFoodData = async (searchTerm: string, currentPage: number) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?action=process&json=true&search_terms=${searchTerm}&page=${currentPage}`,
      );
      if (res.ok) {
        setData(await res.json());
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchinput(e.target.value);
  };

  const handleSearchClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setData(undefined);
    getFoodData(searchinput, 1);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevClick = () => {
    setPage((page) => page - 1);
  };

  const handleNextClick = () => {
    setPage((page) => page + 1);
  };

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  useEffect(() => {
    firstRender ? setFirstRender(false) : getFoodData(searchinput, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    scrollToTop();
    data && setPageCount(data.page_count);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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
              <Button disabled={isLoading || searchinput === ""} type="submit">
                Search
              </Button>
            </form>
          </div>
          {!isLoading && !data && (
            <p className="flex items-center justify-center pt-10">
              Search result will appear here
            </p>
          )}
          {isLoading && (
            <div className="flex items-center justify-center pt-32">
              <SyncLoader color="#262E80" />
            </div>
          )}

          <div className="flex flex-col items-center justify-center gap-6 md:grid md:grid-cols-4">
            {data &&
              data.products.map((item) => (
                <ImportedFoodCard
                  key={item._id}
                  item={item}
                  setData={setData}
                  setIsImported={setIsImported}
                />
              ))}
            <div className="flex gap-2">
              <Button
                className={`bg-slate-500 text-white ${!data && `hidden`}`}
                onClick={handlePrevClick}
                disabled={isLoading || page <= 1}
              >
                ←
              </Button>
              <Button
                className={`bg-slate-500 text-white ${!data && `hidden`}`}
                onClick={handleNextClick}
                disabled={isLoading || pageCount !== 24}
              >
                →
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FoodData;
