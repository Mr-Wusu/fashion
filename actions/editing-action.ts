"use server";

import { revalidatePath } from "next/cache";
import { editClothDB, getClothById } from "@/queries/clothes";
import { deleteImage, uploadImage } from "@/lib/cloudinary";

interface IErrors {
  image?: string;
  tag?: string;
  price?: string;
  description?: string;
  general?: string;
}

export default async function editCloth(
  clothId: string,
  prevState: { errors: IErrors },
  formData: FormData
): Promise<{ errors: IErrors }> {
  const description = String(formData.get("description") ?? "");
  const altTag = String(formData.get("altTag") ?? "");
  const price = formData.get("price");
  const image = formData.get("image") as File | null;

  const errors: IErrors = {};

  if (price !== null && price !== "") {
    const numericPrice = Number(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      errors.price = "Price must be a valid positive number";
      return { errors };
    }
  }

  // Check if at least one field has changed
  const hasChanges =
    description.trim() !== "" ||
    altTag.trim() !== "" ||
    (price !== null && price !== "") ||
    (image && image.size > 0);

  if (!hasChanges) {
    errors.general =
      "You haven't changed any of price, description, image or tag. To edit, one of these should be changed";
    return { errors };
  }

  // if there's image, delete previous image from cloudinary, store image in cloudinary and get the url
  const clothResult = await getClothById(clothId);

  if (!clothResult.success || !clothResult.cloth) {
    errors.general = "Cloth not found";
    return { errors };
  }

  let newImageUrl = clothResult.cloth.imageUrl;

  if (image && image.size > 0) {
    // Validate image file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(image.type)) {
      errors.image = "Invalid image type. Please upload JPG, PNG, or WebP";
      return { errors };
    }

    // Validate image size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (image.size > maxSize) {
      errors.image = "Image size must be less than 5MB";
      return { errors };
    }
  }

  newImageUrl = await uploadImage(image as File);

  // Delete old image from Cloudinary
  const deleteSuccess = await deleteImage(clothResult.cloth.imageUrl);
  if (!deleteSuccess) {
    console.warn("Failed to delete old image from Cloudinary");
    // Don't throw error, continue with update
  }

  // If image upload fails stop edit
  if (!newImageUrl) {
    errors.general = "Failed to upload image to cloudinary!";
    return { errors };
  }

  // Store cloth details including imageUrl in mongodb
  // Prepare update data
  const updateData: {
    altTag?: string;
    price?: number;
    description?: string;
    image?: string;
  } = {};

  if (altTag && altTag.trim() !== "") {
    updateData.altTag = altTag.trim();
  }
  if (price !== null && price !== "") updateData.price = Number(price);
 if (description && description.trim() !== "") {
    updateData.description = description.trim();
}
  if (newImageUrl !== clothResult.cloth.imageUrl) updateData.image = newImageUrl;

  // Update cloth in database
  const result = await editClothDB({
    clothId,
    ...updateData,
  });

  if (!result.success) {
    errors.general = result.error || "Failed to update cloth";
    return { errors };
  }

  revalidatePath("/");

  return {
    errors: {
      general: "Cloth successfully edited",
    },
  };

  
}
