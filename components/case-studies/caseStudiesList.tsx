"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    CaseStudyPreview,
    ServiceType,
    SERVICE_LABELS
} from "@/types/CaseStudy";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatService(service?: ServiceType) {
  if (!service) return null;
  return SERVICE_LABELS[service] ?? service;
}

function formatDate(dateStr?: string) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ServiceBadge({ service }: { service?: ServiceType }) {
  const label = formatService(service);
  if (!label) return null;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white tracking-wide">
      {label}
    </span>
  );
}

function CategoryPills({
  categories,
}: {
  categories?: CaseStudyPreview["categories"];
}) {
  if (!categories?.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {categories.map((cat) => (
        <span
          key={cat._id}
          className="rounded-full border border-[#1F2430]/20 bg-[#F8F7F4] px-2.5 py-0.5 text-xs font-medium text-[#1F2430]/70"
        >
          {cat.title}
        </span>
      ))}
    </div>
  );
}

function OutcomeHighlights({
  outcomes,
}: {
  outcomes?: CaseStudyPreview["outcomes"];
}) {
  const topOutcomes = outcomes?.slice(0, 3);
  if (!topOutcomes?.length) return null;
  return (
    <div className="grid grid-cols-3 gap-2 border-t border-[#1F2430]/8 pt-4">
      {topOutcomes.map((o, i) => (
        <div key={i} className="flex flex-col gap-0.5">
          <span className="text-sm font-bold text-indigo-600 leading-tight">
            {o.delta ?? o.after ?? "—"}
            {o.isEstimated && (
              <span className="ml-0.5 text-[10px] text-[#1F2430]/40">*</span>
            )}
          </span>
          <span className="text-[11px] text-[#1F2430]/55 leading-tight">
            {o.metric}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function CaseStudyCard({
  study,
  priority,
}: {
  study: CaseStudyPreview;
  priority?: boolean;
}) {
  const imageUrl = study.coverImage?.asset?.url;
  const alt = study.coverImage?.alt ?? study.title;

  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-[12px] border border-[#1F2430]/10 bg-white shadow-[0_1px_4px_rgba(31,36,48,0.06)] transition-all duration-200 hover:shadow-[0_4px_16px_rgba(79,70,229,0.12)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
    >
      {/* Cover image */}
      <div className="relative h-48 w-full overflow-hidden bg-[#F3F0FF]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={alt}
            fill
            priority={priority}
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <svg
              className="h-12 w-12 text-indigo-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0H3"
              />
            </svg>
          </div>
        )}

        {/* Featured badge */}
        {study.featured && (
          <div className="absolute left-3 top-3">
            <span className="rounded-full bg-[#1F2430]/85 px-2.5 py-1 text-[11px] font-semibold tracking-widest text-white uppercase backdrop-blur-sm">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Top meta row */}
        <div className="flex items-center justify-between gap-2">
          <ServiceBadge service={study.service} />
          {formatDate(study.publishedAt) && (
            <span className="text-[11px] text-[#1F2430]/40">
              {formatDate(study.publishedAt)}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold leading-snug text-[#1F2430] group-hover:text-indigo-600 transition-colors duration-150">
          {study.title}
        </h3>

        {/* Client + industry */}
        {(study.clientName || study.industry) && (
          <p className="text-xs text-[#1F2430]/50">
            {[study.clientName, study.industry].filter(Boolean).join(" · ")}
          </p>
        )}

        {/* Excerpt */}
        {study.excerpt && (
          <p className="text-sm leading-relaxed text-[#1F2430]/70 line-clamp-2">
            {study.excerpt}
          </p>
        )}

        {/* Categories */}
        <CategoryPills categories={study.categories} />

        {/* Tech stack */}
        {study.techStack?.length ? (
          <div className="flex flex-wrap gap-1">
            {study.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded bg-[#F3F0FF] px-2 py-0.5 text-[11px] font-mono font-medium text-indigo-700"
              >
                {tech}
              </span>
            ))}
          </div>
        ) : null}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Outcome highlights */}
        <OutcomeHighlights outcomes={study.outcomes} />
      </div>

      {/* Arrow indicator */}
      <div className="flex items-center justify-end border-t border-[#1F2430]/8 px-5 py-3">
        <span className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 transition-transform duration-150 group-hover:translate-x-0.5">
          View Case Study
          <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}

// ─── Filter Bar ───────────────────────────────────────────────────────────────

type FilterOption = { label: string; value: string };

function FilterBar({
  options,
  active,
  onChange,
}: {
  options: FilterOption[];
  active: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-150 ${
            active === opt.value
              ? "border-indigo-600 bg-indigo-600 text-white"
              : "border-[#1F2430]/15 bg-white text-[#1F2430]/70 hover:border-indigo-600/40 hover:text-indigo-600"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center gap-3 rounded-[12px] border border-dashed border-[#1F2430]/15 bg-white py-16 text-center">
      <svg
        className="h-10 w-10 text-[#1F2430]/20"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
        />
      </svg>
      <p className="text-sm text-[#1F2430]/40">
        No case studies match that filter.
      </p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CaseStudiesList({
  caseStudies,
}: {
  caseStudies: CaseStudyPreview[];
}) {
  const [activeService, setActiveService] = useState<string>("all");

  // Build service filter options from what's actually in the data
  const serviceOptions = useMemo<FilterOption[]>(() => {
    const seen = new Set<string>();
    const options: FilterOption[] = [{ label: "All Work", value: "all" }];

    for (const study of caseStudies) {
      if (study.service && !seen.has(study.service)) {
        seen.add(study.service);
        options.push({
          label: SERVICE_LABELS[study.service] ?? study.service,
          value: study.service,
        });
      }
    }

    return options;
  }, [caseStudies]);

  const filtered = useMemo(() => {
    if (activeService === "all") return caseStudies;
    return caseStudies.filter((s) => s.service === activeService);
  }, [caseStudies, activeService]);

  // Featured studies float to the top
  const sorted = useMemo(
    () =>
      [...filtered].sort(
        (a, b) => Number(b.featured ?? 0) - Number(a.featured ?? 0),
      ),
    [filtered],
  );

  if (!caseStudies.length) {
    return (
      <section className="py-16 text-center">
        <p className="text-[#1F2430]/40 text-sm">
          No case studies yet. Go build something.
        </p>
      </section>
    );
  }

  return (
    <section className="bg-[#F8F7F4] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        {/* Section header */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
            Our Work
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-[#1F2430] sm:text-4xl">
            Systems Built. Results Delivered.
          </h2>
          <p className="max-w-xl text-base text-[#1F2430]/60">
            Not pretty screenshots — real problems, real systems, real outcomes.
          </p>
        </div>

        {/* Filters */}
        {serviceOptions.length > 2 && (
          <FilterBar
            options={serviceOptions}
            active={activeService}
            onChange={setActiveService}
          />
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.length === 0 ? (
            <EmptyState />
          ) : (
            sorted.map((study, i) => (
              <CaseStudyCard key={study._id} study={study} priority={i < 3} />
            ))
          )}
        </div>

        {/* Estimated disclaimer */}
        {sorted.some((s) => s.outcomes?.some((o) => o.isEstimated)) && (
          <p className="text-xs text-[#1F2430]/35">
            * Estimated impact based on industry benchmarks and project scope.
          </p>
        )}
      </div>
    </section>
  );
}
