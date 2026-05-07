"use client";

import { useMemo, useEffect, useState } from "react";
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
import Loading from "@/app/loading";
import { useToast } from "@/hooks/use-toast";
import { getApiErrorMessage } from "@/lib/api-error";
import {
  formatDisplayDate,
  getDateKey,
  normalizeCalendarDate,
} from "@/lib/date";
import { reportError } from "@/lib/error-report";

interface ExistingData extends FoodInputSchema {
  intakeDate: Date;
  id: string;
}

const getData = async (id: string) => {
  const res = await fetch(`/api/records/id/${id}`);

  if (!res.ok) {
    throw new Error(await getApiErrorMessage(res, "Failed to load record."));
  }

  return res.json();
};

export default function EditForm({ id }: { id: string }) {
  const [dbData, setDbData] = useState<ExistingData>();
  const [selectedDateOverride, setSelectedDateOverride] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const formValues = useMemo(
    () =>
      dbData
        ? {
            foodName: dbData.foodName,
            calories: dbData.calories,
            carbs: dbData.carbs,
            fats: dbData.fats,
            protein: dbData.protein,
            foodSize: dbData.foodSize,
          }
        : undefined,
    [dbData],
  );

  const selectedDate = useMemo(() => {
    if (selectedDateOverride) {
      return selectedDateOverride;
    }

    if (dbData) {
      return normalizeCalendarDate(dbData.intakeDate);
    }

    return undefined;
  }, [dbData, selectedDateOverride]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FoodInputSchema>({
    resolver: zodResolver(foodInputSchema),
    values: formValues,
  });

  useEffect(() => {
    let mounted = true;

    getData(id)
      .then((data) => {
        if (mounted) {
          setDbData(data);
          setSelectedDateOverride(undefined);
        }
      })
      .catch((error) => {
        reportError(error, "EditForm.getData");
        toast({
          description: "Unable to load this record.",
          variant: "destructive",
        });
        router.push("/dashboard");
      });

    return () => {
      mounted = false;
    };
  }, [id, router, toast]);

  const onUpdate = async (formData: FoodInputSchema) => {
    if (!dbData || !selectedDate) {
      toast({
        description: "Record data is still loading.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/records/id/${dbData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...dbData,
          ...formData,
          intakeDate: getDateKey(selectedDate),
        }),
      });

      if (!res.ok) {
        toast({
          description: await getApiErrorMessage(res, "Failed to update record."),
          variant: "destructive",
        });
        return;
      }

      toast({ description: "Record updated successfully!" });
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      reportError(error, "EditForm.onUpdate");
      toast({
        description: "Unable to update right now. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
          <p className="text-lg font-bold">Edit Food Data</p>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="intake-date">Date</Label>
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="intake-date"
                    variant="outline"
                    className={cn(
                      " justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate && formatDisplayDate(selectedDate)}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    required
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) =>
                      setSelectedDateOverride(
                        date ? normalizeCalendarDate(date) : undefined,
                      )
                    }
                    initialFocus
                  />
                  <div className="flex justify-center pb-3">
                    <PopoverClose className="rounded-lg bg-primary px-5 py-2 text-white">
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
              disabled={isSubmitting}
              {...register("foodName")}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
              {...register("carbs", { valueAsNumber: true })}
            />
            {errors.carbs && <p className="text-red-500 ">{errors.carbs.message}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="fats">Fats (g)</Label>
            <Input
              id="fats"
              type="number"
              disabled={isSubmitting}
              {...register("fats", { valueAsNumber: true })}
            />
            {errors.fats && <p className="text-red-500 ">{errors.fats.message}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="protein">Protein (g)</Label>
            <Input
              id="protein"
              type="number"
              disabled={isSubmitting}
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
              disabled={isSubmitting}
              {...register("foodSize", { valueAsNumber: true })}
            />
            {errors.foodSize && (
              <p className="text-red-500 ">{errors.foodSize.message}</p>
            )}
          </div>
          <Button className="w-28" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update"}
          </Button>
        </form>
      )}
    </>
  );
}
