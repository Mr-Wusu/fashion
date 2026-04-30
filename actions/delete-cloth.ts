"use server";

import { deleteClothDB } from "@/lib/authService";
import { deleteImage } from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";
import { revalidateTag } from "next/cache";

export async function deleteClothAction(id: string) {
  
  if (!id) {
    return { success: false, error: "No cloth ID provided" };
  }

  const result = await deleteClothDB(id);

  if (result.success && result.imageUrl) {
    await deleteImage(result.imageUrl);
    revalidateTag("clothes", "default"); 
    revalidatePath("/", "layout");
    return { success: true };
  }

  return { success: false, error: result.error };
}
