"use client";

import AddNewModal from "@/app/components/ImportModal";
import InputModal from "@/app/components/InputModal";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";

export default function AddNewPage() {
  return (
    <div className="container h-screen">
      <div>
        <p className="text-center text-lg font-bold ">Add New</p>
      </div>
      <div className="flex flex-col items-center justify-center space-y-3 pt-20 ">
        <p>Option 1:</p>
        <InputModal />
        <p>Option 2:</p>
        <Button className="md:text-md rounded-lg bg-primary px-3 py-2 text-sm text-white">
          <Link href="/add-new/from-food-data">
            Choose from Open Food Facts
          </Link>
        </Button>
      </div>
    </div>
  );
}
