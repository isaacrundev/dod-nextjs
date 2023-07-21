import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { number, string, z } from "zod";

const SignupSchema = z.object({
  protein: number(),
  fats: number(),
  carbs: number(),
  calories: number(),
});

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password } = SignupSchema.parse(reqBody);

    if (!email || !password) {
      return new NextResponse(`Missing field(s)!!`, {
        status: 400,
      });
    }

    const emailExist = await prisma.user.findUnique({ where: { email } });
    if (emailExist)
      return new NextResponse("Email already exists", { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    return NextResponse.json(newUser);
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
