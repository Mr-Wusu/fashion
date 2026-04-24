import { createContext } from "react";
import { User } from "@/types/index";

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);
