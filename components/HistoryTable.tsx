"use client";

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
import { useEffect, useState } from "react";

interface Record extends FoodInputSchema {
  id: string;
  createAt: Date;
}

export default function HistoryTable({
  selectedDate,
}: {
  selectedDate: string;
}) {
  const [records, setRecords] = useState<Record[] | null>();

  const fetchHistory = async (date: string) => {
    try {
      const res = await fetch(`/api/records/${date}`, {
        method: "GET",
      });
      res.status === 200 ? setRecords(await res.json()) : setRecords(null);
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
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>Food Name</TableHead>
            <TableHead>Calories</TableHead>
            {/* <TableHead>Carbs (g)</TableHead>
            <TableHead>Fats (g)</TableHead>
            <TableHead>Protein (g)</TableHead> */}
            {/* <TableHead>Size (g)</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* <TableCell>Sample junk food</TableCell>
            <TableCell>256</TableCell> */}
          {records ? (
            records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.foodName}</TableCell>
                <TableCell>{record.calories}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow key="no-records">
              <TableCell>No Records</TableCell>
            </TableRow>
          )}

          {/* <TableCell>20</TableCell>
            <TableCell>40</TableCell>
            <TableCell>300</TableCell> */}
        </TableBody>
      </Table>
    </>
  );
}
