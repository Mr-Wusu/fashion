"use server"

import { revalidatePath } from "next/cache";
import { storeCloth } from "@/queries/clothes";
import { IErrors } from "@/types/types";

export default async function editCloth(
  prevState: { errors: IErrors },
  formData: FormData
): Promise<{ errors: IErrors }> {
  const image = formData.get("image") ?? "";
  const description = String(formData.get("description") ?? "");
  const price = String(formData.get("price") ?? "");
  const tag = String(formData.get("tag") ?? "");

  const errors: Errors = {};

  // Validate all fields first
  if (!description || !tag || !price || !image) {
    errors.required = "All fields are required";
  }
  if (tag.length <= 3) {
    errors.tag = "The tag must be at least 4 letters";
  }

  if (typeof image !== "string" && !(image instanceof File)) {
    // This is a safety check for unexpected form data types
    errors.image = "Invalid image data provided.";
  }

  // Return early if validation fails
  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  // Store image in cloudinary and get the url

  // Store image details including imageUrl in mongodb
  const result = await storeCloth({
    image: imageUrl,
    description,
    price,
    tag,
  });

  if (result.success === true) {
    revalidatePath("/");
  } else {
    // Show the specific error message from createUser
    errors.general =
      result.error || "Failed to create account. Please try again.";
    return { errors };
  }
}