import { Product } from "@/app";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  product_name: "",
  product_name_en: "",
  product_name_fr: "",
  image_small_url: "",
  product_quantity: "",
  nutriments: {
    carbohydrates_100g: "",
    fat_100g: "",
    proteins_100g: "",
    ["energy-kcal_100g"]: "",
  },
};

const importedFood = createSlice({
  name: "foodData",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Product>) => {
      return (state = action.payload);
    },
    initialize: (state) => {
      return (state = initialState);
    },
  },
});

export const { add, initialize } = importedFood.actions;

export default importedFood.reducer;
