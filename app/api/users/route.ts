import { NextResponse } from "next/server";
import users from "@/app/data/users.json";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const email = searchParams.get("email");

  if (id) {
    const user = users.find(user => user.id === id); 
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    return NextResponse.json(user); 
  }

  if (email) {
    const user = users.find(user => user.email === email);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    return NextResponse.json(user);
  }
  
  return NextResponse.json(users);
}