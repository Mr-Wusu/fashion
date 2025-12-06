// import Cart from "../_components/Cart";
import Back from "@/app/_components/Miscellaneous/Back";
import CartList from "@/app/_components/Cart/CartList";
import CartSummary from "@/app/_components/Cart/CartSummary";

export const metadata = {
  title: "Cart | Blews Stitches",
  description: "This page contains cart items and a general overview of them!",
};

export default function Clothes() {
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
