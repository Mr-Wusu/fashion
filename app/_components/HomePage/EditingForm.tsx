"use client";

import { useActionState, useEffect, useRef } from "react";
import editCloth from "@/actions/editing-action";
import { Button } from "../Miscellaneous/Button";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import { Cloth } from "@/types";

interface EditingFormProps {
  setIsEditing: (isEditing: boolean) => void;
  cloth: Cloth;
}

export default function EditingForm({ setIsEditing, cloth }: EditingFormProps) {
  const editClothWithId = editCloth.bind(null, cloth.id);
  const hasSubmitted = useRef(false); // Prevents instant toast on mount

  const [state, formAction, isPending] = useActionState(editClothWithId, {
    errors: {},
  });

  useEffect(() => {
    if (!hasSubmitted.current) return;

    if (state.errors.general) {
      toast.error(state.errors.general);
      hasSubmitted.current = false;
    } else if (Object.keys(state.errors).length === 0 && !isPending) {
      toast.success("Cloth updated!");
      setIsEditing(false);
    }
  }, [state.errors, isPending, setIsEditing]);

  return (
    <form
      action={(formData) => {
        hasSubmitted.current = true;
        formAction(formData);
      }}
      className="pt-9 absolute inset-0 bg-white/90 z-40 p-4 flex top-0 flex-col h-full w-full gap-6"
    >
      <IoClose
        className="h-6 w-6 bg-rose-700 hover:bg-rose-600 transition-colors duration-200 text-lightRose2 rounded-full absolute right-1 top-1 cursor-pointer"
        onClick={() => setIsEditing(false)}
      />

      <input type="file" name="image" accept="image/*" />

      <textarea
        className="flex-grow bg-white border-2 rounded px-2 w-full border-rose-500 focus:outline-none"
        placeholder="Description"
        name="description"
        defaultValue={cloth.description}
      />

      <input
        className="h-9 bg-white border-2 rounded px-2 w-full border-rose-500 focus:outline-none"
        type="number"
        name="price"
        placeholder="Set price. Numbers only"
        defaultValue={cloth.price}
      />

      <input
        className="h-9 bg-white border-2 rounded px-2 w-full border-rose-500 focus:outline-none"
        name="altTag"
        placeholder="Enter a tag for the cloth"
        defaultValue={cloth.altTag}
      />

      <Button type="submit" disabled={isPending} className="py-1.5 px-1.5">
        {isPending ? "Updating..." : "Save Changes"}
      </Button>
    </form>
  );
}
