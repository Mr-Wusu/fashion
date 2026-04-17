
import { getCurrentuser } from "@/lib/auth";
import { Role } from "@/types";
import Link from "next/link";


export default async function NavLinks() {
  const user = await getCurrentuser()
 
  let cartCount: number;
  if (user && user.orders) {
    cartCount = user.orders.length;
  } else {
    cartCount = 0;
  }


  return (
    <ul className="flex md:space-x-3 lg:space-x-5 md:text-lg lg:text-xl -ml-12">
      <Link
        className={`cursor-pointer border-b-2 border-b-transparent px-2 transition-all duration-300 rounded-[.4rem]  `}
        href="/"
      >
        Home
      </Link>
      <Link
        className={`cursor-pointer border-b-2 border-b-transparent px-2 transition-all duration-300 rounded-[.4rem]  `}
        href="/about-us"
      >
        About Us
      </Link>
      <Link
        className={`cursor-pointer border-b-2 border-b-transparent px-2 transition-all duration-300 rounded-[.4rem]`}
        href="/contact-us"
      >
        Contact Us
      </Link>
      {user && (
        <Link
          className={`relative cursor-pointer border-b-2 border-b-transparent hover:border-b-lightRose1 px-2 transition-all duration-300 rounded-[.4rem] `}
          href={`${user.role !== Role.USER ? "/orders" : "/cart"}`}
        >
          {user.role !== Role.USER ? "Orders" : "Cart"}
          {cartCount > 0 && (
            <span className="h-4 w-4 rounded-full grid place-content-center bg-rose-500 text-white text-xs absolute top-0 -right-2">
              {cartCount}
            </span>
          )}
        </Link>
      )}
    </ul>
  );
}
