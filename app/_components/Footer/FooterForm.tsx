"use client";

import { useRef, useState } from "react";
import toast, { Toast, Toaster } from "react-hot-toast";
import { PulseLoader } from "react-spinners";
import { useSelector } from "react-redux";

import { MdClose } from "react-icons/md";
import { RootState } from "@/state/store";

export default function FooterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const user = useSelector((state:RootState)=> state.user)

  function showToastWithCloseButton(message: string) {
    toast.custom((t: Toast) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } fixed top-4 right-1/2 translate-x-1/2 z-[9999] bg-white shadow-md border border-gray-200 rounded p-4 px-6 flex items-center justify-between gap-4 w-full max-w-sm transition-all duration-300`}
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
          className="text-gray-400 hover:text-gray-700 text-lg font-bold"
        >
          <MdClose className="bg-rose-600 text-white h-5 w-5 rounded-full p-1 cursor-pointer hover:bg-rose-500" />
        </button>
      </div>
    ));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (user.isLoggedIn === false) {
      showToastWithCloseButton("Sign in to send us a design");
      return;
    }

    setIsSubmitting(true);
    if (!formRef.current) {
      toast.error("Select an image file and describe it!");
      return;
    }
    const formData = new FormData(formRef.current);
    const selectedImage = formData.get("image") as File;
    const description = formData.get("description") as string;

    try {
      // Step 1: Get upload URL
      const uploadUrl = await generateUploadUrl();

      // Step 2: Upload the image
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": selectedImage.type },
        body: selectedImage,
      });
      const { storageId } = await result.json();

      await saveSpecialRequest({
        description,
        image: storageId,
      });

      toast.success("Design succesfully suggested!");
      formRef.current?.reset(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error uploading cloth", error);
      toast.error("Failed to upload your design. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="flex flex-col gap-2" ref={formRef} onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold tracking-wide ">
            Upload image here:
          </label>
          <input
            className="text-sm cursor-pointer w-48"
            type="file"
            name="image"
            required
            accept="image/*"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold tracking-wide ">
            Describe this design:
          </label>
          <textarea
            className="text-sm cursor-pointer text-darkRose2 w-48 rounded-[.5rem] p-1"
            placeholder="Describe your design here..."
            rows={4}
            name="description"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-rose200 hover:bg-rose300 transition-all duration-300 px-2 py-1 text-darkRose2 rounded-[.4rem] w-max mt-3 text-sm font-semibold tracking-wide hover:text-lightRose2 border-lightRose2 border  shadow-lg"
      >
        {isSubmitting ? (
          <div className="flex gap-2 items-center justify-center">
            <p>Sending Design</p>
            <PulseLoader color="#fecdd3" loading={true} size={8} />
          </div>
        ) : (
          "Send us your design!"
        )}
      </button>
      <Toaster />
    </form>
  );
}
