import { checkUserPermission, getCurrentuser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Order_Status, Role } from "@/types";
import { NextRequest, NextResponse } from "next/server";

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

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    // Check if ther's a user behind the request
    const user = await getCurrentuser();
    if (!user)
      return NextResponse.json(
        {
          error: "You are not authorized to delete a cloth!",
        },
        { status: 401 },
      );

    // If user exists, check if user has admin privileges
    const hasRight = checkUserPermission(user, Role.TEST_ADMIN);

    if (!hasRight)
      return NextResponse.json({
        error: "You do not have such privilege to delete an order",
      });

    // Check if the order exists and if it can be deleted
    const order = await prisma.order.findUnique({
      where: { id },
      select: { status: true },
    });

    if (!order)
      return NextResponse.json(
        {
          error: "Order not found",
        },
        { status: 404 },
      );

    if (order.status !== Order_Status.FULFILLED)
      return NextResponse.json(
        {
          error: "You cannot delete a pending order",
        },
        { status: 409 },
      );

    await prisma.order.delete({ where: { id } });

    return NextResponse.json(
      { message: "Order deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error(`Error deleting order: ${error}`);
    return NextResponse.json(
      { error: "Internal server error! Something went wrong!" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();
    // Check if user is logged in and has right
    const user = await getCurrentuser();
    if (!user)
      return NextResponse.json(
        {
          error: "You are not authorized to perform this operation",
        },
        { status: 401 },
      );
    const hasRight = checkUserPermission(user, Role.TEST_ADMIN);
    if (!hasRight)
      return NextResponse.json(
        {
          error: "You are not authorized to perform this operation",
        },
        { status: 409 },
      );
    const orderExists = await prisma.order.findUnique({
      where: { id },
    });
    if (!orderExists)
      return NextResponse.json(
        {
          error: "Order not found",
        },
        { status: 404 },
      );

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        status,
      },
    });
    return NextResponse.json({
      updatedOrder,
    });
  } catch (error) {
    console.error(`Order updating error: ${error}`);
    return NextResponse.json(
      {
        error: "Internal server error. Something went wrong!",
      },
      { status: 500 },
    );
  }
}
