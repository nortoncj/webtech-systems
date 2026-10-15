"use client";

import React, { useRef, useState, FormEvent } from "react";

interface LeadPayload {
  businessName: string;
  industry: string;
  currentWebsite: string;
  targetCustomer: string;
  mainGoal: string;
  competitors: string;
  services: string;
  uniqueValue: string;
  tone: string;
  existingTagline: string;
  brandNotes: string;
  pagesNeeded: string[];
  featuresNeeded: string[];
  budget: string;
  timeline: string;
  additionalNotes: string;
  contactName: string;
  email: string;
  phone: string;
  submittedAt: string;
  formType: string;
  website: string; // honeypot field
}

type Answers = Record<string, string[]>;

const LEAD_ENDPOINT = "/api/leads";
const TOTAL_STEPS = 6;

const PAGES = [
  "home",
  "about",
  "services",
  "portfolio",
  "contact",
  "blog",
  "shop",
  "booking",
];

const FEATURES = [
  "contact-form",
  "email-signup",
  "booking-system",
  "payment-processing",
  "blog-cms",
  "testimonials",
  "faq",
];

const stepMessages: Record<number, string> = {
  1: "Let's understand your business.",
  2: "Now let's define your audience and goals.",
  3: "Tell me about your services and offers.",
  4: "Let's shape the tone and personality.",
  5: "Project scope and technical details.",
  6: "Final contact details and submission.",
};

