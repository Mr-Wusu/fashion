"use server";

import { storeSuggestion } from "@/lib/authService";
import { uploadImage } from "@/lib/cloudinary";
// import { storeSuggestion } from "@/lib/suggestionsService"; // Example for later

interface IErrors {
  image?: string;
  description?: string;
  general?: string;
}

interface IActionState {
  errors: IErrors;
  success?: boolean;
}

export default async function suggestDesign(
  prevState: IActionState,
  formData: FormData,
): Promise<IActionState> {
  const description = String(formData.get("description") ?? "");
  const image = formData.get("image") as File;

  const errors: IErrors = {};

  // Simple Validation
  if (!description || description.length < 30) {
    errors.description = "Description must be at least 30 characters long.";
  }

  if (!image || image.size === 0) {
    errors.image = "Please provide a reference image.";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, success: false };
  }

  try {
    // 1. Upload to Cloudinary
    const imageUrl = await uploadImage(image);

    if (!imageUrl || typeof imageUrl !== "string") {
      return {
        errors: { general: "Failed to process image upload." },
        success: false,
      };
    }

    // 2. Logic to store the suggestion in DB
    const result = await storeSuggestion({ imageUrl, description });

    if (result.success === true) return { errors: {}, success: true };
  } catch (error) {
    console.error("Suggestion Error:", error);
    return {
      errors: {
        general: "An unexpected error occurred while sending your design.",
      },
      success: false,
    };
  }
  return { errors: {} };
}
