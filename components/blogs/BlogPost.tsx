"use client";
import { Post } from "@/types/Post";
import { PortableText } from "next-sanity";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import avi from "@img/thumbnails/about_headshot.webp";
import Link from "next/link";

export default function BlogPost({
  post,
  relatedPosts,
}: {
  post: Post;
  relatedPosts: Post[];
}) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const trackLength = documentHeight - windowHeight;
      const progress = (scrollTop / trackLength) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      className="blog-post-wrapper"
      style={{
        backgroundColor: "#F8F7F4",
        minHeight: "100vh",
        fontFamily:
          'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Reading Progress Bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "3px",
          backgroundColor: "rgba(31, 36, 48, 0.1)",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            height: "100%",
            backgroundColor: "#4F46E5",
            width: `${scrollProgress}%`,
            transition: "width 0.1s ease-out",
          }}
        />
      </div>

      {/* Article Container */}
      <article
        className="blog-post-article"
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "80px 24px 120px",
        }}
      >
        {/* Category Badge */}
        <div style={{ marginBottom: "24px" }}>
          <span
            style={{
              display: "inline-block",
              padding: "6px 16px",
              backgroundColor: "#4F46E5",
              color: "#FFFFFF",
              fontSize: "14px",
              fontWeight: 600,
              borderRadius: "6px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            {post.categories[0]?.title}
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "48px",
            fontWeight: 700,
            lineHeight: "1.15",
            color: "#1F2430",
            marginBottom: "24px",
            fontFamily: "Manrope, sans-serif",
            letterSpacing: "-0.02em",
          }}
        >
          {post.title}
        </h1>

        {/* Excerpt */}
        <p
          style={{
            fontSize: "20px",
            lineHeight: "1.6",
            color: "#1F2430",
            opacity: 0.8,
            marginBottom: "40px",
            fontWeight: 400,
          }}
        >
          {post.excerpt}
        </p>

        {/* Meta Info Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            paddingBottom: "40px",
            marginBottom: "48px",
            borderBottom: "2px solid #1F2430",
            flexWrap: "wrap",
          }}
        >
          {/* Author */}
          <Link
            href="https://chrisnortonjr.com"
            target="_blank"
            style={{ display: "flex", alignItems: "center", gap: "12px" }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                backgroundColor: "#4F46E5",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "18px",
              }}
            >
              <Image
                alt="chris norton"
                className="rounded-full"
                height={50}
                width={50}
                src={avi}
              />
            </div>

            <div>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#1F2430",
                }}
              >
                Chris Norton
              </div>
            </div>
          </Link>

          {/* Reading Time */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "14px",
              color: "#1F2430",
              opacity: 0.7,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle
                cx="8"
                cy="8"
                r="7"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M8 4V8L11 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            5 min read
          </div>

          {/* Date */}
          <div
            style={{
              fontSize: "14px",
              color: "#1F2430",
              opacity: 0.7,
            }}
          >
            {formatDate(post.publishedAt)}
          </div>
        </div>

        {/* Cover Image (if exists) */}
        {post.image && (
          <div
            style={{
              marginBottom: "64px",
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid rgba(31, 36, 48, 0.1)",
            }}
          >
            <Image
              src={post.image.asset.url}
              alt={post.title}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </div>
        )}

        {/* Article Content */}
        <div
          className="blog-content"
          style={{
            fontSize: "18px",
            lineHeight: "1.8",
            color: "#1F2430",
          }}
        >
          <PortableText value={post.body} />
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div
            style={{
              marginTop: "64px",
              paddingTop: "40px",
              borderTop: "1px solid rgba(31, 36, 48, 0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid rgba(31, 36, 48, 0.15)",
                    borderRadius: "8px",
                    fontSize: "14px",
                    color: "#1F2430",
                    fontWeight: 500,
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#4F46E5";
                    e.currentTarget.style.backgroundColor = "#F3F0FF";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(31, 36, 48, 0.15)";
                    e.currentTarget.style.backgroundColor = "#FFFFFF";
                  }}
                >
                  {tag.title}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Related Posts Section */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section
          style={{
            backgroundColor: "#FFFFFF",
            borderTop: "1px solid rgba(31, 36, 48, 0.1)",
            padding: "80px 24px",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            {/* Section Header */}
            <div
              style={{
                marginBottom: "48px",
              }}
            >
              <h2
                style={{
                  fontSize: "36px",
                  fontWeight: 700,
                  color: "#1F2430",
                  marginBottom: "12px",
                  fontFamily: "Manrope, sans-serif",
                }}
              >
                Keep Reading
              </h2>
              <div
                style={{
                  width: "80px",
                  height: "4px",
                  backgroundColor: "#4F46E5",
                  borderRadius: "2px",
                }}
              />
            </div>

            {/* Related Posts Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "32px",
              }}
            >
              {relatedPosts.map((relatedPost, index) => (
                <a
                  key={index}
                  href={`/blog/${relatedPost.slug}`}
                  style={{
                    display: "block",
                    backgroundColor: "#F8F7F4",
                    borderRadius: "12px",
                    overflow: "hidden",
                    border: "1px solid rgba(31, 36, 48, 0.08)",
                    transition: "all 0.3s ease",
                    textDecoration: "none",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 32px rgba(31, 36, 48, 0.12)";
                    const indicator = e.currentTarget.querySelector(
                      ".read-indicator",
                    ) as HTMLElement;
                    if (indicator) indicator.style.width = "100%";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                    const indicator = e.currentTarget.querySelector(
                      ".read-indicator",
                    ) as HTMLElement;
                    if (indicator) indicator.style.width = "0%";
                  }}
                >
                  {/* Hover Indicator */}
                  <div
                    className="read-indicator"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "0%",
                      height: "4px",
                      backgroundColor: "#4F46E5",
                      transition: "width 0.3s ease",
                      zIndex: 1,
                    }}
                  />

                  {/* Image */}
                  {relatedPost.image && (
                    <div
                      style={{
                        width: "100%",
                        height: "200px",
                        overflow: "hidden",
                        backgroundColor: "#E5E5E5",
                      }}
                    >
                      <Image
                        src={relatedPost.image.asset.url}
                        alt={relatedPost.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.4s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.05)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div style={{ padding: "24px" }}>
                    {/* Category Badge */}
                    {relatedPost.categories.map((category, index) => (
                      <div key={index} style={{ marginBottom: "12px" }}>
                        <span
                          style={{
                            display: "inline-block",
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
                          {category.title}
                        </span>
                      </div>
                    ))}

                    {/* Title */}
                    <h3
                      style={{
                        fontSize: "22px",
                        fontWeight: 700,
                        lineHeight: "1.3",
                        color: "#1F2430",
                        marginBottom: "12px",
                        fontFamily: "Manrope, sans-serif",
                      }}
                    >
                      {relatedPost.title}
                    </h3>

                    {/* Excerpt */}
                    <p
                      style={{
                        fontSize: "16px",
                        lineHeight: "1.6",
                        color: "#1F2430",
                        opacity: 0.7,
                        marginBottom: "20px",
                      }}
                    >
                      {relatedPost.excerpt}
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
                      }}
                    >
                      <span>2 min</span>
                      <span>•</span>
                      <span>{formatDate(relatedPost.publishedAt)}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Global Blog Content Styles */}
      <style>{`
        .blog-content h2 {
          font-size: 32px;
          font-weight: 700;
          line-height: 1.3;
          color: #1F2430;
          margin-top: 64px;
          margin-bottom: 24px;
          font-family: Manrope, sans-serif;
        }

        .blog-content h3 {
          font-size: 24px;
          font-weight: 700;
          line-height: 1.4;
          color: #1F2430;
          margin-top: 48px;
          margin-bottom: 20px;
          font-family: Manrope, sans-serif;
        }

        .blog-content h4 {
          font-size: 20px;
          font-weight: 600;
          line-height: 1.4;
          color: #1F2430;
          margin-top: 36px;
          margin-bottom: 16px;
        }

        .blog-content p {
          margin-bottom: 24px;
        }

        .blog-content a {
          color: #4F46E5;
          text-decoration: none;
          font-weight: 500;
          border-bottom: 2px solid transparent;
          transition: border-color 0.2s ease;
        }

        .blog-content a:hover {
          border-bottom-color: #4F46E5;
        }

        .blog-content ul,
        .blog-content ol {
          margin-bottom: 24px;
          padding-left: 32px;
        }

        .blog-content li {
          margin-bottom: 12px;
          line-height: 1.8;
        }

        .blog-content blockquote {
          margin: 40px 0;
          padding: 24px 32px;
          border-left: 4px solid #4F46E5;
          background-color: #F3F0FF;
          font-size: 20px;
          font-style: italic;
          color: #1F2430;
          border-radius: 0 8px 8px 0;
        }

        .blog-content code {
          background-color: #1F2430;
          color: #F8F7F4;
          padding: 3px 8px;
          border-radius: 4px;
          font-size: 16px;
          font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace;
        }

        .blog-content pre {
          background-color: #1F2430;
          color: #F8F7F4;
          padding: 24px;
          border-radius: 12px;
          overflow-x: auto;
          margin: 32px 0;
          font-size: 14px;
          line-height: 1.6;
        }

        .blog-content pre code {
          background-color: transparent;
          padding: 0;
          border-radius: 0;
        }

        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 12px;
          margin: 40px 0;
          display: block;
        }

        .blog-content hr {
          border: none;
          border-top: 2px solid rgba(31, 36, 48, 0.1);
          margin: 64px 0;
        }

        .blog-content strong {
          font-weight: 700;
          color: #1F2430;
        }

        .blog-content em {
          font-style: italic;
        }

        @media (max-width: 768px) {
          .blog-post-article {
            padding: 48px 20px 80px !important;
          }

          .blog-content h1 {
            font-size: 36px !important;
          }

          .blog-content h2 {
            font-size: 28px !important;
            margin-top: 48px !important;
          }

          .blog-content h3 {
            font-size: 22px !important;
            margin-top: 36px !important;
          }

          .blog-content {
            font-size: 16px !important;
          }

          .blog-content blockquote {
            padding: 20px 24px !important;
            font-size: 18px !important;
          }
        }
      `}</style>
    </div>
  );
}
