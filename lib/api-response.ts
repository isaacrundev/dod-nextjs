import { NextResponse } from "next/server";
import { z } from "zod";

export function errorResponse(
  status: number,
  code: string,
  message: string,
  fields?: Record<string, string[] | undefined>,
) {
  return NextResponse.json(
    {
      error: {
        code,
        message,
        ...(fields ? { fields } : {}),
      },
    },
    { status },
  );
}

export function validationErrorResponse(error: z.ZodError) {
  return errorResponse(
    400,
    "VALIDATION_ERROR",
    "Invalid request input",
    error.flatten().fieldErrors,
  );
}

export function unauthorizedResponse() {
  return errorResponse(401, "UNAUTHORIZED", "Unauthorized");
}

export function notFoundResponse(message = "Resource not found") {
  return errorResponse(404, "NOT_FOUND", message);
}

export function conflictResponse(message: string) {
  return errorResponse(409, "CONFLICT", message);
}

export function serverErrorResponse() {
  return errorResponse(500, "INTERNAL_SERVER_ERROR", "Something went wrong");
}
