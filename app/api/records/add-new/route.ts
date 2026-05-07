import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth-user";
import {
  serverErrorResponse,
  unauthorizedResponse,
  validationErrorResponse,
} from "@/lib/api-response";
import { buildRecordCreateData, foodDataRequestSchema } from "@/lib/records";
import { reportError } from "@/lib/error-report";

export async function POST(req: Request) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return unauthorizedResponse();
    }

    const reqBody = await req.json();
    const recordInput = foodDataRequestSchema.parse(reqBody);

    const newRecord = await prisma.record.create({
      data: buildRecordCreateData(recordInput, userId),
    });

    return NextResponse.json(newRecord, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return validationErrorResponse(error);
    }

    reportError(error, "records.add-new.POST");
    return serverErrorResponse();
  }
}
