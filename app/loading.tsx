import { BarLoader } from "react-spinners";

export default function Loading() {
  // return <p>Loading...</p>;
  return (
    <div className="absolute z-20 w-screen h-full transform -translate-x-1/2 -translate-y-1/2 opacity-80 top-1/2 left-1/2 bg-slate-500">
      <BarLoader
        height={20}
        width={150}
        color="#262E80"
        className="absolute z-50 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
      />
    </div>
  );
}
