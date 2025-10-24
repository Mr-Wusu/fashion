import User from "@/model/user-model";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

interface IUser {
  firstName: string;
  surname: string;
  email: string;
  password: string;
}

export async function createUser(userInput: IUser) {
  const { firstName, surname, email, password } = userInput;

  try {
    // Check if user with email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return {
        success: false,
        error: "Email already in use",
      };
    }

    // Hash the password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user with hashed password
    const newUser = await User.create({
      firstName,
      surname,
      email,
      password: hashedPassword,
    });

    revalidatePath("/");

    return {
      success: true,
      message: "User created successfully",
      userId: newUser._id.toString(),
    };
  } catch (e) {
    console.error("Create user error:", e);
    return {
      success: false,
      error: "Failed to create user. Please try again.",
    };
  }
}

export async function login([email, password]: [string, string]) {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return {
        success: false,
        error: "Invalid email or password",
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return {
        success: false,
        error: "Invalid email or password",
      };
    }
    console.log(user);
    return {
      success: true,
      message: "Login successful",
      user,
    };
  } catch (e) {
    console.error("Login error:", e);
    return {
      success: false,
      error: "Failed to login. Please try again.",
    };
  }
}
