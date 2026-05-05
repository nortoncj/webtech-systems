import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "caseStudy",
  title: "Case Study",
    type: "document",
  icon: () => "📁",
  fields: [
    // ─── Core Info ───────────────────────────────────────────────
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      description: "e.g. 'Lead System Overhaul for Tampa Roofing Co.'",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),

    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Pin this to the top of the portfolio page.",
      initialValue: false,
    }),

    // ─── Client Info ─────────────────────────────────────────────
    defineField({
      name: "clientName",
      title: "Client Name",
      type: "string",
      description: "Business or individual name shown publicly.",
    }),

    defineField({
      name: "industry",
      title: "Industry / Niche",
      type: "string",
      description: "e.g. 'Roofing', 'E-commerce', 'Life Coaching'",
    }),

    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      description: "Main visual — mockup, screenshot, or workspace photo.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),

    // ─── Summary ─────────────────────────────────────────────────
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description:
        "Short summary shown on the portfolio grid. One sentence on the problem, one on the result.",
      validation: (Rule) => Rule.max(200),
    }),

    // ─── Service Used ────────────────────────────────────────────
    defineField({
      name: "service",
      title: "Service Delivered",
      type: "string",
      options: {
        list: [
          { title: "Starter Site", value: "starter_site" },
          { title: "Growth System", value: "growth_system" },
          { title: "Automation Setup", value: "automation_setup" },
          { title: "Lead Capture System", value: "lead_capture_system" },
          { title: "Custom Build", value: "custom_build" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),

    // ─── References ──────────────────────────────────────────────
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "category" }] })],
    }),

    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "tag" }] })],
    }),

    // ─── The Meat: Case Study Sections ───────────────────────────
    defineField({
      name: "problem",
      title: "The Problem",
      type: "array",
      description:
        "What was broken, missing, slow, or unclear before you stepped in?",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
          },
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "solution",
      title: "The Solution",
      type: "array",
      description: "What strategy and approach did you implement?",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
          },
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "systemBuilt",
      title: "System Built",
      type: "array",
      description:
        "What was actually constructed — stack, automation, integrations, tools.",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
          },
        }),
        defineArrayMember({ type: "image", options: { hotspot: true } }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    // ─── Tech Stack ──────────────────────────────────────────────
    defineField({
      name: "techStack",
      title: "Tech Stack",
      type: "array",
      description: "Tools, platforms, and tech used. e.g. Next.js, n8n, Sanity, Stripe.",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),

    // ─── Outcomes ─────────────────────────────────────────────────
    defineField({
      name: "outcomes",
      title: "Outcomes",
      type: "array",
      description:
        "Concrete results. Use real metrics when you have them, estimated impact when you don't.",
      of: [
        defineArrayMember({
          type: "object",
          name: "outcome",
          fields: [
            defineField({
              name: "metric",
              title: "Metric Label",
              type: "string",
              description: "e.g. 'Page Load Time', 'Lead Conversion Rate', 'Admin Hours Saved'",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "before",
              title: "Before",
              type: "string",
              description: "e.g. '6.2s', '1.4%', '12 hrs/week'",
            }),
            defineField({
              name: "after",
              title: "After",
              type: "string",
              description: "e.g. '1.1s', '4.8%', '2 hrs/week'",
            }),
            defineField({
              name: "delta",
              title: "Change / Impact",
              type: "string",
              description: "e.g. '82% faster', '3x more leads', 'Saved 10 hrs/week'",
            }),
            defineField({
              name: "isEstimated",
              title: "Estimated Result?",
              type: "boolean",
              description: "Flag if this is an estimate vs a tracked metric.",
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: "metric",
              subtitle: "delta",
            },
          },
        }),
      ],
    }),

    // ─── Testimonial ─────────────────────────────────────────────
    defineField({
      name: "testimonial",
      title: "Client Testimonial",
      type: "object",
      description: "Optional. Real quote, real name, real business.",
      fields: [
        defineField({
          name: "quote",
          title: "Quote",
          type: "text",
          rows: 4,
        }),
        defineField({
          name: "authorName",
          title: "Author Name",
          type: "string",
        }),
        defineField({
          name: "authorBusiness",
          title: "Business Name",
          type: "string",
        }),
        defineField({
          name: "authorPhoto",
          title: "Author Photo",
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),

    // ─── Gallery ─────────────────────────────────────────────────
    defineField({
      name: "gallery",
      title: "Project Gallery",
      type: "array",
      description: "Screenshots, mockups, before/after — keep it relevant.",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        }),
      ],
    }),

    // ─── SEO ─────────────────────────────────────────────────────
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.max(160),
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "clientName",
      media: "coverImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `Client: ${subtitle}` : "No client name",
        media,
      };
    },
  },

  orderings: [
    {
      title: "Published Date, Newest First",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Featured First",
      name: "featuredFirst",
      by: [
        { field: "featured", direction: "desc" },
        { field: "publishedAt", direction: "desc" },
      ],
    },
  ],
});