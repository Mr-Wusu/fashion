import { registerUser } from "@/lib/authService";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { firstname, surname, email, password } = await request.json();
    // Validate user details
    if (!firstname || !surname || !email || !password)
      return NextResponse.json(
        {
          error: "Kindly provide valid entries for name, email and password!",
        },
        { status: 400 },
      );

    const user = await registerUser({ firstname, surname, email, password });
    return NextResponse.json({ user });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    const status = message === "Email already taken!" ? 409 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
