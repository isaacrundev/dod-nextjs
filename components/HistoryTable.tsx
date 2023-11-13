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
import { Button } from "react-day-picker";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import useScreenSize from "@/app/utils/useScreenSize";
import { roundToSecondPlace } from "@/app/utils/utils";

interface Record extends FoodInputSchema {
  id: string;
  createAt: Date;
}

// const getSum = (total: number, number: number) => total + number;

export default function HistoryTable({
  selectedDate,
}: {
  selectedDate: string;
}) {
  const [records, setRecords] = useState<Record[] | null>([]);
  const screenSize = useScreenSize();

  const fetchHistory = async (date: string) => {
    try {
      const res = await fetch(`/api/records/date/${date}`, {
        method: "GET",
      });

      !res.ok && setRecords(null);
      setRecords(await res.json());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHistory(selectedDate);
  }, [selectedDate]);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>{screenSize.width >= 768 ? "Protein" : "P"}</TableHead>
            <TableHead>{screenSize.width >= 768 ? "Carbs" : "C"}</TableHead>
            <TableHead>{screenSize.width >= 768 ? "Fats" : "F"}</TableHead>
            <TableHead>
              {screenSize.width >= 768 ? "Calories" : "Cals"}
            </TableHead>
            {/* <TableHead>Remove</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {records &&
            records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.foodName}</TableCell>
                <TableCell>{record.protein}</TableCell>
                <TableCell>{record.carbs}</TableCell>
                <TableCell>{record.fats}</TableCell>
                <TableCell>{record.calories}</TableCell>
                {/* <TableCell>
                  <Dialog>
                    <DialogTrigger>
                      <FiTrash2 />
                    </DialogTrigger>
                    <DialogContent className="overflow-auto h-5/6"></DialogContent>
                  </Dialog>
                </TableCell> */}
              </TableRow>
            ))}
          {records?.length !== 0 && (
            <TableRow>
              <TableCell className="font-bold">Total</TableCell>
              <TableCell className="font-bold">
                {roundToSecondPlace(
                  records!.reduce((acc, curr) => acc + curr.protein, 0)
                )}
              </TableCell>
              <TableCell className="font-bold">
                {roundToSecondPlace(
                  records!.reduce((acc, curr) => acc + curr.carbs, 0)
                )}
              </TableCell>
              <TableCell className="font-bold">
                {roundToSecondPlace(
                  records!.reduce((acc, curr) => acc + curr.fats, 0)
                )}
              </TableCell>
              <TableCell className="font-bold">
                {roundToSecondPlace(
                  records!.reduce((acc, curr) => acc + curr.calories, 0)
                )}
              </TableCell>
            </TableRow>
          )}
          {records?.length === 0 && (
            <TableRow key="no-records">
              <TableCell>No Records</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
