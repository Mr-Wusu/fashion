"use client";

import ProfileOpen from "./ProfileOpen";
import { Dispatch, SetStateAction } from "react";

type UserType = {
  firstname?: string;
  surname?: string;
  email?: string;
  role: "ADMIN" | "TEST_ADMIN" | "USER";
};

function User({
  setUserOpen,
  user,
}: {
  setUserOpen: Dispatch<SetStateAction<boolean>>;
  user: UserType;
}) {
  return (
    <div>
      <ProfileOpen
        setIsProfileOpen={setUserOpen}
        user={user}
        btn=""
        nameFont=""
      />
    </div>
  );
}

export default User;
