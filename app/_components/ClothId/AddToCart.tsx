"use client";
import { useState } from "react";
import { Button } from "../Miscellaneous/Button";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/state/store";
// import toast, { Toast } from "react-hot-toast";
import { MdClose, MdAdd } from "react-icons/md";
import { FaMinus } from "react-icons/fa6";
import { decreaseUnit, increaseUnit } from "@/state/cart/cartSlice";
import { IClothes } from "@/types/types";

interface AddToCartProps {
  cloth: IClothes;
  styles: string;
}

export default function AddToCart({ cloth, styles }: AddToCartProps) {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const cart = useSelector((state: RootState) => state.cart);

  const cartItem = cart.find((item) => item._id === cloth._id);
  const count = cartItem?.unit;

  const increaseHandler = () => {
    dispatch(increaseUnit({ ...cloth }));
    console.log(cart);
    
  };

  const decreaseHandler = () => {
    if (typeof count === "number" && count >= 1) {
      dispatch(decreaseUnit({ _id: cloth._id }));
      console.log(cart);
    }
  };

  return (
    <>
      {user?.isAdmin === false &&
        (isOpen ? (
          <div className="relative bg-rose-300 rounded-[.6rem]">
            <MdClose
              className="absolute bg-rose-600 text-white h-5 w-5 rounded-full p-1  hover:bg-rose-500 cursor-pointer -top-2 -right-3.5"
              onClick={() => setIsOpen(false)}
            />
            <div
              className={`flex px-1 items-center  justify-between ${styles}`}
            >
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
        ))}
    </>
  );
}
