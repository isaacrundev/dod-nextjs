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
      <div className="flex flex-col max-w-xs gap-3">
        <div>
          <Label>Protein</Label>
          <Input type="number" {...register("protein")} />
        </div>
        <div>
          <Label>Fats</Label>
          <Input type="number" {...register("fats")} />
        </div>
        <div>
          <Label>Carbs</Label>
          <Input type="number" {...register("carbs")} />
        </div>
        <Button>Save</Button>
      </div>
    </>
  );
}
