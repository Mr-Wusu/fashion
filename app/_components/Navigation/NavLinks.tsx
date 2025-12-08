import { RootState } from "@/state/store";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function NavLinks() {
  const user = useSelector((state: RootState) => state.user);
  const navbar = useSelector((state: RootState) => state.navbar);
  const cart = useSelector((state: RootState) => state.cart);
  const count = cart.reduce((total, item) => total + item.unit, 0);
  return (
    <ul className="flex md:space-x-3 lg:space-x-5 md:text-lg lg:text-xl -ml-12">
      <Link
        className={`cursor-pointer border-b-2 border-b-transparent px-2 transition-all duration-300 rounded-[.4rem]  ${
          !navbar.isHomePage || navbar.isScrolled
            ? "hover:border-b-darkRose2"
            : "hover:border-b-lightRose1"
        }`}
        href="/"
      >
        Home
      </Link>
      <Link
        className={`cursor-pointer border-b-2 border-b-transparent px-2 transition-all duration-300 rounded-[.4rem]   ${
          !navbar.isHomePage || navbar.isScrolled
            ? "hover:border-b-darkRose2"
            : "hover:border-b-lightRose1"
        }`}
        href="/about-us"
      >
        About Us
      </Link>
      <Link
        className={`cursor-pointer border-b-2 border-b-transparent px-2 transition-all duration-300 rounded-[.4rem]   ${
          !navbar.isHomePage || navbar.isScrolled
            ? "hover:border-b-darkRose2"
            : "hover:border-b-lightRose1"
        }`}
        href="/contact-us"
      >
        Contact Us
      </Link>
      {user.isLoggedIn && (
        <Link
          className={`relative cursor-pointer border-b-2 border-b-transparent hover:border-b-lightRose1 px-2 transition-all duration-300 rounded-[.4rem] ${
            (navbar.isHomePage && navbar.isScrolled) || !navbar.isHomePage
              ? "hover:!border-b-darkRose2"
              : ""
          }`}
          href={`${user.isAdmin ? "/orders" : "/cart"}`}
        >
          {user.isAdmin ? "Orders" : "Cart"}
          {count > 0 && (
            <span className="h-4 w-4 rounded-full grid place-content-center bg-rose-500 text-white text-xs absolute top-0 -right-2">
              {count}
            </span>
          )}
        </Link>
      )}
    </ul>
  );
}
