"use client";

import { Datum, ResponsiveLine } from "@nivo/line";
import { useQuery } from "@tanstack/react-query";
import { ClassAttributes, HTMLAttributes, JSX, useEffect, useState } from "react";
import { getApiErrorMessage } from "@/lib/api-error";
import { formatMonthDay, getDateKey, getLastNDateKeys } from "@/lib/date";

type DBData = {
  id: string;
  foodName: string;
  carbs: number;
  protein: number;
  fats: number;
  calories: number;
  foodSize: number;
  createAt: Date;
  updateAt: Date;
  userId: string;
  intakeDate: Date;
};

type CaloriesByDate = {
  [key: string]: number;
};

function processCaloriesData(data: DBData[]) {
  const caloriesByDate: CaloriesByDate = {};

  data.forEach((each: DBData) => {
    const dateKey = getDateKey(each.intakeDate);

    if (!caloriesByDate[dateKey]) {
      caloriesByDate[dateKey] = 0;
    }
    caloriesByDate[dateKey] += each.calories;
  });

  return Object.keys(caloriesByDate).map((dateKey) => ({
    x: dateKey,
    y: caloriesByDate[dateKey],
  }));
}

function formatDataForChart(processedData: Datum[]) {
  const last7Days = getLastNDateKeys(7);

  return last7Days.map((dateKey) => {
    const entry = processedData.find((d) => d.x === dateKey);
    return {
      x: formatMonthDay(dateKey),
      y: entry ? entry.y : 0,
    };
  });
}

const fetchWeekly = async () => {
  const res = await fetch("/api/records/date/weekly");

  if (!res.ok) {
    throw new Error(await getApiErrorMessage(res, "Failed to load weekly chart data."));
  }

  return res.json();
};

export default function LineChart(
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLDivElement> &
    HTMLAttributes<HTMLDivElement>,
) {
  const [chartData, setChartData] = useState<Datum[]>();
  const { data: weeklyData } = useQuery({
    queryKey: ["getWeekly"],
    queryFn: fetchWeekly,
  });

  useEffect(() => {
    if (weeklyData) {
      const processedData = processCaloriesData(weeklyData);
      const formattedData = formatDataForChart(processedData);
      setChartData(formattedData);
    }
  }, [weeklyData]);

  return chartData ? (
    <div {...props}>
      <ResponsiveLine
        enablePoints={false}
        data={[
          {
            id: "WeeklyCalData",
            data: chartData,
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#e11d48"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  ) : null;
}
