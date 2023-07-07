"use client";

interface Input {
  protein: number;
  fats: number;
  carbs: number;
}

import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function AddNewForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <div>
        <div>
          <Label>Protein</Label>
          <Input {...register("protein")} />
        </div>
        <div>
          <Label>Fats</Label>
          <Input {...register("fats")} />
        </div>
        <div>
          <Label>Carbs</Label>
          <Input {...register("carbs")} />
        </div>
      </div>
    </>
  );
}
