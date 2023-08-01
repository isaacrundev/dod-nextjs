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
import { useSession } from "next-auth/react";
import Unauthenticated from "@/components/Unauthenticated";

type Props = {};

export default function DashboardPage({}: Props) {
  const { data: session } = useSession();
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    setDate(new Date());
  }, []);

  if (!session) {
    return <Unauthenticated />;
  }

  return (
    <div className="flex flex-col justify-center ">
      {/* <p className="py-5 text-xl text-center">
          {date.getMonth() + 1}/{date.getDate()}
        </p> */}
      <div className="py-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="w-4 h-4 mr-2" />
              {date && format(date, "PPP")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
            <div className="flex justify-center pb-3">
              <Button>Apply</Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <HistoryTable />
    </div>
  );
}
