import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { z } from "zod";

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
  intakeDate: z.coerce.string().datetime(),
});

const paramsSchema = z.object({
  id: z.string().uuid(),
});

async function getCurrentUserId() {
  const session = await auth();
  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  return user?.id ?? null;
}

function validationError(error: z.ZodError) {
  return NextResponse.json(
    { error: "Invalid request", fields: error.flatten().fieldErrors },
    { status: 400 },
  );
}

function serverError() {
  return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
}

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = paramsSchema.parse(params);
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const record = await prisma.record.findFirst({
      where: { id, userId },
    });

    if (!record) {
      return NextResponse.json({ message: "Record not found" }, { status: 404 });
    }

    return NextResponse.json(record);
  } catch (error) {
    if (error instanceof z.ZodError) return validationError(error);
    console.error(error);
    return serverError();
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = paramsSchema.parse(params);
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const existingRecord = await prisma.record.findFirst({
      where: { id, userId },
      select: { id: true },
    });

    if (!existingRecord) {
      return NextResponse.json({ message: "Record not found" }, { status: 404 });
    }

    const reqBody = await req.json();
    const { foodName, protein, fats, carbs, calories, foodSize, intakeDate } =
      foodDataRequestSchema.parse(reqBody);

    const response = await prisma.record.update({
      where: { id },
      data: {
        foodName,
        protein,
        fats,
        carbs,
        calories,
        foodSize,
        intakeDate,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof z.ZodError) return validationError(error);
    console.error(error);
    return serverError();
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = paramsSchema.parse(params);
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const existingRecord = await prisma.record.findFirst({
      where: { id, userId },
      select: { id: true },
    });

    if (!existingRecord) {
      return NextResponse.json({ message: "Record not found" }, { status: 404 });
    }

    const response = await prisma.record.delete({
      where: { id },
    });

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof z.ZodError) return validationError(error);
    console.error(error);
    return serverError();
  }
}
