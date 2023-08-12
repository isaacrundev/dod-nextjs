"use client";

import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSession } from "next-auth/react";
import Unauthenticated from "./Unauthenticated";

const formSchema = z.object({
  foodName: z.string(),
  protein: z.number(),
  fats: z.number(),
  carbs: z.number(),
  calories: z.number(),
});

export type FormInputs = {
  foodName: string;
  protein: number;
  fats: number;
  carbs: number;
  calories: number;
};

export default function AddNewForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      foodName: "",
      protein: +"",
      fats: +"",
      carbs: +"",
      calories: +"",
    },
  });

  if (!session) {
    return <Unauthenticated />;
  }

  const onSave = async (data: FormInputs) => {
    try {
      // const res = await fetch("/api/auth/add-new", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(data),
      // });
      // if (res.ok) {
      //   alert("Added");
      //   router.push("/dashboard");
      // }
      // return res.json();
      console.log({ ...data, userId: session.user?.email });
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
