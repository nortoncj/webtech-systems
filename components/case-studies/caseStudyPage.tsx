"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "sanity";
import {
  CaseStudy,
  CaseStudyOutcome,
  SERVICE_LABELS,
  ServiceType,
} from "@/types/CaseStudy";

// ─── Portable Text Renderer ───────────────────────────────────────────────────

const ptComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-4 text-base leading-relaxed text-[#1F2430]/75">
        {children}
      </p>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mb-3 mt-8 text-xl font-semibold text-[#1F2430]">
        {children}
      </h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="mb-2 mt-6 text-base font-semibold text-[#1F2430]">
        {children}
      </h4>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-[#1F2430]">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic text-[#1F2430]/80">{children}</em>
    ),
  },
};

// ─── Section Wrapper ──────────────────────────────────────────────────────────

function Section({
  label,
  title,
  accentColor = "indigo",
  children,
}: {
  label: string;
  title: string;
  accentColor?: "indigo" | "purple";
  children: React.ReactNode;
}) {
  const accent =
    accentColor === "purple" ? "text-[#8B5CF6]" : "text-indigo-600";
  const bar = accentColor === "purple" ? "bg-[#8B5CF6]" : "bg-indigo-600";

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className={`h-5 w-1 rounded-full ${bar}`} />
        <span
          className={`text-xs font-semibold uppercase tracking-widest ${accent}`}
        >
          {label}
        </span>
      </div>
      <h2 className="text-2xl font-bold text-[#1F2430]">{title}</h2>
      {children}
    </div>
  );
}

// ─── Outcomes Grid ────────────────────────────────────────────────────────────

