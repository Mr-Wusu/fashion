"use server";

import { registerUser } from "@/lib/authService";
import { AuthUser } from "@/types";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

interface Errors {
  email?: string;
  password?: string;
  general?: string;
}

export default async function signup(
  prevState: { errors: Errors; user?: AuthUser },
  formData: FormData,
): Promise<{ errors: Errors; user?: AuthUser }> {
  const firstname = String(formData.get("firstname") ?? "");
  const surname = String(formData.get("surname") ?? "");
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const errors: Errors = {};

  // Validate all fields first
  if (!firstname || !surname) {
    errors.general = "All fields are required";
  }

  if (firstname.length < 2 || surname.length < 2) {
    errors.general = "Names must be at least 2 letters";
  }

  if (firstname.length === 0 || surname.length === 0) {
    errors.general =
      "The firstname and surname fields aren't for nothing. Use them";
  }

  if (!email.includes("@")) {
    errors.email = "Please enter a valid email address.";
  }

  if (password.trim().length < 8) {
    errors.password = "Passwords must be at least 8 characters long.";
  }

  // Return early if validation fails
  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  // Only proceed with user creation if validation passes
  try {
    await registerUser({ firstname, surname, email, password });
    redirect("/auth/sign-in");
  } catch (error: unknown) {
    if (isRedirectError(error)) throw error; 
    const message =
      error instanceof Error ? error.message : "Failed to create account.";
    errors.general = message;
  }
  return { errors };
}
