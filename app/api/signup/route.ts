import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { string, z } from "zod";

const SignupSchema = z.object({
  email: string().email(),
  password: string().min(6),
});

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const { email, password } = SignupSchema.parse(reqBody);

  if (!email || !password) {
    return new NextResponse(`Missing field(s)!!`, {
      status: 400,
    });
  }

  const emailExist = await prisma.user.findUnique({ where: { email } });
  if (emailExist) throw new Error("Email already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
  return NextResponse.json(newUser);
}
