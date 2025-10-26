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
  // const animationDuration = testimony.length * 5;

  return (
   
      <article className="flex flex-col md:gap-4 pt-11 lg:pt-14 px-5 lg:pb-8">
        <div className="flex mx-auto gap-5 items-center mb-1 leading-6">
          <FaBullseye className="text-3xl text-rose-900" />
          <h3 className="text-[1.1rem] md:text-xl lg:text-2xl font-bold text-rose-900 capitalize">
            Our promise to you at <span className="">blews&apos; stitches</span>
          </h3>
        </div>
        <p className="leading-7 text-justify md:text-left text-[1.0975rem] md:text-lg lg:text-xl text-darkRose2 lg:px-20 mb-6">
          You have come to a place where style meets comfort. Stay anywhere and
          get that killer dress tailored for your body size and uniqueness. We
          are keen on the inches - on specificity, on perfection - and on timely
          delivery. Take our word for it, but there is more... Take our
          clients&lsquo; words also!
        </p>

        {/* Sliding Cards Container - One card at a time */}
        <div className="slide-container">
          <div className="slide-track">
            {/* First copy of cards */}
            {testimony.map((card: ICard, i: number) => (
              <div key={`first-${i}`} className="slide-card">
                <Card card={card} />
              </div>
            ))}
            {/* Second copy of cards for seamless loop */}
            {testimony.map((card: ICard, i: number) => (
              <div key={`second-${i}`} className="slide-card">
                <Card card={card} />
              </div>
            ))}
          </div>
        </div>
      </article>

      // <style jsx>{`
      //   .slide-container {
      //     overflow: hidden;
      //     position: relative;
      //     width: 100%;
      //     margin-bottom: 2rem;
      //     display: flex;
      //     justify-content: center;
      //   }

      //   .slide-track {
      //     display: flex;
      //     width: fit-content;
      //     animation: slideCards ${animationDuration}s linear infinite;
      //   }

      //   .slide-card {
      //     flex-shrink: 0;
      //     width: 100vw;
      //     display: flex;
      //     justify-content: center;
      //     align-items: center;
      //   }

      //   @keyframes slideCards {
      //     0% {
      //       transform: translateX(0);
      //     }
      //     100% {
      //       transform: translateX(-50%);
      //     }
      //   }

      //   /* Pause animation on hover for better UX */
      //   .slide-container:hover .slide-track {
      //     animation-play-state: paused;
      //   }

      //   /* Ensure cards display properly on mobile and desktop */
      //   @media (min-width: 640px) {
      //     .slide-card {
      //       width: 100vw;
      //     }
      //   }
      // `}</style>

  );
}
