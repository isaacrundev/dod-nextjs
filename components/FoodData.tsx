"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "next-auth/react";
import noImage from "@/public/img/no-image-icon-23494.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "./ui/label";
import { foodData } from "@/app";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { PopoverClose } from "@radix-ui/react-popover";
import { SyncLoader } from "react-spinners";
import { roundToSecondPlace } from "@/app/utils/utils";

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
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const router = useRouter();
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState<number>(0);
  const [data, setData] = useState<foodData | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [importedFoodData, setImportedFoodData] = useState<
    FoodInputSchema | undefined
  >(undefined);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FoodInputSchema>({
    resolver: zodResolver(foodInputSchema),
    defaultValues: {
      foodName: "",
      protein: 0,
      fats: 0,
      carbs: 0,
      calories: 0,
      foodSize: 0,
    },
  });

  const mmddyyyy = format(selectedDate!, "MM-dd-yyyy");

  const onSave = async (data: FoodInputSchema) => {
    const combined = { ...data, intakeDate: mmddyyyy };
    console.log(combined);
    try {
      const res = await fetch("/api/records/add-new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(combined),
      });

      if (res.ok) {
        alert("Added Successfully!!");
        router.push("/dashboard");
      }

      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const getFoodData = async (searchTerm: string, currentPage: number) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?action=process&json=true&search_terms=${searchTerm}&page=${currentPage}`
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
    setInput(e.target.value);
  };

  const handleSearchClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setData(undefined);
    setPage(1);
  };

  const handleFoodSizeOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const foodSizeInputValue = +e.target.value;
    setValue(
      "calories",
      (importedFoodData!.calories / 100) * foodSizeInputValue
    );
    setValue("carbs", (importedFoodData!.carbs / 100) * foodSizeInputValue);
    setValue("fats", (importedFoodData!.fats / 100) * foodSizeInputValue);
    setValue("protein", (importedFoodData!.protein / 100) * foodSizeInputValue);
  };

  useEffect(() => {
    page >= 1 && getFoodData(input, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    data && setPageCount(data.page_count);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div>
      {/* <div className="mx-auto mt-5"> */}
      <p className="mt-5 text-xl text-center">
        {session ? "Choose from food data" : "Food Search"}
      </p>
      {/* </div> */}

      <form
        onSubmit={handleSubmit(onSave)}
        className={`${
          importedFoodData ? `flex` : `hidden`
        } flex-col items-center justify-center gap-3`}
      >
        <div className="flex flex-col space-y-1">
          <Label htmlFor="intake-date">Date</Label>
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="intake-date"
                  variant={"outline"}
                  className={cn(
                    " justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {selectedDate && format(selectedDate, "P")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  required
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                />
                <div className="flex justify-center pb-3">
                  <PopoverClose className="px-5 py-2 text-white rounded-lg bg-primary">
                    Apply
                  </PopoverClose>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="space-y-1">
          <Label htmlFor="foodName">Food Name</Label>
          <Input disabled id="foodName" type="text" {...register("foodName")} />
          {errors.foodName && (
            <p className="text-red-500 ">{errors.foodName.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="calories">Calories (kcals)</Label>
          <Input
            disabled
            id="calories"
            type="number"
            {...register("calories", { valueAsNumber: true })}
          />
          {errors.calories && (
            <p className="text-red-500 ">{errors.calories.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="carbs">Carbs (g)</Label>
          <Input
            disabled
            id="carbs"
            type="number"
            {...register("carbs", { valueAsNumber: true })}
          />
          {errors.carbs && (
            <p className="text-red-500 ">{errors.carbs.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="fats">Fats (g)</Label>
          <Input
            disabled
            id="fats"
            type="number"
            {...register("fats", { valueAsNumber: true })}
          />
          {errors.fats && (
            <p className="text-red-500 ">{errors.fats.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="protein">Protein (g)</Label>
          <Input
            disabled
            id="protein"
            {...register("protein", { valueAsNumber: true })}
          />
          {errors.protein && (
            <p className="text-red-500 ">{errors.protein.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="food-size">Size in total (g or ml)</Label>
          <Input
            id="food-size"
            type="number"
            {...register("foodSize", { valueAsNumber: true })}
            onChange={handleFoodSizeOnChange}
          />
          {errors.foodSize && (
            <p className="text-red-500 ">{errors.foodSize.message}</p>
          )}
        </div>
        <Button className="w-28" type="submit">
          Save
        </Button>
      </form>

      <div
        className={`${
          importedFoodData
            ? `hidden`
            : // `flex justify-center my-3`
              `mx-auto my-5`
        } `}
      >
        <form onSubmit={handleSearchClick} className="flex max-w-md gap-2">
          <Input type="text" onChange={handleInputChange} />
          <Button disabled={isLoading || input === ""} type="submit">
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
      <div
        className={`${
          importedFoodData ? `hidden` : `flex`
        } flex-col items-center justify-center gap-6`}
      >
        {data &&
          data.products.map((item) => (
            <>
              <Card
                key={item._id}
                className="flex flex-col items-center justify-between w-5/6 px-1 py-3 max-h-100"
              >
                <Image
                  className="w-auto h-auto "
                  width={100}
                  height={100}
                  src={item.image_small_url ? item.image_small_url : noImage}
                  alt={item.product_name_en ? item.product_name_en : "no_alt"}
                  placeholder="blur"
                  blurDataURL={item.image_small_url}
                />
                <CardHeader className="py-2 text-center">
                  <CardTitle>
                    {item.product_name_en
                      ? item.product_name_en
                      : item.product_name
                      ? item.product_name
                      : item.product_name_fr
                      ? item.product_name_fr
                      : "(No Food Name Found)"}
                  </CardTitle>
                  <CardDescription>
                    Per {item.nutrition_data_prepared_per}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ul>
                    <li>
                      Calories:{" "}
                      {roundToSecondPlace(item.nutriments["energy-kcal_100g"])}
                    </li>
                    <li>
                      carbs:{" "}
                      {roundToSecondPlace(item.nutriments.carbohydrates_100g)}
                    </li>
                    <li>
                      Fats: {roundToSecondPlace(item.nutriments.fat_100g)}
                    </li>
                    <li>
                      Protein:{" "}
                      {roundToSecondPlace(item.nutriments.proteins_100g)}
                    </li>
                  </ul>
                </CardContent>
                {session && (
                  <CardFooter className="p-3 pt-6">
                    <Button
                      type="button"
                      className="h-10 text-white rounded-md bg-primary w-28"
                      onClick={() => {
                        setImportedFoodData({
                          foodName: item.product_name_en
                            ? item.product_name_en
                            : item.product_name
                            ? item.product_name
                            : item.product_name_fr
                            ? item.product_name_fr
                            : "(No Food Name Found)",
                          protein: +roundToSecondPlace(
                            item.nutriments.proteins_100g
                          ),
                          fats: +roundToSecondPlace(item.nutriments.fat_100g),
                          carbs: +roundToSecondPlace(
                            item.nutriments.carbohydrates_100g
                          ),
                          calories: +roundToSecondPlace(
                            item.nutriments["energy-kcal_100g"]
                          ),
                          foodSize: +100,
                        });
                        setValue(
                          "foodName",
                          item.product_name_en
                            ? item.product_name_en
                            : item.product_name
                            ? item.product_name
                            : item.product_name_fr
                            ? item.product_name_fr
                            : "(No Food Name Found)"
                        );
                        setValue(
                          "protein",
                          +roundToSecondPlace(item.nutriments.proteins_100g)
                        );
                        setValue(
                          "fats",
                          +roundToSecondPlace(item.nutriments.fat_100g)
                        );
                        setValue(
                          "carbs",
                          +roundToSecondPlace(
                            item.nutriments.carbohydrates_100g
                          )
                        );
                        setValue(
                          "calories",
                          +roundToSecondPlace(
                            item.nutriments["energy-kcal_100g"]
                          )
                        );
                        setValue("foodSize", +100);
                      }}
                    >
                      Import
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </>
          ))}
        <div className="flex gap-2">
          <Button
            className={`text-white bg-slate-500 ${!data && `hidden`}`}
            onClick={() => {
              setPage(page - 1);
            }}
            disabled={isLoading || page <= 1}
          >
            Prev
          </Button>
          <Button
            className={`text-white bg-slate-500 ${!data && `hidden`}`}
            onClick={() => {
              setPage(page + 1);
            }}
            disabled={isLoading || pageCount !== 24}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FoodData;
