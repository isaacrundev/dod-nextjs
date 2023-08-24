"use client";

import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FoodInputSchema, foodInputSchema } from "./FoodData";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { PopoverClose } from "@radix-ui/react-popover";
import { useEffect, useState } from "react";

export default function AddNewInputForm() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FoodInputSchema>({
    resolver: zodResolver(foodInputSchema),
    defaultValues: {
      foodName: "",
      protein: 0,
      fats: 0,
      carbs: 0,
      calories: 0,
      foodSize: 0,
    },
  });

  const mmddyyyy = format(selectedDate!, "MM-dd-yyyy");

  const onSave = async (data: FoodInputSchema) => {
    const combined = { ...data, intakeDate: mmddyyyy };
    console.log(combined);
    try {
      const res = await fetch("/api/records/add-new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(combined),
      });

      if (res.ok) {
        alert("Added Successfully!!");
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
        onSubmit={handleSubmit(onSave)}
        className="flex flex-col items-center justify-center gap-3"
      >
        <p className="text-lg font-bold"> Input food data by your own</p>
        <div className="flex flex-col space-y-1">
          <Label htmlFor="intake-date">Date</Label>
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="intake-date"
                  variant={"outline"}
                  className={cn(
                    " justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {selectedDate && format(selectedDate, "P")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                />
                <div className="flex justify-center pb-3">
                  <PopoverClose className="px-5 py-2 text-white rounded-lg bg-primary">
                    Apply
                  </PopoverClose>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
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
            // type="number"
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
            // type="number"
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
            // type="number"
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
            // type="number"

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
            // type="number"
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
