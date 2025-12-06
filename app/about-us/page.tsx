import Image from "next/image";
import OurCEO from "@/app/_components/AboutUs/OurCEO";
import OurServices from "@/app/_components/AboutUs/OurServices";
import CTA from "@/app/_components/AboutUs/CTA";

export default function AboutUs() {
  return (
    <div className="min-h-screen">
      <div className="md:hidden flex flex-col gap-5 px-3 pb-7 ">
        <div className="flex flex-col gap-3 items-center justify-center pt-[4.5rem]">
          <h1 className="text-3xl px-2 text-center leading-10 font-semibold">
            Our vision is to create{" "}
            <span className="text-rose-700">bold designs</span> and{" "}
            <span className="text-rose-700">boundless expressions,</span> <br />{" "}
            with fashion that defines{" "}
            <span className="text-rose-700">you!</span>
          </h1>
          <p className="text-lg text-center leading-8 px-2 sm+:px-4 pb-2">
            We are a team of passionate individuals dedicated to bringing you
            the latest trends and timeless classics in fashion. Our mission is
            to empower you to express your unique style with confidence. <br />
            At{" "}
            <span className="text-rose-700 h2-custom-font">
              Blews&apos; Stitches
            </span>
            , fashion is more than what you wear — it’s a statement of identity,
            creativity, and purpose. Founded with a passion for style and
            self-expression, we design collections that blend modern trends with
            timeless appeal. <br />
          </p>
          <div className="w-full max-w-[25rem] h-[15.5rem] rounded-[.6rem] relative overflow-hidden shadow-md shadow-black mb-4">
            <Image
              src="/images/appPhotos/photo-10.jpg"
              alt="photo describing the about us"
              className=""
              fill
              priority
            />
          </div>
          <p className="text-center text-lg leading-8 sm+:px-4">
            Our mission is to empower individuals to{" "}
            <span className="underline">look</span> and{" "}
            <span className="underline">feel</span> their best, offering pieces
            that are as versatile and unique as the people who wear them. From
            everyday essentials to standout statements, we focus on quality,
            detail, and thoughtful design. Welcome to a brand where confidence
            is crafted, and style has a story. <br /> A trial of our service(s)
            is a step towards discovering your personal style. We believe that
            fashion is a vibrant self-expression journey!
          </p>
        </div>
      </div>
      <div className="hidden md:flex flex-col gap-6 items-center justify-center lg:px-10 pb-14">
        <div className="text-center flex flex-col gap-3 pt-24">
          <h1 className="md:text-3xl md:w-5/6 md:mx-auto lg:text-4xl leading-[3rem] ">
            Our vision is to create{" "}
            <span className=" text-rose-700">bold designs</span> and{" "}
            <span className="text-rose-700">boundless expressions,</span>{" "}
            <br className="hidden lg:block" /> with fashion that defines{" "}
            <span className="text-rose-700">you!</span>
          </h1>
          <p className="md:w-4/5 md+:w-3/5 md:mx-auto md:leading-6 lg:text-lg lg:w-2/4 mx-auto leading-7">
            We are a team of passionate individuals dedicated to bringing you
            the latest trends and timeless classics in fashion. Our mission is
            to empower you to express your unique style with confidence.
          </p>
        </div>
        <div className="flex md:flex-col md:gap-y-4 md+:flex-row md+:gap-9 lg:gap-7 lg+:gap-7 justify-center items-center md:px-9 md+:w-fit ">
          <p className="leading-8 md:text-justify md:text-[1.075rem] md+:text-lg lg:text-xl md+:basis-[42%] md+:grow-[1.2fr]">
            At{" "}
            <span className="text-rose-700 h2-custom-font">
              Blews&apos; Stitches
            </span>
            , fashion is more than what you wear — it’s a statement of identity,
            creativity, and purpose. Founded with a passion for style and
            self-expression, we design collections that blend modern trends with
            timeless appeal. Our mission is to empower individuals to{" "}
            <span className="underline">look</span> and{" "}
            <span className="underline">feel</span> their best, offering pieces
            that are as versatile and unique as the people who wear them. From
            everyday essentials to standout statements, we focus on quality,
            detail, and thoughtful design. Welcome to a brand where confidence
            is crafted, and style has a story.
          </p>

          <div className="relative md:w-[27rem] md:h-[18rem] md:grow-[1.1fr] md+:basis-[23rem] md+:h-[22.6rem] md+:grow-[1.1fr] lg:max-w-[32.25rem] lg:basis-[28rem] rounded-[.9rem] overflow-hidden shadow-md shadow-black">
            <Image
              src="/images/appPhotos/photo-10.jpg"
              alt="photo describing the about us"
              className=""
              fill
            />
          </div>
        </div>
      </div>
      <OurCEO />
      <OurServices />
      <CTA />
    </div>
  );
}
