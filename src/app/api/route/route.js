import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json(
      { message: "Connected to database" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
