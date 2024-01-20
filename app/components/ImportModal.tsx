"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import FoodData from "./FoodData";

export default function ImportModal() {
  return (
    <Dialog>
      <DialogTrigger className="text-md rounded-lg bg-primary px-3 py-2 text-white">
        Choose from Open Food Facts
      </DialogTrigger>

      <DialogContent className="h-5/6 w-full content-start overflow-auto">
        <FoodData />
      </DialogContent>
    </Dialog>
  );
}
