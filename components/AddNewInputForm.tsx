"use client";

import { FieldValues, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSession } from "next-auth/react";
import Unauthenticated from "./Unauthenticated";

const inputByYourselfSchema = z.object({
  foodName: z.string().nonempty("Food Name can't be empty"),
  protein: z.number(),
  fats: z.number(),
  carbs: z.number(),
  calories: z.number(),
  foodSize: z.number(),
});

type InputByYourselfSchema = z.infer<typeof inputByYourselfSchema>;

export default function AddNewInputForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputByYourselfSchema>({
    resolver: zodResolver(inputByYourselfSchema),
    defaultValues: {
      foodName: "",
      protein: 0,
      fats: 0,
      carbs: 0,
      calories: 0,
      foodSize: 0,
    },
  });

  if (!session) {
    return <Unauthenticated />;
  }

  const onSave = async (data: InputByYourselfSchema) => {
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

  return (
    <>
      <form
        onSubmit={handleSubmit(onSave)}
        className="flex flex-col items-center justify-center gap-3"
      >
        <p className="text-lg font-bold"> Input food data by your own</p>
        <div className="space-y-1">
          <Label htmlFor="foodName">Food Name</Label>
          <Input id="foodName" type="text" {...register("foodName")} />
          {errors.foodName && (
            <p className="text-red-500 ">{errors.foodName.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="calories">Calories (kcals)</Label>
          <Input
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
          />
          {errors.foodSize && (
            <p className="text-red-500 ">{errors.foodSize.message}</p>
          )}
        </div>
        <Button className="w-28" type="submit">
          Save
        </Button>
      </form>
    </>
  );
}
