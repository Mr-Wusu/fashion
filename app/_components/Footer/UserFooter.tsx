"use client";
import { useAuth } from "@/contexts/authProvider";
import FooterForm from "./FooterForm";
import { Role } from "@/types";

const UserFooter = () => {
  const { user } = useAuth();

  // Only render for users with the USER role
  if (user?.role !== Role.USER) return null;

  return (
    <div
      className="w-full max-w-2xl mx-auto mt-6 p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl"
      id="user-footer"
    >
      <div className="flex flex-col gap-4 items-center">
        <div className="text-center space-y-2">
          <h2 className="text-xl lg:text-2xl font-extrabold tracking-tight text-white">
            What next?
          </h2>
          <p className="text-sm lg:text-base text-rose-100 max-w-md mx-auto leading-relaxed">
            Do you have something else in mind? Let&apos;s make it yours. Rest
            assured it will be{" "}
            <span className="font-semibold text-white underline decoration-rose-400 underline-offset-4">
              inch-perfect
            </span>
            ! Show us your desired outfit here:
          </p>
        </div>

        {/* The Form Container */}
        <div className="w-full bg-white rounded-xl p-4 shadow-inner text-darkRose2">
          <FooterForm />
        </div>
      </div>
    </div>
  );
};

export default UserFooter;
