"use client";
import { Button } from "@/app/_components/Miscellaneous/Button";
import { useAuth } from "@/contexts/authProvider";
import { MdVerifiedUser } from "react-icons/md";

function CartSummary() {
  const { user } = useAuth();
  if (!user) return null;

  const cartItems = user.orders?.flatMap((order) => order.orderItems) || [];
  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.priceAtPurchase ?? 0) * item.quantity,
    0,
  );

  return (
    <aside className="flex flex-col gap-6 w-full max-w-[26rem] lg:self-start">
      <div className="bg-white rounded-2xl shadow-xl shadow-rose-900/5 border border-rose-100 overflow-hidden">
        <header className="px-6 py-4 bg-gradient-to-r from-rose-600 to-rose-900 text-white uppercase text-xs font-bold tracking-[0.2em]">
          Order Summary
        </header>

        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center text-gray-500 text-sm">
            <span>Subtotal ({cartItems.length} items)</span>
            <span className="font-semibold text-darkRose2">
              NGN {totalPrice.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between items-center text-gray-500 text-sm pb-4 border-b border-gray-100">
            <span>Estimated Delivery</span>
            <span className="text-rose-600 font-medium italic text-xs uppercase">
              Calculated at checkout
            </span>
          </div>

          <div className="flex justify-between items-center pt-2">
            <h3 className="text-lg font-bold text-darkRose2 uppercase tracking-tight">
              Total
            </h3>
            <p className="text-2xl font-black text-rose-600">
              NGN {totalPrice.toLocaleString()}
            </p>
          </div>

          <Button className="w-full py-4 mt-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-lg shadow-rose-600/20 transition-all active:scale-95 font-bold uppercase tracking-widest text-xs">
            Proceed to Checkout
          </Button>
        </div>
      </div>

      {/* Trust Badge Section */}
      <div className="bg-rose-50/50 rounded-2xl p-5 border border-rose-100 flex gap-4 items-center shadow-sm">
        <div className="bg-white p-3 rounded-full shadow-sm text-rose-600">
          <MdVerifiedUser size={24} />
        </div>
        <div>
          <h3 className="font-bold text-darkRose2 text-sm">
            Safe & Easy Returns
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Free returns within{" "}
            <span className="font-bold text-rose-600">7 days</span> for all
            eligible items in your region.
          </p>
        </div>
      </div>
    </aside>
  );
}

export default CartSummary;
