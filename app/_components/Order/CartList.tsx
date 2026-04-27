"use client";
import Cart from "./Cart";
import { useAuth } from "@/contexts/authProvider";
import apiClient from "@/lib/apiClient";

export default function CartList() {
  const { user, setUser } = useAuth();

  if (!user) return null;

  const cartItems = user.orders?.flatMap((order) => order.orderItems) || [];
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  if (cartCount === 0)
    return (
      <h2 className="text-center text-rose-500 font-semibold p-4">
        Your cart is empty
      </h2>
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
    <main className="flex flex-col gap-[1.2px] bg-rose-300 h-fit rounded-[.75rem] overflow-hidden shadow-sm shadow-black w-[90%] max-w-[26rem] lg:max-w-[32rem]">
      <header className="text-xl px-5 py-4 font-semibold bg-rose-100">
        Cart ({cartCount})
      </header>
      {cartItems.map((orderItem) => (
        <Cart
          key={orderItem.id}
          orderItem={orderItem}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          onRemove={handleRemove}
        />
      ))}
    </main>
  );
}

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
