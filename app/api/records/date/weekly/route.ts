import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth-user";
import {
  serverErrorResponse,
  unauthorizedResponse,
} from "@/lib/api-response";
import { getLastNDaysStart } from "@/lib/date";
import { reportError } from "@/lib/error-report";

export async function GET(_req: Request) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return unauthorizedResponse();
    }

    const sevenDaysAgo = getLastNDaysStart(7);

    const res = await prisma.record.findMany({
      where: {
        userId,
        intakeDate: { gte: sevenDaysAgo },
      },
    });

    return NextResponse.json(res);
  } catch (error) {
    reportError(error, "records.date.weekly.GET");
    return serverErrorResponse();
  }
}
