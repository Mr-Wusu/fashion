"use client";
import Image from "next/image";
import { Button } from "@/app/_components/Miscellaneous/Button";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";

interface OrderCloth {
  id: string;
  imageUrl: string;
  description: string;
  altTag: string;
  price: number;
}

interface OrderItem {
  id: string;
  orderId?: string;
  clothId: string;
  cloth: OrderCloth;
  quantity: number;
  priceAtPurchase: number;
}

interface OrderItemProps {
  orderItem: OrderItem;
  onIncrease: (orderItemId: string) => void;
  onDecrease: (orderItemId: string) => void;
  onRemove: (orderItemId: string) => void;
}

export default function Cart({
  orderItem,
  onIncrease,
  onDecrease,
  onRemove,
}: OrderItemProps) {
  const unitPrice = orderItem.priceAtPurchase ?? orderItem.cloth.price;
  const subtotal = unitPrice * orderItem.quantity;

  return (
    <div className="flex justify-between px-3 bg-rose-100 py-4">
      <div className="flex gap-2 items-center">
        <div className="relative h-16 w-14 rounded-[.3rem] overflow-hidden">
          <Image
            src={orderItem.cloth.imageUrl}
            alt={orderItem.cloth.altTag || orderItem.cloth.description}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-sm text-darkRose1 font-semibold">
            NGN {unitPrice} each
          </h3>
          <p className="text-sm text-rose-700">{orderItem.cloth.description}</p>
          <button
            type="button"
            className="flex cursor-pointer gap-2 text-sm text-rose-500"
            onClick={() => onRemove(orderItem.id)}
          >
            <FiTrash2 className="text-rose-500" />
            <span>Remove</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="font-semibold flex justify-end">NGN {subtotal}</div>
        <div className="flex gap-[0.675rem] items-center w-fit self-end">
          <Button
            className="w-[2rem] h-[2rem] grid place-content-center"
            type="button"
            onClick={() => onDecrease(orderItem.id)}
            disabled={orderItem.quantity <= 1}
          >
            <FiMinus />
          </Button>
          <p>{orderItem.quantity}</p>
          <Button
            className="w-[2rem] h-[2rem] grid place-content-center"
            type="button"
            onClick={() => onIncrease(orderItem.id)}
          >
            <FiPlus />
          </Button>
        </div>
      </div>
    </div>
  );
}
