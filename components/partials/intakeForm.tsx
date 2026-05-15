"use client";

import React, { useState, useCallback } from "react";

// ─── Config ───────────────────────────────────────────────────────────────────
// Swap this out for your production n8n webhook URL when you deploy
const N8N_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ??
  "http://localhost:5678/webhook/intake";

// ─── Types ────────────────────────────────────────────────────────────────────

type ServiceOption =
  | "starter_site"
  | "growth_system"
  | "automation_setup"
  | "lead_capture_system"
  | "not_sure";

type BudgetRange = "under_1k" | "1k_2k" | "2k_5k" | "5k_10k" | "10k_plus";

type Timeline =
  | "asap"
  | "1_month"
  | "1_3_months"
  | "3_plus_months"
  | "just_exploring";

type FormData = {
  // Step 1
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  websiteUrl: string;
  socials: string;
  // Step 2
  industry: string;
  businessDescription: string;
  biggestChallenge: string;
  // Step 3
  services: ServiceOption[];
  goals: string;
  // Step 4
  budget: BudgetRange | "";
  timeline: Timeline | "";
  // Step 5
  additionalNotes: string;
  referralSource: string;
};

const INITIAL_FORM: FormData = {
  fullName: "",
  businessName: "",
  email: "",
  phone: "",
  websiteUrl: "",
  socials: "",
  industry: "",
  businessDescription: "",
  biggestChallenge: "",
  services: [],
  goals: "",
  budget: "",
  timeline: "",
  additionalNotes: "",
  referralSource: "",
};

type StepErrors = Partial<Record<keyof FormData, string>>;

// ─── Step Definitions ─────────────────────────────────────────────────────────

