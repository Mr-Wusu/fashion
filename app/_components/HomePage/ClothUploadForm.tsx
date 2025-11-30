"use client";
import { PulseLoader } from "react-spinners";
import { Button } from "../Button";
import { useActionState, useEffect } from "react";
import clothUpload from "@/actions/upload-action";
import toast from "react-hot-toast";

export default function ClothUploadForm() {
  const [formState, formAction, isPending] = useActionState(clothUpload, {
    errors: {},
    successMessage: undefined, // Update initial state
  });

   useEffect(() => {
     // Handle Success
     if (formState.successMessage) {
       toast.success(formState.successMessage, {
         duration: 4000,
         icon: "✅",
       });
       // Optionally, reset the form here if needed
     }
     
     // Handle General Error
     if (formState.errors.general) {
       toast.error(formState.errors.general, {
         duration: 5000,
         icon: "❌",
       });
     }
   }, [formState.errors.general, formState.successMessage]);


  return (
    <form className="flex flex-col gap-4 px-4 py-6" action={formAction}>
      <textarea
        className="min-h-32 bg-white border-2 rounded px-2 py-1 w-[20rem] border-rose-500 focus:outline-none resize-vertical transform translateZ-0"
        placeholder="Cloth description"
        name="description"
        required
      />
      <input
        className="h-9 bg-white border-2 rounded px-2 w-[20rem] border-rose-500 focus:outline-none"
        placeholder="Enter a tag for this picture"
        required
        name="altTag"
      />
      <input
        className="h-9 bg-white border-2 rounded px-2 w-[20rem] border-rose-500 focus:outline-none"
        type="number"
        placeholder="Enter cloth's price"
        name="price"
        required
      />
      <input className="text-sm" type="file" name="image" required />
      {formState.errors && Object.keys(formState.errors).length > 0 && (
        <ul className="text-rose-500 w-80">
          {Object.entries(formState.errors).map(
            ([field, error]) =>
              field !== "general" && error && <li key={field}>{error}</li>
          )}
        </ul>
      )}
      <Button type="submit" className="min-w-fit px-2 mt-4">
        {isPending ? (
          <div className="flex gap-2 items-center justify-center">
            <p>Uploading</p>
            <PulseLoader color="#fecdd3" loading={true} size={8} />
          </div>
        ) : (
          "Upload cloth"
        )}
      </Button>
    </form>
  );
}
