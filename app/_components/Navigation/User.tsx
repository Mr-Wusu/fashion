"use client";

import ProfileOpen from "./ProfileOpen";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Dispatch, SetStateAction } from "react";

function User({ setUserOpen }: { setUserOpen: Dispatch<SetStateAction<boolean>> } ) {
  const user = useSelector((state: RootState) => state.user);

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
