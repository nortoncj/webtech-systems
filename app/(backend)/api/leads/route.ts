// app/(backend)/api/leads/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@lib/supabase/admin";
import { escapeHtml, sendEmail } from "@lib/brevo";
import { z } from "zod";

const text = (max: number) => z.string().trim().max(max).optional().default("");
const list = z.array(z.string().trim().max(60)).max(40).optional().default([]);

const LeadSchema = z
  .object({
    // Contact — the full intake form calls this contactName, the short
    // contact form calls it name. Accept either.
    contactName: z.string().trim().max(100).optional(),
    name: z.string().trim().max(100).optional(),
    email: z.string().trim().email(),
    phone: text(30),
    businessName: text(150),

    // Intake detail
    industry: text(60),
    currentWebsite: text(300),
    targetCustomer: text(2000),
    mainGoal: text(60),
    needHelp: text(60),
    competitors: text(2000),
    services: text(2000),
    uniqueValue: text(2000),
    tone: text(60),
    existingTagline: text(200),
    brandNotes: text(2000),
    pagesNeeded: list,
    featuresNeeded: list,
    budget: text(50),
    timeline: text(50),
    additionalNotes: text(2000),
    notes: text(2000),

    formType: text(50),
    source: z.string().trim().max(50).default("website"),

    // Honeypot. Deliberately permissive: a bot that fills this in should get
    // a normal-looking 200, not a 400 telling it which field gave it away.
    website: z.string().max(500).optional().default(""),
  })
  .transform((d) => ({ ...d, name: (d.contactName || d.name || "").trim() }))
  .refine((d) => d.name.length > 0, {
    message: "A name is required",
    path: ["contactName"],
  });

type Lead = z.infer<typeof LeadSchema>;

const or = (value: string, fallback = "—") => value || fallback;

/** The leads table has a fixed set of columns, so the long-form intake
 *  answers are folded into a readable notes block. */
function buildNotes(d: Lead) {
  const rows: [string, string][] = [
    ["Industry", d.industry],
    ["Current website", d.currentWebsite],
    ["Target customer", d.targetCustomer],
    ["Main goal", d.mainGoal || d.needHelp],
    ["Competitors", d.competitors],
    ["Services", d.services],
    ["Unique value", d.uniqueValue],
    ["Tone", d.tone],
    ["Existing tagline", d.existingTagline],
    ["Brand notes", d.brandNotes],
    ["Pages needed", d.pagesNeeded.join(", ")],
    ["Features needed", d.featuresNeeded.join(", ")],
    ["Timeline", d.timeline],
    ["Additional notes", d.additionalNotes || d.notes],
  ];

  return rows
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");
}

async function notifyAdmin(d: Lead, id: string) {
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) {
    console.warn("ADMIN_EMAIL is not set, skipping lead notification");
    return;
  }

  const rows: [string, string][] = [
    ["Name", or(d.name)],
    ["Email", or(d.email)],
    ["Phone", or(d.phone)],
    ["Business", or(d.businessName)],
    ["Industry", or(d.industry)],
    ["Current site", or(d.currentWebsite)],
    ["Main goal", or(d.mainGoal || d.needHelp)],
    ["Budget", or(d.budget)],
    ["Timeline", or(d.timeline)],
    ["Pages", or(d.pagesNeeded.join(", "))],
    ["Features", or(d.featuresNeeded.join(", "))],
    ["Source", or(d.source)],
  ];

  const table = rows
    .map(
      ([label, value]) =>
        `<tr><td><strong>${label}</strong></td><td>${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  const detail = buildNotes(d);

  await sendEmail({
    to: [{ email: adminEmail, name: "Christopher" }],
    replyTo: { email: d.email, name: d.name },
    subject: `New lead: ${d.businessName || d.name}`,
    html: `
      <h2>New lead from the site</h2>
      <table cellpadding="6" style="font-family:system-ui;font-size:14px">${table}</table>
      <p><strong>Details</strong><br>${escapeHtml(detail || "None").replace(/\n/g, "<br>")}</p>
      <p><a href="https://webtechninjas.com/admin/leads/${encodeURIComponent(id)}">Open in CRM</a></p>
    `,
  });
}

export async function POST(req: Request) {
  try {
    const parsed = LeadSchema.safeParse(await req.json());

    if (!parsed.success) {
      console.error("Intake validation failed:", z.flattenError(parsed.error));
      return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
    }

    const d = parsed.data;

    // Bot: honeypot was filled. Return the same shape a human gets so the
    // bot has nothing to tune against, but save nothing.
    if (d.website) return NextResponse.json({ ok: true });

    const { data, error } = await supabaseAdmin
      .from("leads")
      .insert({
        name: d.name,
        email: d.email,
        phone: d.phone || null,
        business_name: d.businessName || null,
        need_help: d.mainGoal || d.needHelp || null,
        budget: d.budget || null,
        notes: buildNotes(d) || null,
        source: d.formType || d.source,
        status: "new",
      })
      .select()
      .single();

    if (error) {
      console.error("Lead insert failed:", error);
      return NextResponse.json({ error: "Could not save" }, { status: 500 });
    }

    // The lead is already saved, so a failed notification must not fail the
    // request — but it does have to be awaited, or the serverless function
    // can be torn down before the send goes out.
    try {
      await notifyAdmin(d, data.id);
    } catch (e) {
      console.error("Brevo notify failed:", e);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
