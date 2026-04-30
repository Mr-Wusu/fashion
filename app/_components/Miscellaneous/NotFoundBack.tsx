"use client";
import { useRouter } from "next/navigation";


export default function NotFoundBack() {
  const router = useRouter();
  function back() {
    router.back();
  }
  return (
    <button
      className="px-6 py-3 border border-gray-300 text-gray-600 rounded-lg font-medium hover:bg-gray-50 transition-all active:scale-95"
      onClick={back}
    >
      Back
    </button>
  );
}
