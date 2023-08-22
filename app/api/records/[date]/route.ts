import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(
  _req: Request,
  { params }: { params: { date: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    !params.date &&
      NextResponse.json({ message: "Missing query strings" }, { status: 400 });

    const getUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    const res = await prisma.record.findMany({
      where: { userId: getUser?.id, createAt: params.date },
    });

    return NextResponse.json(res);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
