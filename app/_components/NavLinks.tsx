import { RootState } from "@/state/store";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function NavLinks() {
  const navbar = useSelector((state: RootState) => state.navbar);
  return (
    <ul className="flex md:space-x-3 lg:space-x-5 md:text-lg lg:text-xl -ml-12">
      <Link
        className={`cursor-pointer border-b-2 border-b-transparent hover:border-b-lightRose1 px-2 transition-all duration-300 rounded-[.4rem]  ${
          !navbar.isHomePage
            ? "hover:border-b-darkRose2"
            : "hover:border-b-lightRose1"
        }`}
        href="/"
      >
        Home
      </Link>
      <Link
        className={`cursor-pointer border-b-2 border-b-transparent hover:border-b-lightRose1 px-2 transition-all duration-300 rounded-[.4rem]  ${
          !navbar.isHomePage
            ? "hover:border-b-darkRose2"
            : "hover:border-b-lightRose1"
        }`}
        href="/about-us"
      >
        About Us
      </Link>
      <Link
        className={`cursor-pointer border-b-2 border-b-transparent hover:border-b-lightRose1 px-2 transition-all duration-300 rounded-[.4rem]  ${
          !navbar.isHomePage
            ? "hover:border-b-darkRose2"
            : "hover:border-b-lightRose1"
        }`}
        href="/contact-us"
      >
        Contact Us
      </Link>
      <Link
        className={`cursor-pointer border-b-2 border-b-transparent hover:border-b-lightRose1 px-2 transition-all duration-300 rounded-[.4rem]  ${
          !navbar.isHomePage
            ? "hover:border-b-darkRose2"
            : "hover:border-b-lightRose1"
        }`}
        href="/cart"
      >
        Cart
      </Link>
    </ul>
  );
}
