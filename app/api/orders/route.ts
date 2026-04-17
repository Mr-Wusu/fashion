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

    const orders = await prisma.order.findMany({
      select: {
        id: true,
        user: true,
        orderItems: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ orders });
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
