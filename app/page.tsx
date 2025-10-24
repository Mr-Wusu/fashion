import About from "./_components/HomePage/About";
import Clothes from "./_components/HomePage/Clothes";
import Hero from "./_components/HomePage/Hero";


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <About />
      <Clothes />
    </div>
  );
}
