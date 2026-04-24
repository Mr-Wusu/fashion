"use server";
import apiClient from "@/lib/apiClient";
import { Role } from "@/types";

interface Errors {
  email?: string;
  password?: string;
  general?: string;
}

interface User {
  firstname: string;
  surname: string;
  email: string;
  role: Role;
}

export default async function signin(
  prevState: { errors: Errors; user?: User },
  formData: FormData,
): Promise<{ errors: Errors; user?: User }> {
  const enteredEmail = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const errors: Errors = {};
  if (!enteredEmail.includes("@")) {
    errors.email = "Please enter a valid email address.";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }
  try {
    const result = await apiClient.login(enteredEmail, password);
    const { firstname, surname, email, role } = result.user;
    return { errors, user: { firstname, surname, email, role } };
  } catch (error) {
    console.error(`Signin error: ${error}`)
    return {errors, user: undefined}
  }  
}
