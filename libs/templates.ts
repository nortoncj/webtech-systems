// ─────────────────────────────────────────────────────────────
// STYLE LAYERS
// ─────────────────────────────────────────────────────────────
// Style is now SEPARATE from template. A template defines the FORMAT
// (composition, framing, what the asset is for). A style defines the LOOK.
// You combine them at generate time, so you can flip Brand <-> Personal
// without duplicating every template. This is the change you were reaching
// for when you pulled personal style into its own variable.

export const STYLES = {
  brand: {
    id: "brand" as const,
    label: "Brand",
    sub: "Webtech Ninjas",
    prompt:
      "clean modern professional aesthetic, charcoal #1F2430 and off-white #F8F7F4 base with indigo #4F46E5 accents, structured composition, generous negative space, subtle depth, calm and technical, no clutter, high quality",
  },
  personal: {
    id: "personal" as const,
    label: "Personal",
    sub: "Me",
    // EDIT THIS to match however you describe your personal-brand look.
    // Keep it concrete — colors, mood, lighting, framing. Vague words like
    // "cool" or "modern" do almost nothing to a diffusion model.
    prompt:
      "bold high-contrast look, dramatic directional lighting, rich saturated color with deep shadows, confident and energetic, cinematic framing, slightly gritty texture, punchy and attention-grabbing, high quality",
  },
};

export type StyleId = keyof typeof STYLES;

// ─────────────────────────────────────────────────────────────
// ASPECT RATIOS
// ─────────────────────────────────────────────────────────────

export type RatioId = "1:1" | "4:5" | "9:16" | "16:9";

export const RATIOS: { id: RatioId; label: string; icon: string }[] = [
  { id: "1:1", label: "Square", icon: "Square" },
  { id: "4:5", label: "Portrait", icon: "RectangleVertical" },
  { id: "9:16", label: "Story", icon: "Smartphone" },
  { id: "16:9", label: "Landscape", icon: "RectangleHorizontal" },
];

// Explicit pixel dimensions instead of fal's preset enums.
//
// WHY: fal has no preset for 4:5. Your version fell through to `square_hd`,
// so picking 4:5 silently generated a SQUARE image. Explicit width/height
// removes the guesswork and supports any ratio you add later.
//
// fal requires a minimum total area of 921,600px — all of these clear it.
export const RATIO_TO_FAL_SIZE: Record<
  RatioId,
  { width: number; height: number }
> = {
  "1:1": { width: 2048, height: 2048 },
  "4:5": { width: 1640, height: 2048 },
  "9:16": { width: 1152, height: 2048 },
  "16:9": { width: 2048, height: 1152 },
};

// CSS aspect-ratio strings for the gallery grid. Driven off the same source
// of truth so adding a ratio can't desync the two again.
export const RATIO_TO_CSS: Record<RatioId, string> = {
  "1:1": "1 / 1",
  "4:5": "4 / 5",
  "9:16": "9 / 16",
  "16:9": "16 / 9",
};

// ─────────────────────────────────────────────────────────────
// TEMPLATES (format only — style is applied separately)
// ─────────────────────────────────────────────────────────────

export type Template = {
  id: string;
  label: string;
  sub: string;
  icon: string;
  prefix: string;
  defaultRatio: RatioId;
};

export const TEMPLATES: Template[] = [
  {
    id: "blog-hero",
    label: "Blog Hero",
    sub: "Article headers",
    icon: "LayoutTemplate",
    prefix:
      "Blog article hero image, wide editorial banner, conceptual and abstract rather than literal, subject: ",
    defaultRatio: "16:9",
  },
  {
    id: "ig-carousel",
    label: "IG Carousel Slide",
    sub: "Instagram carousel",
    icon: "GalleryHorizontalEnd",
    prefix:
      "Instagram carousel slide background, bold and scroll-stopping, leaves clear room for overlaid text, subject: ",
    defaultRatio: "4:5",
  },
  {
    id: "thumbnail",
    label: "Thumbnail",
    sub: "Vertical & mobile",
    icon: "Video",
    prefix:
      "Vertical video thumbnail, extremely high contrast, single dominant focal point, readable at small size on a phone screen, bold and punchy, minimal fine detail, subject: ",
    defaultRatio: "9:16",
  },
  {
    id: "social-quote",
    label: "Social Quote Graphic",
    sub: "Quote / text focus",
    icon: "MessageSquareQuote",
    prefix:
      "Social media quote graphic background, minimal and calm, strong empty central area reserved for a text quote, subject: ",
    defaultRatio: "1:1",
  },
  {
    id: "social-ad",
    label: "Social Ad",
    sub: "Promotional ads",
    icon: "Megaphone",
    prefix:
      "Promotional social ad creative, attention-grabbing but professional, clear single focal point, subject: ",
    defaultRatio: "4:5",
  },
  {
    id: "infographic",
    label: "Infographic",
    sub: "Data & information",
    icon: "BarChart3",
    prefix:
      "Infographic-style illustration, clean iconography, structured and diagrammatic, communicates information clearly, subject: ",
    defaultRatio: "1:1",
  },
];

// Combines the pieces into the final prompt sent to fal.
export function buildPrompt(userPrompt: string, styleId: StyleId): string {
  return `${userPrompt.trim()}. Style: ${STYLES[styleId].prompt}`;
}
