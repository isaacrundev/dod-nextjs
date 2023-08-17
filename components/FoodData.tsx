"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
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
import { DialogClose } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "./ui/label";
import { foodData } from "@/app";

export const foodInputSchema = z.object({
  foodName: z.string(),
  protein: z.number(),
  fats: z.number(),
  carbs: z.number(),
  calories: z.number(),
  foodSize: z.number(),
});

export type FoodInputSchema = z.infer<typeof foodInputSchema>;

const FoodData = () => {
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<foodData>();
  const [isLoading, setIsLoading] = useState(false);
  const [importedFoodData, setImportedFoodData] = useState<
    FoodInputSchema | undefined
  >(undefined);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<FoodInputSchema>({
    resolver: zodResolver(foodInputSchema),
    defaultValues: {
      foodName: "",
      protein: 0,
      fats: 0,
      carbs: 0,
      calories: 0,
      foodSize: 100,
    },
  });

  const getFoodData = async (searchTerm: string, currentPage: number) => {
    try {
      const res = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?action=process&json=true&search_terms=${searchTerm}&page=${currentPage}`
      );
      if (res.ok) {
        const jsonData = await res.json();
        setData(jsonData);
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

  const handleClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    getFoodData(input, page);
  };

  const onSave = async (data: FoodInputSchema) => {
    try {
      const dataWithEmail = { ...data, email: session!.user?.email };
      console.log(dataWithEmail);

      // const res = await fetch("/api/auth/add-new", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(dataWithEmail),
      // });
      // if (res.ok) {
      //   alert("Added");
      //   router.push("/dashboard");
      // }
      // return res.json();
    } catch (error) {
      console.log(error);
    }
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

  return (
    <>
      <div className="flex items-end justify-center">
        <p className="text-xl">
          {session ? "Choose from food data" : "Food Search"}
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSave)}
        className={`${
          importedFoodData ? `flex` : `hidden`
        } flex-col items-center justify-center gap-3`}
      >
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
          importedFoodData ? `hidden` : `flex`
        } justify-center my-5`}
      >
        <form onSubmit={handleClick} className="flex max-w-md gap-2">
          <Input type="text" onChange={handleInputChange} />
          <Button disabled={isLoading} type="submit">
            Search
          </Button>
        </form>
      </div>
      <div
        className={`${
          importedFoodData ? `hidden` : `flex`
        } flex-col items-center justify-center gap-6`}
      >
        {data
          ? data.products.map((item) => (
              <Card
                key={item._id}
                className="flex flex-col items-center justify-between w-3/4 px-1 py-3 max-h-100"
              >
                <Image
                  className="w-auto h-auto "
                  width={100}
                  height={100}
                  src={item.image_small_url ? item.image_small_url : noImage}
                  alt={item.product_name_en ? item.product_name_en : "no_alt"}
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
                    <li>Calories: {item.nutriments["energy-kcal_100g"]}</li>
                    <li>carbs: {item.nutriments.carbohydrates_100g}</li>
                    <li>Fats: {item.nutriments.fat_100g}</li>
                    <li>Protein: {item.nutriments.proteins_100g}</li>
                  </ul>
                </CardContent>
                {session && (
                  <CardFooter className="p-3 pt-6">
                    <Button
                      type="button"
                      className="h-10 text-white bg-black rounded-md w-28"
                      onClick={() => {
                        setImportedFoodData({
                          foodName: item.product_name_en
                            ? item.product_name_en
                            : item.product_name
                            ? item.product_name
                            : item.product_name_fr
                            ? item.product_name_fr
                            : "(No Food Name Found)",
                          protein: +item.nutriments.proteins_100g,
                          fats: +item.nutriments.fat_100g,
                          carbs: +item.nutriments.carbohydrates_100g,
                          calories: +item.nutriments["energy-kcal_100g"],
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
                        setValue("protein", +item.nutriments.proteins_100g);
                        setValue("fats", +item.nutriments.fat_100g);
                        setValue("carbs", +item.nutriments.carbohydrates_100g);
                        setValue(
                          "calories",
                          +item.nutriments["energy-kcal_100g"]
                        );
                        setValue("foodSize", +100);
                      }}
                    >
                      Import
                    </Button>
                  </CardFooter>
                )}
              </Card>
            ))
          : !session && <p className="pt-32">Search result will appear here</p>}
      </div>
    </>
  );
};

export default FoodData;
