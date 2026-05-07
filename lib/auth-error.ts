/**
 * Normalizes auth error values into a human-readable message.
 * Handles both signIn() returned error strings and fetch Response objects.
 */

export type AuthErrorMessage = string;

export async function normalizeAuthError(
  error: unknown,
): Promise<AuthErrorMessage> {
  // signIn() returns { error: string | undefined }
  if (typeof error === "string") {
    return error;
  }

  if (error && typeof error === "object" && "error" in error) {
    const err = error as { error: unknown };
    if (typeof err.error === "string") {
      return err.error;
    }
  }

  // fetch Response from /api/signup — duck-type check works in both node and jsdom
  if (
    error &&
    typeof error === "object" &&
    "ok" in error &&
    "json" in error &&
    typeof (error as Record<string, unknown>).json === "function"
  ) {
    const res = error as Response;
    try {
      const data = await res.json();
      if (typeof data?.error === "string") return data.error;
      if (typeof data?.error?.message === "string") return data.error.message;
      if (typeof data?.message === "string") return data.message;
    } catch {
      // fall through
    }
  }

  return "Something went wrong. Please try again later.";
}