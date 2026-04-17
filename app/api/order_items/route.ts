import { checkUserPermission, getCurrentuser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Role } from "@/types";
import { NextRequest, NextResponse } from "next/server";

// POST /api/order_items — Add an item, auto-creating an order if none exists
export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentuser();

    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in to add order items." },
        { status: 401 },
      );
    }

    const isAdmin = checkUserPermission(user, Role.ADMIN);
    const isTestAdmin = checkUserPermission(user, Role.TEST_ADMIN);

    if (isAdmin || isTestAdmin) {
      return NextResponse.json(
        { error: "Admins are not permitted to place order items." },
        { status: 403 },
      );
    }

    const body = await req.json();
    const { clothId, quantity } = body;

    if (!clothId || !quantity) {
      return NextResponse.json(
        { error: "clothId and quantity are required." },
        { status: 400 },
      );
    }

    if (typeof quantity !== "number" || quantity < 1) {
      return NextResponse.json(
        { error: "quantity must be a positive number." },
        { status: 400 },
      );
    }

    const cloth = await prisma.cloth.findUnique({
      where: { id: clothId },
    });

    if (!cloth) {
      return NextResponse.json(
        { error: "Cloth item not found." },
        { status: 404 },
      );
    }

    // Find the user's existing order or create one on the fly
    let order = await prisma.order.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    if (!order) {
      order = await prisma.order.create({
        data: { userId: user.id },
      });
    }

    const orderItem = await prisma.orderItem.create({
      data: {
        orderId: order.id,
        clothId,
        quantity,
        priceAtPurchase: cloth.price,
      },
    });

    return NextResponse.json({ orderItem }, { status: 201 });
  } catch (error) {
    console.error("Create order item error:", error);
    return NextResponse.json(
      { error: "Internal server error! Something went wrong!" },
      { status: 500 },
    );
  }
}

// PATCH /api/order_items — Update the quantity of an existing order item
export async function PATCH(req: NextRequest) {
  try {
    const user = await getCurrentuser();

    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in to update order items." },
        { status: 401 },
      );
    }

    const isAdmin = checkUserPermission(user, Role.ADMIN);
    const isTestAdmin = checkUserPermission(user, Role.TEST_ADMIN);

    if (isAdmin || isTestAdmin) {
      return NextResponse.json(
        { error: "Admins are not permitted to modify order items." },
        { status: 403 },
      );
    }

    const body = await req.json();
    const { orderItemId, quantity } = body;

    if (!orderItemId || !quantity) {
      return NextResponse.json(
        { error: "orderItemId and quantity are required." },
        { status: 400 },
      );
    }

    if (typeof quantity !== "number" || quantity < 1) {
      return NextResponse.json(
        { error: "quantity must be a positive number." },
        { status: 400 },
      );
    }

    // Fetch the item and its parent order to verify ownership
    const orderItem = await prisma.orderItem.findUnique({
      where: { id: orderItemId },
      include: { order: true },
    });

    if (!orderItem) {
      return NextResponse.json(
        { error: "Order item not found." },
        { status: 404 },
      );
    }

    if (orderItem.order.userId !== user.id) {
      return NextResponse.json(
        { error: "You are not authorized to modify this order item." },
        { status: 403 },
      );
    }

    const updatedOrderItem = await prisma.orderItem.update({
      where: { id: orderItemId },
      data: { quantity },
    });

    return NextResponse.json({ orderItem: updatedOrderItem });
  } catch (error) {
    console.error("Update order item error:", error);
    return NextResponse.json(
      { error: "Internal server error! Something went wrong!" },
      { status: 500 },
    );
  }
}
