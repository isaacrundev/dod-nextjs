import AddNewForm from "@/components/AddNewForm";
import { Button } from "@/components/ui/button";

type Props = {};

export default function AddNewPage({}: Props) {
  return (
    <div className="container flex justify-center">
      <div className="space-y-3 ">
        <p className="text-lg text-center">Add New</p>
        <div>
          <Button>Choose from food data</Button>
        </div>
        <p className="text-center text-md">Or...</p>
        <p className="text-center">Custom Your Food Data</p>
        <AddNewForm />
      </div>
    </div>
  );
}
