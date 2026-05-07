import { describe, expect, it } from "@jest/globals";
import {
  buildRecordCreateData,
  buildRecordUpdateData,
  foodDataRequestSchema,
  recordIdParamsSchema,
} from "@/lib/records";

describe("record schemas and helpers", () => {
  it("parses valid record input and coerces numeric fields", () => {
    const parsed = foodDataRequestSchema.parse({
      foodName: "Chicken Breast",
      protein: "31",
      fats: "3.5",
      carbs: "0",
      calories: "165",
      foodSize: "100",
      intakeDate: "2026-05-05",
    });

    expect(parsed).toEqual({
      foodName: "Chicken Breast",
      protein: 31,
      fats: 3.5,
      carbs: 0,
      calories: 165,
      foodSize: 100,
      intakeDate: "2026-05-05",
    });
  });

  it("rejects invalid intake date formats", () => {
    const result = foodDataRequestSchema.safeParse({
      foodName: "Chicken Breast",
      protein: 31,
      fats: 3.5,
      carbs: 0,
      calories: 165,
      foodSize: 100,
      intakeDate: "2026-05-05T00:00:00.000Z",
    });

    expect(result.success).toBe(false);
  });

  it("builds prisma create/update payloads with normalized intake dates", () => {
    const input = {
      foodName: "Oats",
      protein: 12,
      fats: 7,
      carbs: 68,
      calories: 389,
      foodSize: 100,
      intakeDate: "2026-05-05",
    };

    const createData = buildRecordCreateData(input, "user-123");
    const updateData = buildRecordUpdateData(input);

    expect(createData.userId).toBe("user-123");
    expect(createData.intakeDate.toISOString()).toBe("2026-05-04T16:00:00.000Z");
    expect(updateData.intakeDate.toISOString()).toBe("2026-05-04T16:00:00.000Z");
    expect(updateData.foodName).toBe("Oats");
  });

  it("validates record id params as UUIDs", () => {
    expect(recordIdParamsSchema.safeParse({ id: "not-a-uuid" }).success).toBe(
      false,
    );
    expect(
      recordIdParamsSchema.safeParse({
        id: "550e8400-e29b-41d4-a716-446655440000",
      }).success,
    ).toBe(true);
  });
});
