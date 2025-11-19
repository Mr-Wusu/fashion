import Link from "next/link";
import { TiShoppingCart } from "react-icons/ti";
import { VscGear } from "react-icons/vsc";


export default function AdminActions() {
  return (
    <ul className="px-3 flex flex-col gap-3 text-[.9rem]">
      <div className="flex gap-3 items-center hover:scale-110 hover:text-darkRose1 transition-all duration-300">
        <TiShoppingCart className="text-base" />
        <Link href="/cart">Cart</Link>
      </div>
      <div className="flex gap-3 items-center hover:scale-110 hover:text-darkRose1 transition-all duration-300">
        <VscGear className="text-base" />
        <Link href="/settings">Settings</Link>
      </div>
    </ul>
  );
}
