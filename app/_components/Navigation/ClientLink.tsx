"use client"
import { useHomePage } from "@/contexts/homepageContext";

import Link from "next/link";

interface ClientLinkProps {
  href: string;
  children: React.ReactNode
}

function ClientLink  ({href, children}: ClientLinkProps)  {
   const {isHomePage, isScrolled} = useHomePage()
  
 return (
   <Link
     className={`relative cursor-pointer border-b-2 border-b-transparent px-2 transition-all duration-300 rounded-[.4rem] ${isHomePage && !isScrolled ? "hover:border-b-lightRose1 px-2 transition-all duration-300 rounded-[.4rem]" : " hover:border-b-darkRose1 px-2 transition-all duration-300 rounded-[.4rem]"} `}
     href={href}
   >
     {children}
   </Link>
 );

};

export default ClientLink;
