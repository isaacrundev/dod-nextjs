"use client";

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
import { useState } from "react";
import { PopoverClose } from "@radix-ui/react-popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LineChart from "@/components/LineChart";
import { formatDisplayDate, getTodayDate, normalizeCalendarDate } from "@/lib/date";

export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(getTodayDate());

  return (
    <div className="flex min-h-screen flex-col gap-8 p-4 md:flex-row md:gap-10 md:p-10">
      <Card className="md:basis-1/2">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Diet History</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart className="aspect-[16/9]" />
        </CardContent>
      </Card>
      <Card className="min-h-[400px] md:basis-1/2">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Daily Diet Records
          </CardTitle>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formatDisplayDate(selectedDate)}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                required
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(normalizeCalendarDate(date))}
                initialFocus
              />
              <div className="flex justify-center pb-3">
                <PopoverClose className="rounded-lg bg-primary px-5 py-2 text-white">
                  Apply
                </PopoverClose>
              </div>
            </PopoverContent>
          </Popover>
        </CardHeader>
        <CardContent>
          <HistoryTable selectedDate={selectedDate} />
        </CardContent>
      </Card>
    </div>
  );
}