const STEPS = [
  { number: 1, label: "Contact" },
  { number: 2, label: "Business" },
  { number: 3, label: "Services" },
  { number: 4, label: "Budget" },
  { number: 5, label: "Finish" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function validateStep(step: number, data: FormData): StepErrors {
  const errors: StepErrors = {};
  if (step === 1) {
    if (!data.fullName.trim()) errors.fullName = "Name is required.";
    if (!data.businessName.trim())
      errors.businessName = "Business name is required.";
    if (!data.email.trim()) errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      errors.email = "Enter a valid email.";
    if (!data.phone.trim()) errors.phone = "Phone number is required.";
  }
  if (step === 2) {
    if (!data.businessDescription.trim())
      errors.businessDescription = "Tell us a bit about your business.";
    if (!data.biggestChallenge.trim())
      errors.biggestChallenge = "This helps us understand where to focus.";
  }
  if (step === 3) {
    if (!data.services.length) errors.services = "Select at least one service.";
  }
  if (step === 4) {
    if (!data.budget) errors.budget = "Select a budget range.";
    if (!data.timeline) errors.timeline = "Select a timeline.";
  }
  return errors;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = ((current - 1) / (total - 1)) * 100;
  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center justify-between">
        {STEPS.map((s) => (
          <div key={s.number} className="flex flex-col items-center gap-1">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                s.number < current
                  ? "bg-indigo-600 text-white"
                  : s.number === current
                    ? "bg-indigo-600 text-white ring-4 ring-indigo-100"
                    : "bg-[#1F2430]/8 text-[#1F2430]/30"
              }`}
            >
              {s.number < current ? (
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                s.number
              )}
            </div>
            <span
              className={`hidden text-[10px] font-medium sm:block ${
                s.number === current ? "text-indigo-600" : "text-[#1F2430]/30"
              }`}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-[#1F2430]/8">
        <div
          className="h-full rounded-full bg-indigo-600 transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function FieldWrapper({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-[#1F2430]">
        {label}
        {required && <span className="ml-1 text-indigo-600">*</span>}
      </label>
      {children}
      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}

const inputCls = (error?: string) =>
  `w-full rounded-[10px] border px-4 py-3 text-sm text-[#1F2430] placeholder-[#1F2430]/30 outline-none transition-all duration-150 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 ${
    error
      ? "border-red-400 bg-red-50"
      : "border-[#1F2430]/15 bg-white hover:border-[#1F2430]/25"
  }`;

// ─── Step 1: Contact Info ─────────────────────────────────────────────────────

function StepContact({
  data,
  errors,
  onChange,
}: {
  data: FormData;
  errors: StepErrors;
  onChange: (field: keyof FormData, value: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-[#1F2430]">
          Let's Build Something
        </h2>
        <p className="mt-1.5 text-sm text-[#1F2430]/55">
          Start with the basics. Takes about 3 minutes total.
        </p>
      </div>

      <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
        Basic Contact Info
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <FieldWrapper label="Full Name" required error={errors.fullName}>
          <input
            type="text"
            placeholder="Christopher Norton"
            value={data.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            className={inputCls(errors.fullName)}
          />
        </FieldWrapper>

        <FieldWrapper
          label="Business Name"
          required
          error={errors.businessName}
        >
          <input
            type="text"
            placeholder="Webtech Ninjas"
            value={data.businessName}
            onChange={(e) => onChange("businessName", e.target.value)}
            className={inputCls(errors.businessName)}
          />
        </FieldWrapper>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FieldWrapper label="Email" required error={errors.email}>
          <input
            type="email"
            placeholder="you@yourbusiness.com"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
            className={inputCls(errors.email)}
          />
        </FieldWrapper>

        <FieldWrapper label="Phone Number" required error={errors.phone}>
          <input
            type="tel"
            placeholder="(727) 555-0100"
            value={data.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className={inputCls(errors.phone)}
          />
        </FieldWrapper>
      </div>

      <FieldWrapper label="Website URL" error={errors.websiteUrl}>
        <input
          type="url"
          placeholder="https://yourbusiness.com"
          value={data.websiteUrl}
          onChange={(e) => onChange("websiteUrl", e.target.value)}
          className={inputCls(errors.websiteUrl)}
        />
      </FieldWrapper>

      <FieldWrapper label="Socials" error={errors.socials}>
        <input
          type="text"
          placeholder="@yourhandle or link — wherever you're most active"
          value={data.socials}
          onChange={(e) => onChange("socials", e.target.value)}
          className={inputCls(errors.socials)}
        />
      </FieldWrapper>
    </div>
  );
}

// ─── Step 2: Business Info ────────────────────────────────────────────────────

function StepBusiness({
  data,
  errors,
  onChange,
}: {
  data: FormData;
  errors: StepErrors;
  onChange: (field: keyof FormData, value: string) => void;
}) {
  const industries = [
    "Home Services",
    "Health & Wellness",
    "Legal",
    "Real Estate",
    "E-commerce",
    "Consulting",
    "Restaurant / Food",
    "Nonprofit",
    "Other",
  ];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-[#1F2430]">
          About Your Business
        </h2>
        <p className="mt-1.5 text-sm text-[#1F2430]/55">
          The more context you give, the more useful the strategy call.
        </p>
      </div>

      <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
        Business Context
      </p>

      <FieldWrapper label="Industry / Niche" error={errors.industry}>
        <select
          value={data.industry}
          onChange={(e) => onChange("industry", e.target.value)}
          className={`${inputCls(errors.industry)} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%231F2430' stroke-opacity='.4' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m4 6 4 4 4-4'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_14px_center] pr-10`}
        >
          <option value="">Select your industry</option>
          {industries.map((ind) => (
            <option key={ind} value={ind}>
              {ind}
            </option>
          ))}
        </select>
      </FieldWrapper>

      <FieldWrapper
        label="What does your business do?"
        required
        error={errors.businessDescription}
      >
        <textarea
          rows={3}
          placeholder="Brief description — who you serve, what you offer, how long you've been operating."
          value={data.businessDescription}
          onChange={(e) => onChange("businessDescription", e.target.value)}
          className={`${inputCls(errors.businessDescription)} resize-none`}
        />
      </FieldWrapper>

      <FieldWrapper
        label="What's your biggest digital challenge right now?"
        required
        error={errors.biggestChallenge}
      >
        <textarea
          rows={3}
          placeholder="Slow website, no leads coming in, manual processes eating your time, outdated design, no online presence — be honest, that's what this call is for."
          value={data.biggestChallenge}
          onChange={(e) => onChange("biggestChallenge", e.target.value)}
          className={`${inputCls(errors.biggestChallenge)} resize-none`}
        />
      </FieldWrapper>
    </div>
  );
}

// ─── Step 3: Services ─────────────────────────────────────────────────────────

const SERVICE_OPTIONS: {
  value: ServiceOption;
  label: string;
  description: string;
}[] = [
  {
    value: "starter_site",
    label: "Starter Site",
    description:
      "Clean, modern website that makes the business look credible fast.",
  },
  {
    value: "growth_system",
    label: "Growth System",
    description:
      "Website + SEO foundation + lead capture built to support real momentum.",
  },
  {
    value: "automation_setup",
    label: "Automation Setup",
    description:
      "Smarter workflows — forms, CRM routing, onboarding, less manual work.",
  },
  {
    value: "lead_capture_system",
    label: "Lead Capture System",
    description:
      "Intake forms, response routing, and conversion-focused CTA structure.",
  },
  {
    value: "not_sure",
    label: "Not Sure Yet",
    description:
      "I know something needs to improve — just not sure what the right solution is.",
  },
];

function StepServices({
  data,
  errors,
  onToggleService,
  onChange,
}: {
  data: FormData;
  errors: StepErrors;
  onToggleService: (val: ServiceOption) => void;
  onChange: (field: keyof FormData, value: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-[#1F2430]">What Do You Need?</h2>
        <p className="mt-1.5 text-sm text-[#1F2430]/55">
          Select everything that applies. Not sure? Pick the closest thing and
          we'll figure it out together.
        </p>
      </div>

      <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
        Services
      </p>

      <div className="space-y-2.5">
        {SERVICE_OPTIONS.map((opt) => {
          const selected = data.services.includes(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onToggleService(opt.value)}
              className={`flex w-full items-start gap-4 rounded-[12px] border p-4 text-left transition-all duration-150 ${
                selected
                  ? "border-indigo-500 bg-[#F3F0FF] ring-1 ring-indigo-200"
                  : "border-[#1F2430]/10 bg-white hover:border-indigo-300/50 hover:bg-[#F3F0FF]/40"
              }`}
            >
              <div
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-all duration-150 ${
                  selected
                    ? "border-indigo-600 bg-indigo-600"
                    : "border-[#1F2430]/20"
                }`}
              >
                {selected && (
                  <svg
                    className="h-3 w-3 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <div>
                <p
                  className={`text-sm font-semibold ${selected ? "text-indigo-700" : "text-[#1F2430]"}`}
                >
                  {opt.label}
                </p>
                <p className="mt-0.5 text-xs text-[#1F2430]/55">
                  {opt.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {errors.services && (
        <p className="text-xs font-medium text-red-500">{errors.services}</p>
      )}

      <FieldWrapper
        label="What's the main goal you're trying to hit?"
        error={errors.goals}
      >
        <textarea
          rows={3}
          placeholder="More leads, faster load times, less admin work, a site that doesn't embarrass you — whatever it is, say it plainly."
          value={data.goals}
          onChange={(e) => onChange("goals", e.target.value)}
          className={`${inputCls(errors.goals)} resize-none`}
        />
      </FieldWrapper>
    </div>
  );
}

// ─── Step 4: Budget & Timeline ────────────────────────────────────────────────

const BUDGET_OPTIONS: { value: BudgetRange; label: string; sub?: string }[] = [
  { value: "under_1k", label: "Under $1,000", sub: "Getting started" },
  { value: "1k_2k", label: "$1,000 – $2,000", sub: "Starter builds" },
  { value: "2k_5k", label: "$2,000 – $5,000", sub: "Growth systems" },
  { value: "5k_10k", label: "$5,000 – $10,000", sub: "Full systems" },
  { value: "10k_plus", label: "$10,000+", sub: "Larger scope" },
];

const TIMELINE_OPTIONS: { value: Timeline; label: string }[] = [
  { value: "asap", label: "As soon as possible" },
  { value: "1_month", label: "Within 1 month" },
  { value: "1_3_months", label: "1–3 months" },
  { value: "3_plus_months", label: "3+ months out" },
  { value: "just_exploring", label: "Just exploring for now" },
];

function OptionPill<T extends string>({
  value,
  label,
  sub,
  selected,
  onSelect,
}: {
  value: T;
  label: string;
  sub?: string;
  selected: boolean;
  onSelect: (v: T) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={`flex w-full items-center justify-between rounded-[10px] border px-4 py-3 text-left text-sm transition-all duration-150 ${
        selected
          ? "border-indigo-500 bg-[#F3F0FF] font-semibold text-indigo-700 ring-1 ring-indigo-200"
          : "border-[#1F2430]/10 bg-white text-[#1F2430]/70 hover:border-indigo-300/50 hover:text-[#1F2430]"
      }`}
    >
      <span>{label}</span>
      {sub && <span className="text-xs text-[#1F2430]/35">{sub}</span>}
    </button>
  );
}

function StepBudget({
  data,
  errors,
  onChange,
}: {
  data: FormData;
  errors: StepErrors;
  onChange: (field: keyof FormData, value: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#1F2430]">Budget & Timeline</h2>
        <p className="mt-1.5 text-sm text-[#1F2430]/55">
          No wrong answers here — this just helps make the conversation useful
          from minute one.
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
          Budget Range<span className="ml-1 text-red-400">*</span>
        </p>
        <div className="space-y-2">
          {BUDGET_OPTIONS.map((opt) => (
            <OptionPill
              key={opt.value}
              value={opt.value}
              label={opt.label}
              sub={opt.sub}
              selected={data.budget === opt.value}
              onSelect={(v) => onChange("budget", v)}
            />
          ))}
        </div>
        {errors.budget && (
          <p className="text-xs font-medium text-red-500">{errors.budget}</p>
        )}
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
          Timeline<span className="ml-1 text-red-400">*</span>
        </p>
        <div className="space-y-2">
          {TIMELINE_OPTIONS.map((opt) => (
            <OptionPill
              key={opt.value}
              value={opt.value}
              label={opt.label}
              selected={data.timeline === opt.value}
              onSelect={(v) => onChange("timeline", v)}
            />
          ))}
        </div>
        {errors.timeline && (
          <p className="text-xs font-medium text-red-500">{errors.timeline}</p>
        )}
      </div>
    </div>
  );
}

// ─── Step 5: Final Notes ──────────────────────────────────────────────────────

const REFERRAL_OPTIONS = [
  "Google Search",
  "Instagram",
  "Facebook",
  "A referral",
  "LinkedIn",
  "Other",
];

function StepFinish({
  data,
  errors,
  onChange,
}: {
  data: FormData;
  errors: StepErrors;
  onChange: (field: keyof FormData, value: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-[#1F2430]">Almost Done</h2>
        <p className="mt-1.5 text-sm text-[#1F2430]/55">
          Anything else worth knowing before the call? This is optional but
          appreciated.
        </p>
      </div>

      <FieldWrapper
        label="Anything else you want to share?"
        error={errors.additionalNotes}
      >
        <textarea
          rows={4}
          placeholder="Prior agency experience, specific concerns, things that have already been tried, anything that would make the call more useful — drop it here."
          value={data.additionalNotes}
          onChange={(e) => onChange("additionalNotes", e.target.value)}
          className={`${inputCls(errors.additionalNotes)} resize-none`}
        />
      </FieldWrapper>

      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
          How did you find Webtech Ninjas?
        </p>
        <div className="flex flex-wrap gap-2">
          {REFERRAL_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => onChange("referralSource", opt)}
              className={`rounded-full border px-3.5 py-1.5 text-sm transition-all duration-150 ${
                data.referralSource === opt
                  ? "border-indigo-500 bg-indigo-600 text-white"
                  : "border-[#1F2430]/12 bg-white text-[#1F2430]/60 hover:border-indigo-300/50 hover:text-[#1F2430]"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Summary callout */}
      <div className="rounded-[12px] border border-indigo-100 bg-[#F3F0FF] p-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-indigo-600">
          What happens next
        </p>
        <ul className="space-y-1.5">
          {[
            "We'll review your submission within 1 business day.",
            "You'll get a calendar link to book your strategy call.",
            "The call is 30 minutes — no pressure, no pitch theater.",
          ].map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 text-sm text-[#1F2430]/70"
            >
              <svg
                className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                  clipRule="evenodd"
                />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Success Screen ───────────────────────────────────────────────────────────

function SuccessScreen({ name }: { name: string }) {
  const first = name.split(" ")[0];
  return (
    <div className="flex flex-col items-center gap-6 py-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600">
        <svg
          className="h-8 w-8 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-[#1F2430]">
          Got it{first ? `, ${first}` : ""}.
        </h2>
        <p className="max-w-sm text-sm text-[#1F2430]/60">
          Your submission is in. We'll review it and reach out within 1 business
          day with next steps. Check your inbox — including spam, just in case.
        </p>
      </div>
      <div className="rounded-[12px] border border-[#1F2430]/8 bg-white p-5 text-left w-full max-w-sm">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#1F2430]/40 mb-2">
          In the meantime
        </p>
        <ul className="space-y-1.5 text-sm text-[#1F2430]/65">
          <li>
            → Check out the{" "}
            <a href="/case-studies" className="text-indigo-600 hover:underline">
              case studies
            </a>{" "}
            to see what we've built
          </li>
          <li>
            → Follow along on{" "}
            <a
              href="https://www.instagram.com/webtechninjas"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              Instagram
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function IntakeForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<StepErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = useCallback((field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const handleToggleService = useCallback((val: ServiceOption) => {
    setForm((prev) => {
      const has = prev.services.includes(val);
      return {
        ...prev,
        services: has
          ? prev.services.filter((s) => s !== val)
          : [...prev.services, val],
      };
    });
    setErrors((prev) => ({ ...prev, services: undefined }));
  }, []);

  const handleNext = () => {
    const errs = validateStep(step, form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    const errs = validateStep(5, form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          submittedAt: new Date().toISOString(),
          source: "webtechninjas.com/contact",
        }),
      });

      if (!res.ok) throw new Error(`Webhook returned ${res.status}`);

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Intake form submission error:", err);
      setSubmitError(
        "Something went wrong on our end. Try again or email us directly.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-[#F8F7F4] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl">
        {/* Header */}
        {!submitted && (
          <div className="mb-8">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-5 w-1 rounded-full bg-indigo-600" />
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
                Let's Build
              </span>
            </div>
            <h1 className="text-3xl font-bold text-[#1F2430] sm:text-4xl">
              Start the Conversation
            </h1>
            <p className="mt-2 text-sm text-[#1F2430]/55">
              No pressure. No pitch theater. Just a clear conversation about
              what your business actually needs.
            </p>
          </div>
        )}

        {/* Card */}
        <div className="rounded-[16px] border border-[#1F2430]/10 bg-white p-6 shadow-[0_2px_12px_rgba(31,36,48,0.07)] sm:p-8">
          {submitted ? (
            <SuccessScreen name={form.fullName} />
          ) : (
            <>
              <ProgressBar current={step} total={STEPS.length} />

              {step === 1 && (
                <StepContact
                  data={form}
                  errors={errors}
                  onChange={handleChange}
                />
              )}
              {step === 2 && (
                <StepBusiness
                  data={form}
                  errors={errors}
                  onChange={handleChange}
                />
              )}
              {step === 3 && (
                <StepServices
                  data={form}
                  errors={errors}
                  onToggleService={handleToggleService}
                  onChange={handleChange}
                />
              )}
              {step === 4 && (
                <StepBudget
                  data={form}
                  errors={errors}
                  onChange={handleChange}
                />
              )}
              {step === 5 && (
                <StepFinish
                  data={form}
                  errors={errors}
                  onChange={handleChange}
                />
              )}

              {/* Navigation */}
              <div className="mt-8 flex items-center justify-between gap-4">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center gap-1.5 rounded-[10px] border border-[#1F2430]/15 px-5 py-2.5 text-sm font-medium text-[#1F2430]/60 transition-colors hover:border-[#1F2430]/30 hover:text-[#1F2430]"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M10 4L6 8l4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {step < STEPS.length ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-1.5 rounded-[10px] bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
                  >
                    Next
                    <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M6 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="flex items-center gap-2 rounded-[10px] bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <svg
                          className="h-4 w-4 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="3"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                          />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Submit
                        <svg
                          className="h-4 w-4"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M6 4l4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Submit error */}
              {submitError && (
                <p className="mt-3 text-center text-xs font-medium text-red-500">
                  {submitError}
                </p>
              )}

              {/* Step counter */}
              <p className="mt-4 text-center text-[11px] text-[#1F2430]/30">
                Step {step} of {STEPS.length}
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
