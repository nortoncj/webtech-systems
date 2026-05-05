import Footer from "@/components/footer";
import CaseStudy from "@/components/home/case-study";
import Contact from "@/components/home/contact";
import Hero from "@/components/home/hero";
import Process from "@/components/home/process";
import Proof from "@/components/home/proof";
import Reviews from "@/components/home/reviews";
import Services from "@/components/home/services";
import Who from "@/components/home/who-we-serve";
import TopNav from "@/components/top-nav";
import Image from "next/image";

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
      <Contact />
    </>
  );
}
