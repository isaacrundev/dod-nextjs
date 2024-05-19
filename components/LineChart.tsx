"use client";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/huCtvLs8KLb
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { Datum, ResponsiveLine } from "@nivo/line";
import { useQuery } from "@tanstack/react-query";
import {
  ClassAttributes,
  HTMLAttributes,
  JSX,
  useEffect,
  useState,
} from "react";

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
  // Initialize an object to hold the sum of calories for each date
  const caloriesByDate: CaloriesByDate = {};

  data.forEach((each: DBData) => {
    // Convert intakeDate to local time and format as yyyy-mm-dd
    const date = new Date(each.intakeDate);
    const localDateString = date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
    });

    if (!caloriesByDate[localDateString]) {
      caloriesByDate[localDateString] = 0;
    }
    caloriesByDate[localDateString] += each.calories;
  });

  const processedData = Object.keys(caloriesByDate).map((date) => ({
    x: date,
    y: caloriesByDate[date],
  }));

  return processedData;
}

function getLast7Days() {
  const result = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const localDateString = date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
    });
    result.push(localDateString);
  }
  return result;
}

function formatDataForChart(processedData: Datum[]) {
  const last7Days = getLast7Days();
  return last7Days.map((date) => {
    const entry = processedData.find((d) => d.x === date);
    return {
      x: date,
      y: entry ? entry.y : 0,
    };
  });
}

const fetchWeekly = async () => {
  try {
    const res = await fetch("/api/records/date/weekly");
    return res.json();
  } catch (error) {
    console.error(error);
  }
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

  useEffect(() => {
    if (chartData) {
      console.log(chartData);
    }
  }, [chartData]);
  return (
    <>
      {chartData ? (
        <div {...props}>
          <ResponsiveLine
            enablePoints={false}
            data={[
              {
                id: "WeeklyCalData",
                data: chartData,
                //   [
                //     { x: "Jan", y: 60 },
                //     { x: "Feb", y: 48 },
                //     { x: "Mar", y: 177 },
                //     { x: "Apr", y: 78 },
                //     { x: "May", y: 96 },
                //     { x: "Jun", y: 204 },
                //     { x: "Jun", y: 204 },
                //   ],
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
      ) : null}
    </>
  );
}
