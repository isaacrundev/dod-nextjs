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
    .multipleOf(0.1, { message: "1 decimal place only" }),
  fats: z.coerce
    .number()
    .nonnegative()
    .multipleOf(0.1, { message: "1 decimal place only" }),

  carbs: z.coerce
    .number()
    .nonnegative()
    .multipleOf(0.1, { message: "1 decimal place only" }),
  calories: z.coerce
    .number()
    .nonnegative()
    .multipleOf(0.1, { message: "1 decimal place only" }),
  foodSize: z.coerce
    .number()
    .positive()
    .int({ message: "Interger value only" }),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const reqBody = await req.json();

    // const { foodName, protein, fats, carbs, calories, foodSize } =
    //   foodDataRequestSchema.parse(reqBody);
    // zod validation doesn't work

    const { foodName, protein, fats, carbs, calories, foodSize } = reqBody;

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
      },
    });

    return NextResponse.json(newRecord);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
