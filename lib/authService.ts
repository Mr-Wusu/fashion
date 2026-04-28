import { unstable_cache } from "next/cache";
import {
  checkUserPermission,
  generateToken,
  getCurrentuser,
  hashPassword,
  verifyPassword,
} from "@/lib/auth";
import { getPrisma } from "@/lib/db";
import { Role } from "@/types";

export async function registerUser(data: {
  firstname: string;
  surname: string;
  email: string;
  password: string;
}) {
  const { firstname, surname, email, password } = data;

  const existingUser = await getPrisma().user.findUnique({ where: { email } });
  if (existingUser) throw new Error("Email already taken!"); // ✅ throws to caller

  const hashedPassword = await hashPassword(password);
  const userCount = await getPrisma().user.count();
  const role = userCount === 0 ? Role.ADMIN : Role.USER;

  return getPrisma().user.create({
    data: { firstname, surname, email, password: hashedPassword, role },
    include: { suggestions: true, orders: true },
  });
}

export async function loginUser(data: { email: string; password: string }) {
  const { email, password } = data;

  const userFromDB = await getPrisma().user.findUnique({
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
export const getClothes = unstable_cache(
  async () => {
    return getPrisma().cloth.findMany({
      orderBy: { createdAt: "desc" },
    });
  },
  ["clothes-cache"],
  {
    tags: ["clothes"],
  },
);

export async function storeCloth(data: {
  imageUrl: string;
  description: string;
  price: number;
  altTag: string;
}) {
  try {
    const { imageUrl, description, price, altTag } = data;
    // Check if user exists
    const user = await getCurrentuser();
    if (!user) throw new Error();
    // Check that user behind request has admin rights
    const hasRight = checkUserPermission(user, Role.TEST_ADMIN);
    if (!hasRight) throw new Error("You have no such priviledge!");

    await getPrisma().cloth.create({
      data: {
        imageUrl,
        description,
        price,
        altTag,
      },
    });
    return { success: true, message: "Cloth uploaded successfully" };
  } catch (err) {
    console.error(`Storing cloth error: ${err}`);
    return { success: false, error: "Cloth upload failed" };
  }
}

export async function getClothById(id: string) {
  try {
    const cloth = await getPrisma().cloth.findUnique({
      where: { id },
    });
    if (!cloth) {
      return { success: false, error: "Cloth not found" };
    }
    return { success: true, cloth };
  } catch (error) {
    console.error("Error fetching cloth by ID:", error);
    return { success: false, error: "Failed to fetch cloth" };
  }
}

export async function editClothDB(data: {
  clothId: string;
  imageUrl?: string;
  description?: string;
  price?: number;
  altTag?: string;
}) {
  const { clothId, ...updateData } = data;
  try {
    const updatedCloth = await getPrisma().cloth.update({
      where: { id: clothId },
      data: updateData,
    });
    return { success: true, cloth: updatedCloth };
  } catch (error) {
    console.error("Error editing cloth:", error);
    return { success: false, error: "Failed to update cloth" };
  }
}
