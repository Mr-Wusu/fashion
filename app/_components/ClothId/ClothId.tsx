import { getAllClothes } from "@/queries/clothes";
import Image from "next/image";
import AddToCart from "./AddToCart";
import Back from "../Miscellaneous/Back";

export default async function ClothId({
  slug,
  bg,
}: {
  slug: string;
  bg: string;
}) {
  const clothes = await getAllClothes();

  const cloth = clothes?.find((cloth) => cloth._id === slug);
  console.log(cloth);

  if (!cloth) {
    return (
      <div className={`${bg} flex flex-col justify-center items-center`}>
        Cloth not found! Might have been deleted from database
      </div>
    );
  } else
    return (
      <div
        className={`flex bg-rose-100 w-full max-w-[28rem] flex-col lg+:flex-row lg+:w-fit lg+:max-w-none lg+:mx-auto md:shadow-md md:shadow-black pb-5 overflow-hidden mt-14 lg+:mt-[5.5rem] md:pb-6 lg+:pb-0 lg+:mb-5 ${bg}`}
      >
        <div
          className={`relative w-full h-[21rem] lg+:w-[26rem] md:h-[28rem] lg+:h-[34rem] overflow-hidden `}
        >
          <Image
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={cloth.imageUrl || "/placeholder-image.jpg"}
            alt={cloth.altTag}
            priority
          />
        </div>
        <div
          className={`flex flex-col gap-3 px-5 md:px-10 pt-2 md:pt-5 md:text-lg md:w-5/6 mx-auto lg+:w-[25rem] lg+:items-center lg+:justify-center`}
        >
          <h1>Cloth Id: {cloth._id}</h1>
          <div className="flex flex-col mt-2 md:text-[1.1rem]">
            <p className="font-semibold leading-5 mb-2">Name: {cloth.altTag}</p>
            <p className="text-justify">
              Description:{" "}
              {`${cloth.description} ipsum dolor sit amet, consectetur adipiscing elit. Ut ac porttitor metus, et consequat eros.`}
            </p>
          </div>
          <div className="hidden gap-7 w-4/5 mx-auto items-center lg+:flex">
            <AddToCart cloth={cloth} styles="px-2 py-[.55rem] w-[7.5rem]" />
            <Back />
          </div>
        </div>
        <div className="flex gap-7 w-4/5 ml-auto md:ml-[6.5rem] md+:ml-[7.4rem] items-center py-4 lg+:hidden">
          <AddToCart cloth={cloth} styles="px-2 py-1.5 w-[6.5rem]" />
        </div>
      </div>
    );
}
