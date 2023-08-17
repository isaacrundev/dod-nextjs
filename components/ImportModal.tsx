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
        Choose from food data
      </DialogTrigger>

      <DialogContent className="w-full overflow-auto h-5/6">
        <FoodData />
      </DialogContent>
    </Dialog>
  );
}
// <Dialog>
//   <DialogTrigger className="px-3 py-2 text-lg text-white bg-black rounded-lg">
//     Choose from food data
//   </DialogTrigger>
//   <DialogContent className="w-full h-2/3">
//     <DialogHeader>
//       <DialogTitle>Choose from food data</DialogTitle>
//       <DialogDescription>
//         This action cannot be undone. This will permanently delete your
//         account and remove your data from our servers.
//       </DialogDescription>
//     </DialogHeader>
//   </DialogContent>
// </Dialog>
