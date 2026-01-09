"use client";

import Link from "next/link";
import {
  TiCloudStorageOutline,
  TiCogOutline,
  TiShoppingCart,
  TiTimes,
} from "react-icons/ti";
import { GiThink } from "react-icons/gi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "@/state/user/userSlice";
import { Button } from "../Miscellaneous/Button";

// Define the props interface to match useUser() return type
interface ProfileOpenProps {
  setIsProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: {
    firstName?: string;
    surname?: string;
    email?: string;
    isAdmin: boolean;
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
  const dispatch = useDispatch();

  function toggleModal(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    setIsProfileOpen(false);
  }

  function handleSignout() {
    setIsSigningOut(true);
    setTimeout(() => {
      dispatch(logout());
      setIsSigningOut(false);
    }, 2000);
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
          {user.firstName} {user.surname}
          <span className="text-rose-900 ml-1 text-sm">
            {user.isAdmin ? "(Admin)" : ""}
          </span>
        </p>
        <p className="text-sm">{user.email}</p>
      </div>
      <div className="w-full h-[2px] bg-darkRose2" />
      <div className="">
        <ul className="flex flex-col gap-3 text-darkRose2 py-1 px-1 text-base">
          {!user.isAdmin && (
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

          {!user.isAdmin && (
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
          {user.isAdmin && (
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
