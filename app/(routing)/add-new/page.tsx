"use client";

import AddNewForm from "@/components/AddNewForm";
import AddNewModal from "@/components/AddNewModal";
import Unauthenticated from "@/components/Unauthenticated";
import { useSession } from "next-auth/react";

export default function AddNewPage() {
  const { data: session } = useSession();

  if (!session) {
    return <Unauthenticated />;
  }

  return (
    <div className="container">
      <div className="flex flex-col items-center justify-center space-y-3">
        <div>
          <p className="text-lg font-bold">Add New</p>
        </div>
        <p>Option 1: Input food data by yourself</p>
        <AddNewForm />
        <p className="text-center text-md">Or...</p>
        <div>
          <AddNewModal />
        </div>
      </div>
    </div>
  );
}
