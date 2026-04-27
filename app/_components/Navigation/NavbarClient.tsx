"use client";

import { useEffect, useRef, useState } from "react";
import { useHomePage } from "@/contexts/homepageContext";
import Link from "next/link";
import { Button } from "@/app/_components/Miscellaneous/Button";
import { IoClose } from "react-icons/io5";
import AdminActions from "@/app/_components/HomePage/AdminActions";
import UserActions from "@/app/_components/HomePage/UserActions";
import SideNav from "@/app/_components/Navigation/SideNav";
import User from "@/app/_components/Navigation/User";
import apiClient from "@/lib/apiClient";
import { useAuth } from "@/contexts/authProvider";
import { Role } from "@/types";
import { useRouter } from "next/navigation";
import NavLinks from "./NavLinks";

export default function Navbar() {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const signoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { user, setUser } = useAuth();
  const { isHomePage, isScrolled } = useHomePage();
  const router = useRouter();

  useEffect(() => {
    const timer = signoutTimerRef.current;
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  async function handleSignout() {
    if (signoutTimerRef.current) {
      clearTimeout(signoutTimerRef.current);
    }

    setIsSigningOut(true);
    const delayPromise = new Promise<void>((resolve) => {
      signoutTimerRef.current = setTimeout(resolve, 2000);
    });

    try {
      await Promise.all([apiClient.logout(), delayPromise]);
      setUser(null);
      // NavLinks is now client-side, so it will update automatically
      router.push("/");
    } catch (error) {
      console.error(`Logout error: ${error}`);
    } finally {
      if (signoutTimerRef.current) {
        clearTimeout(signoutTimerRef.current);
        signoutTimerRef.current = null;
      }
      setIsSigningOut(false);
    }
  }

  let cartCount: number = 0;
  if (user && user.orders) {
    cartCount = user.orders.reduce((total, order) => {
      return (
        total +
        (order.orderItems?.reduce((sum, item) => sum + item.quantity, 0) || 0)
      );
    }, 0);
  }

  function handleClick() {
    setUserOpen(!userOpen);
  }

  return (
    <>
      <nav
        className={`md:hidden justify-between min-h-16 items-center p-3 fixed w-full z-50 flex shadow-sm shadow-black/30 `}
      >
        <SideNav />
        <h2 className="h2-custom-font text-[1.2rem]">Blews&apos; Stitches</h2>
        {user ? (
          <div
            className={`relative flex text-darkRose1 rounded-full bg-rose-400 h-9 w-9 items-center justify-center  cursor-pointer hover:bg-rose-300 transition-colors duration-300`}
            onClick={() => setUserOpen(!userOpen)}
          >
            {user.role === Role.USER && cartCount > 0 && (
              <span className="h-4 w-4 rounded-full grid place-content-center bg-rose-500 text-white text-xs absolute -top-2 -right-1.5 z-50 md:hidden">
                {cartCount}
              </span>
            )}
            <p className="font-semibold">{user.firstname.charAt(0)}</p>
            <p className="font-semibold">{user.surname?.charAt(0)}</p>
            {userOpen && <User setUserOpen={setUserOpen} />}
          </div>
        ) : (
          <Link
            href="/auth/sign-up"
            className={`bg-gradient-to-r from-rose-700 to-rose-400 hover:bg-gradient-to-r hover:from-rose-600 hover:to-rose-300 active:scale-95 text-lightRose1 font-semibold px-2.5 py-1 tracking-wide rounded self-center transition-bg duration-300 ease-in-out $`}
          >
            Sign up
          </Link>
        )}
      </nav>
      <nav
        className={`hidden md:flex h-16 px-4 fixed w-full z-50 shadow-md items-center justify-between ${isHomePage && !isScrolled ? "text-lightRose2 hover:" : !isHomePage && !isScrolled ? "bg-rose-50 text-darkRose2" : "bg-rose-50 text-darkRose2"} `}
      >
        <h2 className={`h2-custom-font md:text-xl lg:text-2xl `}>
          Blews&apos; Stitches
        </h2>
        <NavLinks />
        {user ? (
          <>
            <div
              className="flex items-center justify-center bg-rose-500 h-[3rem] w-[3rem] rounded-full cursor-pointer hover:bg-rose-400 transition-colors duration-300"
              onClick={handleClick}
            >
              <p className="font-semibold text-2xl">{user.firstname[0]}</p>
              <p className="font-semibold text-2xl">{user.surname[0]}</p>
            </div>
            <div
              className={`text-darkRose2 absolute pl-3.5 pr-[1.3rem] pt-2 pb-3 rounded-[.5675rem] flex flex-col gap-3 top-20 -right-64 opacity-0 z-30  bg-lightRose2 ${
                userOpen &&
                "right-6 opacity-100 transition-all duration-300 shadow-md shadow-black/30"
              }`}
            >
              <div
                className="absolute z-20 -top-2 -right-2 h-5 w-5 rounded-full grid place-content-center bg-rose-600 text-lightRose2 cursor-pointer hover:bg-rose-500 transition-all duration-200"
                onClick={handleClick}
              >
                <IoClose className="text-[1.125rem]" />
              </div>
              <div className="flex flex-col text-[.95rem] ">
                <p className="">
                  {user?.firstname + " " + user?.surname}{" "}
                  {user.role !== Role.USER && <span>(Admin)</span>}
                </p>
                <p>{user?.email}</p>
              </div>
              <div className="h-[2px] w-full bg-darkRose1" />
              {user.role !== Role.USER ? (
                <AdminActions onClick={handleClick} />
              ) : (
                <UserActions />
              )}
              <div className="h-[2px] w-full bg-darkRose1" />
              <div className="w-full flex items-end">
                <Button
                  className="px-2.5 ml-auto"
                  onClick={handleSignout}
                  disabled={isSigningOut}
                >
                  {isSigningOut ? "Signing out..." : "Sign out"}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <Link
            className={`bg-gradient-to-r from-rose-700 to-rose-400 hover:bg-gradient-to-r hover:from-rose-600 hover:to-rose-300 active:scale-95 text-lightRose1 px-2.5 py-1 tracking-wide rounded self-center transition-bg duration-300 ease-in-out $`}
            href="/auth/sign-up"
          >
            Sign up
          </Link>
        )}
      </nav>
    </>
  );
}
