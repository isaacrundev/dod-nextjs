export function reportError(error: unknown, context?: string) {
  if (context) {
    console.error(`[${context}]`, error);
    return;
  }

  console.error(error);
}
