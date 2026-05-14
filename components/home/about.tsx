"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

// ─── Values Data ──────────────────────────────────────────────────────────────

const values = [
  {
    label: "Community",
    description:
      "Volunteering with the local VFW, showing up for neighbors. Community is not a buzzword, it is a practice.",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
        />
      </svg>
    ),
  },
  {
    label: "Family",
    description:
      "Everything gets built with the long game in mind. Family first means thinking beyond the quick win and building things that last.",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
    ),
  },
  {
    label: "Authenticity",
    description:
      "No inflated agency or sales speak. No smoke and mirrors. You get straight answers, honest timelines, and a builder who tells you what he actually thinks.",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
        />
      </svg>
    ),
  },
  {
    label: "Results",
    description:
      "Pretty is nice. Functional is better. The goal is always a system that actually moves the business forward, not one that just looks good in a pitch deck.",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
        />
      </svg>
    ),
  },
];

// ─── Fun Facts ────────────────────────────────────────────────────────────────

const facts = [
  {
    emoji: "⚔️",
    text: "Star Wars is non-negotiable. The Force is basically just good system architecture.",
  },
  {
    emoji: "🦸",
    text: "Lifelong Marvel reader. Proof that building something legendary takes a whole team.",
  },
  {
    emoji: "🇺🇸",
    text: "Active VFW volunteer — community service is not optional when you were raised right.",
  },
  {
    emoji: "👨‍👩‍👧",
    text: "Family man first. Everything else gets built around that.",
  },
];

// ─── Photo Placeholder ────────────────────────────────────────────────────────

function PhotoBlock({ src, alt }: { src?: string; alt?: string }) {
  if (src) {
    return (
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[14px]">
        <Image
          src={src}
          alt={alt ?? "Chris the Tech Ninjas"}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 480px"
        />
      </div>
    );
  }

  // Placeholder when no photo is provided yet
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[14px] bg-[#1F2430]">
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Avatar initials */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-600/20 ring-2 ring-indigo-500/30">
          <span className="text-3xl font-bold text-indigo-400">C</span>
        </div>
        <p className="text-xs font-medium tracking-widest text-white/30 uppercase">
          Chris
        </p>
      </div>

      {/* Floating badge */}
      <div className="absolute bottom-5 left-5 right-5">
        <div className="rounded-[10px] border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-indigo-400">
            Engineer + Builder
          </p>
          <p className="mt-0.5 text-sm text-white/60">
            Systems that grow business. Not just websites.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface MeetChrisProps {
  photoSrc?: string;
}

export default function About({ photoSrc }: MeetChrisProps) {
  return (
    <section id="about" className="bg-[#F8F7F4] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section label */}
        <div className="mb-12 flex items-center gap-3">
          <span className="h-5 w-1 rounded-full bg-indigo-600" />
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
            About
          </span>
        </div>

        {/* Main layout */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
          {/* Left — Photo */}
          <div className="w-full lg:w-[380px] lg:shrink-0">
            <PhotoBlock
              src={photoSrc}
              alt="Christopher — Webtech Ninjas founder"
            />
            {/* CTA */}
            <div className="flex flex-col gap-3 border-t border-[#1F2430]/8 pt-6 sm:flex-row">
              <Link
                href="https://calendar.app.google/X8GheJdXzBvZ3Spu9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-[10px] bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-indigo-700"
              >
                Book a Strategy Call
              </Link>
              <Link
                href="https://chrisnortonjr.com"
                className="inline-flex items-center justify-center rounded-[10px] border border-[#1F2430]/15 px-6 py-3 text-sm font-medium text-[#1F2430]/60 transition-colors duration-150 hover:border-indigo-600/30 hover:text-indigo-600"
              >
                More About Me
              </Link>
            </div>
          </div>

          {/* Right — Content */}
          <div className="flex flex-1 flex-col gap-10">
            {/* Header */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold leading-tight text-[#1F2430] sm:text-4xl">
                Hi I'm Chris Norton, the engineer behind the systems
              </h2>
              <p className="text-lg leading-relaxed text-[#1F2430]/65">
                Webtech Ninjas is not a faceless agency with a rotating cast of
                freelancers. It is me, a hands-on engineer who builds clean
                digital systems for businesses that need more than a polished
                front end.
              </p>
              <p className="text-base leading-relaxed text-[#1F2430]/60">
                My background spans web development, automation, and business
                systems, I bring a builder's mindset to every engagement. The
                goal is not just a site that looks good at launch, it is
                infrastructure that holds up, scales cleanly, and keeps doing
                its job months after delivery.
              </p>
              <p className="text-base leading-relaxed text-[#1F2430]/60">
                Outside of client work, I'm a family man, a VFW volunteer, and
                someone who genuinely believes that showing up for your
                community, on and offline. It's part of the job. The same
                discipline that goes into service work goes into every build:
                clear process, honest communication, and work you can actually
                count on.
              </p>
            </div>

            {/* Values Grid */}
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#1F2430]/40">
                What drives the work
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {values.map((v) => (
                  <div
                    key={v.label}
                    className="rounded-[12px] border border-[#1F2430]/8 bg-white p-4 shadow-[0_1px_3px_rgba(31,36,48,0.05)]"
                  >
                    <div className="mb-2 flex items-center gap-2.5">
                      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#F3F0FF] text-indigo-600">
                        {v.icon}
                      </span>
                      <span className="text-sm font-semibold text-[#1F2430]">
                        {v.label}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed text-[#1F2430]/55">
                      {v.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Fun Facts */}
            {/* <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#1F2430]/40">
                The stuff that doesn't fit in a bio
              </p>
              <div className="space-y-2">
                {facts.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-[10px] border border-[#1F2430]/6 bg-white px-4 py-3"
                  >
                    <span className="mt-0.5 text-lg leading-none">
                      {f.emoji}
                    </span>
                    <p className="text-sm leading-relaxed text-[#1F2430]/65">
                      {f.text}
                    </p>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
