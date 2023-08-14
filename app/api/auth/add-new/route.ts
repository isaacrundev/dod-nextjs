import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { number, string, z } from "zod";

const InputFoodDataSchema = z.object({
  foodName: string().min(3),
  protein: number(),
  fats: number(),
  carbs: number(),
  calories: number(),
  size: number(),
  email: string().email(),
});

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { foodName, protein, fats, carbs, calories, size, email } =
      InputFoodDataSchema.parse(reqBody);

    if (!foodName || !protein || !fats || !carbs || !calories || !email) {
      return new NextResponse(`Missing field(s)`, {
        status: 400,
      });
    }

    // const userId = await prisma.user.findUnique({ where: { email } });

    const newRecord = await prisma.record.create({
      data: {
        foodName,
        protein,
        fats,
        carbs,
        calories,
        userId,
      },
    });
    return NextResponse.json(newRecord);
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
