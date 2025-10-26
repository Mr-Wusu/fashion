"use client";
import { useSelector, useDispatch } from "react-redux";
import { usePathname } from "next/navigation";

import NavLinks from "./NavLinks";
import { RootState } from "@/state/store";
import { useEffect, useState } from "react";
import { setHomePage, setScrolled } from "@/state/navbar/navbarSlice";
import { logout } from "@/state/user/userSlice";
import Link from "next/link";
import { Button } from "./Button";

export default function Navbar() {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const navbar = useSelector((state: RootState) => state.navbar);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(setHomePage(pathname === "/"));

    const handleScroll = () => {
      dispatch(setScrolled(window.scrollY > 650));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname, dispatch]);

  function handleSignout() {
    setIsSigningOut(true);
    setTimeout(() => {
      dispatch(logout());
      setIsSigningOut(false);
    }, 2000); 
  }

  

  return (
    <nav
      className={`h-16 px-4 fixed w-full z-50 shadow-md flex items-center justify-between  ${
        navbar.isHomePage && !navbar.isScrolled
          ? "text-lightRose1 bg-transparent"
          : navbar.isHomePage && navbar.isScrolled
          ? "bg-lightRose1 text-darkRose2"
          : !navbar.isHomePage
          ? "bg-transparent text-darkRose2"
          : "text-darkRose2 bg-transparent"
      }`}
    >
      <h2 className={`h2-custom-font md:text-xl lg:text-2xl `}>
        Blews&apos; Stitches
      </h2>
      <NavLinks />
      {user.isLoggedIn ? (
        <div className="flex gap-2.5 items-center">
          <p className="tracking-wide">
            Welcome {user.firstName}
            <span className="ml-0.5">{user.isAdmin ? " (Admin)" : "!"}</span>
          </p>
          <Button
            className="px-2.5"
            onClick={handleSignout}
            disabled={isSigningOut}
          >
            {isSigningOut ? "Signing out..." : "Sign out"}
          </Button>
        </div>
      ) : (
        <Link
          className={`bg-gradient-to-r from-rose-700 to-rose-400 hover:bg-gradient-to-r hover:from-rose-600 hover:to-rose-300 active:scale-95 text-lightRose1 px-2.5 py-1 tracking-wide rounded self-center transition-bg duration-300 ease-in-out $`}
          href="/auth/sign-up"
        >
          Sign up
        </Link>
      )}
    </nav>
  );
}
