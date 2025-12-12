"use client";
import Image from "next/image";
import { Button } from "@/app/_components/Miscellaneous/Button";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { decreaseUnit, increaseUnit, removeItem } from "@/state/cart/cartSlice";
import { RootState } from "@/state/store";

interface Cart {
  _id: string;
  imageUrl: string;
  name: string;
  unit: number;
  unitPrice: number;
}
interface CartProps {
  item: Cart;
}

function Cart({ item }: CartProps) {
  const cart = useSelector((state: RootState) => state.cart);

  const cartItem = cart.find((cartItem) => cartItem._id === item._id);
  const count = cartItem?.unit;
  const dispatch = useDispatch();

  function countIncreaseHandler() {
    dispatch(increaseUnit({ ...item }));
  }
  function countDecreaseHandler() {
    if (count !== undefined && count > 1) {
      dispatch(decreaseUnit({ _id: item._id }));
    }
    if (count !== undefined && count === 1) {
      dispatch(removeItem({ _id: item._id }));
    } else return;
  }
  function removeItemHandler() {
    dispatch(removeItem({ _id: item._id }));
  }
  if (!item) return null; // Handle case where item is not provided
  return (
    <div className="flex justify-between px-3 bg-rose-100 py-4">
      <div className="flex gap-2 items-center">
        <div className="relative h-16 w-14 rounded-[.3rem] overflow-hidden">
          <Image src={item.imageUrl} alt={`${item.name}'s photo`} fill />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-sm text-darkRose1 font-semibold">NGN{item.unitPrice} each</h3>
          <div
            className="flex cursor-pointer gap-2"
            onClick={removeItemHandler}
          >
            <FiTrash2 className="text-rose-500" />
            <p className="text-sm text-rose-500">Remove</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <div className="font-semibold flex justify-end">
            NGN {item.unitPrice * item.unit}
          </div>
        </div>
        <div className="flex gap-[0.675rem] items-center w-fit self-end">
          <Button
            className="w-[2rem] h-[2rem] grid place-content-center"
            onClick={countDecreaseHandler}
          >
            <FiMinus />
          </Button>
          <p>{item.unit}</p>
          <Button
            className="w-[2rem] h-[2rem] grid place-content-center"
            onClick={countIncreaseHandler}
          >
            <FiPlus />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
