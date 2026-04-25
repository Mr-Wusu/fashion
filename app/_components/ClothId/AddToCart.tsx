"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../Miscellaneous/Button";

// import toast, { Toast } from "react-hot-toast";
import { MdClose, MdAdd } from "react-icons/md";
import { FaMinus } from "react-icons/fa6";

import { useAuth } from "@/contexts/authProvider";
import apiClient from "@/lib/apiClient";

import { Cloth, Role } from "@/types";

interface AddToCartProps {
  cloth: Cloth;
  styles: string;
}

export default function AddToCart({ cloth, styles }: AddToCartProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useAuth();
  const router = useRouter();

  if (user?.role === Role.ADMIN || user?.role === Role.TEST_ADMIN) return null;

  if (!user) {
    return (
      <Button
        className={`tracking-wider px-2 py-1.5 w-fit ${styles}`}
        onClick={() => router.push("/auth/sign-in")}
      >
        Add to Cart
      </Button>
    );
  }

  // Find the order item for this cloth in the user's orders
  const orderItem =
    user.orders
      ?.flatMap((order) => order.orderItems)
      .find((item) => item.cloth.id === cloth.id) || null;

  const count = orderItem?.quantity || 0;

  const increaseHandler = async () => {
    if (!user) return;
    try {
      if (orderItem) {
        await apiClient.changeOrderItem(orderItem.id, count + 1);
      } else {
        await apiClient.addOrderItem(cloth.id, 1);
      }
      // Refetch user to update the cart
      const updatedUser = await apiClient.getCurrentUser();
      setUser(updatedUser);
    } catch (error) {
      console.error("Error updating cart:", error);
      // Optionally show toast or handle error
    }
  };

  const decreaseHandler = async () => {
    if (!user || !orderItem || count <= 1) return;
    try {
      await apiClient.changeOrderItem(orderItem.id, count - 1);
      // Refetch user to update the cart
      const updatedUser = await apiClient.getCurrentUser();
      setUser(updatedUser);
    } catch (error) {
      console.error("Error updating cart:", error);
      // Optionally show toast or handle error
    }
  };

  return (
    <>
      {isOpen ? (
        <div className="relative bg-rose-300 rounded-[.6rem]">
          <MdClose
            className="absolute bg-rose-600 text-white h-5 w-5 rounded-full p-1  hover:bg-rose-500 cursor-pointer -top-2 -right-3.5"
            onClick={() => setIsOpen(false)}
          />
          <div className={`flex px-1 items-center  justify-between ${styles}`}>
            <Button className="px-2" onClick={increaseHandler}>
              <MdAdd className="text-sm" />
            </Button>
            <Button className="px-2" onClick={decreaseHandler}>
              <FaMinus className="text-sm" />
            </Button>
          </div>
        </div>
      ) : (
        <Button
          className="tracking-wider px-2 py-1.5 w-fit"
          onClick={() => setIsOpen(true)}
        >
          Add to Cart
        </Button>
      )}
    </>
  );
}
