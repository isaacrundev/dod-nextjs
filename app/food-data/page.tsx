"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FoodDataPage = () => {
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  const handleClick = (e) => {
    console.log(getFoodData(input, page));
  };

  const getFoodData = async (input, page) => {
    const res = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?action=process&json=true&search_terms=${input}&page=${page}`
    );
    return res.json();
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
        <p className="pt-24 text-lg font-bold">
          Search result will appear here
        </p>
      </div>
    </>
  );
};

export default FoodDataPage;
