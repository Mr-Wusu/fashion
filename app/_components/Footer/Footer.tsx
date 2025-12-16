import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import UserFooter from "./UserFooter";

function Footer() {
  return (
    <footer className="flex flex-col bg-gradient-to-r from-rose-600 to-rose-900 h-fit w-full pt-7 px-6 pb-2 text-lightRose1 gap-4 items-center text-center">
      <div className="flex flex-col w-[70%]">
        <h2 className="font-bold">Lagos Headquarters</h2>
        <p className="text-sm lg:text-base">
          Km 16 Obalende Expressway, Lekki Phase 1, Lagos, Nigeria.
        </p>
      </div>
      <div className="flex flex-col gap-[.22em]">
        <h2 className="font-bold">Join our social media community</h2>
        <div className="flex gap-4 items-center justify-center">
          <FaLinkedinIn className="" />
          <FaFacebookF className="" />
          <FaInstagram className="" />
          <FaTwitter className="" />
        </div>
      </div>
      <UserFooter />
      <div className="flex flex-col mx-auto text-xs lg:text-base mt-3">
        <p>Built by Prince Agboinou-Wusu ©️2025</p>
        <a
          className="mx-auto  text-[11px] lg:text-base"
          href="tel:+2347031099402"
        >
          +2347031099402
        </a>
      </div>
    </footer>
  );
}

export default Footer;
