"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import toast, { Toast, Toaster } from "react-hot-toast";
import { PulseLoader } from "react-spinners";
import { MdClose, MdCloudUpload } from "react-icons/md";
import { useAuth } from "@/contexts/authProvider";
import suggestDesign from "@/actions/suggestions-action";

export default function FooterForm() {
  const [fileName, setFileName] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { user } = useAuth();

  // Initialize Action State with suggestDesign server action
  const [formState, formAction, isPending] = useActionState(suggestDesign, {
    errors: {},
  });

  // Effect to handle feedback from server action
  useEffect(() => {
    if (formState?.errors?.general) {
      toast.error(formState.errors.general, {
        duration: 5000,
        icon: "❌",
      });
    } else if (formState?.success) {
      toast.success("Design successfully suggested!");
      formRef.current?.reset();
      setFileName(null);
    }
  }, [formState]);

  // Handle file name display for custom UI
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : null);
  };

  // Custom toast logic for unauthorized users
  function showToastWithCloseButton(message: string) {
    toast.custom((t: Toast) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } fixed top-4 right-1/2 translate-x-1/2 z-[9999] bg-white shadow-xl border border-gray-100 rounded-lg p-4 px-6 flex items-center justify-between gap-4 w-full max-w-sm transition-all duration-300`}
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
          className="group"
        >
          <MdClose className="bg-rose-600 text-white h-6 w-6 rounded-full p-1 cursor-pointer group-hover:bg-rose-500 transition-colors" />
        </button>
      </div>
    ));
  }

  // Wrapper function to check auth before triggering the server action
  const handleAction = (formData: FormData) => {
    if (!user) {
      showToastWithCloseButton("Sign in to send us a design");
      return;
    }
    formAction(formData);
  };

  return (
    <form
      className="flex flex-col gap-5 w-full"
      ref={formRef}
      action={handleAction}
    >
      <div className="grid grid-cols-1 gap-4">
        {/* Styled File Input */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Reference Image
          </label>
          <div className="relative group">
            <input
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              type="file"
              name="image"
              required
              accept="image/*"
              onChange={handleFileChange}
            />
            <div className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-gray-200 group-hover:border-rose-400 rounded-xl transition-all bg-gray-50">
              <MdCloudUpload className="text-2xl text-rose-600" />
              <span className="text-sm text-gray-600 truncate">
                {fileName || "Click to upload design"}
              </span>
            </div>
          </div>
        </div>

        {/* Styled Textarea */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Design Description
          </label>
          <textarea
            className="text-sm w-full border-2 border-gray-100 focus:border-rose-500 focus:ring-0 rounded-xl p-3 transition-all outline-none bg-gray-50 text-darkRose2 placeholder:text-gray-400"
            placeholder="Tell us about the fabric, fit, or special details..."
            rows={4}
            name="description"
            required
          />
        </div>
      </div>

      {/* Field-specific error display */}
      {formState?.errors && Object.keys(formState.errors).length > 0 && (
        <ul className="text-rose-500 text-xs">
          {Object.entries(formState.errors).map(
            ([field, error]) =>
              field !== "general" &&
              error && <li key={field}>{String(error)}</li>,
          )}
        </ul>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-rose-600 hover:bg-rose-700 disabled:bg-gray-400 text-white py-3 rounded-xl font-bold shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
      >
        {isPending ? (
          <>
            <span className="text-sm">Processing Design...</span>
            <PulseLoader color="#ffffff" loading={true} size={6} />
          </>
        ) : (
          "Send Design Suggestion"
        )}
      </button>
      <Toaster position="top-center" />
    </form>
  );
}
