"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

export default function AddNewModal() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Choose from food data</Button>
      </DialogTrigger>
      <DialogContent className="w-full h-2/3">
        <DialogHeader>
          <DialogTitle>Choose from food data</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
