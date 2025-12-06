import Link from "next/link";

export default function CTA() {
  return (
    <section className="px-7 pt-10 -mt-10 pb-14 bg-rose-100  ">
      <div className="md:w-3/4 text-center md:mx-auto">
        <h2 className="text-3xl font-semibold mb-4">
          Discover Your <span className="text-rose-700">Unique Style</span>{" "}
          Today
        </h2>
        <p className="text-lg leading-8 mb-6">
          Ready to elevate your fashion journey? Whether you&apos;re looking for
          bespoke clothing tailored to your individuality or seeking to master
          the art of design,{" "}
          <span className="text-rose-700 h2-custom-font">
            Blews&apos; Stitches
          </span>{" "}
          is here to empower your style and creativity.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/custom-design">
            <button className="bg-rose-700 text-white font-semibold py-2 px-6 rounded-[.6rem] hover:bg-rose-800 transition">
              Create Your Custom Clothing
            </button>
          </Link>
          <Link href="/training-program">
            <button className="bg-rose-700 text-white font-semibold py-2 px-6 rounded-[.6rem] hover:bg-rose-800 transition">
              Join Our Designer Training
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
