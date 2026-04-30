"use client";

import { deleteClothAction } from "@/actions/delete-cloth";
import { Button } from "@/app/_components/Miscellaneous/Button";
import { ButtonWhite } from "@/app/_components/Miscellaneous/ButtonWhite";
import toast from "react-hot-toast";

interface ConfirmDeleteProps {
  setOpenConfirmDelete: (isOpen: boolean) => void;
  clothId: string; // Add this prop
}

export default function ConfirmDelete({
  setOpenConfirmDelete,
  clothId,
}: ConfirmDeleteProps) {
  async function handleDelete(id:string) {
    const res = await deleteClothAction(id);
    if (res.success) {
      toast.success("Deleted successfully");
      setOpenConfirmDelete(false);
    } else {
      toast.error(res.error || "Failed to delete");
    }
  }

  return (
    <div className="absolute top-0 flex flex-col items-center justify-center w-full h-full bg-white bg-opacity-90 rounded-[.7rem] shadow-lg shadow-black p-6 z-50 text-center">
      <h2 className="text-rose-800 font-semibold text-lg">
        Are you sure you want to delete this item?
      </h2>
      <p className="text-gray-600">This action cannot be undone.</p>
      <div className="flex gap-4 mt-4">
        <Button className="px-2" onClick={() => handleDelete(clothId)}>
          Delete
        </Button>
        <ButtonWhite
          className="bg-lightRose1 text-rose-800 hover:bg-rose-300 hover:text-white"
          onClick={() => setOpenConfirmDelete(false)}
        >
          Cancel
        </ButtonWhite>
      </div>
      <p className="text-gray-500 text-sm mt-2">
        This action will permanently delete the item from the database.
      </p>
    </div>
  );
}
