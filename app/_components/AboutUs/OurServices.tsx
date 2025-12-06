import Image from "next/image";
import { GiClothes } from "react-icons/gi";
import { MdSchool } from "react-icons/md";
export default function OurServices() {
  return (
    <section className="sm:pt-14 md:pt-0  pb-14 md:mb-[5rem] lg:pb-0 px-7 text-center sm:px-4">
      <div className="flex md:hidden flex-col gap-4 pt-8 ">
        <div className="flex flex-col gap-2 ">
          <h1 className="text-3xl leading-10 font-semibold">
            See Our <span className="text-rose-700">Core</span> Services
          </h1>
          <p
            className="
           lg:text-lg leading-8"
          >
            At the heart of our business is a passion for fashion and
            creativity. We specialize in delivering high-quality, personalized
            fashion solutions that cater to your unique style and needs. Explore
            our core services below
          </p>
        </div>
        <div className="flex flex-col gap-7 ">
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 mt-2 justify-center ">
              <GiClothes className="text-2xl text-darkRose1" />
              <h2 className="text-xl font-semibold text-darkRose1 text-center">
                Custom Clothing Design
              </h2>
            </div>
            <p className="text-lg leading-8">
              We create unique, tailor-made clothing that reflects your personal
              style and fits you perfectly. From concept to creation, we ensure
              every piece is crafted with care and precision.
            </p>
            <div className="w-full max-w-[25rem] mx-auto h-[15.5rem] rounded-[.6rem] relative overflow-hidden shadow-md shadow-black mt-2">
              <Image
                src="/images/appPhotos/photo-8.jpg"
                alt="photo showing a fashion designer making sketches"
                className="object-cover "
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 justify-center mt-2">
              <MdSchool className="text-2xl text-darkRose1" />
              <h2 className="text-xl font-semibold text-darkRose1 text-center">
                Training Fashion Designers
              </h2>
            </div>
            <p className="text-lg leading-8">
              We empower aspiring fashion designers with hands-on training and
              expert guidance. From sketching to sewing, our program hones your
              creative skills and technical precision, shaping you into a
              confident, industry-ready designer.
            </p>
            <div className="w-full max-w-[25rem] mx-auto mt-2 h-[15.5rem] rounded-[.6rem] relative overflow-hidden shadow-md shadow-black">
              <Image
                src="/images/appPhotos/photo-6.jpg"
                alt="photo showing a fashion designer making sketches"
                className="object-cover "
                fill
              />
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:grid grid-cols-4 grid-rows-[repeat(7,minmax(6.5rem,1fr))] md: lg:grid-rows-[repeat(8,minmax(0,1fr))] gap-x-12 px-12 h-[46.375rem] gap-y-6 md:mt-[-1rem]">
        <header className="col-span-full flex flex-col gap-3 pb-3 md:pb-0 items-center justify-end pt-8  text-center row-start-1 row-end-3">
          <h1 className="text-4xl leading-[3rem] ">
            See Our <span className="text-rose-700">Core</span> Services
          </h1>
          <p className="text-lg w-5/6">
            At the heart of our business is a passion for fashion and
            creativity. We specialize in delivering high-quality, personalized
            fashion solutions that cater to your unique style and needs. Explore
            our core services below
          </p>
        </header>
        <article className="flex flex-col gap-5  col-start-1 col-end-3 row-[3/-1] justify-start">
          <div className="mb-4 md:mb-0">
            <div className="flex gap-4 justify-center">
              <GiClothes className="text-2xl text-darkRose1" />
              <h2 className="text-xl font-semibold text-darkRose1 text-center">
                Custom Clothing Design
              </h2>
            </div>
            <p className="text-lg leading-8">
              We create unique, tailor-made clothing that reflects your personal
              style and fits you perfectly. From concept to creation, we ensure
              every piece is crafted with care and precision.
            </p>
          </div>

          <div className="w-5/6 h-[20rem] rounded-[.6rem] relative overflow-hidden shadow-md shadow-black self-center flex">
            <Image
              src="/images/appPhotos/photo-8.jpg"
              alt="photo showing a fashion designer making sketches"
              className="object-cover "
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
            />
          </div>
        </article>
        <article className="flex flex-col gap-5 col-start-3 col-end-5 row-[3/-1] justify-start">
          <div>
            <div className="flex gap-4 justify-center">
              <MdSchool className="text-2xl text-darkRose1" />
              <h2 className="text-xl font-semibold text-darkRose1 text-center">
                Training Fashion Designers
              </h2>
            </div>
            <p className="text-lg leading-8">
              We empower aspiring fashion designers with hands-on training and
              expert guidance. From sketching to sewing, our program hones your
              creative skills and technical precision, shaping you into{" "}
              <a href=""> </a>
            </p>
          </div>

          <div className="w-5/6 h-[20rem] rounded-[.6rem] relative overflow-hidden shadow-md shadow-black self-center">
            <Image
              src="/images/appPhotos/photo-6.jpg"
              alt="photo showing a fashion designer making sketches"
              className="object-cover "
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
            />
          </div>
        </article>
      </div>
    </section>
  );
}