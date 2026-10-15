import { About, DemoBand, Hero, Process, RecentWork, TrustStrip } from "@/components/home";
import { buildMetadata } from "@/libs/seo";
import Image from "next/image";
import img from "@img/thumbnails/about_headshot.webp"

export const metadata = buildMetadata({
  title: "Websites for Florida home care agencies | WebTech Ninjas",
  description:
    "Bilingual, phone-first websites that help home care agencies in Sarasota and Orlando hire caregivers and win families.",
});

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Process />
      <DemoBand />
      <RecentWork />
      <About />
    </>
  );
}

