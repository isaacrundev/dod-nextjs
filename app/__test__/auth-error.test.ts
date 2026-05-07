/** @jest-environment node */

import { describe, expect, it } from "@jest/globals";
import { normalizeAuthError } from "@/lib/auth-error";

describe("normalizeAuthError", () => {
  it("returns a plain error string as-is", async () => {
    await expect(normalizeAuthError("Incorrect username/password")).resolves.toBe(
      "Incorrect username/password",
    );
  });

  it("extracts error from signIn-style { error: string } object", async () => {
    await expect(
      normalizeAuthError({ error: "User not found" }),
    ).resolves.toBe("User not found");
  });

  it("returns default message for plain objects with no error field", async () => {
    await expect(
      normalizeAuthError({ somethingElse: "value" }),
    ).resolves.toBe("Something went wrong. Please try again later.");
  });

  it("reads nested error.message from a fetch Response", async () => {
    const response = new Response(
      JSON.stringify({ error: { message: "Email already existed!" } }),
      { status: 409, headers: { "Content-Type": "application/json" } },
    );

    await expect(normalizeAuthError(response)).resolves.toBe(
      "Email already existed!",
    );
  });

  it("reads top-level error string from a fetch Response", async () => {
    const response = new Response(
      JSON.stringify({ error: "Bad request" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );

    await expect(normalizeAuthError(response)).resolves.toBe("Bad request");
  });

  it("reads top-level message from a fetch Response", async () => {
    const response = new Response(
      JSON.stringify({ message: "All good" }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );

    await expect(normalizeAuthError(response)).resolves.toBe("All good");
  });

  it("returns default when Response body is not JSON", async () => {
    const response = new Response("Internal Server Error", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });

    await expect(normalizeAuthError(response)).resolves.toBe(
      "Something went wrong. Please try again later.",
    );
  });
});