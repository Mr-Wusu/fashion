"use client";
import Cart from "./Cart";
import { useAuth } from "@/contexts/authProvider";
import apiClient from "@/lib/apiClient";
import { MdOutlineShoppingBag } from "react-icons/md";
import Link from "next/link";

export default function CartList() {
  const { user, setUser } = useAuth();

  if (!user) return null;

  const cartItems = user.orders?.flatMap((order) => order.orderItems) || [];
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Rebuilt Empty State UI
  if (cartCount === 0)
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border-2 border-dashed border-rose-100 w-full max-w-[32rem] mx-auto text-center space-y-4">
        <div className="bg-rose-50 p-4 rounded-full text-rose-400">
          <MdOutlineShoppingBag size={48} />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-darkRose2">
            Your cart is empty
          </h2>
          <p className="text-sm text-gray-500">
            Looks like you haven&apos;t picked your perfect outfit yet.
          </p>
        </div>
        <Link
          href="/shop"
          className="px-6 py-2 bg-rose-600 text-white rounded-lg text-sm font-bold hover:bg-rose-700 transition-all active:scale-95"
        >
          Explore Collections
        </Link>
      </div>
    );

  const handleIncrease = async (orderItemId: string) => {
    const item = cartItems.find((item) => item.id === orderItemId);
    if (item) {
      try {
        await apiClient.changeOrderItem(orderItemId, item.quantity + 1);
        const updatedUser = await apiClient.getCurrentUser();
        setUser(updatedUser);
      } catch (error) {
        console.error("Error increasing quantity:", error);
      }
    }
  };

  const handleDecrease = async (orderItemId: string) => {
    const item = cartItems.find((item) => item.id === orderItemId);
    if (item && item.quantity > 1) {
      try {
        await apiClient.changeOrderItem(orderItemId, item.quantity - 1);
        const updatedUser = await apiClient.getCurrentUser();
        setUser(updatedUser);
      } catch (error) {
        console.error("Error decreasing quantity:", error);
      }
    }
  };

  const handleRemove = async (orderItemId: string) => {
    try {
      await apiClient.removeOrderItem(orderItemId);
      const updatedUser = await apiClient.getCurrentUser();
      setUser(updatedUser);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <main className="w-[95%] max-w-[26rem] lg:max-w-[35rem] bg-white rounded-2xl shadow-xl shadow-rose-900/5 border border-rose-100 overflow-hidden h-fit">
      {/* Header matching Summary style */}
      <header className="px-6 py-4 bg-white border-b border-rose-50 flex justify-between items-center">
        <h1 className="text-sm font-black uppercase tracking-[0.15em] text-darkRose2">
          Your Selection
        </h1>
        <span className="bg-rose-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-tighter">
          {cartCount} {cartCount === 1 ? "Item" : "Items"}
        </span>
      </header>

      {/* Cart Items List */}
      <div className="flex flex-col">
        {cartItems.map((orderItem) => (
          <Cart
            key={orderItem.id}
            orderItem={orderItem}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onRemove={handleRemove}
          />
        ))}
      </div>

      {/* Subtle bottom footer for the list */}
      <footer className="px-6 py-3 bg-gray-50/50 border-t border-rose-50 text-center">
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          Secure Checkout Powered by Prince Agboinou-Wusu
        </p>
      </footer>
    </main>
  );
}
