"use client";

import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FoodInputSchema } from "./FoodData";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { roundToSecondPlace } from "@/app/utils/utils";
import { Button } from "./ui/button";
import Link from "next/link";
import Loading from "@/app/loading";
import { useToast } from "@/hooks/use-toast";
import { getApiErrorMessage } from "@/lib/api-error";
import { getDateKey } from "@/lib/date";
import { reportError } from "@/lib/error-report";

interface Record extends FoodInputSchema {
  id: string;
  createAt: Date;
}

const tableHead = [
  "Name",
  "Protein",
  "Carbs",
  "Fats",
  "Calories",
  "Edit",
  "Delete",
];

const fetchHistory = async (dateKey: string) => {
  const res = await fetch(`/api/records/date/${dateKey}`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error(await getApiErrorMessage(res, "Failed to load records."));
  }

  return res.json();
};

export default function HistoryTable({
  selectedDate,
}: {
  selectedDate: Date | undefined;
}) {
  const [records, setRecords] = useState<Record[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!selectedDate) {
      setRecords([]);
      return;
    }

    let mounted = true;
    setIsLoading(true);

    fetchHistory(getDateKey(selectedDate))
      .then((data) => {
        if (mounted) setRecords(data);
      })
      .catch((error) => {
        reportError(error, "HistoryTable.fetchHistory");
        if (mounted) {
          setRecords([]);
          toast({
            description: "Unable to load records for this date.",
            variant: "destructive",
          });
        }
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [selectedDate, toast]);

  const handleDelete = async (id: string) => {
    setDeletingId(id);

    try {
      const res = await fetch(`/api/records/id/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        toast({
          description: await getApiErrorMessage(res, "Failed to delete record."),
          variant: "destructive",
        });
        return;
      }

      setRecords((current) => current.filter((record) => record.id !== id));
      toast({ description: "Record deleted successfully!" });
    } catch (error) {
      reportError(error, "HistoryTable.handleDelete");
      toast({
        description: "Unable to delete right now. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              {tableHead.map((label) => (
                <TableHead key={label}>{label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.length ? (
              records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.foodName}</TableCell>
                  <TableCell>{record.protein}</TableCell>
                  <TableCell>{record.carbs}</TableCell>
                  <TableCell>{record.fats}</TableCell>
                  <TableCell>{record.calories}</TableCell>
                  <TableCell>
                    <Button asChild variant="ghost" size="icon">
                      <Link
                        href={`/dashboard/edit/${record.id}`}
                        aria-label={`Edit ${record.foodName}`}
                      >
                        <FiEdit />
                      </Link>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Delete ${record.foodName}`}
                        >
                          <FiTrash2 />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Delete this record?</DialogTitle>
                          <DialogDescription>
                            This will remove {record.foodName} from your history.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-center gap-5">
                          <Button
                            variant="destructive"
                            onClick={() => handleDelete(record.id)}
                            disabled={deletingId === record.id}
                          >
                            {deletingId === record.id ? "Deleting..." : "Yes"}
                          </Button>
                          <DialogClose asChild>
                            <Button variant="secondary">No</Button>
                          </DialogClose>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={tableHead.length}>No Records</TableCell>
              </TableRow>
            )}
            {records.length ? (
              <TableRow>
                <TableCell className="font-bold">Total</TableCell>
                <TableCell className="font-bold">
                  {roundToSecondPlace(
                    records.reduce((acc, curr) => acc + curr.protein, 0),
                  )}
                </TableCell>
                <TableCell className="font-bold">
                  {roundToSecondPlace(
                    records.reduce((acc, curr) => acc + curr.carbs, 0),
                  )}
                </TableCell>
                <TableCell className="font-bold">
                  {roundToSecondPlace(
                    records.reduce((acc, curr) => acc + curr.fats, 0),
                  )}
                </TableCell>
                <TableCell className="font-bold">
                  {roundToSecondPlace(
                    records.reduce((acc, curr) => acc + curr.calories, 0),
                  )}
                </TableCell>
                <TableCell />
                <TableCell />
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      )}
    </>
  );
}
