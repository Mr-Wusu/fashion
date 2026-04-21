"use client";
import { useAuth } from "@/contexts/authProvider";
import FooterForm from "./FooterForm";
import { Role } from "@/types";


const UserFooter = () => {
  const {user} = useAuth()

  if (user?.role !== Role.USER) return null;
  if (user?.role === Role.USER)
    return (
      <div className="flex flex-col gap-3 items-center" id="user-footer">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <h2 className="text-[1rem] lg:text-base font-bold">What next?</h2>
            <p className="text-sm lg:text-base w-3/4 mx-auto">
              Do you have something else in mind? Let&apos;s make it yours. Rest
              assured it will be inch-perfect! Show us your desired outfit here:
            </p>
          </div>
        </div>
        <FooterForm />
      </div>
    );
};

export default UserFooter;
