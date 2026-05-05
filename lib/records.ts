import { z } from "zod";
import { DATE_KEY_FORMAT, toStoredIntakeDate } from "@/lib/date";

export const intakeDateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
  message: `Use ${DATE_KEY_FORMAT} format`,
});

export const foodDataRequestSchema = z.object({
  foodName: z.string().min(3, { message: "Minimum length of Food Name is 3" }),
  protein: z.coerce
    .number()
    .nonnegative()
    .multipleOf(0.01, { message: "Maximum 2 decimal place only" }),
  fats: z.coerce
    .number()
    .nonnegative()
    .multipleOf(0.01, { message: "Maximum 2 decimal place only" }),
  carbs: z.coerce
    .number()
    .nonnegative()
    .multipleOf(0.01, { message: "Maximum 2 decimal place only" }),
  calories: z.coerce
    .number()
    .nonnegative()
    .multipleOf(0.01, { message: "Maximum 2 decimal place only" }),
  foodSize: z.coerce
    .number()
    .positive()
    .int({ message: "Interger value only" }),
  intakeDate: intakeDateSchema,
});

export const recordIdParamsSchema = z.object({
  id: z.string().uuid(),
});

export type FoodDataRequest = z.infer<typeof foodDataRequestSchema>;

export function buildRecordUpdateData(input: FoodDataRequest) {
  return {
    foodName: input.foodName,
    protein: input.protein,
    fats: input.fats,
    carbs: input.carbs,
    calories: input.calories,
    foodSize: input.foodSize,
    intakeDate: toStoredIntakeDate(input.intakeDate),
  };
}

export function buildRecordCreateData(input: FoodDataRequest, userId: string) {
  return {
    ...buildRecordUpdateData(input),
    userId,
  };
}
