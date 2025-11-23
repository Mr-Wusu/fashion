"use client";
import Image from "next/image";


import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { IUser } from "@/types/types";
import AdminClothEffect from "./AdminClothEffect";
import Link from "next/link";
import { Button } from "../Button";
import { useState } from "react";
import EditingForm from "./EditingForm";
import ConfirmDelete from "./ConfirmDelete";

interface ICloth {
  _id: string; 
  imageUrl: string;
  altTag: string;
  price: number;
  description: string;
}

export default function Cloth({ cloth }: { cloth: ICloth }) {
  const [isEditing, setIsEditing] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false)

  const user = useSelector((state: RootState) => state.user) as IUser;
  const buttonStyle =
    "bg-gradient-to-r from-rose-700 to-rose-400 hover:bg-gradient-to-r hover:from-rose-400 hover:to-rose-700 transition-all duration-700 py-2 px-2 rounded-[.27rem] text-lightRose2 font-semibold tracking-wider";

  return (
    <figure className="flex flex-col shadow-md shadow-black/55 overflow-hidden rounded-[.7rem] h-fit w-[19rem] relative">
      {openConfirmDelete && (
        <ConfirmDelete setOpenConfirmDelete={setOpenConfirmDelete} />
      )}
      {isEditing && <EditingForm setIsEditing={setIsEditing} />}

      <div className="relative h-[14.6rem] overflow-hidden w-full ">
        {user.isAdmin && (
          <AdminClothEffect
            setIsEditing={setIsEditing}
            setOpenConfirmDelete={setOpenConfirmDelete}
          />
        )}
        <Image
          className="object-cover absolute"
          src={cloth.imageUrl}
          alt={cloth.altTag}
          fill
        />
      </div>
      <div className="flex flex-col px-3  pt-3 pb-4">
        <p className="ml-auto mr-1 font-semibold">NGN {cloth.price}</p>
        <p className="px-3">{cloth.description}</p>
        <div
          className={`mt-4 mb-1.5 px-3 ${
            user.isAdmin ? "flex justify-center " : "flex justify-between"
          }`}
        >
          {!user.isAdmin && (
            <Button className={` ${buttonStyle}`}>Add to cart</Button>
          )}
          <Link
            className={`${buttonStyle} ${
              user.isAdmin ? "w-3/4 grid place-content-center" : ""
            } `}
            href={`/clothes/${cloth._id}`}
          >
            See details
          </Link>
        </div>
      </div>
    </figure>
  );
}
