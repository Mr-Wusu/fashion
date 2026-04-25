import {
  checkUserPermission,
  generateToken,
  getCurrentuser,
  hashPassword,
  verifyPassword,
} from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Role } from "@/types";

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
  } catch (error) {
    console.error("Error fetching clothes from database:", error);
    // Return empty array on error, let component handle fallback
    return { clothes: [] };
  }
}

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

 await prisma.cloth.create({
  data: {
    imageUrl,
    description,
    price,
    altTag,
  },
});
return {success: true, message: "Cloth upload successful"}
  } catch(err) {
    console.error(`Storing cloth error: ${err}`);
    return { success: false, error: "Cloth upload failed" };
  }
  
}
