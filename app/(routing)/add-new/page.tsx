"use client";

import AddNewForm from "@/components/AddNewForm";
import AddNewModal from "@/components/AddNewModal";
import { Button } from "@/components/ui/button";

type Props = {};

export default function AddNewPage({}: Props) {
  return (
    <div className="container">
      <div className="flex flex-col items-center justify-center space-y-3">
        <div>
          <p className="text-lg">Add New</p>
        </div>
        <p>Input Food Data</p>
        <AddNewForm /> <p className="text-center text-md">Or...</p>
        <div>
          <AddNewModal />
        </div>
      </div>
    </div>
  );
}
