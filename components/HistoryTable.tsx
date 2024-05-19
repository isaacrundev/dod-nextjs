"use client";

import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FoodInputSchema } from "./FoodData";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import useScreenSize from "@/app/utils/useScreenSize";
import { roundToSecondPlace } from "@/app/utils/utils";
import { Button } from "./ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import EditForm from "./EditForm";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";
import Loading from "@/app/loading";

interface Record extends FoodInputSchema {
  id: string;
  createAt: Date;
}

const tableHead = [
  { mobile: "Name", desktop: "Name" },
  { mobile: "P", desktop: "Protein" },
  { mobile: "C", desktop: "Carbs" },
  { mobile: "F", desktop: "Fats" },
  { mobile: "Cals", desktop: "Calories" },
  { mobile: "Edit", desktop: "Edit" },
  { mobile: "Delete", desktop: "Delete" },
];

const fetchHistory = async (date: string) => {
  try {
    const res = await fetch(`/api/records/date/${date}`, {
      method: "GET",
    });

    if (res.ok) {
      return res.json();
    } else {
      // setRecords([]);
      throw new Error(res.statusText);
    }
  } catch (error) {
    console.error(error);
  }
};
export default function HistoryTable({
  selectedDate,
}: {
  selectedDate: Date | undefined;
}) {
  const [records, setRecords] = useState<Record[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const screenSize = useScreenSize();

  useEffect(() => {
    setIsLoading(true);
    if (selectedDate) {
      fetchHistory(`${selectedDate.toISOString().slice(0, 13)}:00:00Z`)
        .then((data) => setRecords(data))
        .finally(() => setIsLoading(false));
    }
  }, [selectedDate]);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/records/id/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Record deleted successfully!!");
        // format(selectedDate, "YYYY-MM-DD");

        // fetchHistory(selectedDate.slice(0, 10));
      } else {
        alert("Something went wrong. Please try again later.");
        throw new Error(res.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   console.log(records);
  // }, [records]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              {/* {screenSize.width >= 768
                ? tableHead.map((i) => (
                    <TableHead key={i.desktop} suppressHydrationWarning>
                      {i.desktop}
                    </TableHead>
                  ))
                : tableHead.map((i) => (
                    <TableHead key={i.mobile} suppressHydrationWarning>
                      {i.mobile}
                    </TableHead>
                  ))} */}
              {tableHead.map((i) => (
                <TableHead key={i.desktop}>{i.desktop}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {isLoading && <p>Loading...</p>} */}
            {records?.length ? (
              records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.foodName}</TableCell>
                  <TableCell>{record.protein}</TableCell>
                  <TableCell>{record.carbs}</TableCell>
                  <TableCell>{record.fats}</TableCell>
                  <TableCell>{record.calories}</TableCell>
                  <TableCell>
                    <Link href={`/dashboard/edit/${record.id}`}>
                      <FiEdit />
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger>
                        <FiTrash2 />
                      </DialogTrigger>
                      <DialogContent>
                        <div className="flex flex-col items-center gap-6">
                          <p className="font-bold">
                            Do you want to delete this record?
                          </p>
                          <div>{record.foodName}</div>
                          <div className="flex justify-center gap-5">
                            <Button
                              asChild
                              className="bg-slate-500"
                              onClick={() => handleDelete(record.id)}
                            >
                              <DialogClose>Yes</DialogClose>
                            </Button>
                            <DialogClose>No</DialogClose>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>No Records</TableCell>
              </TableRow>
            )}
            {records?.length ? (
              <TableRow>
                <TableCell className="font-bold">Total</TableCell>
                <TableCell className="font-bold">
                  {roundToSecondPlace(
                    records!.reduce((acc, curr) => acc + curr.protein, 0),
                  )}
                </TableCell>
                <TableCell className="font-bold">
                  {roundToSecondPlace(
                    records!.reduce((acc, curr) => acc + curr.carbs, 0),
                  )}
                </TableCell>
                <TableCell className="font-bold">
                  {roundToSecondPlace(
                    records!.reduce((acc, curr) => acc + curr.fats, 0),
                  )}
                </TableCell>
                <TableCell className="font-bold">
                  {roundToSecondPlace(
                    records!.reduce((acc, curr) => acc + curr.calories, 0),
                  )}
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      )}
    </>
  );
}
