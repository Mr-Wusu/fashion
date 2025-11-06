"use client"

import { MdDelete, MdEditDocument } from "react-icons/md";

interface AdminClothEffectProps {
  setIsEditing: (isEditing: boolean) => void;
  setOpenConfirmDelete: (openConfirmDelete: boolean) => void;

}

export default function AdminClothEffect({
  setIsEditing,
  setOpenConfirmDelete,
}: AdminClothEffectProps) {
  const buttonStyles =
    "h-7 w-7 text-rose-600 hover:text-rose-500 transition-all duration-200 cursor-pointer";
  return (
    <div className="absolute z-30 flex justify-between px-3 w-full top-3">
      <MdEditDocument
        className={`${buttonStyles}`}
        onClick={() => setIsEditing(true)}
      />
      <MdDelete
        className={`${buttonStyles}`}
        onClick={() => setOpenConfirmDelete(true)}
      />
    </div>
  );
}
