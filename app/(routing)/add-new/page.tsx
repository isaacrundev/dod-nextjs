"use client";

import AddNewForm from "@/components/AddNewInputForm";
import AddNewModal from "@/components/ImportModal";
import InputModal from "@/components/InputModal";
import Unauthenticated from "@/components/Unauthenticated";
import { useSession } from "next-auth/react";

export default function AddNewPage() {
  const { data: session } = useSession();

  if (!session) {
    return <Unauthenticated />;
  }

  return (
    <div className="container h-screen">
      <div>
        <p className="pb-10 text-lg font-bold text-center ">Add New</p>
      </div>
      <div className="flex flex-col items-center justify-center space-y-3">
        <p>Option 1:</p>
        <InputModal />
        <p>Option 2:</p>
        <p>Import from Open Food Facts database</p>
        <AddNewModal />
      </div>
    </div>
  );
}
