"use client";

import { Role } from "@/types";
import { useAuth } from "@/contexts/authProvider";
import ClientLink from "./ClientLink";

export default function NavLinks() {
  const { user } = useAuth();

  let cartCount: number = 0;
  if (user && user.orders) {
    cartCount = user.orders.reduce((total, order) => {
      return (
        total +
        (order.orderItems?.reduce((sum, item) => sum + item.quantity, 0) || 0)
      );
    }, 0);
  }

  return (
    <ul className="flex md:space-x-3 lg:space-x-5 md:text-lg lg:text-xl -ml-12">
      <ClientLink href="/">Home</ClientLink>
      <ClientLink href="/about-us">About Us</ClientLink>
      <ClientLink href="/contact-us">Contact Us</ClientLink>

      {user && (
        <ClientLink href={`${user.role !== Role.USER ? "/orders" : "/cart"}`}>
          {user.role !== Role.USER ? "Orders" : "Cart"}
          {user.role === Role.USER && cartCount > 0 && (
            <span className="h-4 w-4 rounded-full grid place-content-center bg-rose-500 text-white text-xs absolute top-0 -right-2">
              {cartCount}
            </span>
          )}
        </ClientLink>
      )}
    </ul>
  );
}
