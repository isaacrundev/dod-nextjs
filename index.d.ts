import { z } from "zod";

export const foodInputSchema = z.object({
  foodName: z.string().min(3, { message: "Minimum length of Food Name is 3" }),
  protein: z.coerce
    .number()
    .nonnegative()
    .multipleOf(0.01, { message: "Up to 2 decimal place" }),
  fats: z.coerce
    .number()
    .nonnegative()
    .multipleOf(0.01, { message: "Up to 2 decimal place" }),

  carbs: z.coerce
    .number()
    .nonnegative()
    .multipleOf(0.01, { message: "Up to 2 decimal place" }),
  calories: z.coerce
    .number()
    .nonnegative()
    .multipleOf(0.01, { message: "Up to 2 decimal place" }),
  foodSize: z.coerce
    .number()
    .positive({ message: "food size can't be zero" })
    .int({ message: "Interger value only" }),
});

export type FoodInputSchema = z.infer<typeof foodInputSchema>;

export interface Record extends FoodInputSchema {
  id: string;
  createAt: Date;
}

export type Product = {
  _id: string;
  product_name: string;
  product_name_en: string;
  product_name_fr: string;
  image_small_url: string;
  product_quantity: string;
  nutriments: {
    carbohydrates_100g: string;
    fat_100g: string;
    proteins_100g: string;
    ["energy-kcal_100g"]: string;
  };
};

export type FetchedFoodData = {
  page_count: number;
  products: Product[];
};

export type ErrMsg = { error: string };
