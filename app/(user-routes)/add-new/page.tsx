"use client";

import AddNewModal from "@/components/ImportModal";
import InputModal from "@/components/InputModal";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AddNewPage() {
  return (
    <div className="container h-screen">
      <div>
        <p className="text-lg font-bold text-center ">Add New</p>
      </div>
      <div className="flex flex-col items-center justify-center pt-20 space-y-3 ">
        <p>Option 1:</p>
        <InputModal />
        <p>Option 2:</p>
        {/* <AddNewModal /> */}
        <Button className="px-3 py-2 text-white rounded-lg bg-primary text-md">
          <Link href="/add-new/from-food-data">
            Choose from Open Food Facts
          </Link>
        </Button>
      </div>
    </div>
  );
}
