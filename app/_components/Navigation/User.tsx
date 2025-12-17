"use client";

import ProfileOpen from "./ProfileOpen";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useState } from "react";

function User() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const cart = useSelector((state: RootState) => state.cart);
  const user = useSelector((state: RootState) => state.user);

  function addTotal(array: { unit: number }[]) {
    return array.reduce((total, item) => total + item.unit, 0);
  }
  const cartCount = addTotal(cart);

  // Check if the user is an admin in any organization

  return (
    <div className="bg-yellow-300">
      <div
        className="h-fit relative"
        onClick={() => setIsProfileOpen((prev) => !prev)}
      >
        {cartCount > 0 && (
          <span className="h-4 w-4 rounded-full grid place-content-center bg-rose-500 text-white text-xs absolute -top-1 -right-[0.3rem] z-50 md:hidden">
            {cartCount}
          </span>
        )}
        <div
          className={`relative rounded-full flex items-center justify-center`}
        >
          <p>{user.firstName?.charAt(0)}</p>
          <p>{user.surname?.charAt(0)}</p>
        </div>
        {isProfileOpen && user && (
          <>
            <div
              className="w-screen h-screen opacity-30 bg-black fixed top-0 right-0 left-0 bottom-0 z-40"
              onClick={() => {
                setIsProfileOpen(false);
              }}
            />
            <ProfileOpen
              setIsProfileOpen={setIsProfileOpen}
              user={user}
              btn=""
              nameFont=""
            />
          </>
        )}
      </div>
    </div>
  );
}

export default User;
