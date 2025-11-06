"use client";
import { FaBullseye } from "react-icons/fa6";
import { testimony } from "@/data/testimonies-2";
import Card from "./Card";

interface ICard {
  company: string;
  field: string;
  position: string;
  name: string;
  image: string[];
  captionOne: string;
  captionTwoA: string;
  captionTwoB: string;
  commentMajor: string;
  commentMinor: string;
}

export default function About() {
  return (
    <>
      <article className="flex flex-col md:gap-4 pt-11 lg:pt-14 px-5 lg:pb-8 overflow-hidden">
        <div className="flex mx-auto gap-5 items-center mb-1 leading-6">
          <FaBullseye className="text-3xl text-rose-900" />
          <h3 className="text-[1.1rem] md:text-xl lg:text-2xl font-bold text-rose-900 capitalize">
            Our promise to you at <span className="logo">blews&apos; stitches</span>
          </h3>
        </div>
        <p className="leading-7 text-justify md:text-left text-[1.0975rem] md:text-lg lg:text-xl text-darkRose2 lg:px-20 mb-6">
          You have come to a place where style meets comfort. Stay anywhere and
          get that killer dress tailored for your body size and uniqueness. We
          are keen on the inches - on specificity, on perfection - and on timely
          delivery. Take our word for it, but there is more... Take our
          clients&lsquo; words also!
        </p>

        {/* Sliding Cards Container */}
        <div className="slider-wrapper">
          <div className="slider-track">
            {/* First set */}
            {testimony.map((card: ICard, i: number) => (
              <div key={`first-${i}`} className="slide-item">
                <Card card={card} />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {testimony.map((card: ICard, i: number) => (
              <div key={`second-${i}`} className="slide-item">
                <Card card={card} />
              </div>
            ))}
            {/* Third set to ensure smooth transition */}
            {testimony.map((card: ICard, i: number) => (
              <div key={`third-${i}`} className="slide-item">
                <Card card={card} />
              </div>
            ))}
          </div>
        </div>
      </article>

      <style jsx global>{`
        .slider-wrapper {
          overflow: hidden;
          position: relative;
          width: 100%;
          margin: 2rem 0 0.5rem;
        }

        .slider-track {
          display: flex;
          gap: 2.5rem;
          width: max-content;
          animation: scroll 28s linear infinite;
          will-change: transform;
        }

        .slide-item {
          flex: 0 0 auto;
          display: flex;
        }

        .logo {
          font-family: MyCustomFont, sans-serif;
          padding: 0 0.5rem;
          margin-left: -0.42rem;
          font-weight: 500;
          font-size: 1.2rem;

          @media screen and (min-width: 768px) {
            background-color: #be123c;
            color: white;
            margin-left: 0rem;
            padding: 0.4rem 1rem;
            clip-path: polygon(10% 0%, 100% 0, 90% 100%, 0% 100%);
            border-radius: 0.6rem;
          }
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }

        .slider-wrapper:hover .slider-track {
          animation-play-state: paused;
        }

        @media (max-width: 640px) {
          .slider-track {
            gap: 1.5rem;
            animation-duration: 45s;
          }
        }
      `}</style>
    </>
  );
}
