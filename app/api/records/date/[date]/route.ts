import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth-user";
import {
  serverErrorResponse,
  unauthorizedResponse,
  validationErrorResponse,
} from "@/lib/api-response";
import { DATE_KEY_FORMAT, getDayRange } from "@/lib/date";
import { reportError } from "@/lib/error-report";

const paramsSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: `Use ${DATE_KEY_FORMAT} format`,
  }),
});

export async function GET(
  _req: Request,
  context: { params: Promise<{ date: string }> },
) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return unauthorizedResponse();
    }

    const params = await context.params;
    const { date } = paramsSchema.parse(params);
    const { start, end } = getDayRange(date);

    const res = await prisma.record.findMany({
      where: {
        userId,
        AND: [
          {
            intakeDate: { gte: start },
          },
          { intakeDate: { lt: end } },
        ],
      },
    });

    return NextResponse.json(res);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return validationErrorResponse(error);
    }

    reportError(error, "records.date.GET");
    return serverErrorResponse();
  }
}
