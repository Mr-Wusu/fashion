"use server";

import { createUser } from "@/queries/users";
import { redirect } from "next/navigation";

interface Errors {
  email?: string;
  password?: string;
  general?: string;
}

interface User {
  firstName: string;
  surname: string;
  email: string;
}

export default async function signup(
  prevState: { errors: Errors; user?: User },
  formData: FormData
): Promise<{ errors: Errors; user?: User; }> {
  const firstName = String(formData.get("firstname") ?? "");
  const surname = String(formData.get("surname") ?? "");
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const errors: Errors = {};

  // Validate all fields first
  if (!firstName || !surname) {
    errors.general = "All fields are required";
  }

  if (firstName.length < 2 || surname.length < 2) {
    errors.general = "Names must be at least 2 letters";
  }

  if (firstName.length === 0 || surname.length === 0) {
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
  const result = await createUser({
    firstName,
    surname,
    email,
    password,
  });

  console.log("Create user result:", result);

  if (result.success === true) {
    redirect("/auth/sign-in");
  } else {
    // Show the specific error message from createUser
    errors.general =
      result.error || "Failed to create account. Please try again.";
    return { errors };
  }
}
