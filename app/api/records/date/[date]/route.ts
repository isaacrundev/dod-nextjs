import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(
  _req: Request,
  { params }: { params: { date: Date } },
) {
  !params.date &&
    NextResponse.json({ message: "Missing query string(s)" }, { status: 400 });

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const getUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    console.log(params.date);
    const toDatetime = new Date(params.date);
    toDatetime.setHours(toDatetime.getHours() + 24);
    const endDatetime = toDatetime.toISOString();
    console.log(endDatetime);

    const res = await prisma.record.findMany({
      where: {
        userId: getUser?.id,
        // intakeDate: date,
        AND: [
          {
            intakeDate: { gte: params.date },
          },
          { intakeDate: { lt: endDatetime } },
        ],
      },
    });

    return NextResponse.json(res);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
