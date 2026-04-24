import { loginUser } from "@/lib/authService";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    // Validate user details
    if (!email || !password)
      return NextResponse.json(
        {
          error: "Kindly provide valid entries for email and password!",
        },
        { status: 400 },
      );

    const { user } = await loginUser({ email, password });

    const response = NextResponse.json({ user });

    // Set cookie
    response.cookies.set("token", user.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Login failed", error);
    return NextResponse.json({
      message: `Internal server error, something went wrong!`,
    });
  }
}
