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

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const response = await prisma.record.findUnique({
      where: { id: params.id },
    });

    return NextResponse.json(response);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const reqBody = await req.json();

    const { foodName, protein, fats, carbs, calories, foodSize, intakeDate } =
      foodDataRequestSchema.parse(reqBody);

    const getUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    const response = await prisma.record.update({
      where: { userId: getUser?.id, id: params.id },
      data: {
        id: params.id,
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

    return NextResponse.json(response);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    // const reqBody = await req.json();

    // const { foodName, protein, fats, carbs, calories, foodSize, intakeDate } =
    //   foodDataRequestSchema.parse(reqBody);

    const getUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    const response = await prisma.record.delete({
      where: { userId: getUser?.id, id: params.id },
    });

    return NextResponse.json(response);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
