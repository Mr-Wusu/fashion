import { checkUserPermission, getCurrentuser } from "@/lib/auth";
import { getPrisma } from "@/lib/db";
import { Order_Status, Role } from "@/types";
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

    const isAdmin = checkUserPermission(user, Role.TEST_ADMIN);

    if (isAdmin) {
      return NextResponse.json(
        { error: "Admins are not permitted to place order items." },
        { status: 403 },
      );
    }

    const { clothId, quantity } = await req.json();

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

    const cloth = await getPrisma().cloth.findUnique({
      where: { id: clothId },
    });

    if (!cloth) {
      return NextResponse.json(
        { error: "Cloth item not found." },
        { status: 404 },
      );
    }

    // Find the user's existing order or create one on the fly
    let order = await getPrisma().order.findFirst({
      where: {
        userId: user.id,
        status: Order_Status.PENDING, // only reuse active/pending orders
      },
      orderBy: { createdAt: "desc" },
    });

    if (!order) {
      order = await getPrisma().order.create({
        data: { userId: user.id },
      });
    }

    const orderItem = await getPrisma().orderItem.create({
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

    const isAdmin = checkUserPermission(user, Role.TEST_ADMIN);

    if (isAdmin) {
      return NextResponse.json(
        { error: "Admins are not permitted to modify order items." },
        { status: 403 },
      );
    }

    const { orderItemId, quantity } = await req.json();

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
    const orderItem = await getPrisma().orderItem.findUnique({
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

    const updatedOrderItem = await getPrisma().orderItem.update({
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

// DELETE /api/order_items — Remove an order item
export async function DELETE(req: NextRequest) {
  try {
    const user = await getCurrentuser();

    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in to remove order items." },
        { status: 401 },
      );
    }

    const isAdmin = checkUserPermission(user, Role.TEST_ADMIN);

    if (isAdmin) {
      return NextResponse.json(
        { error: "Admins are not permitted to remove order items." },
        { status: 403 },
      );
    }

    const { orderItemId } = await req.json();

    if (!orderItemId) {
      return NextResponse.json(
        { error: "orderItemId is required." },
        { status: 400 },
      );
    }

    const orderItem = await getPrisma().orderItem.findUnique({
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
        { error: "You can only remove your own order items." },
        { status: 403 },
      );
    }

    await getPrisma().orderItem.delete({
      where: { id: orderItemId },
    });

    return NextResponse.json({ message: "Order item removed successfully." });
  } catch (error) {
    console.error("Remove order item error:", error);
    return NextResponse.json(
      { error: "Internal server error! Something went wrong!" },
      { status: 500 },
    );
  }
}
