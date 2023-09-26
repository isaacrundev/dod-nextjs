"use client";

import Link from "next/link";
import Image from "next/image";
import unauthorized1 from "@/public/img/unauthorized/43g3g3g.jpg";
import unauthorized2 from "@/public/img/unauthorized/7ugzku.jpg";
import unauthorized3 from "@/public/img/unauthorized/7ugzs0.jpg";
import unauthorized4 from "@/public/img/unauthorized/7ugzv5.jpg";
import unauthorized5 from "@/public/img/unauthorized/7uh08e.jpg";
import speechless from "@/public/img/speechless.png";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const imgArr = [
  unauthorized1,
  unauthorized2,
  unauthorized3,
  unauthorized4,
  unauthorized5,
];

const draw = () => {
  return Math.floor(Math.random() * imgArr.length);
};

const UnauthenticatedPage = () => {
  return (
    <>
      <div className="pt-8 space-y-5 text-center">
        {/* <Image src={speechless} alt="speechless" /> */}
        <div className="flex justify-center">
          <Image src={imgArr[draw()]} height={400} alt="unauthorized-image" />
        </div>
        <p className="text-xl font-bold">
          You&apos;re unauthorized to visit this page.
        </p>
        <Button>
          <Link href="/">Back to the top</Link>
        </Button>
      </div>
    </>
  );
};

export default UnauthenticatedPage;
