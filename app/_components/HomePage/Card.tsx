import Image from "next/image";

interface CardProps {
  card: {
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
  };
}

export default function Card({ card }: CardProps) {
  return (
    <article className="flex flex-col lg:flex-row lg:gap-0 items-center gap-[.85rem] w-[68vw] sm:w-[23rem] lg:w-fit min-h-fit lg:h-[27rem] border border-darkRose2 rounded-[.9rem] mx-auto overflow-hidden mb-10 shadow-md shadow-gray-700 relative">
      <div className="hidden lg:flex absolute right-0 w-[21.5rem] top-0 text-center text-lightRose1 px-1 bg-rose-500 flex-col rounded-tr-[0.7rem]">
        <p className="font-bold">{card.name}</p>
        <p className="text-sm">{card.position}</p>
      </div>
      <div className="flex flex-col gap-0 items-center justify-center pt-6 lg:hidden mb-3">
        <h3 className="text-sm">{card.company}</h3>
        <h2 className="capitalize font-bold">{card.field}</h2>
      </div>
      <div className="flex flex-nowrap relative lg:hidden">
        <div className="hidden md:inline-block h-48 w-48 bg-rose-200 rounded-full" />
        <div className="h-40 w-40 md:h-48 md:w-48 bg-rose-200 rounded-full  relative">
          <Image
            src={card.image[1]}
            alt={`${card.position} photo`}
            className="object-cover rounded-b-full h-[13rem] -top-[3.075rem] md:h-[14.4rem] absolute md:-top-[40px]"
            width="192"
            height="246"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="hidden md:inline-block h-48 w-48 bg-rose-200 rounded-full" />
        <div className="absolute z-10 bg-rose-500 text-lightRose1 rounded-3xl -left-[1.5rem] md:left-[11rem] bottom-3 px-2 md:px-[0.7rem] py-[0.22rem] flex flex-col md:gap-[0.0725rem]">
          <p className="text-[0.675rem] md:text-[0.75rem] leading-[1] font-bold">
            {card.name}
          </p>
          <p className="text-[0.585rem] md:text-[0.6875rem] leading-[1]">
            {card.position}
          </p>
        </div>
      </div>
      <div className="pb-4 flex flex-col gap-2 lg:hidden">
        <h1 className="px-[0.725rem] text-[1.1rem] md:text-[1.3rem] text-darkRose1 text-center font-bold leading-[1.2]">
          {`${card.captionOne} `}
          <span className="text-rose-700">
            {card.captionTwoA} <br />
            {card.captionTwoB}
          </span>{" "}
        </h1>
        <div className="flex items-end justify-center">
          <div className="h-2 w-2 rounded-full bg-rose-400" />
          <div className="h-3 w-3 rounded-full bg-rose-400" />
          <div className="h-4 w-4 rounded-full bg-rose-400" />
        </div>
        <p className="px-5 md:px-0 md:w-[17rem]">
          {`${card.commentMajor} `}
          <span className="font-bold">{card.commentMinor}</span>
        </p>
      </div>
      <div className="relative h-full w-[17rem] bg-rose-300">
        <Image
          className="object-cover"
          src={card.image[0]}
          alt={`${card.position}s Photo`}
          fill
        />
      </div>
      <div className="hidden lg:flex lg:flex-col h-fit w-[21rem]  gap-5 px-6 pt-7 relative">
        <div className="flex flex-col gap-0 items-center">
          <h3 className="text-base">{card.company}</h3>
          <h2 className="capitalize font-bold">{card.field}</h2>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <h1 className="text-[1.4rem] text-darkRose1 text-center font-bold leading-[1.1]">
            {`${card.captionOne} `}
            <span className="text-rose-700">
              {card.captionTwoA} <br />
              {card.captionTwoB}
            </span>{" "}
          </h1>
          <div className="flex items-end justify-center py-4">
            <div className="h-3 w-3 rounded-full bg-rose-400" />
            <div className="h-4 w-4 rounded-full bg-rose-400" />
            <div className="h-5 w-5 rounded-full bg-rose-400" />
          </div>
          <p className="w-[18rem] text-justify text-[1.1rem] mx-auto lg:text-[1.165rem]">
            {`${card.commentMajor} `}
            <span className="font-bold">{card.commentMinor}</span>
          </p>
        </div>
      </div>
    </article>
  );
}
