import { Button } from "@/components/ui/button";

type Props = {};

export default function AddNewPage({}: Props) {
  return (
    <div>
      <p className="text-lg ">Add New</p>
      <Button>Choose from food data</Button>
      <p className=" text-md">Or...</p>
    </div>
  );
}
