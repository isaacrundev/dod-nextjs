"use client";

import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  foodName: z.string(),
  protein: z.number(),
  fats: z.number(),
  carbs: z.number(),
  calories: z.number(),
});

type FormInputs = {
  foodName: string;
  protein: number;
  fats: number;
  carbs: number;
  calories: number;
};

export default function AddNewForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      foodName: "",
      protein: 0,
      fats: 0,
      carbs: 0,
      calories: 0,
    },
  });

  const onSubmit = async (data: FormInputs) => {
    try {
      const res = await fetch("/api/auth/add-new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        alert("Added");
        router.push("/dashboard");
      }
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center gap-3"
      >
        <div className="space-y-1">
          <Label htmlFor="foodName">Food Name</Label>
          <Input id="foodName" type="text" {...register("foodName")} />
          {errors.foodName && (
            <p className="text-red-500 ">{errors.foodName.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="calories">Calories</Label>
          <Input
            id="calories"
            type="number"
            {...(register("calories"), { required: true })}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="carbs">Carbs (g)</Label>
          <Input
            id="carbs"
            type="number"
            {...(register("carbs"), { required: true })}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="fats">Fats (g)</Label>
          <Input
            id="fats"
            type="number"
            {...(register("fats"), { required: true })}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="protein (g)">Protein (g)</Label>
          <Input
            id="protein"
            type="number"
            {...(register("protein"), { required: true })}
          />
        </div>
        <Button className="w-full " type="submit">
          Save
        </Button>
      </form>
    </>
  );
}
