import { createContext } from "react";
import { AuthUser } from "@/types/index";

interface AuthContextType {
  user: AuthUser | null;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);
