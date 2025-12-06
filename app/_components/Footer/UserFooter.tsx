"use client";
import { useSelector } from "react-redux";
import FooterForm from "./FooterForm";
import { RootState } from "@/state/store";

const UserFooter = () => {
  const user = useSelector((state: RootState) => state.user);

  if (user.isAdmin) return null;
  if (!user.isAdmin)
    return (
      <div className="flex flex-col gap-3" id="user-footer">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <h2 className="text-[1rem] font-bold">What next?</h2>
            <p className="text-sm">
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
