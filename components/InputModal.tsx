"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddNewInputForm from "./AddNewInputForm";
import AddNewRecordForm from "./AddNewRecordForm";

export default function InputModal() {
  return (
    <Dialog>
      <DialogTrigger className="px-3 py-2 text-white rounded-lg bg-primary text-md">
        Input by your own
      </DialogTrigger>
      <DialogContent className="overflow-auto h-5/6">
        {/* <AddNewInputForm /> */}
        <AddNewRecordForm item={null} />
      </DialogContent>
    </Dialog>
  );
}
