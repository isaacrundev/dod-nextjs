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
import { Dispatch, SVGProps, SetStateAction, useEffect, useState } from "react";
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
    <div className="overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-800">
      <Image
        className="h-48 w-full object-cover"
        height="200"
        src={item.image_small_url ? item.image_small_url : noImage}
        style={{
          aspectRatio: "300/200",
          objectFit: "contain",
        }}
        width="300"
        alt={item.product_name_en ? item.product_name_en : "no_alt"}
        placeholder="blur"
        blurDataURL={item.image_small_url}
      />
      <div className="space-y-2 p-4">
        <h3 className="text-lg font-semibold">
          {item.product_name_en
            ? item.product_name_en
            : item.product_name
              ? item.product_name
              : "(No Food Name Found)"}
        </h3>
        <div className="flex items-center gap-2">
          <FlameIcon className="h-5 w-5 text-red-500" />
          <span>
            {roundToSecondPlace(item.nutriments["energy-kcal_100g"])} calories
          </span>
        </div>
        <div className="flex items-center gap-2">
          <CarrotIcon className="h-5 w-5 text-green-500" />
          <span>
            {roundToSecondPlace(item.nutriments.carbohydrates_100g)} carbs
          </span>
        </div>
        <div className="flex items-center gap-2">
          <DnaIcon className="h-5 w-5 text-yellow-500" />
          <span>
            {roundToSecondPlace(item.nutriments.proteins_100g)} protein
          </span>
        </div>
        <div className="flex items-center gap-2">
          <WeightIcon className="h-5 w-5 text-gray-500" />
          <span>{roundToSecondPlace(item.nutriments.fat_100g)} fat</span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">per 100g</p>
        {session && (
          // <CardFooter className="p-3 pt-6">
          <div className="flex items-center justify-center pt-6">
            <Button
              type="button"
              className="h-10 w-28 rounded-md bg-primary text-white"
              onClick={handleCardClick}
            >
              Import
            </Button>
          </div>
          // </CardFooter>
        )}
      </div>
    </div>
    // <Card className="flex flex-col items-center justify-between w-5/6 max-w-xs px-1 py-5 bg-gray-100 shadow-lg h-96">
    //   <Image
    //     className="w-auto h-auto "
    //     width={100}
    //     height={100}
    //     src={item.image_small_url ? item.image_small_url : noImage}
    //     alt={item.product_name_en ? item.product_name_en : "no_alt"}
    //     placeholder="blur"
    //     blurDataURL={item.image_small_url}
    //   />
    //   <CardHeader className="py-2 text-center">
    //     <CardTitle className="line-clamp-2">
    //       {item.product_name_en
    //         ? item.product_name_en
    //         : item.product_name
    //           ? item.product_name
    //           : "(No Food Name Found)"}
    //     </CardTitle>
    //     <CardDescription>Per 100g/ml</CardDescription>
    //   </CardHeader>
    //   <CardContent className="p-0">
    //     <ul>
    //       <li>
    //         Calories: {roundToSecondPlace(item.nutriments["energy-kcal_100g"])}
    //       </li>
    //       <li>
    //         carbs: {roundToSecondPlace(item.nutriments.carbohydrates_100g)}
    //       </li>
    //       <li>Fats: {roundToSecondPlace(item.nutriments.fat_100g)}</li>
    //       <li>Protein: {roundToSecondPlace(item.nutriments.proteins_100g)}</li>
    //     </ul>
    //   </CardContent>
    //   {session && (
    //     <CardFooter className="p-3 pt-6">
    //       <Button
    //         type="button"
    //         className="h-10 text-white rounded-md w-28 bg-primary"
    //         onClick={handleCardClick}
    //       >
    //         Import
    //       </Button>
    //     </CardFooter>
    //   )}
    // </Card>
  );
}

function CarrotIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.27 21.7s9.87-3.5 12.73-6.36a4.5 4.5 0 0 0-6.36-6.37C5.77 11.84 2.27 21.7 2.27 21.7zM8.64 14l-2.05-2.04M15.34 15l-2.46-2.46" />
      <path d="M22 9s-1.33-2-3.5-2C16.86 7 15 9 15 9s1.33 2 3.5 2S22 9 22 9z" />
      <path d="M15 2s-2 1.33-2 3.5S15 9 15 9s2-1.84 2-3.5C17 3.33 15 2 15 2z" />
    </svg>
  );
}

function DnaIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 15c6.667-6 13.333 0 20-6" />
      <path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993" />
      <path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993" />
      <path d="m17 6-2.5-2.5" />
      <path d="m14 8-1-1" />
      <path d="m7 18 2.5 2.5" />
      <path d="m3.5 14.5.5.5" />
      <path d="m20 9 .5.5" />
      <path d="m6.5 12.5 1 1" />
      <path d="m16.5 10.5 1 1" />
      <path d="m10 16 1.5 1.5" />
    </svg>
  );
}

function FlameIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}

function WeightIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="5" r="3" />
      <path d="M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z" />
    </svg>
  );
}
