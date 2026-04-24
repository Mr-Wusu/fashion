"use server";

import { loginUser } from "@/lib/authService"; 
import { AuthUser, Role } from "@/types";

interface Errors {
  email?: string;
  password?: string;
  general?: string;
}

export default async function signin(
  prevState: { errors: Errors; user?: AuthUser },
  formData: FormData,
): Promise<{ errors: Errors; user?: AuthUser }> {
  const email = String(formData.get("email") ?? ""); 
  const password = String(formData.get("password") ?? "");

  const errors: Errors = {};

  if (!email.includes("@")) {
    errors.email = "Please enter a valid email address.";
  }

  if (Object.keys(errors).length > 0) return { errors };

  try {
    const { user } = await loginUser({ email, password });

    return {
      errors,
      user: {
        firstname: user.firstname,
        surname: user.surname,
        email: user.email,
        role: user.role as Role,
      },
    };
  } catch (error: unknown) {
    console.error(`Signin error: ${error}`);
    const message =
      error instanceof Error ? error.message : "Login failed. Try again.";
    return {
      errors: { general: message },
      user: undefined,
    };
  }
}
