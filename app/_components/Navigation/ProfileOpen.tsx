"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  TiCloudStorageOutline,
  TiCogOutline,
  TiShoppingCart,
  TiTimes,
} from "react-icons/ti";
import { GiThink } from "react-icons/gi";
import { useEffect, useRef, useState } from "react";

import { Button } from "../Miscellaneous/Button";
import apiClient from "@/lib/apiClient";
import { useAuth } from "@/contexts/authProvider";
import { Role } from "@/types";

// Define the props interface to match useUser() return type
interface ProfileOpenProps {
  setIsProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: {
    firstname?: string;
    surname?: string;
    email?: string;
    role: "ADMIN" | "TEST_ADMIN" | "USER";
  };
  btn: string;
  nameFont: string;
}

export default function ProfileOpen({
  setIsProfileOpen,
  user,
  btn,
  nameFont,
}: ProfileOpenProps) {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const signoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { setUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    return () => {
      if (signoutTimerRef.current) {
        clearTimeout(signoutTimerRef.current);
      }
    };
  }, []);

  function toggleModal(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    setIsProfileOpen(false);
  }

  async function handleSignout() {
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

  return (
    <div
      className="w-fit absolute right-3 mt-5 bg-white shadow-lg rounded-[.5rem] p-4 z-50 flex flex-col items-start gap-3 profile-open"
      onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
    >
      <div
        className="h-6 w-6 rounded-full bg-rose-500 absolute top-[-.795rem] right-[-.8rem] cursor-pointer grid place-content-center"
        onClick={toggleModal}
      >
        <TiTimes className="text-white" />
      </div>

      <div className="text-darkRose2 text-nowrap">
        <p className={`${nameFont} md+:text-base`}>
          {user.firstname} {user.surname}
          <span className="text-rose-900 ml-1 text-sm">
            {user.role !== Role.USER ? "(Admin)" : ""}
          </span>
        </p>
        <p className="text-sm">{user.email}</p>
      </div>
      <div className="w-full h-[2px] bg-darkRose2" />
      <div className="">
        <ul className="flex flex-col gap-3 text-darkRose2 py-1 px-1 text-base">
          {user.role === Role.USER && (
            <li className="flex items-center gap-2 hover:text-darkRose1 px-1 hover:scale-110 transition-all duration-300 rounded-[.4rem]">
              <TiShoppingCart />
              <Link
                className={`${nameFont} text-[0.89rem]`}
                href="/cart"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsProfileOpen(false);
                }}
                scroll={false}
              >
                Cart
              </Link>
            </li>
          )}

          {user.role === Role.USER && (
            <>
              <li className="flex items-center gap-2 hover:text-darkRose1 px-1 hover:scale-110 transition-all duration-300 rounded-[.4rem]">
                <TiCogOutline />
                <Link
                  className={`${nameFont} text-[0.89rem]`}
                  href="/users/settings"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsProfileOpen(false);
                  }}
                  scroll={false}
                >
                  Settings
                </Link>
              </li>
            </>
          )}
          {user.role !== Role.USER && (
            <>
              <li className="flex items-center gap-2 hover:text-darkRose1 px-1 hover:scale-110 transition-all duration-300 rounded-[.4rem]">
                <TiCloudStorageOutline />
                <Link
                  className={`${nameFont} text-[0.89rem]`}
                  href="/dashboard/upload-cloth"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsProfileOpen(false);
                  }}
                  scroll={false} // Prevents scrolling to the top of the page
                >
                  Upload Cloth
                </Link>
              </li>
              <li className="flex items-center gap-2 hover:text-darkRose1 px-1 hover:scale-110 transition-all duration-300 rounded-[.4rem]">
                <TiCogOutline />
                <Link
                  className={`${nameFont} text-[0.89rem]`}
                  href="/dashboard/cloth-orders"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsProfileOpen(false);
                  }}
                  scroll={false}
                >
                  Cloth Orders
                </Link>
              </li>
              <li className="flex items-center gap-2 hover:text-darkRose1 px-1 hover:scale-110 transition-all duration-300 rounded-[.4rem]">
                <GiThink className="text-rose-900 ml-[0.155rem]" />
                <Link
                  className={`${nameFont} text-[0.89rem]`}
                  href="/dashboard/customer-suggestions"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsProfileOpen(false);
                  }}
                  scroll={false}
                >
                  Suggestions
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="w-full h-[2px] bg-darkRose2" />

      <Button
        className={`${btn} h-fit bg-gradient-to-r from-rose-700 to-rose-400 hover:bg-gradient-to-r hover:from-rose-600 hover:to-rose-300 active:scale-95 w-fit text-lightRose1 py-1 tracking-wide rounded self-center transition-bg duration-300 ease-in-out grid place-content-center px-2 font-semibold`}
        onClick={handleSignout}
      >
        {isSigningOut ? "Signing out..." : "Sign out"}
      </Button>
    </div>
  );
}
