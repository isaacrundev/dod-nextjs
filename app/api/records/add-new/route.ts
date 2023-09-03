import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { authOptions } from "../../auth/[...nextauth]/route";

export const foodDataRequestSchema = z.object({
  foodName: z.string().min(3, { message: "Minimum length of Food Name is 3" }),
  protein: z.coerce
    .number()
    .nonnegative()
    .multipleOf(0.01, { message: "Maximum 2 decimal place only" }),
  fats: z.coerce
    .number()
    .nonnegative()
    .multipleOf(0.01, { message: "Maximum 2 decimal place only" }),

  carbs: z.coerce
    .number()
    .nonnegative()
    .multipleOf(0.01, { message: "Maximum 2 decimal place only" }),
  calories: z.coerce
    .number()
    .nonnegative()
    .multipleOf(0.01, { message: "Maximum 2 decimal place only" }),
  foodSize: z.coerce
    .number()
    .positive()
    .int({ message: "Interger value only" }),
  intakeDate: z.coerce
    .string()
    .refine((str) => str.length === 10, {
      message: `Invalid "inTakeDate" length`,
    })
    .refine((str) => str[2] === "-" && str[5] === "-", {
      message: `Invalid "inTakeDate" format`,
    }),
  // .refine(
  //   (str) => {
  //     +str.slice(0, 2) <= 12;
  //   },
  //   { message: `Month error` }
  // )
  // .refine(
  //   (str) => {
  //     +str.slice(3, 5) <= 31;
  //   },
  //   { message: `Day error` }
  // ),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const reqBody = await req.json();

    const { foodName, protein, fats, carbs, calories, foodSize, intakeDate } =
      foodDataRequestSchema.parse(reqBody);

    // const { foodName, protein, fats, carbs, calories, foodSize, intakeTime } =
    //   reqBody;

    const getUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    const newRecord = await prisma.record.create({
      data: {
        foodName,
        protein,
        fats,
        carbs,
        calories,
        foodSize,
        userId: getUser!.id,
        intakeDate,
      },
    });

    return NextResponse.json(newRecord);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
