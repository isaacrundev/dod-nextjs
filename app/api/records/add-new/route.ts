import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { number, string, z } from "zod";
import { authOptions } from "../../auth/[...nextauth]/route";

export const foodDataRequestSchema = z.object({
  foodName: string().min(3),
  protein: number(),
  fats: number(),
  carbs: number(),
  calories: number(),
  size: number(),
  email: string().email(),
  foodSize: number(),
});

export async function POST(req: Request) {
  try {
    // const session = await getServerSession(authOptions);
    // !session &&
    //   NextResponse.json({ status: 401, error: "You're not logged in" });

    const reqBody = await req.json();

    const { foodName, protein, fats, carbs, calories, foodSize, email } =
      foodDataRequestSchema.parse(reqBody);

    if (
      !foodName ||
      !protein ||
      !fats ||
      !carbs ||
      !calories ||
      !foodSize ||
      !email
    ) {
      return NextResponse.json({
        error: "Missing field(s)",
        status: 400,
      });
    }

    const getUser = await prisma.user.findUnique({ where: { email } });

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
    return NextResponse.json({ message: error, success: false });
  }
}
