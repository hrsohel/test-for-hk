import { NextResponse } from "next/server";
import "../../controllers/db";
import UserWithSector from "@/app/controllers/schemas/UserWithSectors";

export async function POST(req) {
  try {
    const body = await req.formData();
    const userData = await UserWithSector.findOne({
      username: body.get("username"),
    });
    if (userData) {
      return NextResponse.json({ message: false });
    } else {
      await UserWithSector.create({
        name: body.get("name"),
        username: body.get("username"),
        category: body.get("category"),
        subCat: body.get("subCat"),
        subsubCat: body.get("subsubCat"),
        subsubsubCat: body.get("subsubsubCat"),
      });
      return NextResponse.json({ message: true });
    }
  } catch (error) {
    console.error(error.message);
    return NextResponse.json({ message: error.message });
  }
}

export async function PUT(req) {
  const { username } = await req.json();
  return NextResponse.json({
    message: await UserWithSector.findOne({ username }),
  });
}
export async function PATCH(req) {
  try {
    const body = await req.formData();
    const userData = await UserWithSector.findOne({
      username: body.get("username"),
    });
    userData.name = body.get("name");
    userData.usename = body.get("usename");
    userData.category = body.get("category");
    userData.subsubCat = body.get("subsubCat");
    userData.subCat = body.get("subCat");
    userData.subsubsubCat = body.get("subsubsubCat");
    await userData.save();
    return NextResponse.json({
      message: "",
    });
  } catch (error) {
    console.error(error.message);
    return NextResponse.json({
      message: "",
    });
  }
}
