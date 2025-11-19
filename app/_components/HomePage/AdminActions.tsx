import Link from "next/link";
import { LuCloudUpload } from "react-icons/lu";
import { MdShoppingCartCheckout } from "react-icons/md";
import { GiThink } from "react-icons/gi";

interface AdminActionsProps {
  onClick: () => void;
}

export default function AdminActions({ onClick }: AdminActionsProps) {
  return (
    <ul className="px-3 flex flex-col gap-3 text-[.9rem]">
     
      <div className="flex gap-3 items-center hover:text-darkRose1 hover:scale-110 transition-all duration-300">
        <LuCloudUpload className="text-base" />
        <Link href="/upload-cloth" onClick={onClick}>Upload Cloth</Link>
      </div>
      <div className="flex gap-3 items-center hover:scale-110 hover:text-darkRose1 transition-all duration-300">
        <MdShoppingCartCheckout className="text-base" />
        <Link href="/orders" onClick={onClick}>Cloth Orders</Link>
      </div>
      <div className="flex gap-3 items-center hover:scale-110 hover:text-darkRose1 transition-all duration-300">
        <GiThink className="text-base" />
        <Link href="/suggestions" onClick={onClick}>Suggested Wears</Link>
      </div>
    </ul>
  );
}
