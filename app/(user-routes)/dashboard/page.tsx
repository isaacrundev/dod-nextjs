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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LineChart from "@/components/LineChart";

export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState<Date>();

  useEffect(() => {
    setSelectedDate(new Date());
  }, []);

  return (
    <div className="flex flex-col min-h-screen gap-8 p-4 md:flex-row md:gap-10 md:p-10">
      <Card className="md:basis-1/2">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Diet History</CardTitle>
          {/* <BarChartIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" /> */}
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
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="w-4 h-4 mr-2" />
                {selectedDate && format(selectedDate, "MM/dd/yyyy")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                required
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
        </CardHeader>
        <CardContent>
          <HistoryTable selectedDate={selectedDate} />
        </CardContent>
      </Card>
    </div>
    // <div className="flex flex-col mx-auto basis-full md:max-w-2xl">
    //   <div className="py-4">
    //     <Popover>
    //       <PopoverTrigger asChild>
    //         <Button
    //           variant={"outline"}
    //           className={cn(
    //             "w-[280px] justify-start text-left font-normal",
    //             !selectedDate && "text-muted-foreground",
    //           )}
    //         >
    //           <CalendarIcon className="w-4 h-4 mr-2" />
    //           {selectedDate && format(selectedDate, "MM/dd/yyyy")}
    //         </Button>
    //       </PopoverTrigger>
    //       <PopoverContent className="w-auto p-0">
    //         <Calendar
    //           required
    //           mode="single"
    //           selected={selectedDate}
    //           onSelect={setSelectedDate}
    //           initialFocus
    //         />
    //         <div className="flex justify-center pb-3">
    //           <PopoverClose className="px-5 py-2 text-white rounded-lg bg-primary">
    //             Apply
    //           </PopoverClose>
    //         </div>
    //       </PopoverContent>
    //     </Popover>
    //   </div>
    //   <HistoryTable selectedDate={selectedDate} />
    // </div>
  );
}
