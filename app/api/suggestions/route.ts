import { checkUserPermission, getCurrentuser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Role } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { imageUrl, description } = await req.json();
    // Check if there's a user behind the request
    const userExists = await getCurrentuser();
    if (!userExists)
      return NextResponse.json(
        {
          error: "You are not authorized",
        },
        { status: 401 },
      );
    // Check that user has priviledge - Only for users, admin should add cloth and not suggest
    const isAdmin = checkUserPermission(userExists, Role.TEST_ADMIN);
    if (isAdmin)
      return NextResponse.json(
        {
          error: "Conflicted interests! Suggestions are for users",
        },
        { status: 409 },
      );
    // Write suggestion to database
    const suggestion = await prisma.suggestion.create({
      data: {
        imageUrl,
        description,
        userId: userExists.id,
      },
    });
    return NextResponse.json({ suggestion });
  } catch (error) {
    console.error(`Suggestion error: ${error}`);
    return NextResponse.json(
      {
        error: "Internal server error",
      },
      { status: 500 },
    );
  }
}
