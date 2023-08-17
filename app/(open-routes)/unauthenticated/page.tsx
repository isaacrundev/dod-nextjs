"use client";

import Link from "next/link";
import Image from "next/image";
import speechless from "@/public/img/speechless.png";
import { Button } from "@/components/ui/button";
const UnauthenticatedPage = () => {
  return (
    <>
      <div className="pt-8 space-y-10 text-center">
        <Image src={speechless} alt="speechless" />
        <p>You&apos;re unauthorized to visit this page.</p>
        <Button>
          <Link href="/">Back to the top</Link>
        </Button>
      </div>
    </>
  );
};

export default UnauthenticatedPage;
