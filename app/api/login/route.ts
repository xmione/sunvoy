import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  console.log("Logging in with:", email, password);
  
  return NextResponse.json({ message: "Login successful" });
}