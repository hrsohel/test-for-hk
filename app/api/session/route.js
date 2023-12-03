import { NextResponse } from "next/server";
import "../../controllers/db";
import { cookies } from "next/headers";
import UserWithSector from "@/app/controllers/schemas/UserWithSectors";

export async function GET() {
  const session = cookies().get("user")?.value;
  if (!session) return NextResponse.json({ message: "" });
  const user = await UserWithSector.findOne({ username: session });
  return NextResponse.json({
    message: { user, session },
  });
}
