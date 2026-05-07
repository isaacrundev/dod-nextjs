import { FetchedFoodData, Product } from "@/app";

export function getProductName(item: Product) {
  return item.product_name_en || item.product_name || "(No Food Name Found)";
}

export function hasNextFoodSearchPage(searchData?: FetchedFoodData) {
  if (!searchData) return false;
  return searchData.page * searchData.page_size < searchData.count;
}

export function buildOpenFoodFactsSearchUrl(
  searchTerm: string,
  currentPage: number,
) {
  const encodedSearchTerm = encodeURIComponent(searchTerm.trim());
  return `https://world.openfoodfacts.org/cgi/search.pl?action=process&json=true&search_terms=${encodedSearchTerm}&page=${currentPage}`;
}
