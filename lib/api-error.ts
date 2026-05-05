export type ApiErrorResponse = {
  error?: string | { message?: string };
  message?: string;
};

export async function getApiErrorMessage(
  response: Response,
  fallback = "Something went wrong. Please try again later.",
) {
  try {
    const data: ApiErrorResponse = await response.json();

    if (typeof data.error === "string") {
      return data.error;
    }

    if (data.error && typeof data.error === "object" && data.error.message) {
      return data.error.message;
    }

    if (data.message) {
      return data.message;
    }
  } catch {
    // Ignore JSON parsing errors and fall back to default message.
  }

  return fallback;
}
