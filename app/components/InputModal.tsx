"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import AddNewInputForm from "./AddNewInputForm";
import AddNewRecordForm from "./AddNewRecordForm";

export default function InputModal() {
  return (
    <Dialog>
      <DialogTrigger className="text-md rounded-lg bg-primary px-3 py-2 text-white">
        Input by your own
      </DialogTrigger>
      <DialogContent className="h-5/6 overflow-auto">
        {/* <AddNewInputForm /> */}
        <AddNewRecordForm item={null} />
      </DialogContent>
    </Dialog>
  );
}
