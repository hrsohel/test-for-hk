import { NextResponse } from "next/server";
import "../../controllers/db";
import User from "@/app/controllers/schemas/User";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const body = await req.formData();
    const user = await User.find({ username: body.get("name") });
    if (!user.length)
      return NextResponse.json({ message: "This user does not exist!" });
    const verifiedPassword = await bcrypt.compare(
      body.get("password"),
      user[0]?.password
    );
    if (!verifiedPassword)
      return NextResponse.json({ message: "Invalid password!" });
    cookies().set("user", user[0].username);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.mesage });
  }
}
