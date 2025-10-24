import Image from "next/image";
import AuthForm from "@/app/_components/AuthForm";

const signUpBg = "/images/otherPhotos/male-female.webp";

interface PageProps {
  params: Promise<{ action: string }>;
}

export default async function Page({ params }: PageProps) {
  const { action } = await params;
  return (
    <div className="center-page">
      <div className="h-full w-full absolute top-0 left-0 z-10">
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
