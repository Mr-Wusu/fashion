"use client";

import ProfileOpen from "./ProfileOpen";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";

type User = {
  firstname?: string;
  surname?: string;
  email?: string;
  role: "ADMIN" | "TEST_ADMIN" | "USER";
};

function User({
  setUserOpen,
}: {
  setUserOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    apiClient.getCurrentUser().then((data) => {
      if (data) setUser(data.user); 
    });
  }, []);

  if (!user) return null;

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
