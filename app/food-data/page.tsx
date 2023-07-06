"use client";

import { ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface getFoodData {
  searchInput: string;
  pageNumber: number;
}

const getFoodData = async ({ searchInput, pageNumber }: getFoodData) => {
  try {
    const res = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?action=process&json=true&search_terms=${searchInput}&page=${pageNumber}`
    );
    return res.json();
  } catch (error) {
    console.log(error.message);
  }
};

const FoodDataPage = () => {
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const handleClick = () => {
    console.log(getFoodData(input, page));
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
      <div className="flex justify-center">
        <p className="pt-24 text-lg">Search result will appear here</p>
      </div>
    </>
  );
};

export default FoodDataPage;
