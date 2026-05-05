// lib/metadata.ts
import img from "@img/OpenGraph.png"

type MetadataInput = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  keywords?: string[];
};

export function buildMetadata({
  title,
  description,
  image = img.src,
  url = "https://webtechninjas.com",
  keywords = [],
}: MetadataInput) {
  const fullTitle = `${title + " | " || ""} Webtech Ninjas`;
  const fullDescription =
    description ||
    "Webtech Ninjas is a leading web development agency specializing in creating innovative and high-performing websites and applications.";

  return {
    // -------------------------
    // 🔍 GOOGLE SEO
    // -------------------------
    title: fullTitle,
    description: fullDescription,
    alternates: {
      canonical: url,
    },
    other: {
      "google-site-verification": "7JxhJ8Q3PXbQgekYOnrwz4G3K6tFCe-2yIUdsZjeAhw",
    },

    // -------------------------
    // 🟦 OPEN GRAPH (FB, LinkedIn, Slack, Discord)
    // -------------------------
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url,
      siteName: "Webtech Ninjas",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: "en_US",
      type: "website",
    },

    // -------------------------
    // 🐦 TWITTER CARDS
    // -------------------------
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      images: [image],
      creator: "@chrisnortonjr", // optional
    },

    // -------------------------
    // 📱 iMessage / SMS / WhatsApp
    // (these apps use OG tags automatically)
    // -------------------------
    metadataBase: new URL(url),
  };
}
