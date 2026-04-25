import Image from "next/image";
import AuthForm from "@/app/_components/Miscellaneous/AuthForm";

const signUpBg =
  "/images/otherPhotos/black-hands-fashion-designer-sewing-clothes-sewing-machine-tailoring-workshop-black-hands.webp";

interface PageProps {
  params: Promise<{ action: string }>;
}

export default async function Page({ params }: PageProps) {
  const { action } = await params;
  return (
    <div className="center-page relative h-screen w-full">
      <div className="absolute w-full h-full bg-gradient-to-r from-darkRose1 to-darkRose1 z-10 top-0 opacity-[.40] left-0" />
      <div className="absolute w-full h-full z-5 top-0 left-0">
        <Image
          fill
          src={signUpBg}
          alt="Sign up image"
          sizes="(max-width: 768px) 100vw, 100vw"
          priority
        />
      </div>
      <AuthForm mode={action as "sign-in" | "sign-up"} />
    </div>
  );
}
