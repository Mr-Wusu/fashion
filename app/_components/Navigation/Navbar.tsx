"use client";
import { useSelector, useDispatch } from "react-redux";
import { usePathname } from "next/navigation";
import { useMounted } from "@/hooks/useMounted";
import NavLinks from "./NavLinks";
import { RootState } from "@/state/store";
import { useEffect, useState } from "react";
import { setHomePage, setScrolled } from "@/state/navbar/navbarSlice";
import { logout } from "@/state/user/userSlice";
import Link from "next/link";
import { Button } from "@/app/_components/Miscellaneous/Button";
import AdminActions from "../HomePage/AdminActions";
import UserActions from "../HomePage/UserActions";
import { IoClose } from "react-icons/io5";


export default function Navbar() {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const navbar = useSelector((state: RootState) => state.navbar);
  const user = useSelector((state: RootState) => state.user);
  const isMounted = useMounted();


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

  function handleClick() {
    setUserOpen(!userOpen);
  }

  return (
    <nav
      className={`h-16 px-4 fixed w-full z-50 shadow-md flex items-center justify-between  ${
        navbar.isHomePage && !navbar.isScrolled
          ? "text-lightRose1 bg-transparent"
          : navbar.isHomePage && navbar.isScrolled
          ? "bg-lightRose1 text-darkRose2"
          : !navbar.isHomePage
          ? "bg-lightRose1 text-darkRose2"
          : "text-darkRose2 bg-transparent"
      }`}
    >
      <h2 className={`h2-custom-font md:text-xl lg:text-2xl `}>
        Blews&apos; Stitches
      </h2>
      <NavLinks />
      {!isMounted ? (
        <div>Loading</div>
      ) : user?.isLoggedIn ? (
        <>
          <div
            className="flex items-center justify-center bg-rose-500 h-[3rem] w-[3rem] rounded-full cursor-pointer hover:bg-rose-400 transition-colors duration-300"
            onClick={handleClick}
          >
            <p className="font-semibold text-2xl">{user.firstName![0]}</p>
            <p className="font-semibold text-2xl">{user.surname![0]}</p>
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
                {user?.firstName + " " + user?.surname}{" "}
                {user?.isAdmin && <span>(Admin)</span>}
              </p>
              <p>{user?.email}</p>
            </div>
            <div className="h-[2px] w-full bg-darkRose1" />
            {user?.isAdmin ? (
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
  );
}
