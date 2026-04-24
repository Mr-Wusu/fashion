"use client";

import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import apiClient from "@/lib/apiClient";
import { User } from "@/types/index";
import { AuthContext } from "@/contexts/authContext"; // 👈 import from separate file

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    apiClient
      .getCurrentUser()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!pathname.startsWith("/dashboard")) return;
    apiClient
      .getCurrentUser()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, [pathname]);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext); // ✅ same AuthContext instance
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
