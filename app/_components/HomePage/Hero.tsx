import Image from "next/image";
const heroImage1 = "/images/appPhotos/photo-10.jpg";
const heroImage2 = "/images/appPhotos/photo-2.jpg";

const testifiersImages = [
  "/images/testifiers/DSC_3090.JPG",
  "/images/testifiers/prince1.jpg",
  "/images/testifiers/testifier-1.jpg",
  "/images/testifiers/testifier-2.jpg",
  "/images/testifiers/testifier-3.jpg",
  "/images/testifiers/ty3.jpg",
];

export default async function Hero() {
  return (
    <>
      <section className="h-[450px] w-full relative sm:hidden">
        <div className="absolute w-full h-full bg-gradient-to-r from-darkRose1 to-darkRose1 z-10 top-0 opacity-[.50] left-0" />
        <div className="absolute w-full h-full z-5 top-0 left-0">
          <Image
            fill
            src={heroImage2}
            alt="The Hero image"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="flex gap-3 absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-center z-20">
          <h1 className="h1-custom-font text-3xl font-extrabold w-max capitalize text-transparent bg-clip-text bg-gradient-to-r from-lightRose1 to-rose200">
            With Blews&apos; Stitches <br />
            your wears fit <br /> inch-perfect!
          </h1>
        </div>
      </section>
      <section className="hidden sm:block h-screen relative">
        <div className="absolute w-full h-full bg-gradient-to-r from-darkRose1 to-darkRose1 z-20 top-0 opacity-[.50] left-0" />
        <div className="h-full w-full absolute top-0 left-0 z-10">
          <Image
            className="object-cover object-top"
            fill
            src={heroImage2}
            alt="The Hero image"
            sizes="(max-width: 768px) 100vw, 100vw"
            priority={true}
          />
        </div>
        <div className="flex gap-3 h-[35rem] left-0 right-0 bottom-0 absolute md:w-[43.7rem] md:mx-auto md+:w-[52.2rem] lg:w-[59rem] lg:mx-auto lg+:w-[64.125rem] xl:w-[72.25rem] z-30">
          <div className="flex flex-col gap-5 z-40 h-1/2 absolute sm:left-1/2 sm:-translate-x-1/2 sm:translate-y-1/2 sm:bottom-1/2 sm:w-[25rem] sm:text-center md:w-max md:text-left md:translate-x-0 md:translate-y-0 md:left-0 md:bottom-10 md+:bottom-[4.5rem] xl:bottom-[5rem]">
            <h1 className="h1-custom-font font-extrabold capitalize text-transparent bg-clip-text bg-gradient-to-r from-lightRose1 to-rose200 leading-10 sm:text-4xl md:text-[2.05rem] md+:text-[2.4rem] md+:leading-[2.6rem] lg:text-[2.75rem]  lg:leading-[3rem] xl:text-5xl">
              With Blews&apos; Stitches <br />
              your wears fit <br /> inch-perfect!
            </h1>
            <div className="flex items-center sm:flex-col sm:gap-[0.6rem] md:flex-row md:gap-12 ">
              <div className="flex sm:-ml-4 md:ml-0">
                {testifiersImages.map((image, index) => (
                  <div
                    key={index}
                    className="overflow-hidden border-2 border-lightRose1 rounded-full relative sm:-mr-5 sm:h-[3.125rem] sm:w-[3.125rem] md:-mr-9 md:h-[3.6rem] md:w-[3.6rem] md+:w-[3.8rem] md+:h-[3.8rem] lg:h-[4.5rem] lg:w-[4.5rem]"
                  >
                    <Image
                      className="object-cover object-top"
                      fill
                      src={image}
                      alt="The Hero image"
                      priority={true}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
              <h4 className="h1-custom-font text-transparent bg-clip-text bg-gradient-to-r from-lightRose1 to-rose200 sm:text-[small] sm:-ml-4 md:ml-0 md:text-[0.8rem] md+:text-[0.9rem] lg:text-base xl:leading-[1.1]">
                100,000+ <br />
                <span>satisfied customers</span>
              </h4>
            </div>
          </div>
          <div className="sm:hidden md:block overflow-hidden flex z-40 absolute rounded-[.7rem] md:h-[21rem] md:w-[17rem] md:right-0 md:border md:border-lightRose2 md:border-opacity-50 md:bottom-[4rem] md+:w-[21.875rem] md+:h-[27.5rem] md+:bottom-[2.5rem] md+:rounded-[0.7rem] md+:border-0 lg:w-[25rem] lg:h-[25rem] lg:right-0 lg+:w-[31rem] lg+:h-[24.25rem] xl:top-[6.05rem] xl:w-[34.05rem] xl:h-[24.95rem] 2xl:w-[38.75rem] shadow-md shadow-black  ">
            <div className="absolute w-full h-full bg-gradient-to-r from-darkRose1 to-darkRose1 z-40 top-0 opacity-[.25] left-0 " />
            <Image
              className="object-cover"
              fill
              src={heroImage1}
              alt="mini hero image"
              priority={true}
            />
          </div>
        </div>
      </section>
    </>
  );
}
