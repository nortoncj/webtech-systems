// app/(backend)/api/leads/manual/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@lib/supabase/admin";
import { z } from "zod";

const ManualLeadSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email(),
  business_name: z.string().trim().max(150).optional().or(z.literal("")),
  source: z.string().trim().max(50).default("Website"),
});

export async function POST(req: Request) {
  const parsed = ManualLeadSchema.safeParse(await req.json());

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Name and a valid email are required" },
      { status: 400 },
    );
  }

  const d = parsed.data;

  const { data, error } = await supabaseAdmin
    .from("leads")
    .insert({
      name: d.name,
      email: d.email,
      business_name: d.business_name || null,
      source: d.source,
      status: "new",
      notes: "Added manually from the admin panel.",
    })
    .select()
    .single();

  if (error) {
    console.error("Manual lead insert failed:", error);
    return NextResponse.json({ error: "Could not save lead" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, lead: data });
}
