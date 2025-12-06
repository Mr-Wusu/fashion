import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import UserFooter from "./UserFooter";

function Footer() {
  return (
    <footer className="flex flex-col bg-gradient-to-r from-rose-600 to-rose-900 h-fit w-full pt-7 px-6 pb-2 text-lightRose1 gap-4">
      <div className="flex flex-col w-[70%]">
        <h2 className="font-bold">Lagos Headquarters</h2>
        <p className="text-sm">
          Km 16 Obalende Expressway, Lekki Phase 1, Lagos, Nigeria.
        </p>
      </div>
      <div className="flex flex-col gap-[.22em]">
        <h2 className="font-bold">Join our social media community</h2>
        <div className="flex gap-4">
          <FaLinkedinIn className="" />
          <FaFacebookF className="" />
          <FaInstagram className="" />
          <FaTwitter className="" />
        </div>
      </div>
      <UserFooter />
      <div className="flex flex-col mx-auto text-xs mt-3">
        <p>Built by Prince Agboinou-Wusu ©️2024</p>
        <a className="mx-auto  text-[11px]" href="tel:+2348055573336">
          +2348055573336
        </a>
      </div>
    </footer>
  );
}

export default Footer;
