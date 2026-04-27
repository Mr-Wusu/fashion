import { prisma } from "@/lib/db";

export async function getClothById(id: string) {
  try {
    const cloth = await prisma.cloth.findUnique({
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
    const updatedCloth = await prisma.cloth.update({
      where: { id: clothId },
      data: updateData,
    });
    return { success: true, cloth: updatedCloth };
  } catch (error) {
    console.error("Error editing cloth:", error);
    return { success: false, error: "Failed to update cloth" };
  }
}
