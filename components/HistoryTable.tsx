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

// const getSum = (total: number, number: number) => total + number;

export default function HistoryTable({
  selectedDate,
}: {
  selectedDate: string;
}) {
  const [records, setRecords] = useState<Record[] | null>([]);

  const fetchHistory = async (date: string) => {
    try {
      const res = await fetch(`/api/records/${date}`, {
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
            <TableHead>P</TableHead>
            <TableHead>C</TableHead>
            <TableHead>F</TableHead>
            <TableHead>Cals</TableHead>
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
              </TableRow>
            ))}
          {records?.length !== 0 && (
            <TableRow>
              <TableCell className="font-bold">Total</TableCell>
              <TableCell className="font-bold">
                {records?.reduce((acc, curr) => acc + curr.protein, 0)}
              </TableCell>
              <TableCell className="font-bold">
                {records?.reduce((acc, curr) => acc + curr.carbs, 0)}
              </TableCell>
              <TableCell className="font-bold">
                {records?.reduce((acc, curr) => acc + curr.fats, 0)}
              </TableCell>
              <TableCell className="font-bold">
                {records?.reduce((acc, curr) => acc + curr.calories, 0)}
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
