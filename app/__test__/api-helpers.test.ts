/** @jest-environment node */

import { describe, expect, it } from "@jest/globals";
import { z } from "zod";
import {
  conflictResponse,
  errorResponse,
  notFoundResponse,
  serverErrorResponse,
  unauthorizedResponse,
  validationErrorResponse,
} from "@/lib/api-response";
import { getApiErrorMessage } from "@/lib/api-error";

describe("api response helpers", () => {
  it("builds a structured error envelope", async () => {
    const response = errorResponse(418, "TEAPOT", "Short and stout");

    expect(response.status).toBe(418);
    await expect(response.json()).resolves.toEqual({
      error: {
        code: "TEAPOT",
        message: "Short and stout",
      },
    });
  });

  it("formats zod validation errors with fields", async () => {
    const schema = z.object({
      email: z.string().email(),
    });
    const parsed = schema.safeParse({ email: "nope" });
    if (parsed.success) throw new Error("expected validation failure");

    const response = validationErrorResponse(parsed.error);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error.code).toBe("VALIDATION_ERROR");
    expect(body.error.fields.email).toBeDefined();
  });

  it("covers the common canned responses", async () => {
    const unauthorized = await unauthorizedResponse().json();
    const notFound = await notFoundResponse("Missing").json();
    const conflict = await conflictResponse("Already exists").json();
    const serverError = await serverErrorResponse().json();

    expect(unauthorized.error.code).toBe("UNAUTHORIZED");
    expect(notFound.error.message).toBe("Missing");
    expect(conflict.error.code).toBe("CONFLICT");
    expect(serverError.error.code).toBe("INTERNAL_SERVER_ERROR");
  });
});

describe("api error message extraction", () => {
  it("reads nested error.message values", async () => {
    const response = new Response(
      JSON.stringify({ error: { message: "Nested message" } }),
      { headers: { "Content-Type": "application/json" } },
    );

    await expect(getApiErrorMessage(response)).resolves.toBe("Nested message");
  });

  it("reads legacy flat error strings and message fields", async () => {
    const flatError = new Response(JSON.stringify({ error: "Flat error" }), {
      headers: { "Content-Type": "application/json" },
    });
    const messageOnly = new Response(JSON.stringify({ message: "Plain message" }), {
      headers: { "Content-Type": "application/json" },
    });

    await expect(getApiErrorMessage(flatError)).resolves.toBe("Flat error");
    await expect(getApiErrorMessage(messageOnly)).resolves.toBe("Plain message");
  });

  it("falls back when the response body is not parseable JSON", async () => {
    const response = new Response("not-json");

    await expect(getApiErrorMessage(response, "Fallback message")).resolves.toBe(
      "Fallback message",
    );
  });
});
