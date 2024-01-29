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
import Loading from "@/app/loading";

interface ExistingData extends FoodInputSchema {
  intakeDate: Date;
  id: string;
}

const getData = async (id: string) => {
  try {
    const res = await fetch(`/api/records/id/${id}`);
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(res.statusText);
    }
  } catch (error) {
    console.error(error);
  }
};

export default function EditForm({ id }: { id: string }) {
  const [dbData, setDbData] = useState<ExistingData>();
  const [selectedDate, setSelectedDate] = useState<Date>();

  useEffect(() => {
    getData(id).then((data) => setDbData(data));
  }, [id]);

  useEffect(() => {
    if (dbData) {
      setSelectedDate(new Date(dbData.intakeDate));
    }
  }, [dbData]);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FoodInputSchema>({
    resolver: zodResolver(foodInputSchema),
    // defaultValues: {
    //   foodName: formData?.foodName,
    //   protein: formData?.protein,
    //   fats: formData?.fats,
    //   carbs: formData?.carbs,
    //   calories: formData?.calories,
    //   foodSize: formData?.foodSize,
    // },
  });

  // const mmddyyyy = format(selectedDate!, "MM-dd-yyyy");

  const onUpdate = async (formData: FoodInputSchema) => {
    const combined = {
      ...dbData,
      ...formData,
      intakeDate: selectedDate?.toISOString(),
    };
    try {
      const res = await fetch(`/api/records/id/${combined.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(combined),
      });

      if (res.ok) {
        alert("Edited Successfully!!");
        router.push("/dashboard");
      } else {
        alert("Something went wrong. Please try again later.");
        throw new Error(res.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {dbData === undefined ? (
        <Loading />
      ) : (
        <form
          onSubmit={handleSubmit(onUpdate)}
          className="flex flex-col items-center justify-center gap-3"
        >
          <p className="text-lg font-bold"> Edit Food Data</p>
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
                      !selectedDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    {selectedDate && format(selectedDate, "MM/dd/yyyy")}
                    {/* {selectedDate?.toString().toLocaleString().slice(0, 10)} */}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    required
                    mode="single"
                    selected={selectedDate!}
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
            <Input
              id="foodName"
              type="text"
              {...register("foodName")}
              defaultValue={dbData?.foodName}
            />
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
              defaultValue={dbData?.calories}
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
              defaultValue={dbData?.carbs}
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
              defaultValue={dbData?.fats}
            />
            {errors.fats && (
              <p className="text-red-500 ">{errors.fats.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="protein">Protein (g)</Label>
            <Input
              id="protein"
              type="number"
              {...register("protein", { valueAsNumber: true })}
              defaultValue={dbData?.protein}
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
              defaultValue={dbData?.foodSize}
            />
            {errors.foodSize && (
              <p className="text-red-500 ">{errors.foodSize.message}</p>
            )}
          </div>
          <Button className="w-28" type="submit">
            Update
          </Button>
        </form>
      )}
    </>
  );
}
