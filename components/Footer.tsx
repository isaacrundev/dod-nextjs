import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex items-center justify-center h-32 bg-orange-400">
      <div className="flex gap-1">
        <p className="text-white ">Developed by</p>
        <Link href="https://portfolio-sigma-ten-72.vercel.app/">
          <p>Isaac Wu</p>
        </Link>
      </div>
    </div>
  );
}
