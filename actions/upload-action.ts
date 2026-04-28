"use server";

import { storeCloth } from "@/lib/authService";
import { uploadImage } from "@/lib/cloudinary";
import { revalidateTag, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface IErrors {
  image?: string;
  tag?: string;
  price?: string;
  description?: string;
  general?: string;
}

interface IActionState {
  errors: IErrors;
}

export default async function clothUpload(
  prevState: IActionState,
  formData: FormData,
): Promise<IActionState> {
  const description = String(formData.get("description") ?? "");
  const altTag = String(formData.get("altTag") ?? "");
  const price = formData.get("price");
  const image = formData.get("image") as File;

  const errors: IErrors = {};

  if (!description || description.length < 30 || description.length > 120) {
    errors.description =
      "Cloth must have a description between 30 and 120 characters";
  }

  if (!altTag || altTag.length < 10 || altTag.length > 35) {
    errors.tag = "Image title must be between 10 and 35 characters";
  }

  const numericPrice = Number(price);

  if (price === null || isNaN(numericPrice) || numericPrice <= 0) {
    errors.price = "Price must be a valid positive number";
  }

  if (!image) {
    errors.image = "An image file must be provided";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const imageUrl = await uploadImage(image);

  if (!imageUrl || typeof imageUrl !== "string") {
    return {
      errors: {
        general: "Failed to upload image",
      },
    };
  }

  const result = await storeCloth({
    imageUrl,
    description,
    price: numericPrice,
    altTag,
  });

  if (!result.success) {
    return {
      errors: {
        general: result.error,
      },
    };
  }

  revalidateTag("clothes", "default");
  revalidatePath("/", "page");
  redirect("/");
}
