import Image from "next/image";
import ClothUploadForm from "../_components/HomePage/ClothUploadForm";

export default function UploadCloth() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-1">
      <h2 className="text-darkRose2 px-4 md:px-7 text-lg md+:mb-7 lg:mb-5">
        <span className="text-rose-600 mr-2">Caveat:</span>This page comes with
        admin priviledge of uploading content for users of the application, to
        consume. Abusing such priviledge may incur legal action(s)! Kindly be
        guided!!!
      </h2>
      <div className="w-full h-fit flex md+:gap-6 lg:gap-8 items-center justify-center">
        <div className="relative hidden md+:inline-block md+:h-[25rem] md+:w-[30rem] lg:h-[22rem] lg:w-[35rem] rounded-[.7rem] overflow-hidden shadow-lg shadow-black">
          <Image
            src="/images/appPhotos/Hero2.jpg"
            alt="A stock of clothes on display"
            className="object-cover"
            fill
            priority
          />
        </div>
        <ClothUploadForm />
      </div>
    </div>
  );
}
