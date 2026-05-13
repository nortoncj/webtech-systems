"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import type { PortableTextBlock } from "@portabletext/types";
import { Post, PostPreview } from "@/types/Post";

// Using the Post type provided by the user
interface PortableTextObject {
  _type: string;
  [key: string]: any;
}
type Article = {
  slug: string;
  categories: { slug: string; title: string }[];
  tags: string[];
  title: string;
  excerpt: string;
  dateLabel: string;
  dateISO: string;
  readLabel: string;
  image?: string;
  imageAlt: string;
  featured?: boolean;
};

export default function BlogList({ posts }: { posts: PostPreview[] }) {
  // Get all unique categories from posts
  const allCategories = useMemo(() => {
    const categoryMap = new Map();
    posts.forEach((post) => {
      post.categories.forEach((cat) => {
        if (!categoryMap.has(cat._id)) {
          categoryMap.set(cat._id, cat);
        }
      });
    });
    return Array.from(categoryMap.values());
  }, [posts]);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter posts by selected category
  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return posts;
    return posts.filter((post) =>
      post.categories.some((cat) => cat._id === selectedCategory),
    );
  }, [posts, selectedCategory]);

  // Split posts into featured and regular
  const featuredPosts = filteredPosts.filter((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  // Calculate reading time based on body content
  const calculateReadingTime = (
    body: (PortableTextBlock | PortableTextObject)[],
  ): number => {
    // Rough estimate: count text blocks and assume ~200 words per minute
    let wordCount = 0;
    body.forEach((block) => {
      if (block._type === "block" && "children" in block) {
        (block as PortableTextBlock).children?.forEach((child: any) => {
          if (child.text) {
            wordCount += child.text.split(" ").length;
          }
        });
      }
    });
    return Math.ceil(wordCount / 200) || 5; // Default to 5 min if no content
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      style={{
        backgroundColor: "#F8F7F4",
        minHeight: "100vh",
        fontFamily:
          'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          backgroundColor: "#1F2430",
          color: "#F8F7F4",
          padding: "80px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative Background Elements */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-5%",
            width: "400px",
            height: "400px",
            background:
              "radial-gradient(circle, rgba(79, 70, 229, 0.15) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-15%",
            left: "-5%",
            width: "500px",
            height: "500px",
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <h1
            style={{
              fontSize: "56px",
              fontWeight: 700,
              lineHeight: "1.1",
              marginBottom: "20px",
              fontFamily: "Manrope, sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            The Webtech Ninjas Field Notes
          </h1>
          <p
            style={{
              fontSize: "22px",
              lineHeight: "1.6",
              opacity: 0.9,
              maxWidth: "700px",
              fontWeight: 400,
            }}
          >
            Real talk about websites, systems, and automation. No fluff, no
            corporate speak, just practical insights that actually help you grow
            your business.
          </p>

          {/* Post Count */}
          <div
            style={{
              marginTop: "32px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "16px",
              opacity: 0.7,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M3 6h14M3 10h14M3 14h10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            {posts.length} {posts.length === 1 ? "article" : "articles"}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      {allCategories.length > 0 && (
        <section
          style={{
            backgroundColor: "#FFFFFF",
            borderBottom: "1px solid rgba(31, 36, 48, 0.1)",
            padding: "24px",
            position: "sticky",
            top: 0,
            zIndex: 100,
            boxShadow: "0 2px 8px rgba(31, 36, 48, 0.04)",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#1F2430",
                opacity: 0.7,
                marginRight: "8px",
              }}
            >
              Filter:
            </span>
            <button
              onClick={() => setSelectedCategory(null)}
              style={{
                padding: "8px 16px",
                backgroundColor: !selectedCategory ? "#4F46E5" : "#FFFFFF",
                color: !selectedCategory ? "#FFFFFF" : "#1F2430",
                border: "1px solid",
                borderColor: !selectedCategory
                  ? "#4F46E5"
                  : "rgba(31, 36, 48, 0.15)",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => {
                if (!selectedCategory) return;
                e.currentTarget.style.borderColor = "#4F46E5";
                e.currentTarget.style.backgroundColor = "#F3F0FF";
              }}
              onMouseLeave={(e) => {
                if (!selectedCategory) return;
                e.currentTarget.style.borderColor = "rgba(31, 36, 48, 0.15)";
                e.currentTarget.style.backgroundColor = "#FFFFFF";
              }}
            >
              All Posts
            </button>
            {allCategories.map((category) => (
              <button
                key={category._id}
                onClick={() => setSelectedCategory(category._id)}
                style={{
                  padding: "8px 16px",
                  backgroundColor:
                    selectedCategory === category._id ? "#4F46E5" : "#FFFFFF",
                  color:
                    selectedCategory === category._id ? "#FFFFFF" : "#1F2430",
                  border: "1px solid",
                  borderColor:
                    selectedCategory === category._id
                      ? "#4F46E5"
                      : "rgba(31, 36, 48, 0.15)",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory === category._id) return;
                  e.currentTarget.style.borderColor = "#4F46E5";
                  e.currentTarget.style.backgroundColor = "#F3F0FF";
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory === category._id) return;
                  e.currentTarget.style.borderColor = "rgba(31, 36, 48, 0.15)";
                  e.currentTarget.style.backgroundColor = "#FFFFFF";
                }}
              >
                {category.title}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Main Content */}
      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "64px 24px",
        }}
      >
        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section style={{ marginBottom: "80px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "32px",
              }}
            >
              <h2
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#1F2430",
                  fontFamily: "Manrope, sans-serif",
                }}
              >
                Featured
              </h2>
              <div
                style={{
                  height: "3px",
                  flex: 1,
                  background: "linear-gradient(to right, #4F46E5, transparent)",
                  borderRadius: "2px",
                }}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  featuredPosts.length === 1
                    ? "1fr"
                    : "repeat(auto-fit, minmax(500px, 1fr))",
                gap: "32px",
              }}
            >
              {featuredPosts.map((post) => (
                <Link
                  key={post._id}
                  href={`/field-notes/${post.slug}`}
                  style={{
                    display: "block",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "1px solid rgba(31, 36, 48, 0.08)",
                    transition: "all 0.3s ease",
                    textDecoration: "none",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow =
                      "0 20px 40px rgba(31, 36, 48, 0.15)";
                    const img = e.currentTarget.querySelector("img");
                    if (img)
                      (img as HTMLElement).style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                    const img = e.currentTarget.querySelector("img");
                    if (img) (img as HTMLElement).style.transform = "scale(1)";
                  }}
                >
                  {/* Featured Badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "20px",
                      left: "20px",
                      padding: "6px 14px",
                      backgroundColor: "#4F46E5",
                      color: "#FFFFFF",
                      fontSize: "12px",
                      fontWeight: 700,
                      borderRadius: "6px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      zIndex: 1,
                      boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)",
                    }}
                  >
                    ⭐ Featured
                  </div>

                  {/* Image */}
                  {post.image?.asset.url && (
                    <div
                      style={{
                        width: "100%",
                        height: "400px",
                        overflow: "hidden",
                        backgroundColor: "#E5E5E5",
                        position: "relative",
                      }}
                    >
                      <img
                        src={post.image.asset.url}
                        alt={post.image.alt || post.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.4s ease",
                        }}
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div style={{ padding: "32px" }}>
                    {/* Categories */}
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        flexWrap: "wrap",
                        marginBottom: "16px",
                      }}
                    >
                      {post.categories.slice(0, 2).map((cat) => (
                        <span
                          key={cat._id}
                          style={{
                            padding: "4px 12px",
                            backgroundColor: "#4F46E5",
                            color: "#FFFFFF",
                            fontSize: "12px",
                            fontWeight: 600,
                            borderRadius: "4px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          {cat.title}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        fontSize: "32px",
                        fontWeight: 700,
                        lineHeight: "1.2",
                        color: "#1F2430",
                        marginBottom: "16px",
                        fontFamily: "Manrope, sans-serif",
                      }}
                    >
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p
                      style={{
                        fontSize: "18px",
                        lineHeight: "1.6",
                        color: "#1F2430",
                        opacity: 0.8,
                        marginBottom: "24px",
                      }}
                    >
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        fontSize: "14px",
                        color: "#1F2430",
                        opacity: 0.6,
                        paddingTop: "20px",
                        borderTop: "1px solid rgba(31, 36, 48, 0.1)",
                      }}
                    >
                      {/* <span>{calculateReadingTime(post.body)} min read</span> */}
                      <span>•</span>
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Regular Posts Grid */}
        {regularPosts.length > 0 && (
          <section>
            {featuredPosts.length > 0 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "32px",
                }}
              >
                <h2
                  style={{
                    fontSize: "28px",
                    fontWeight: 700,
                    color: "#1F2430",
                    fontFamily: "Manrope, sans-serif",
                  }}
                >
                  Latest Posts
                </h2>
                <div
                  style={{
                    height: "3px",
                    flex: 1,
                    background:
                      "linear-gradient(to right, #1F2430, transparent)",
                    borderRadius: "2px",
                    opacity: 0.15,
                  }}
                />
              </div>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: "32px",
              }}
            >
              {regularPosts.map((post) => (
                <Link
                  key={post._id}
                  href={`/field-notes/${post.slug}`}
                  style={{
                    // display: "block",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "12px",
                    overflow: "hidden",
                    border: "1px solid rgba(31, 36, 48, 0.08)",
                    transition: "all 0.3s ease",
                    textDecoration: "none",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 32px rgba(31, 36, 48, 0.12)";
                    const img = e.currentTarget.querySelector("img");
                    if (img)
                      (img as HTMLElement).style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                    const img = e.currentTarget.querySelector("img");
                    if (img) (img as HTMLElement).style.transform = "scale(1)";
                  }}
                >
                  {/* Image */}
                  {post.image?.asset.url && (
                    <div
                      style={{
                        width: "100%",
                        height: "220px",
                        overflow: "hidden",
                        backgroundColor: "#E5E5E5",
                      }}
                    >
                      <img
                        src={post.image.asset.url}
                        alt={post.image.alt || post.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.4s ease",
                        }}
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div
                    style={{
                      padding: "24px",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* Categories */}
                    <div
                      style={{
                        display: "flex",
                        gap: "6px",
                        flexWrap: "wrap",
                        marginBottom: "12px",
                      }}
                    >
                      {post.categories.slice(0, 2).map((cat) => (
                        <span
                          key={cat._id}
                          style={{
                            padding: "4px 10px",
                            backgroundColor: "#4F46E5",
                            color: "#FFFFFF",
                            fontSize: "11px",
                            fontWeight: 600,
                            borderRadius: "4px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          {cat.title}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        fontSize: "22px",
                        fontWeight: 700,
                        lineHeight: "1.3",
                        color: "#1F2430",
                        marginBottom: "12px",
                        fontFamily: "Manrope, sans-serif",
                        flex: 0,
                      }}
                    >
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p
                      style={{
                        fontSize: "16px",
                        lineHeight: "1.6",
                        color: "#1F2430",
                        opacity: 0.7,
                        marginBottom: "20px",
                        flex: 1,
                      }}
                    >
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        fontSize: "14px",
                        color: "#1F2430",
                        opacity: 0.6,
                        paddingTop: "16px",
                        borderTop: "1px solid rgba(31, 36, 48, 0.08)",
                      }}
                    >
                      {/* <span>{calculateReadingTime(post.body)} min</span> */}
                      <span>•</span>
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "80px 24px",
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              border: "1px solid rgba(31, 36, 48, 0.08)",
            }}
          >
            <div
              style={{
                fontSize: "48px",
                marginBottom: "16px",
                opacity: 0.3,
              }}
            >
              📭
            </div>
            <h3
              style={{
                fontSize: "24px",
                fontWeight: 600,
                color: "#1F2430",
                marginBottom: "12px",
                fontFamily: "Manrope, sans-serif",
              }}
            >
              No posts found
            </h3>
            <p
              style={{
                fontSize: "16px",
                color: "#1F2430",
                opacity: 0.7,
              }}
            >
              Try selecting a different category or check back later.
            </p>
          </div>
        )}
      </main>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          .blog-list-hero h1 {
            font-size: 36px !important;
          }

          .blog-list-hero p {
            font-size: 18px !important;
          }

          .featured-grid {
            grid-template-columns: 1fr !important;
          }

          .posts-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 600px) {
          .category-filters {
            justify-content: flex-start;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }

          .category-filters::-webkit-scrollbar {
            display: none;
          }

          .category-filters button {
            white-space: nowrap;
          }
        }
      `}</style>
    </div>
  );
}
