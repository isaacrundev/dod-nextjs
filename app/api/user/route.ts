import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";
import { NextResponse } from "next/server";

interface ReqBody {
  email: string;
  password: string;
}

const newUser = async (res: Request) => {
  try {
    const body: ReqBody = await res.json();
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: await bcrypt.hash(body.password, 10),
      },
    });
    const { password, ...result } = user;

    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

export default newUser;
