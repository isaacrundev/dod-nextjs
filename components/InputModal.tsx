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

export default function InputModal() {
  return (
    <Dialog>
      <DialogTrigger className="px-3 py-2 text-white bg-black rounded-lg text-md">
        Input food data by your own
      </DialogTrigger>
      <DialogContent className="overflow-auto h-5/6">
        <AddNewInputForm />
      </DialogContent>
    </Dialog>
  );
}