export default function LeadForm() {
  const [step, setStep] = useState<number>(1);
  const [honeypot, setHoneypot] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Only the current step is mounted, so each step's answers have to be
  // stashed here before it unmounts — otherwise everything except step 6 is
  // gone by the time the form is submitted.
  const [answers, setAnswers] = useState<Answers>({});

  const one = (a: Answers, name: string) => (a[name]?.[0] ?? "").trim();
  const many = (a: Answers, name: string) => a[name] ?? [];

  const progress = (step / TOTAL_STEPS) * 100;

  /** Read every named control currently in the DOM and merge it into state. */
  const captureStep = (): Answers => {
    const form = formRef.current;
    if (!form) return answers;

    const data = new FormData(form);
    const captured: Answers = {};

    form
      .querySelectorAll<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >("input[name], select[name], textarea[name]")
      // getAll() covers checkbox groups, and assigning it for every mounted
      // control means unchecking the last box clears the entry instead of
      // leaving a stale one behind.
      .forEach((el) => {
        captured[el.name] = data.getAll(el.name).map(String);
      });

    const merged = { ...answers, ...captured };
    setAnswers(merged);
    return merged;
  };

  const nextStep = () => {
    const form = formRef.current;

    // Required fields only exist while their step is mounted, so each step
    // has to be validated on the way out.
    if (form && !form.reportValidity()) return;

    captureStep();
    if (step < TOTAL_STEPS) setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    captureStep();
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const a = captureStep();

    const payload: LeadPayload = {
      businessName: one(a, "businessName"),
      industry: one(a, "industry"),
      currentWebsite: one(a, "currentWebsite"),

      targetCustomer: one(a, "targetCustomer"),
      mainGoal: one(a, "mainGoal"),
      competitors: one(a, "competitors"),

      services: one(a, "services"),
      uniqueValue: one(a, "uniqueValue"),

      tone: one(a, "tone"),
      existingTagline: one(a, "existingTagline"),
      brandNotes: one(a, "brandNotes"),

      pagesNeeded: many(a, "pages"),
      featuresNeeded: many(a, "features"),

      budget: one(a, "budget"),
      timeline: one(a, "timeline"),
      additionalNotes: one(a, "additionalNotes"),

      contactName: one(a, "contactName"),
      email: one(a, "email"),
      phone: one(a, "phone"),

      // Honeypot: nobody using a browser ever sees this field, so anything in
      // it came from a bot. The server decides what to do about that.
      website: honeypot,

      submittedAt: new Date().toISOString(),
      formType: "full-intake",
    };

    try {
      const response = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Lead submission failed: ${response.status}`);
      }

      // Leave the button disabled through the redirect so the form cannot be
      // submitted twice.
      window.location.href = "/onboarding/complete";
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please contact support directly.");
      setIsSubmitting(false);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 space-y-10 bg-white rounded-xl"
    >
      {/* Honeypot — hidden from sighted users, screen readers and the tab
          order, so only a bot will ever fill it in. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {/* Progress */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm text-gray-600">
          <span>
            Step {step} of {TOTAL_STEPS}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>

        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-gray-600">{stepMessages[step]}</p>
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Tell me about your business</h2>
          <input
            type="text"
            name="businessName"
            placeholder="Business Name"
            required
            defaultValue={one(answers, "businessName")}
            className="w-full border rounded-lg p-4"
          />
          <select
            name="industry"
            required
            defaultValue={one(answers, "industry")}
            className="w-full border rounded-lg p-4"
          >
            <option value="">What industry are you in?</option>

            <option value="service-business">Service Business</option>

            <option value="ecommerce">E-commerce</option>

            <option value="coach-consultant">Coach / Consultant</option>

            <option value="restaurant-food">Restaurant / Food</option>

            <option value="healthcare">Healthcare</option>

            <option value="legal">Legal</option>

            <option value="fitness">Fitness</option>

            <option value="real-estate">Real Estate</option>

            <option value="home-services">Home Services</option>

            <option value="creative">Creative / Marketing</option>

            <option value="other">Other</option>
          </select>

          <input
            type="url"
            name="currentWebsite"
            placeholder="Current website URL"
            defaultValue={one(answers, "currentWebsite")}
            className="w-full border rounded-lg p-4"
          />
        </section>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Who are you trying to reach?</h2>

          <textarea
            name="targetCustomer"
            placeholder="Describe your ideal customer..."
            rows={5}
            required
            defaultValue={one(answers, "targetCustomer")}
            className="w-full border rounded-lg p-4"
          />

          <select
            name="mainGoal"
            required
            defaultValue={one(answers, "mainGoal")}
            className="w-full border rounded-lg p-4"
          >
            <option value="">What&apos;s the main goal?</option>

            <option value="generate-leads">Generate Leads</option>

            <option value="sell-products">Sell Products</option>

            <option value="book-appointments">Book Appointments</option>

            <option value="build-credibility">Build Credibility</option>

            <option value="portfolio">Showcase Portfolio</option>
          </select>

          <textarea
            name="competitors"
            placeholder="Competitor websites..."
            rows={4}
            defaultValue={one(answers, "competitors")}
            className="w-full border rounded-lg p-4"
          />
        </section>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">What do you offer?</h2>

          <textarea
            name="services"
            placeholder="List your services/products..."
            rows={5}
            required
            defaultValue={one(answers, "services")}
            className="w-full border rounded-lg p-4"
          />

          <textarea
            name="uniqueValue"
            placeholder="What makes you different?"
            rows={4}
            defaultValue={one(answers, "uniqueValue")}
            className="w-full border rounded-lg p-4"
          />
        </section>
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Brand personality &amp; tone</h2>

          <select
            name="tone"
            required
            defaultValue={one(answers, "tone")}
            className="w-full border rounded-lg p-4"
          >
            <option value="">Pick a vibe</option>

            <option value="professional">Professional</option>

            <option value="friendly">Friendly</option>

            <option value="bold">Bold</option>

            <option value="minimal">Minimal</option>

            <option value="luxury">Luxury</option>

            <option value="creative">Creative</option>
          </select>

          <input
            type="text"
            name="existingTagline"
            placeholder="Existing tagline"
            defaultValue={one(answers, "existingTagline")}
            className="w-full border rounded-lg p-4"
          />

          <textarea
            name="brandNotes"
            placeholder="Brand notes..."
            rows={4}
            defaultValue={one(answers, "brandNotes")}
            className="w-full border rounded-lg p-4"
          />
        </section>
      )}

      {/* STEP 5 */}
      {step === 5 && (
        <section className="space-y-8">
          <h2 className="text-3xl font-bold">Project details</h2>

          <div className="space-y-4">
            <label className="font-semibold">What pages do you need?</label>

            <div className="grid grid-cols-2 gap-4">
              {PAGES.map((page) => (
                <label key={page} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="pages"
                    value={page}
                    defaultChecked={many(answers, "pages").includes(page)}
                  />

                  {page}
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="font-semibold">Features needed</label>

            <div className="grid grid-cols-2 gap-4">
              {FEATURES.map((feature) => (
                <label key={feature} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="features"
                    value={feature}
                    defaultChecked={many(answers, "features").includes(feature)}
                  />

                  {feature}
                </label>
              ))}
            </div>
          </div>

          <select
            name="budget"
            required
            defaultValue={one(answers, "budget")}
            className="w-full border rounded-lg p-4"
          >
            <option value="">Budget range</option>

            <option value="500-1000">$500 - $1,000</option>

            <option value="1000-2000">$1,000 - $2,000</option>

            <option value="2000-5000">$2,000 - $5,000</option>

            <option value="5000-plus">$5,000+</option>
          </select>

          <select
            name="timeline"
            required
            defaultValue={one(answers, "timeline")}
            className="w-full border rounded-lg p-4"
          >
            <option value="">Timeline</option>

            <option value="asap">ASAP</option>

            <option value="3-4-weeks">3-4 weeks</option>

            <option value="1-2-months">1-2 months</option>

            <option value="flexible">Flexible</option>
          </select>

          <textarea
            name="additionalNotes"
            placeholder="Additional notes..."
            rows={4}
            defaultValue={one(answers, "additionalNotes")}
            className="w-full border rounded-lg p-4"
          />
        </section>
      )}

      {/* STEP 6 */}
      {step === 6 && (
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Final contact details</h2>

          <input
            type="text"
            name="contactName"
            placeholder="Your name"
            required
            defaultValue={one(answers, "contactName")}
            className="w-full border rounded-lg p-4"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            defaultValue={one(answers, "email")}
            className="w-full border rounded-lg p-4"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            defaultValue={one(answers, "phone")}
            className="w-full border rounded-lg p-4"
          />
        </section>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-8">
        {step > 1 ? (
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-3 border rounded-lg cursor-pointer"
          >
            Back
          </button>
        ) : (
          <div />
        )}

        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={nextStep}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg cursor-pointer"
          >
            Continue
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? "Processing..." : "Generate My Website Strategy"}
          </button>
        )}
      </div>
    </form>
  );
}