function OutcomesGrid({ outcomes }: { outcomes: CaseStudyOutcome[] }) {
  if (!outcomes.length) return null;
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {outcomes.map((o, i) => (
        <div
          key={i}
          className="rounded-[12px] border border-[#1F2430]/8 bg-white p-4 shadow-[0_1px_4px_rgba(31,36,48,0.05)]"
        >
          <div className="mb-1 flex items-start justify-between gap-1">
            <span className="text-2xl font-bold leading-none text-indigo-600">
              {o.delta ?? o.after ?? "—"}
            </span>
            {o.isEstimated && (
              <span className="mt-0.5 rounded bg-[#F3F0FF] px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-indigo-500">
                est.
              </span>
            )}
          </div>
          <p className="text-xs font-medium text-[#1F2430]/55">{o.metric}</p>
          {o.before && o.after && (
            <p className="mt-2 text-[11px] text-[#1F2430]/35">
              {o.before} → {o.after}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Tech Stack ───────────────────────────────────────────────────────────────

function TechStack({ stack }: { stack: string[] }) {
  if (!stack.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {stack.map((tech) => (
        <span
          key={tech}
          className="rounded-md bg-[#F3F0FF] px-3 py-1.5 font-mono text-xs font-semibold text-indigo-700"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}

// ─── Testimonial ──────────────────────────────────────────────────────────────

function Testimonial({
  testimonial,
}: {
  testimonial: CaseStudy["testimonial"];
}) {
  if (!testimonial?.quote) return null;
  return (
    <figure className="relative overflow-hidden rounded-[14px] bg-[#F3F0FF] p-8">
      {/* decorative quote mark */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-4 left-4 select-none text-[120px] font-bold leading-none text-indigo-200"
      >
        "
      </span>
      <blockquote className="relative z-10 text-base font-medium leading-relaxed text-[#1F2430]">
        {testimonial.quote}
      </blockquote>
      <figcaption className="relative z-10 mt-5 flex items-center gap-3">
        {testimonial.authorPhoto?.asset?.url && (
          <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-indigo-200">
            <Image
              src={testimonial.authorPhoto.asset.url}
              alt={testimonial.authorName ?? "Client photo"}
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
        )}
        <div>
          {testimonial.authorName && (
            <p className="text-sm font-semibold text-[#1F2430]">
              {testimonial.authorName}
            </p>
          )}
          {testimonial.authorBusiness && (
            <p className="text-xs text-[#1F2430]/50">
              {testimonial.authorBusiness}
            </p>
          )}
        </div>
      </figcaption>
    </figure>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

function Gallery({ gallery }: { gallery: CaseStudy["gallery"] }) {
  if (!gallery?.length) return null;
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {gallery.map((img, i) => (
        <figure
          key={i}
          className="overflow-hidden rounded-[12px] border border-[#1F2430]/8 bg-white"
        >
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={img.asset.url}
              alt={img.alt ?? `Gallery image ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          {img.caption && (
            <figcaption className="px-4 py-2.5 text-xs text-[#1F2430]/45">
              {img.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({ study }: { study: CaseStudy }) {
  const serviceLabel = study.service
    ? SERVICE_LABELS[study.service as ServiceType]
    : null;

  return (
    <aside className="space-y-6 rounded-[14px] border border-[#1F2430]/10 bg-white p-6 shadow-[0_1px_4px_rgba(31,36,48,0.05)]">
      {/* Service */}
      {serviceLabel && (
        <div>
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-[#1F2430]/40">
            Service
          </p>
          <span className="inline-flex items-center rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
            {serviceLabel}
          </span>
        </div>
      )}

      {/* Client */}
      {study.clientName && (
        <div>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-[#1F2430]/40">
            Client
          </p>
          <p className="text-sm font-medium text-[#1F2430]">
            {study.clientName}
          </p>
        </div>
      )}

      {/* Industry */}
      {study.industry && (
        <div>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-[#1F2430]/40">
            Industry
          </p>
          <p className="text-sm text-[#1F2430]/70">{study.industry}</p>
        </div>
      )}

      {/* Date */}
      {study.publishedAt && (
        <div>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-[#1F2430]/40">
            Completed
          </p>
          <p className="text-sm text-[#1F2430]/70">
            {new Date(study.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      )}

      {/* Categories */}
      {study.categories?.length ? (
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-[#1F2430]/40">
            Categories
          </p>
          <div className="flex flex-wrap gap-1.5">
            {study.categories.map((cat) => (
              <span
                key={cat._id}
                className="rounded-full border border-[#1F2430]/15 px-2.5 py-0.5 text-xs text-[#1F2430]/60"
              >
                {cat.title}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {/* Tags */}
      {study.tags?.length ? (
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-[#1F2430]/40">
            Tags
          </p>
          <div className="flex flex-wrap gap-1.5">
            {study.tags.map((tag) => (
              <span
                key={tag._id}
                className="rounded-full bg-[#F8F7F4] px-2.5 py-0.5 text-xs text-[#1F2430]/50"
              >
                #{tag.title}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {/* CTA */}
      <div className="border-t border-[#1F2430]/8 pt-4">
        <Link
          href="/contact"
          className="block w-full rounded-[10px] bg-indigo-600 py-3 text-center text-sm font-semibold text-white transition-colors duration-150 hover:bg-indigo-700"
        >
          Book a Strategy Call
        </Link>
        <Link
          href="/case-studies"
          className="mt-2 block w-full rounded-[10px] border border-[#1F2430]/15 py-3 text-center text-sm font-medium text-[#1F2430]/60 transition-colors duration-150 hover:border-indigo-600/30 hover:text-indigo-600"
        >
          ← All Case Studies
        </Link>
      </div>
    </aside>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface CaseStudyPageProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyPage({ caseStudy }: CaseStudyPageProps) {
  const hasOutcomes = !!caseStudy.outcomes?.length;
  const hasTechStack = !!caseStudy.techStack?.length;
  const hasGallery = !!caseStudy.gallery?.length;
  const hasTestimonial = !!caseStudy.testimonial?.quote;
  const hasEstimates = caseStudy.outcomes?.some((o) => o.isEstimated);

  return (
    <main className="min-h-screen bg-[#F8F7F4]">
      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <div className="relative bg-[#1F2430]">
        {caseStudy.coverImage?.asset?.url && (
          <>
            <Image
              src={caseStudy.coverImage.asset.url}
              alt={caseStudy.coverImage.alt ?? caseStudy.title}
              fill
              priority
              className="object-cover opacity-20"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1F2430]/60 via-[#1F2430]/80 to-[#1F2430]" />
          </>
        )}

        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-xs text-white/40">
            <Link href="/" className="hover:text-white/70 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/case-studies"
              className="hover:text-white/70 transition-colors"
            >
              Case Studies
            </Link>
            <span>/</span>
            <span className="text-white/60">{caseStudy.title}</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            {/* Service badge */}
            {caseStudy.service && (
              <span className="inline-flex items-center rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                {SERVICE_LABELS[caseStudy.service as ServiceType]}
              </span>
            )}

            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {caseStudy.title}
            </h1>

            {caseStudy.excerpt && (
              <p className="text-lg leading-relaxed text-white/60">
                {caseStudy.excerpt}
              </p>
            )}

            {/* Client + industry inline */}
            {(caseStudy.clientName || caseStudy.industry) && (
              <p className="text-sm text-white/40">
                {[caseStudy.clientName, caseStudy.industry]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Body ────────────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
          {/* Main content */}
          <article className="min-w-0 flex-1 space-y-14">
            {/* Outcomes at the top — lead with results */}
            {hasOutcomes && (
              <Section label="Results" title="What Changed">
                <OutcomesGrid outcomes={caseStudy.outcomes!} />
                {hasEstimates && (
                  <p className="text-[11px] text-[#1F2430]/35">
                    * Estimated impact based on project scope and industry
                    benchmarks.
                  </p>
                )}
              </Section>
            )}

            {/* Problem */}
            {caseStudy.problem?.length > 0 && (
              <Section label="The Problem" title="What Was Broken">
                <div className="prose-sm max-w-none">
                  <PortableText
                    value={caseStudy.problem as PortableTextBlock[]}
                    components={ptComponents}
                  />
                </div>
              </Section>
            )}

            {/* Solution */}
            {caseStudy.solution?.length > 0 && (
              <Section
                label="The Solution"
                title="How We Fixed It"
                accentColor="purple"
              >
                <div className="prose-sm max-w-none">
                  <PortableText
                    value={caseStudy.solution as PortableTextBlock[]}
                    components={ptComponents}
                  />
                </div>
              </Section>
            )}

            {/* System Built */}
            {caseStudy.systemBuilt?.length > 0 && (
              <Section label="System Built" title="What We Actually Built">
                <div className="prose-sm max-w-none">
                  <PortableText
                    value={caseStudy.systemBuilt as PortableTextBlock[]}
                    components={ptComponents}
                  />
                </div>
              </Section>
            )}

            {/* Tech Stack */}
            {hasTechStack && (
              <Section label="Tech Stack" title="Tools & Technologies">
                <TechStack stack={caseStudy.techStack!} />
              </Section>
            )}

            {/* Gallery */}
            {hasGallery && (
              <Section
                label="Project Gallery"
                title="Screenshots & Deliverables"
              >
                <Gallery gallery={caseStudy.gallery} />
              </Section>
            )}

            {/* Testimonial */}
            {hasTestimonial && (
              <Section label="Client Feedback" title="What They Said">
                <Testimonial testimonial={caseStudy.testimonial} />
              </Section>
            )}
          </article>

          {/* Sticky Sidebar */}
          <div className="w-full lg:sticky lg:top-8 lg:w-72 lg:shrink-0">
            <Sidebar study={caseStudy} />
          </div>
        </div>
      </div>
    </main>
  );
}
