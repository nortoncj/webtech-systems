import { getCaseStudy, getRelatedPosts } from "@/sanity/sanity-utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudy(slug).catch(() => null);
  if (!caseStudy) return {};

  return {
    title: caseStudy.seo?.metaTitle || caseStudy.title,
    description: caseStudy.seo?.metaDescription || caseStudy.excerpt,
    keywords: caseStudy.techStack || [],
    openGraph: {
      title: caseStudy.seo?.metaTitle || caseStudy.title,
      description: caseStudy.seo?.metaDescription || caseStudy.excerpt,
      images: caseStudy.coverImage?.asset?.url
        ? [caseStudy.coverImage.asset.url]
        : [],
      type: "article",
      publishedTime: caseStudy.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: caseStudy.seo?.metaTitle ?? caseStudy.title,
      description: caseStudy.seo?.metaDescription ?? caseStudy.excerpt,
      images: caseStudy.coverImage?.asset?.url
        ? [caseStudy.coverImage.asset.url]
        : [],
    },
    alternates: {
      canonical: `https://webtechninjas.com/case-studies/${slug}`,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const caseStudy = await getCaseStudy(slug).catch(() => null);
  if (!caseStudy) notFound();

  const relatedPosts = await getRelatedPosts(
    caseStudy._id,
    caseStudy.categories[0]?.slug ?? "",
  ).catch(() => []);

  return <div className="">Case Study Page</div>;
}
