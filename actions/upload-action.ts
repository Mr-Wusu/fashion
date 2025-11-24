"use server";

import { storeCloth } from "@/queries/clothes";
import { uploadImage } from "@/lib/cloudinary";

interface IErrors {
  image?: string;
  tag?: string;
  price?: string;
  description?: string;
  general?: string;
}

export default async function clothUpload(
  prevState: { errors: IErrors },
  formData: FormData
): Promise<{ errors: IErrors }> {
  const description = String(formData.get("description") ?? "");
  const altTag = String(formData.get("altTag") ?? "");
  const price = formData.get("price");
  const image = formData.get("image") as File | null;

  const errors: IErrors = {};
  if (
    !description ||
    description === "" ||
    description.length < 50 ||
    description.length > 100
  )
    errors.description =
      "Cloth must have a description not less than 50 letters or more than 100";
  if (!altTag || altTag.length < 10 || altTag.length > 25)
    errors.tag =
      "This image must have a title, not less than 10 letters or more than 25";

  const numericPrice = Number(price);
  if (price === null || isNaN(numericPrice) || numericPrice <= 0)
    errors.price = "Price must be set and be a valid positive number";

  if (!image) {
    errors.image = "An image file must be provided.";
    return { errors };
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }
  // Store image in cloudinary and get storage string
  const imageUrl = await uploadImage(image);
  if (!imageUrl || typeof imageUrl !== "string") {
    errors.general = "Failed to upload image to cloudinary";
    return { errors };
  }

  // Store cloth details including cloudinary string in mondodb
  const result = await storeCloth({
    image: imageUrl,
    description,
    price: numericPrice,
    altTag,
  });

  if (result.success === true) {
    errors.general = result.message;
    return { errors };
  } else {
    errors.general = result.error;
    return { errors };
  }

  
  
}
