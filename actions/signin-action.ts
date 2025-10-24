"use server";
import { login as authenticateUser } from "@/queries/users";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

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

export default async function signin(
  prevState: { errors: Errors; user?: User },
  formData: FormData
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
  const result = await authenticateUser([enteredEmail, password]);

  const { firstName, surname, email } = result.user;


  return { errors, user: { firstName, surname, email } };
}
