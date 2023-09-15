export type Products = {
  _id: string;
  product_name: string;
  product_name_en: string;
  product_name_fr: string;
  image_small_url: string;
  nutrition_data_prepared_per: string;
  nutriments: {
    carbohydrates_100g: string;
    fat_100g: string;
    proteins_100g: string;
    ["energy-kcal_100g"]: string;
  };
};

export type FoodData = {
  page_count: number;
  products: Products[];
};

export type ErrMsg = { error: string };
