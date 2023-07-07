"use client";

import { ChangeEvent, useEffect, useState } from "react";
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

const FoodDataPage = () => {
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);
  const [searchResult, setSearchResult] = useState();
  const [data, setData] = useState();

  const getFoodData = async (searchTerm: string, currentPage: number) => {
    try {
      const res = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?action=process&json=true&search_terms=${searchTerm}&page=${currentPage}`
      );
      const jsonData = await res.json();
      setData(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleClick = () => {
    getFoodData(input, page);
  };

  return (
    <>
      <h1>Food Search</h1>
      <div className="flex justify-center my-5">
        <div className="flex max-w-md gap-2">
          <Input onChange={handleInputChange} />
          <Button onClick={handleClick}>Search</Button>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {data ? (
          data.products.map((item) => (
            <Card key={item.code}>
              <CardHeader>
                <CardTitle>
                  {item.product_name ? item.product_name : item.product_name_fr}
                </CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="flex justify-center">
            <p className="pt-24 text-lg">Search result will appear here</p>
          </div>
        )}
      </div>
    </>
  );
};

export default FoodDataPage;
