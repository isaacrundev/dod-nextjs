"use client";

interface Input {
  protein: number;
  fats: number;
  carbs: number;
}

import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

export default function AddNewForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="space-y-1">
          <Label>Protein</Label>
          <Input type="number" {...register("protein")} />
        </div>
        <div className="space-y-1">
          <Label>Fats</Label>
          <Input type="number" {...register("fats")} />
        </div>
        <div className="space-y-1">
          <Label>Carbs</Label>
          <Input type="number" {...register("carbs")} />
        </div>
        <div className="space-y-1">
          <Label>Calories</Label>
          <Input type="number" {...register("calories")} />
        </div>
        <Button>Save</Button>
      </div>
    </>
  );
}
