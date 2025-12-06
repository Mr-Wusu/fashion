import Image from "next/image";

export default function OurCEO() {
  return (
    <section className="bg-rose-100 sm+:px-4 -mb-1 md:mb-6">
      <div className="md:hidden text-lg px-4 text-center pt-9 pb-8">
        <h2 className="text-3xl pb-2 font-semibold">
          Meet Our <span className="text-rose-700 ">Inspiring</span> CEO
        </h2>
        <div className="flex flex-col gap-3 items-center justify-center">
          <p className="leading-8 ">
            At the heart of{" "}
            <span className="text-rose-700 h2-custom-font">
              Blews&apos; Stitches
            </span>{" "}
            is our visionary leader, Blessing Wusu, whose passion for fashion
            and commitment to individuality drive our brand forward. With over
            15 years of experience in the fashion industry, Blessing founded{" "}
            <span className="text-rose-700 h2-custom-font">
              Blews&apos; Stitches
            </span>{" "}
            to redefine style as a form of self-expression and empowerment. His
            innovative approach blends bold creativity with a deep respect for
            quality and sustainability, ensuring every piece tells a story.
          </p>
          <div className="w-full max-w-[25rem] h-[15.5rem] rounded-[.6rem] relative overflow-hidden shadow-md shadow-black mb-4">
            <Image
              src="/images/testifiers/Our_CEO.jpg"
              alt="CEO's photo"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-top"
              fill
            />
          </div>
          <p className="">
            Blessing&apos;s vision is to create a brand that celebrates
            diversity and inspires confidence through fashion. Under his
            leadership, our company has grown into a community where creativity
            thrives, and every individual is encouraged to embrace their unique
            style. His dedication to ethical practices and thoughtful design
            shapes our mission to craft fashion that not only looks good but
            feels meaningful. His energy and vision continue to inspire us to
            push boundaries and create collections that empower you to shine.
          </p>
        </div>
      </div>
      <div className="hidden md:flex flex-col items-center justify-center gap-5 pb-16">
        <header className="flex flex-col gap-3 pb-3 items-center justify-center px-24 pt-8  text-center">
          <h1 className="text-4xl leading-[3rem] ">
            Meet Our <span className="text-rose-700 ">Inspiring</span> CEO
          </h1>
          <p className="w-5/6">
            {" "}
            At the heart of{" "}
            <span className="text-rose-700 h2-custom-font">
              Blews&apos; Stitches
            </span>{" "}
            is our visionary leader, Blessing Wusu, whose passion for fashion
            and commitment to individuality drive our brand forward. With over
            15 years of experience in the fashion industry, Blessing founded{" "}
            <span className="text-rose-700 h2-custom-font">
              Blews&apos; Stitches
            </span>{" "}
            to redefine style as a form of self-expression and empowerment.
          </p>
        </header>
        <div className="md:px-14 lg:px-24 md:w-full md:mx-auto lg:flex lg:gap-8">
          <div className="relative h-[24rem] md:w-[22rem] md:mr-7 md:mb-1 md:mt-3 lg:w-[36.25rem] rounded-[.9rem] overflow-hidden shadow-md shadow-black md:float-left lg:justify-center">
            <Image
              src="/images/testifiers/Our_CEO.jpg"
              alt="CEO's photo"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-top"
              fill
            />
          </div>
          <p className="leading-8  text-justify text-[1.075rem] lg:text-xl lg:w-[45%]">
            His innovative approach blends bold creativity with a deep respect
            for quality and sustainability, ensuring every piece tells a story.
            Blessing&apos;s vision is to create a brand that celebrates{" "}
            <span className="underline">diversity</span> and inspires{" "}
            <span className="underline">confidence</span> through fashion. Under
            his leadership, our company has grown into a community where
            creativity thrives, and every individual is encouraged to embrace
            their unique style. His dedication to ethical practices and
            thoughtful design shapes our mission to craft fashion that not only{" "}
            <span className="underline">looks</span> good but{" "}
            <span className="underline">feels</span> meaningful. His energy and
            vision continue to inspire us to push boundaries and create
            collections that empower you to shine.
          </p>
        </div>
      </div>
    </section>
  );
}
