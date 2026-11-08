import Nav from "@/components/Nav";
import Atmosphere from "@/components/Atmosphere";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Skills from "@/components/Skills";
import LifeOS from "@/components/LifeOS";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <Atmosphere />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <LifeOS />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
