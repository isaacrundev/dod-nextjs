"use client";

import { roundToSecondPlace } from "@/app/utils/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { FetchedFoodData, Product } from "@/app";
import noImage from "@/public/img/no-image-icon-23494.png";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app/rtk/store";
import { add } from "@/app/rtk/slices/importedFood";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type Props = {
  item: Product;
  setData: Dispatch<SetStateAction<FetchedFoodData | undefined>>;
  setIsImported: Dispatch<SetStateAction<boolean>>;
};

export default function ImportedFoodCard({
  item,
  setData,
  setIsImported,
}: Props) {
  const { data: session } = useSession();

  const dispatch = useDispatch<AppDispatch>();

  const handleCardClick = () => {
    dispatch(add(item));
    setData(undefined);
    setIsImported(true);
  };

  return (
    <Card className="flex flex-col items-center justify-between w-5/6 px-1 py-6 md:max-w-sm max-h-96">
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
        <CardDescription>Per 100g/ml</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ul>
          <li>
            Calories: {roundToSecondPlace(item.nutriments["energy-kcal_100g"])}
          </li>
          <li>
            carbs: {roundToSecondPlace(item.nutriments.carbohydrates_100g)}
          </li>
          <li>Fats: {roundToSecondPlace(item.nutriments.fat_100g)}</li>
          <li>Protein: {roundToSecondPlace(item.nutriments.proteins_100g)}</li>
        </ul>
      </CardContent>
      {session && (
        <CardFooter className="p-3 pt-6">
          <Button
            type="button"
            className="h-10 text-white rounded-md bg-primary w-28"
            onClick={handleCardClick}
          >
            Import
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
