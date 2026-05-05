import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";
import {
  conflictResponse,
  serverErrorResponse,
  validationErrorResponse,
} from "@/lib/api-response";
import { credentialsSchema } from "@/lib/auth-schemas";
import { reportError } from "@/lib/error-report";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password } = credentialsSchema.parse(reqBody);

    const emailExist = await prisma.user.findUnique({ where: { email } });
    if (emailExist) {
      return conflictResponse("Email already existed!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
      },
    });

    return NextResponse.json({ ok: true, user: newUser }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return validationErrorResponse(error);
    }

    reportError(error, "signup.POST");
    return serverErrorResponse();
  }
}
