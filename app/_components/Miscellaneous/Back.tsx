"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/app/_components/Miscellaneous/Button";

export default function Back() {
  const router = useRouter();
  function back() {
    router.back();
  }
  return (
    <Button className="w-fit p-2" onClick={back}>
      Back 
    </Button>
  );
}
