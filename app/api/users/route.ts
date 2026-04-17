import { checkUserPermission, getCurrentuser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Role } from "@/types";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getCurrentuser();

    if (!user)
      return NextResponse.json(
        {
          error: "You are not authorized to access user information!",
        },
        { status: 401 },
      );

    const checkAuthorization = checkUserPermission(user, Role.TEST_ADMIN);
    if (!checkAuthorization) {
      return NextResponse.json(
        {
          error: "You are not authorized to access user information",
        },
        { status: 401 },
      );
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstname: true,
        surname: true,
        role: true,
        createdAt: true,
        suggestions: true,
        orders: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Get users error:", error);
    return NextResponse.json(
      {
        error: "Internal server error! Something went wrong!",
      },
      { status: 500 },
    );
  }
}
