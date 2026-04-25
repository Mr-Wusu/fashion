"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface HomePageContextType {
  isHomePage: boolean;
  isScrolled: boolean;
}

const HomePageContext = createContext<HomePageContextType | null>(null);

export function HomePageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const isHomePage = ["/", "/auth/sign-in", "/auth/sign-up"].includes(pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 650);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <HomePageContext.Provider value={{ isHomePage, isScrolled }}>
      {children}
    </HomePageContext.Provider>
  );
}

export function useHomePage() {
  const context = useContext(HomePageContext);
  if (!context) {
    throw new Error("useHomePage must be used inside HomePageProvider");
  }
  return context;
}
