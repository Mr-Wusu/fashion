// import Cart from "../_components/Cart";
import Back from "@/app/_components/Miscellaneous/Back";
import CartList from "@/app/_components/Order/CartList";
import CartSummary from "@/app/_components/Order/CartSummary";
import { getCurrentuser } from "@/lib/auth";
import { Role } from "@/types";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Cart | Blews Stitches",
  description: "This page contains cart items and a general overview of them!",
};

export default async function Cart() {
  const user = await getCurrentuser()
  if(user?.role !== Role.USER) throw new Error("The page you are trying to view is for users not admin")

  return (
    <div className="min-h-screen pt-[5rem] pb-11 flex flex-col gap-3 items-center justify-center">
      <h1 className="text-rose-600 self-center mb-7">
        This feature is currently under development!
      </h1>
      <div className="flex flex-col gap-7 items-center lg:flex-row-reverse lg:justify-center mb-6">
        <CartSummary />
        <CartList />
      </div>
      <Back />
    </div>
  );
}
