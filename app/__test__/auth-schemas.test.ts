import { describe, expect, it } from "@jest/globals";
import { credentialsSchema, signupFormSchema } from "@/lib/auth-schemas";

describe("auth schemas", () => {
  it("accepts valid credentials and rejects invalid emails", () => {
    expect(
      credentialsSchema.safeParse({
        email: "user@example.com",
        password: "123456",
      }).success,
    ).toBe(true);

    expect(
      credentialsSchema.safeParse({
        email: "bad-email",
        password: "123456",
      }).success,
    ).toBe(false);
  });

  it("requires matching confirmPassword on signup", () => {
    expect(
      signupFormSchema.safeParse({
        email: "user@example.com",
        password: "123456",
        confirmPassword: "123456",
      }).success,
    ).toBe(true);

    const mismatch = signupFormSchema.safeParse({
      email: "user@example.com",
      password: "123456",
      confirmPassword: "654321",
    });

    expect(mismatch.success).toBe(false);
    if (!mismatch.success) {
      expect(mismatch.error.flatten().fieldErrors.confirmPassword).toBeDefined();
    }
  });
});
