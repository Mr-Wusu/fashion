import { generateToken, hashPassword, verifyPassword } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Role } from "@/types";
import { revalidatePath } from "next/cache";

export async function registerUser(data: {
  firstname: string;
  surname: string;
  email: string;
  password: string;
}) {
  const { firstname, surname, email, password } = data;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error("Email already taken!"); // ✅ throws to caller

  const hashedPassword = await hashPassword(password);
  const userCount = await prisma.user.count();
  const role = userCount === 0 ? Role.ADMIN : Role.USER;

  return prisma.user.create({
    // ✅ returns the created user
    data: { firstname, surname, email, password: hashedPassword, role },
    include: { suggestions: true, orders: true },
  });
}

export async function loginUser(data: { email: string; password: string }) {
  const { email, password } = data;

  const userFromDB = await prisma.user.findUnique({
    where: { email },
    include: { orders: true, suggestions: true },
  });

  if (!userFromDB) throw new Error("Invalid credentials");

  const isCorrectPassword = await verifyPassword(password, userFromDB.password);
  if (!isCorrectPassword) throw new Error("Invalid credentials");

  const token = generateToken(userFromDB.id);
  
  return {
    user: {
      id: userFromDB.id,
      firstname: userFromDB.firstname,
      surname: userFromDB.surname,
      email: userFromDB.email,
      role: userFromDB.role,
      token,
    },
  };
}

export async function getClothes() {
  try {
    const clothes = await prisma.cloth.findMany({
      orderBy: { createdAt: "desc" },
    });

    return { clothes: clothes || [] };
    revalidatePath("/");
  } catch (error) {
    console.error("Error fetching clothes from database:", error);
    // Return empty array on error, let component handle fallback
    return { clothes: [] };
  }
}



