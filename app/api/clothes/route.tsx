import { checkUserPermission, getCurrentuser } from "@/lib/auth";
import { getClothes } from "@/lib/authService";
import { prisma } from "@/lib/db";
import { Order_Status, Role } from "@/types";
import { NextRequest, NextResponse } from "next/server";

function nextReturnError(msg: string): { error: string } {
  return { error: msg };
}

const errMsg1 = "You are not authenticated";
const errMsg2 = "You do not have the right to add cloth";

export async function GET() {
  try {
    const clothes = await getClothes()
    return NextResponse.json({ clothes }, { status: 200 });
  } catch (error) {
    console.error(`Error fetching clothes: ${error}`);
    return NextResponse.json(
      { error: "Internal server error! Something went wrong!" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentuser();
    if (!user)
      return NextResponse.json(nextReturnError(errMsg1), { status: 401 });

    const hasRight = checkUserPermission(user, Role.TEST_ADMIN);
    if (!hasRight)
      return NextResponse.json(nextReturnError(errMsg2), { status: 401 });

    const { description, price, imageUrl, altTag } = await req.json();

    if (
      !description ||
      !price ||
      !imageUrl ||
      !altTag ||
      typeof price !== "number"
    )
      return NextResponse.json(
        "Cloth must have a valid price, imageUrl, description and altTag",
        {
          status: 403,
        },
      );

    // Create cloth
    const cloth = await prisma.cloth.create({
      data: {
        description,
        imageUrl,
        altTag,
        price,
      },
    });

    return NextResponse.json({ cloth }, { status: 200 });
  } catch (error) {
    console.error(`Error creating cloth: ${error}`);
    return NextResponse.json(
      { error: "Internal server error! Something went wrong!" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    // Check if there's a user and user has right to perform action
    const user = await getCurrentuser();
    if (!user)
      return NextResponse.json(
        {
          error: "Unauthorized!",
        },
        {
          status: 401,
        },
      );

    const hasRight = checkUserPermission(user, Role.TEST_ADMIN);
    if (!hasRight)
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 },
      );

    // Check if cloth exists
    const cloth = await prisma.cloth.findUnique({
      where: { id },
    });

    if (!cloth)
      return NextResponse.json(
        {
          error: "Cloth not found!",
        },
        {
          status: 404,
        },
      );

    // Check if cloth has any pending or attending orders
    const pendingOrders = await prisma.orderItem.findMany({
      where: {
        clothId: id,
        order: {
          status: {
            not: Order_Status.FULFILLED,
          },
        },
      },
    });

    if (pendingOrders.length > 0)
      return NextResponse.json(
        {
          error:
            "Deletion not allowed! This cloth's order is yet to be fulfilled",
        },
        {
          status: 409,
        },
      );

    await prisma.cloth.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(
      {
        message: "Cloth deleted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(`Deleting error: ${error}`);
    return NextResponse.json(
      {
        error: "Internal server error! Something went wrong!",
      },
      { status: 500 },
    );
  }
}
