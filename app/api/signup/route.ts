import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";

const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password } = SignupSchema.parse(reqBody);

    const emailExist = await prisma.user.findUnique({ where: { email } });
    if (emailExist) {
      return NextResponse.json(
        { error: "Email already existed!" },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
      },
    });

    return NextResponse.json({ ok: true, user: newUser }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid signup input",
          fields: error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 },
    );
  }
}
