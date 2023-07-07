"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

const getFoodData = async (searchTerm: string, currentPage: number) => {
  const data = await axios(
    `https://world.openfoodfacts.org/cgi/search.pl?action=process&json=true&search_terms=${searchTerm}&page=${currentPage}`
  );
  return data;
  // try {
  //   const res = await fetch(
  //     `https://world.openfoodfacts.org/cgi/search.pl?action=process&json=true&search_terms=${searchTerm}&page=${currentPage}`
  //   );
  //   return res.json();
  // } catch (error) {
  //   console.log(error.message);
  // }
};

const FoodDataPage = () => {
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);
  const [searchResult, setSearchResult] = useState();
  const [data, setData] = useState();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleClick = () => {
    setData(getFoodData(input, page));
  };

  return (
    <>
      <h1>Food Search</h1>
      <div className="flex justify-center">
        <div className="flex max-w-md gap-2">
          <Input onChange={handleInputChange} />
          <Button onClick={handleClick}>Search</Button>
        </div>
      </div>
      {data ? (
        <p>123</p>
      ) : (
        <div className="flex justify-center">
          <p className="pt-24 text-lg">Search result will appear here</p>
        </div>
      )}
    </>
  );
};

export default FoodDataPage;
