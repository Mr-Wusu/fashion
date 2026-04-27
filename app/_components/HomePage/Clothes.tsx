"use client";

import { GiClothes } from "react-icons/gi";
import Cloth from "@/app/_components/HomePage/Cloth";
import Link from "next/link";
import { useEffect, useState } from "react";

import clothesDummy from "@/data/clothes";
import { Cloth as ICloth } from "@/types";

export default function Clothes() {
  const [clothes, setClothes] = useState<ICloth[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadClothes() {
      try {
        const response = await fetch("/api/clothes");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!active) return;

        // Prioritize DB clothes - if we have DB data, use it
        // If DB is empty, fall back to dummy data
        setClothes(data.clothes || []);
      } catch (error) {
        console.error("Failed to load clothes from DB:", error);
        if (active) {
          // On error, fall back to dummy data
          setClothes([]);
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadClothes();
    return () => {
      active = false;
    };
  }, []);

  // Prioritize DB clothes: if we have DB data (even empty array), use it
  // Only show dummy data during initial loading
  const displayClothes = isLoading
    ? clothesDummy
    : clothes && clothes.length > 0
      ? clothes
      : clothesDummy;

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
        {displayClothes.map((cloth) => (
          <Cloth key={cloth.id} cloth={cloth} />
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
