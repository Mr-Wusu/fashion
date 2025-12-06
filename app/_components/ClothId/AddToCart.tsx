"use client";
import { useState } from "react";
import { Button } from "../Miscellaneous/Button";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/state/store";
import toast, { Toast } from "react-hot-toast";
import { MdClose } from "react-icons/md";

export default function AddToCart() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const addToCartHandler = async () => {
    console.log("Added item to cart");
    //check if user is looged in and is not an admin
    if (!user?.isLoggedIn)
      showToastWithCloseButton("Sign in to add cloth to cart");
  };

  const increaseHandler = () => {
    dispatch(increaseUnit({ ...cloth }));
  };

  const decreaseHandler = () => {
    if (typeof count === "number" && count >= 1) {
      dispatch(decreaseUnit({ _id: cloth._id }));
    }
  };

  function showToastWithCloseButton(message: string) {
    toast.custom((t: Toast) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } fixed top-4 right-1/2 translate-x-1/2 z-[9999] bg-white shadow-md border border-gray-200 rounded p-4 px-6 flex items-center justify-between gap-4 w-full max-w-sm`}
      >
        <span className="text-rose-900 font-semibold tracking-wide">
          {message}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toast.dismiss(t.id);
          }}
          className="text-gray-400 hover:text-gray-700 text-lg font-bold cursor-pointer"
        >
          <MdClose className="bg-rose-600 text-white h-5 w-5 rounded-full p-1  hover:bg-rose-500" />
        </button>
      </div>
    ));
  }

  return (
    <>
      {user?.isAdmin === false &&
        (isOpen ? (
          <div className="relative bg-rose-300 px-2 py-1.5 rounded-[.6rem]">
            <MdClose
              className="absolute bg-rose-600 text-white h-5 w-5 rounded-full p-1  hover:bg-rose-500 cursor-pointer -top-2 -right-4"
              onClick={() => setIsOpen(false)}
            />
            Plus and Minus
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
