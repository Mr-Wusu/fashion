"use client";

import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import apiClient from "@/lib/apiClient";
import { AuthUser } from "@/types/index";
import { AuthContext } from "@/contexts/authContext"; 
import { toAuthUser } from "@/lib/helperFunctions";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    apiClient
      .getCurrentUser()
      .then(toAuthUser) // map full User → AuthUser
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!pathname.startsWith("/dashboard")) return;
    apiClient
      .getCurrentUser()
      .then(toAuthUser) // map full User → AuthUser
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
