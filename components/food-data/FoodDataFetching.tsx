interface Props {
  searchTerm: string;
  currentPage: number;
}

const getFoodData = async (searchTerm: string, currentPage: number) => {
  try {
    const res = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?action=process&json=true&search_terms=${searchTerm}&page=${currentPage}`
    );
    return res.json();
  } catch (error) {
    console.log(error.message);
  }
};

export default async function FoodDataFetching({
  searchTerm,
  currentPage,
}: Props) {
  const data = await getFoodData(searchTerm, currentPage);
  return <div>FoodDataFetching</div>;
}
