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

type Products = {
  _id: string;
  product_name: string;
  product_name_en: string;
  product_name_fr: string;
  image_small_url: string;
  nutrition_data_prepared_per: string;
  nutriments: {
    carbohydrates_100g: string;
    fat_100g: string;
    proteins_100g: string;
    ["energy-kcal_100g"]: string;
  };
};

type foodData = {
  products: Products[];
};

const FoodData = () => {
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<foodData>();
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <>
      <div className="flex items-end justify-center">
        <p className="text-xl">
          {session ? "Choose from food data" : "Food Search"}
        </p>
      </div>
      <div className="flex justify-center my-5">
        <form onSubmit={handleClick} className="flex max-w-md gap-2">
          <Input type="text" onChange={handleInputChange} />
          <Button disabled={isLoading} type="submit">
            Search
          </Button>
        </form>
      </div>
      <div className="flex flex-col items-center justify-center gap-6">
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
                  alt={item.product_name_en}
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
                    <Button className="w-28">Import</Button>
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
