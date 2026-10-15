// app/(backend)/api/leads/[id]/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@lib/supabase/admin";
import { z } from "zod";

const LeadEditSchema = z.object({
  name: z.string().trim().min(1).max(100).optional(),
  email: z.string().trim().email().optional(),
  phone: z.string().trim().max(30).nullable().optional(),
  business_name: z.string().trim().max(150).nullable().optional(),
  source: z.string().trim().max(50).optional(),
  status: z.string().trim().max(30).optional(),
  notes: z.string().trim().max(5000).nullable().optional(),
});

type Params = { params: Promise<{ id: string }> };

async function updateLead(req: Request, id: string) {
  const parsed = LeadEditSchema.safeParse(await req.json());

  if (!parsed.success) {
    console.error("Lead edit validation failed:", z.flattenError(parsed.error));
    return NextResponse.json({ error: "Invalid fields" }, { status: 400 });
  }

  if (Object.keys(parsed.data).length === 0) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("leads")
    .update(parsed.data)
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    console.error("Lead edit failed:", error);
    return NextResponse.json(
      { error: "Could not update lead" },
      { status: 500 },
    );
  }

  if (!data) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, lead: data });
}

/** Partial update — the admin table uses this for inline status changes. */
export async function PATCH(req: Request, { params }: Params) {
  const { id } = await params;
  return updateLead(req, id);
}

/** Full edit from the lead detail drawer. Every field is optional either
 *  way, so it shares the same handler. */
export async function PUT(req: Request, { params }: Params) {
  const { id } = await params;
  return updateLead(req, id);
}

export async function DELETE(_req: Request, { params }: Params) {
  const { id } = await params;

  const { data, error } = await supabaseAdmin
    .from("leads")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    console.error("Lead delete failed:", error);
    return NextResponse.json({ error: "Could not delete" }, { status: 500 });
  }

  if (!data || data.length === 0) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
