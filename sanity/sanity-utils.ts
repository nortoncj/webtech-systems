import { Post, PostPreview } from "@/types/Post";
import { client } from "./lib/client";
import { groq } from "next-sanity";
import { CaseStudy, CaseStudyPreview } from "@/types/CaseStudy";

export async function getPosts(): Promise<Post[]> {
  return client.fetch(
    groq`*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      excerpt,
      "slug": slug.current,
      publishedAt,
      featured,
      image{
        asset->{
          url,
          metadata
        },
        alt,
        caption
      },
      video,
      categories[]->{
        _id,
        title,
        "slug": slug.current
      },
      tags[]->{
        _id,
        title
      },
      seo
    }`,
  );
}

export async function getPost(slug: string): Promise<Post> {
  return client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      excerpt,
      "slug": slug.current,
      publishedAt,
      featured,
      image{
        asset->{
          url,
          metadata
        },
        alt,
        caption
      },
      video,
      git,
      link,
      body[]{
        ...,
        _type == "image" => {
          ...,
          asset->{
            url,
            metadata
          }
        }
      },
      categories[]->{
        _id,
        title,
        "slug": slug.current
      },
      tags[]->{
        _id,
        title
      },
      seo
    }`,
    { slug },
  );
}

export async function getRelatedPosts(
  currentId: string,
  catSlug: string,
): Promise<Post[]> {
  return client.fetch(
    groq`*[
      _type == "post" &&
      _id != $currentId &&
      count(categories[@->slug.current == $catSlug]) > 0
    ] | order(publishedAt desc) [0..2] {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      image{
        asset->{ url },
        alt
      },
      categories[]->{ _id, title, "slug": slug.current },
      "readTime": round(length(pt::text(body)) / 5 / 220)
    }`,
    { currentId, catSlug },
  );
}

export async function getPostPaths(): Promise<{ slug: string }[]> {
  return client.fetch(
    `*[_type == "post" && defined(slug.current)]{
      "slug": slug.current
    }`,
  );
}
export async function getFeaturedPosts(): Promise<PostPreview[]> {
  return client.fetch(
    `*[_type == "post" && featured == true] | order(publishedAt desc) {
      _id,
      title,
      excerpt,
      "slug": slug.current,
      publishedAt,
      featured,
      image{
        asset->{
          url,
          metadata
        },
        alt
      }
    }`,
  );
}

export async function getCaseStudies(): Promise<CaseStudyPreview[]> {
    return client.fetch(
        `*[_type == "caseStudy"] | order(publishedAt desc) {
      _id,
      _createdAt,
      title,
      "slug": slug.current,
      publishedAt,
      featured,
      clientName,
      industry,
      excerpt,
      service,
      categories[]->{
        _id,
        title,
        "slug": slug.current
      },
      tags[]->{
        _id,
        title
      },
      coverImage{
        asset->{
          url,
          metadata
        },
        alt
      },
      seo{
        metaTitle,
        metaDescription
      }
    }`
    );
}

export async function getCaseStudy(slug: string): Promise<CaseStudy> {
  return client.fetch(
    `*[_type == "caseStudy" && slug.current == $slug][0]{
      _id,
      _createdAt,
      title,
      "slug": slug.current,
      publishedAt,
      featured,

      clientName,
      industry,

      coverImage{
        asset->{
          url,
          metadata
        },
        alt
      },

      excerpt,
      service,

      categories[]->{
        _id,
        title,
        "slug": slug.current
      },

      tags[]->{
        _id,
        title
      },

      // Portable Text sections
      problem,
      solution,
      systemBuilt[]{
        ...,
        asset->{
          url,
          metadata
        }
      },

      techStack,

      outcomes[]{
        metric,
        before,
        after,
        delta,
        isEstimated
      },

      testimonial{
        quote,
        authorName,
        authorBusiness,
        authorPhoto{
          asset->{
            url,
            metadata
          }
        }
      },

      gallery[]{
        asset->{
          url,
          metadata
        },
        alt,
        caption
      },

      seo{
        metaTitle,
        metaDescription
      }
    }`,
    { slug },
  );
}

export async function getFeaturedCaseStudies(): Promise<CaseStudyPreview[]> {
  return client.fetch(
    `*[_type == "caseStudy" && featured == true] | order(publishedAt desc) {
      _id,
      _createdAt,
      title,
      "slug": slug.current,
      publishedAt,
      featured,
      excerpt,
      coverImage{
        asset->{
          url,
          metadata
        },
        alt
      }
    }`,
  );
}

export async function getCaseStudyPaths(): Promise<{ slug: string }[]> {
  return client.fetch(
    `*[_type == "caseStudy" && defined(slug.current)]{
      "slug": slug.current
    }`,
  );
}




