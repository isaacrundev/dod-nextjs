"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import HistoryTable from "@/components/HistoryTable";
import { useEffect, useState } from "react";
import { PopoverClose } from "@radix-ui/react-popover";

export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  const mmddyyyy = format(selectedDate!, "MM-dd-yyyy");

  return (
    <div className="flex flex-col justify-center ">
      <div className="py-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !selectedDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="w-4 h-4 mr-2" />
              {selectedDate && mmddyyyy}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
            />
            <div className="flex justify-center pb-3">
              <PopoverClose className="px-5 py-2 text-white rounded-lg bg-primary">
                Apply
              </PopoverClose>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <HistoryTable selectedDate={mmddyyyy!} />
    </div>
  );
}
