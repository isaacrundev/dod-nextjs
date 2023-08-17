"use client";

import AddNewModal from "@/components/ImportModal";
import InputModal from "@/components/InputModal";

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
        <AddNewModal />
      </div>
    </div>
  );
}
