"use client";

import React, { useState, FormEvent } from "react";

interface FormData {
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
}

export default function LeadForm() {
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const LEAD_WEBHOOK_URL =
    process.env.NEXT_PUBLIC_N8N_INTAKE_URL ??
    "http://localhost:5678/webhook/lead";

  const totalSteps = 6;
  const progress = (step / totalSteps) * 100;

  const stepMessages: Record<number, string> = {
    1: "Let's understand your business.",
    2: "Now let's define your audience and goals.",
    3: "Tell me about your services and offers.",
    4: "Let's shape the tone and personality.",
    5: "Project scope and technical details.",
    6: "Final contact details and submission.",
  };

  const nextStep = () => {
    if (step < totalSteps) setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;

    const pagesNeeded = Array.from(
      form.querySelectorAll<HTMLInputElement>('input[name="pages"]:checked'),
    ).map((checkbox) => checkbox.value);

    const featuresNeeded = Array.from(
      form.querySelectorAll<HTMLInputElement>('input[name="features"]:checked'),
    ).map((checkbox) => checkbox.value);

    const formData: FormData = {
      businessName:
        (form.elements.namedItem("businessName") as HTMLInputElement)?.value ??
        "",
      industry:
        (form.elements.namedItem("industry") as HTMLSelectElement)?.value ?? "",
      currentWebsite:
        (form.elements.namedItem("currentWebsite") as HTMLInputElement)
          ?.value || "None",

      targetCustomer:
        (form.elements.namedItem("targetCustomer") as HTMLTextAreaElement)
          ?.value ?? "",
      mainGoal:
        (form.elements.namedItem("mainGoal") as HTMLSelectElement)?.value ?? "",
      competitors:
        (form.elements.namedItem("competitors") as HTMLTextAreaElement)
          ?.value || "None provided",

      services:
        (form.elements.namedItem("services") as HTMLTextAreaElement)?.value ??
        "",
      uniqueValue:
        (form.elements.namedItem("uniqueValue") as HTMLTextAreaElement)
          ?.value || "Not specified",

      tone: (form.elements.namedItem("tone") as HTMLSelectElement)?.value ?? "",
      existingTagline:
        (form.elements.namedItem("existingTagline") as HTMLInputElement)
          ?.value || "None",
      brandNotes:
        (form.elements.namedItem("brandNotes") as HTMLTextAreaElement)?.value ||
        "None",

      pagesNeeded,
      featuresNeeded,

      budget:
        (form.elements.namedItem("budget") as HTMLSelectElement)?.value ?? "",
      timeline:
        (form.elements.namedItem("timeline") as HTMLSelectElement)?.value ?? "",
      additionalNotes:
        (form.elements.namedItem("additionalNotes") as HTMLTextAreaElement)
          ?.value || "None",

      contactName:
        (form.elements.namedItem("contactName") as HTMLInputElement)?.value ??
        "",
      email:
        (form.elements.namedItem("email") as HTMLInputElement)?.value ?? "",
      phone:
        (form.elements.namedItem("phone") as HTMLInputElement)?.value ||
        "Not provided",

      submittedAt: new Date().toISOString(),
      formType: "full-intake",
    };

    try {
      const response = await fetch(LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        window.location.href = "/onboarding/complete";
      } else {
        alert("Something went wrong. Please contact support directly.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please contact support directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 space-y-10 bg-white rounded-xl"
    >
      {/* Progress */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm text-gray-600">
          <span>
            Step {step} of {totalSteps}
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

      {/* All your step sections remain exactly the same */}
      {/* STEP 1 */}
      {step === 1 && (
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Tell me about your business</h2>
          <input
            type="text"
            name="businessName"
            placeholder="Business Name"
            required
            className="w-full border rounded-lg p-4"
          />
          <select
            name="industry"
            required
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
            className="w-full border rounded-lg p-4"
          />

          <select
            name="mainGoal"
            required
            className="w-full border rounded-lg p-4"
          >
            <option value="">What's the main goal?</option>

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
            className="w-full border rounded-lg p-4"
          />

          <textarea
            name="uniqueValue"
            placeholder="What makes you different?"
            rows={4}
            className="w-full border rounded-lg p-4"
          />
        </section>
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Brand personality & tone</h2>

          <select name="tone" required className="w-full border rounded-lg p-4">
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
            className="w-full border rounded-lg p-4"
          />

          <textarea
            name="brandNotes"
            placeholder="Brand notes..."
            rows={4}
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
              {[
                "home",
                "about",
                "services",
                "portfolio",
                "contact",
                "blog",
                "shop",
                "booking",
              ].map((page) => (
                <label key={page} className="flex items-center gap-2">
                  <input type="checkbox" name="pages" value={page} />

                  {page}
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="font-semibold">Features needed</label>

            <div className="grid grid-cols-2 gap-4">
              {[
                "contact-form",
                "email-signup",
                "booking-system",
                "payment-processing",
                "blog-cms",
                "testimonials",
                "faq",
              ].map((feature) => (
                <label key={feature} className="flex items-center gap-2">
                  <input type="checkbox" name="features" value={feature} />

                  {feature}
                </label>
              ))}
            </div>
          </div>

          <select
            name="budget"
            required
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
            className="w-full border rounded-lg p-4"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full border rounded-lg p-4"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
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

        {step < totalSteps ? (
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
