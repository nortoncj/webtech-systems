import Footer from "@/components/footer";
import About from "@/components/home/about";
import CaseStudy from "@/components/home/case-study";
import Contact from "@/components/home/contact";
import Hero from "@/components/home/hero";
import Process from "@/components/home/process";
import Proof from "@/components/home/proof";
import Reviews from "@/components/home/reviews";
import Services from "@/components/home/services";
import Who from "@/components/home/who-we-serve";
import TopNav from "@/components/top-nav";
import { buildMetadata } from "@/libs/seo";
import Image from "next/image";
import img from "@img/thumbnails/about_headshot.webp"

export const metadata = buildMetadata({
  title: "Webtech Ninjas",
  description:
    "Clean digital systems built for real business growth. Webtech Ninjas is a leading web development agency specializing in creating innovative and high-performing websites and applications.",
});

export default function Home() {
  return (
    <>
      <Hero />
      <Proof />
      <Services />
      <Process />
      <CaseStudy />
      <Who />
      <Reviews />
      <About photoSrc={img.src} />
      <Contact />
    </>
  );
}
