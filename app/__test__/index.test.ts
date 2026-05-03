import { describe, expect, it } from "@jest/globals";
import fs from "fs";
import path from "path";

const rootDir = process.cwd();

function readRepoFile(relativePath: string) {
  return fs.readFileSync(path.join(rootDir, relativePath), "utf8");
}

describe("web mini studio safety regressions", () => {
  it("signup route does not return the full Prisma user with password", () => {
    const source = readRepoFile("app/api/signup/route.ts");

    expect(source).not.toContain("NextResponse.json(newUser)");
    expect(source).toContain("select:");
    expect(source).toContain("id: true");
    expect(source).toContain("email: true");
  });

  it("record id route verifies ownership before update and delete", () => {
    const source = readRepoFile("app/api/records/id/[id]/route.ts");

    expect(source).toContain("findFirst");
    expect(source).toContain("where: { id, userId }");
    expect(source).toContain("Record not found");
    expect(source).not.toContain("where: { userId: getUser?.id, id");
    expect(source).not.toContain("getUser!.id");
  });
});
