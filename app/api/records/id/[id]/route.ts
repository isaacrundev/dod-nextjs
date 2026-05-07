import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth-user";
import {
  notFoundResponse,
  serverErrorResponse,
  unauthorizedResponse,
  validationErrorResponse,
} from "@/lib/api-response";
import {
  buildRecordUpdateData,
  foodDataRequestSchema,
  recordIdParamsSchema,
} from "@/lib/records";
import { reportError } from "@/lib/error-report";

async function parseIdParams(context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  return recordIdParamsSchema.parse(params);
}

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await parseIdParams(context);
    const userId = await getCurrentUserId();
    if (!userId) {
      return unauthorizedResponse();
    }

    const record = await prisma.record.findFirst({
      where: { id, userId },
    });

    if (!record) {
      return notFoundResponse("Record not found");
    }

    return NextResponse.json(record);
  } catch (error) {
    if (error instanceof z.ZodError) return validationErrorResponse(error);
    reportError(error, "records.id.GET");
    return serverErrorResponse();
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await parseIdParams(context);
    const userId = await getCurrentUserId();
    if (!userId) {
      return unauthorizedResponse();
    }

    const existingRecord = await prisma.record.findFirst({
      where: { id, userId },
      select: { id: true },
    });

    if (!existingRecord) {
      return notFoundResponse("Record not found");
    }

    const reqBody = await req.json();
    const recordInput = foodDataRequestSchema.parse(reqBody);

    const response = await prisma.record.update({
      where: { id },
      data: buildRecordUpdateData(recordInput),
    });

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof z.ZodError) return validationErrorResponse(error);
    reportError(error, "records.id.PUT");
    return serverErrorResponse();
  }
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await parseIdParams(context);
    const userId = await getCurrentUserId();
    if (!userId) {
      return unauthorizedResponse();
    }

    const existingRecord = await prisma.record.findFirst({
      where: { id, userId },
      select: { id: true },
    });

    if (!existingRecord) {
      return notFoundResponse("Record not found");
    }

    const response = await prisma.record.delete({
      where: { id },
    });

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof z.ZodError) return validationErrorResponse(error);
    reportError(error, "records.id.DELETE");
    return serverErrorResponse();
  }
}
