"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FoodData from "./FoodData";

export default function ImportModal() {
  return (
    <Dialog>
      <DialogTrigger className="px-3 py-2 text-white rounded-lg bg-primary text-md">
        Choose from Open Food Facts
      </DialogTrigger>

      <DialogContent className="content-start w-full overflow-auto h-5/6">
        <FoodData />
      </DialogContent>
    </Dialog>
  );
}
