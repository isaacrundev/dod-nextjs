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
