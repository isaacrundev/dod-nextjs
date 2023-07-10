import { NextResponse } from "next/server";

export async function GET(res: NextResponse) {
  return new NextResponse("Works");
}
