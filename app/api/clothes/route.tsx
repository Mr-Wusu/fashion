import { checkUserPermission, getCurrentuser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Role } from "@/types";
import { NextRequest, NextResponse } from "next/server";

function nextReturnError(msg: string): { error: string } {
  return { error: msg };
}

const errMsg1 = "You are not authenticated";
const errMsg2 = "You do not have the right to add cloth";

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentuser();
    if (!user)
      return NextResponse.json(nextReturnError(errMsg1), { status: 401 });

    const hasRight = checkUserPermission(user, Role.TEST_ADMIN);
    if (!hasRight)
      return NextResponse.json(nextReturnError(errMsg2), { status: 401 });

    const { description, price, imageUrl, altTag } = await req.json();

    if (!description || !price || !imageUrl || !altTag || typeof price !== "number")
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
  const {id} = await req.json()
  // Check if there's a user and user has right to perform action
  const user = await getCurrentuser();
  if(!user) return NextResponse.json({
    error: "Unauthorized!"
  }, {
    status: 401
  })

  const hasRight = checkUserPermission(user, Role.TEST_ADMIN)
  if(!hasRight) return NextResponse.json(
    {
      error: "Unauthorized"
    }, {status: 401}
  )

  // Check if cloth has any pending or attending order, if it doesn't then proceed to delete
  const cloth = await prisma.clothes.findUnique({
    where: {id},
    select: {
      status: true
    }
  })

  if(!cloth) return NextResponse
}
