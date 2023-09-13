import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { string, z } from "zod";

const SignupSchema = z.object({
  email: string().email(),
  password: string().min(6),
});

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const reqBody = await req.json();
    const { email, password } = SignupSchema.parse(reqBody);

    if (!email || !password)
      return NextResponse.json({ error: "Missing field(s)!" }, { status: 400 });
    // throw new Error("Missing field(s)!!");

    const emailExist = await prisma.user.findUnique({ where: { email } });
    if (emailExist)
      return NextResponse.json(
        { error: "Email already existed!" },
        { status: 409 }
      );
    // throw new Error("Email already existed!");
    // new NextResponse(JSON.stringify({ message: "Email already existed!" }), {
    //   status: 409,
    // });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    return NextResponse.json(newUser);
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json("Something went wrong!", {
      status: 500,
    });
  }
}
