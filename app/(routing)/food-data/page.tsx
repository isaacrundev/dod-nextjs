"use client";

import { ChangeEvent, useEffect, useState } from "react";
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

type Products = {
  _id: string;
  product_name: string;
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

const FoodDataPage = () => {
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

  const handleClick = () => {
    setIsLoading(true);
    getFoodData(input, page);
  };

  return (
    <>
      <p className="py-3 text-xl text-center">Food Search</p>
      <div className="flex justify-center my-5">
        <div className="flex max-w-md gap-2">
          <Input type="text" onChange={handleInputChange} />
          <Button disabled={isLoading} onClick={handleClick}>
            Search
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        {data ? (
          data.products.map((item) => (
            <Card
              key={item._id}
              className="flex flex-col items-center justify-between w-5/6 p-3"
            >
              <Image
                width={100}
                height={100}
                src={item.image_small_url}
                alt={
                  item.product_name
                    ? `${item.product_name} (No Image)`
                    : "No Image"
                }
              />
              <CardHeader className="text-center">
                <CardTitle>
                  {item.product_name ? item.product_name : item.product_name_fr}
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
              {/* <CardFooter>
                <p>Card Footer</p>
              </CardFooter> */}
            </Card>
          ))
        ) : (
          <p>Search result will appear here</p>
        )}
      </div>
    </>
  );
};

export default FoodDataPage;
