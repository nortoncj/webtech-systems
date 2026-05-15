// app/api/cms/[[...tool]]/_studio.tsx
"use client";

import dynamic from "next/dynamic";

const NextStudio = dynamic(
  async () => {
    const { NextStudio } = await import("next-sanity/studio");
    const { default: config } = await import("@/sanity.config");
    return function Studio() {
      return <NextStudio config={config} />;
    };
  },
  { ssr: false },
);

export default function Studio() {
  return <NextStudio />;
}
