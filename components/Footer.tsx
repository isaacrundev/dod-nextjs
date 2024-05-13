import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex h-20 flex-col items-center justify-center gap-3  bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] md:flex-row ">
      {/* <div className="flex flex-col items-center justify-center h-20 gap-3 bg-blue-400 bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] md:flex-row "> */}
      <div className="flex gap-1">
        <p className="text-xs ">Developed by</p>
        <Link href="https://portfolio-sigma-ten-72.vercel.app/" target="_blank">
          <p className="text-xs text-white">Isaac Wu</p>
        </Link>
      </div>{" "}
      <div className="hidden text-xs md:block">| </div>{" "}
      <div className="flex gap-1 text-xs">
        <p className="text-xs ">API provided by</p>
        <Link href="https://world.openfoodfacts.org/" target="_blank">
          <p className="text-white">Open Food Facts</p>
        </Link>
      </div>
    </div>
  );
}
