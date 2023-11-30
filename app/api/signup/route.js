import { NextResponse } from "next/server";
import "../../controllers/db";
import User from "@/app/controllers/schemas/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.formData();
    const [user, hashedPassword] = await Promise.all([
      User.find({ username: body.get("username") }),
      bcrypt.hash(body.get("password"), 10),
    ]);
    if (user.length)
      return NextResponse.json({ status: 401, message: "User already exist!" });
    await User.create({
      name: body.get("name"),
      username: body.get("username"),
      password: hashedPassword,
    });
    return NextResponse.json({ mesage: "Hello" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.mesage });
  }
}
