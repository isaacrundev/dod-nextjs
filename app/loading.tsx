import { BarLoader } from "react-spinners";

export default function Loading() {
  // return <p>Loading...</p>;
  return (
    <div className="flex flex-col items-center justify-center gap-4 pt-24">
      <p>Loading...</p>
      <BarLoader height={20} width={150} color="#262E80" />
    </div>
  );
}
