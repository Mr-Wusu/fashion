import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { getPrisma } from "./db";
import { Role, User } from "@/types/index";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): { userId: string } {
  return jwt.verify(token, JWT_SECRET) as { userId: string };
}

export async function getCurrentuser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    const decoded = verifyToken(token);

    const userFromDB = await getPrisma().user.findUnique({
      where: { id: decoded.userId },
      include: {
        suggestions: true,
        orders: {
          include: {
            orderItems: {
              include: {
                cloth: true,
              },
            },
          },
        },
      },
    });

    if (!userFromDB) return null;

    return userFromDB as unknown as User;
  } catch (error) {
    console.error("getCurrentuser error:", error);
    return null;
  }
}

export function checkUserPermission(user: User, requiredRole: Role): boolean {
  const roleHierarchy = {
    [Role.USER]: 0,
    [Role.TEST_ADMIN]: 1,
    [Role.ADMIN]: 2,
  };

  return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
}
