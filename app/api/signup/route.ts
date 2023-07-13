import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    if (!email || !password) {
      return new NextResponse(`Missing field(s)!!`, {
        status: 400,
      });
    }

    const emailExist = await prisma.user.findUnique({ where: { email } });
    if (emailExist) throw new Error("Email already exists");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });
    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
