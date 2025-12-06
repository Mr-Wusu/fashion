
import { GiClothes } from "react-icons/gi";
import Cloth from "@/app/_components/HomePage/Cloth";
import Link from "next/link";
import { MoonLoader } from "react-spinners";
import { getAllClothes } from "@/queries/clothes";
import clothesDummy from "@/data/clothes"

export default async function Clothes() {
  const clothes = await getAllClothes();

  if (clothes === undefined)
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <MoonLoader color="#E11D48" size={50} />
      </div>
    );


  return (
    <section className="flex flex-col gap-6 bg-lightRose1 px-6 pt-11 pb-9 ">
      <div className="flex gap-[1rem] md:gap-3 lg:gap-5 items-center mx-auto">
        <GiClothes className="text-3xl text-rose-900" />
        <h3 className="capitalize text-[1.125rem] md:text-xl lg:text-2xl font-semibold lg:font-bold leading-6  text-rose-800 font-nunito lg:pb-5">
          A glance at some of our clothes
        </h3>
      </div>
      <div
        className={`grid place-items-center gap-12 md:grid-cols-2 md:gap-x-0 md:w-[45rem] lg:grid-cols-3 lg:w-full mx-auto`}
      >
        {clothes?.length === 0 ? clothesDummy.map((cloth) => (
          <Cloth key={cloth._id} cloth={cloth} />
        )): clothes.map((cloth) => (
          <Cloth key={cloth._id} cloth={cloth} />
        ))}
        
        
      </div>
      <Link
        className=" w-max font-semibold text-darkRose2 mt-2 border-b-2 border-solid border-transparent hover:border-darkRose1 p-1 transition-all  duration-300 active:scale-90 focus:border-darkRose1 focus:border-2 md:text-base lg:text-lg"
        href="/clothes"
      >
        Browse our collection &rarr;
      </Link>
    </section>
  );
}
