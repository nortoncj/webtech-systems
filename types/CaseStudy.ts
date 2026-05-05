import type { PortableTextBlock } from "sanity";

// ─────────────────────────────────────────────────────────────
// Shared Types
// ─────────────────────────────────────────────────────────────

export type Category = {
  _id: string;
  title: string;
  slug: string;
};

export type Tag = {
  _id: string;
  title: string;
};

export type ImageAsset = {
  url: string;
  metadata?: Record<string, unknown>;
};

export type SanityImage = {
  asset: ImageAsset;
  alt?: string;
  caption?: string;
};

export type ServiceType =
  | "starter_site"
  | "growth_system"
  | "automation_setup"
  | "lead_capture_system"
  | "custom_build";

export const SERVICE_LABELS: Record<ServiceType, string> = {
  starter_site: "Starter Site",
  growth_system: "Growth System",
  automation_setup: "Automation Setup",
  lead_capture_system: "Lead Capture System",
  custom_build: "Custom Build",
};

// ─────────────────────────────────────────────────────────────────────────────
// Case Study PREVIEW  (used on index / case study listing page)
// Matches the getCaseStudies() projection — no body, no _createdAt
// ─────────────────────────────────────────────────────────────────────────────

export type CaseStudyPreview = {
  _id: string;
  title: string;
  slug: string;
  publishedAt?: string;
  featured?: boolean;
  clientName?: string;
  industry?: string;
  coverImage?: SanityImage;
  video?: string;
  excerpt?: string;
  service?: ServiceType;
  categories?: Category[];
  tags?: Tag[];
  outcomes?: CaseStudyOutcome[];
  techStack?: string[];
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
};

// ─────────────────────────────────────────────────────────────
// Case Study Outcome Block
// ─────────────────────────────────────────────────────────────

export type CaseStudyOutcome = {
  metric: string; // required
  before?: string;
  after?: string;
  delta?: string;
  isEstimated?: boolean;
};

// ─────────────────────────────────────────────────────────────
// Testimonial Block
// ─────────────────────────────────────────────────────────────

export type CaseStudyTestimonial = {
  quote?: string;
  authorName?: string;
  authorBusiness?: string;
  authorPhoto?: {
    asset: ImageAsset;
  };
};

// ─────────────────────────────────────────────────────────────
// Main Case Study Document
// ─────────────────────────────────────────────────────────────

export type CaseStudy = {
  _id: string;
  _createdAt: string;

  // Core Info
  title: string;
  slug: string;
  publishedAt?: string;
  featured: boolean;

  // Client Info
  clientName?: string;
  industry?: string;

  coverImage?: {
    asset: ImageAsset;
    alt?: string;
  };

  // Summary
  excerpt?: string;

  // Service Delivered
  service:
    | "starter_site"
    | "growth_system"
    | "automation_setup"
    | "lead_capture_system"
    | "custom_build";

  // References
  categories: Category[];
  tags: Tag[];

  // Case Study Sections (Portable Text)
  problem: PortableTextBlock[];
  solution: PortableTextBlock[];
  systemBuilt: (PortableTextBlock | { asset: ImageAsset })[];

  // Tech Stack
  techStack?: string[];

  // Outcomes
  outcomes?: CaseStudyOutcome[];

  // Testimonial
  testimonial?: CaseStudyTestimonial;

  // Gallery
  gallery?: {
    asset: ImageAsset;
    alt?: string;
    caption?: string;
  }[];

  // SEO
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
};
