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

  it("auth authorize does not return the password hash", () => {
    const source = readRepoFile("auth.ts");

    expect(source).toContain("password: true");
    expect(source).toContain("credentialsSchema.parse(credentials)");
    expect(source).toContain("return {");
    expect(source).toContain("id: targetUser.id");
    expect(source).toContain("email: targetUser.email");
    expect(source).not.toContain("return targetUser;");
  });

  it("record id route verifies ownership before update and delete", () => {
    const source = readRepoFile("app/api/records/id/[id]/route.ts");

    expect(source).toContain("findFirst");
    expect(source).toContain("where: { id, userId }");
    expect(source).toContain('notFoundResponse("Record not found")');
    expect(source).not.toContain("getUser!.id");
    expect(source).toContain("buildRecordUpdateData");
  });

  it("record routes do not expose raw error.message values", () => {
    const addNewSource = readRepoFile("app/api/records/add-new/route.ts");
    const dateSource = readRepoFile("app/api/records/date/[date]/route.ts");
    const weeklySource = readRepoFile("app/api/records/date/weekly/route.ts");

    expect(addNewSource).not.toContain("error.message");
    expect(dateSource).not.toContain("error.message");
    expect(weeklySource).not.toContain("error.message");
  });

  it("dynamic API routes use Next 16 async params shape", () => {
    const idSource = readRepoFile("app/api/records/id/[id]/route.ts");
    const dateSource = readRepoFile("app/api/records/date/[date]/route.ts");

    expect(idSource).toContain("context: { params: Promise<{ id: string }> }");
    expect(idSource).toContain("await context.params");
    expect(dateSource).toContain(
      "context: { params: Promise<{ date: string }> }",
    );
    expect(dateSource).toContain("await context.params");
  });

  it("frontend record flows use toast instead of blocking alert dialogs", () => {
    const addNewSource = readRepoFile("components/AddNewRecordForm.tsx");
    const editSource = readRepoFile("components/EditForm.tsx");
    const historySource = readRepoFile("components/HistoryTable.tsx");

    expect(addNewSource).not.toContain("alert(");
    expect(editSource).not.toContain("alert(");
    expect(historySource).not.toContain("alert(");
    expect(addNewSource).toContain("useToast");
    expect(editSource).toContain("useToast");
    expect(historySource).toContain("useToast");
  });

  it("food search pagination uses centralized metadata helpers", () => {
    const source = readRepoFile("components/FoodData.tsx");
    const typesSource = readRepoFile("app/index.d.ts");
    const foodLibSource = readRepoFile("lib/food-data.ts");

    expect(source).toContain("hasNextFoodSearchPage(searchData)");
    expect(source).toContain("buildOpenFoodFactsSearchUrl");
    expect(source).not.toContain("pageCount !== 24");
    expect(typesSource).toContain("count: number;");
    expect(typesSource).toContain("page_size: number;");
    expect(foodLibSource).toContain("getProductName");
  });

  it("line chart does not keep debug console logs in the render flow", () => {
    const source = readRepoFile("components/LineChart.tsx");

    expect(source).not.toContain("console.log(chartData)");
    expect(source).toContain("getApiErrorMessage");
  });

  it("navigation uses modern Next Link composition without legacyBehavior", () => {
    const source = readRepoFile("components/NavBar.tsx");

    expect(source).not.toContain("legacyBehavior");
    expect(source).not.toContain("passHref");
    expect(source).toContain("NavigationMenuLink asChild");
  });

  it("login and signup forms reuse centralized auth schemas", () => {
    const loginSource = readRepoFile("components/LoginForm.tsx");
    const signupSource = readRepoFile("components/SignupForm.tsx");
    const signupApiSource = readRepoFile("app/api/signup/route.ts");
    const authSchemaSource = readRepoFile("lib/auth-schemas.ts");

    expect(loginSource).toContain("credentialsSchema");
    expect(loginSource).toContain("Logging in...");
    expect(signupSource).toContain("signupFormSchema");
    expect(signupApiSource).toContain("credentialsSchema.parse(reqBody)");
    expect(authSchemaSource).toContain("confirmPassword");
  });

  it("client and route error handling uses reportError helper instead of scattered console.error", () => {
    const signupSource = readRepoFile("components/SignupForm.tsx");
    const foodDataSource = readRepoFile("components/FoodData.tsx");
    const historySource = readRepoFile("components/HistoryTable.tsx");
    const signupApiSource = readRepoFile("app/api/signup/route.ts");
    const errorReportSource = readRepoFile("lib/error-report.ts");

    expect(signupSource).toContain('reportError(error, "SignupForm.onSubmit")');
    expect(foodDataSource).toContain('reportError(error, "FoodData.getFoodData")');
    expect(historySource).toContain('reportError(error, "HistoryTable.handleDelete")');
    expect(signupApiSource).toContain('reportError(error, "signup.POST")');
    expect(errorReportSource).toContain("console.error");
  });

  it("date handling is centralized in dayjs helpers instead of scattered string slicing", () => {
    const dateUtilsSource = readRepoFile("lib/date.ts");
    const dashboardSource = readRepoFile("app/(user-routes)/dashboard/page.tsx");
    const addNewSource = readRepoFile("components/AddNewRecordForm.tsx");
    const editSource = readRepoFile("components/EditForm.tsx");
    const historySource = readRepoFile("components/HistoryTable.tsx");
    const dailyRouteSource = readRepoFile("app/api/records/date/[date]/route.ts");

    expect(dateUtilsSource).toContain('import dayjs from "dayjs"');
    expect(dateUtilsSource).toContain("專案日期處理守則");
    expect(dateUtilsSource).toContain("APP_TIMEZONE");
    expect(dashboardSource).toContain("getTodayDate");
    expect(addNewSource).toContain("getDateKey(selectedDate)");
    expect(editSource).toContain("getDateKey(selectedDate)");
    expect(historySource).toContain("fetchHistory(getDateKey(selectedDate))");
    expect(historySource).not.toContain("toISOString().slice(0, 13)");
    expect(dailyRouteSource).toContain("getDayRange(date)");
    expect(dateUtilsSource).toContain("getLastNDateKeys");
  });

  it("record routes reuse centralized record schemas", () => {
    const addNewSource = readRepoFile("app/api/records/add-new/route.ts");
    const idRouteSource = readRepoFile("app/api/records/id/[id]/route.ts");
    const recordsLibSource = readRepoFile("lib/records.ts");

    expect(addNewSource).toContain("foodDataRequestSchema");
    expect(idRouteSource).toContain("recordIdParamsSchema");
    expect(recordsLibSource).toContain("buildRecordCreateData");
    expect(recordsLibSource).toContain("buildRecordUpdateData");
  });
});
