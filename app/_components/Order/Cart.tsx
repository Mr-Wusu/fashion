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
    <div className="group flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-5 bg-white hover:bg-rose-50/50 transition-colors border-b border-rose-100 last:border-0">
      <div className="flex gap-4 items-center w-full sm:w-auto">
        {/* Modern Image Container */}
        <div className="relative h-20 w-16 rounded-xl overflow-hidden shadow-sm border border-rose-100">
          <Image
            src={orderItem.cloth.imageUrl}
            alt={orderItem.cloth.altTag || orderItem.cloth.description}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="flex flex-col gap-1 flex-1">
          <h3 className="text-sm text-gray-500 uppercase font-bold tracking-wider">
            NGN {unitPrice.toLocaleString()}{" "}
            <span className="lowercase font-normal">each</span>
          </h3>
          <p className="text-base text-darkRose2 font-medium line-clamp-1">
            {orderItem.cloth.description}
          </p>
          <button
            type="button"
            className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-800 transition-colors mt-1 w-fit"
            onClick={() => onRemove(orderItem.id)}
          >
            <FiTrash2 className="text-sm" />
            <span>REMOVE ITEM</span>
          </button>
        </div>
      </div>

      {/* Quantity & Subtotal Section */}
      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-0 border-rose-50">
        <div className="text-lg font-extrabold text-rose-900 order-2 sm:order-1">
          NGN {subtotal.toLocaleString()}
        </div>

        <div className="flex items-center gap-3 bg-gray-50 p-1 rounded-lg border border-gray-100 order-1 sm:order-2">
          <Button
            className="w-8 h-8 rounded-md bg-white border border-gray-200 text-darkRose2 hover:bg-rose-600 hover:text-white transition-all shadow-sm"
            type="button"
            onClick={() => onDecrease(orderItem.id)}
            disabled={orderItem.quantity <= 1}
          >
            <FiMinus size={12} />
          </Button>
          <span className="w-6 text-center font-bold text-darkRose2 text-sm">
            {orderItem.quantity}
          </span>
          <Button
            className="w-8 h-8 rounded-md bg-white border border-gray-200 text-darkRose2 hover:bg-rose-600 hover:text-white transition-all shadow-sm"
            type="button"
            onClick={() => onIncrease(orderItem.id)}
          >
            <FiPlus size={12} />
          </Button>
        </div>
      </div>
    </div>
  );
}