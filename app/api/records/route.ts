import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const getUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    const res = await prisma.record.findMany({
      where: { userId: getUser?.id },
    });

    return NextResponse.json(res);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
