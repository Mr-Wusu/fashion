"use client";
import Cart from "./Cart";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

// const cart = [
//   {
//     _id: 'jd77x3n1a9yy264npaph0pemg97kv5bv',
//     name: 'To be deleted ',
//     imageUrl: 'https://shiny-marlin-176.convex.cloud/api/storage/bb41c882-48ce-4279-a2ba-34a07284653a',
//     description: 'Hey there. We are testing this side of things. There can\'t be too many tests, can there?',
//     unitPrice: 12800,
//     unit: 1
//   },
//   {
//     _id: 'jd78190bj2cyhfg8pcypp0av757kgqms',
//     name: 'For testing purposes!',
//     imageUrl: 'https://shiny-marlin-176.convex.cloud/api/storage/0d86cead-6c77-4fc7-b5bb-271812a86661',
//     description: 'For testing purposes. Nothing as too many tests. Test, test and keep testing! 🍗👏🏾🎉🥂',
//     unitPrice: 129000,
//     unit: 1
//   }

// ];

export default function CartList() {
  const cart = useSelector((state: RootState) => state.cart);
  const cartCount = cart.reduce((total, item) => total + item.unit, 0);
  if (cartCount === 0)
    return (
      <h2 className="text-center text-rose-500 font-semibold p-4">
        Your cart is empty
      </h2>
    );
  return (
    <main className="flex flex-col gap-[1.2px] bg-rose-300 h-fit rounded-[.75rem] overflow-hidden shadow-sm shadow-black w-[90%] max-w-[26rem] lg:max-w-[32rem]">
      <header className="text-xl px-5 py-4 font-semibold bg-rose-100">
        Cart ({cartCount})
      </header>

      {cart.map((cartItem) => (
        <Cart item={cartItem} key={cartItem._id} />
      ))}
    </main>
  );
}
