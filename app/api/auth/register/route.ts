import { hashPassword } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Role } from "@/types";

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

    // Find existing user
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser)
      return NextResponse.json(
        {
          error: "Email already taken!",
        },
        { status: 409 },
      );


    // If there's existing user with provided email, hash the provided password
    const hashedPassword = await hashPassword(password);

    // First User becomes ADMIN, others become USER
    const userCount = await prisma.user.count();
    const role = userCount === 0 ? Role.ADMIN : Role.USER;

    // Create User
    const user = await prisma.user.create({
      data: {
        firstname,
        surname,
        email,
        password: hashedPassword,
        role,
      },
      include: {
        suggestions: true,
        orders: true,
      },
    });

    // Generate token
    // const token = generateToken(user.id);
    const response = NextResponse.json({
      user: {
        id: user.id,
        firstname: user.firstname,
        surname: user.surname,
        email: user.email,
        role: user.role,
        suggestions: user.suggestions,
        orders: user.orders,
      },
    });

    // Set cookie
    // response.cookies.set("token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "lax",
    //   maxAge: 60 * 60 * 24 * 7,
    // });

    return response;
  } catch (error) {
    console.error("Registeration error", error);
    return NextResponse.json({
      message: `Internal server error, something went wrong!`,
    });
  }
}
