import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST() {
  const response = NextResponse.json({
    message: "User logged out successfully!"
  }, {status: 200})

  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0
  })

  // Revalidate all paths to ensure server components refresh
  revalidatePath("/", "layout");

  return response
}