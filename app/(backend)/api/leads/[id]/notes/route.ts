// app/(backend)/api/leads/[id]/notes/route.ts
// Collection level: this segment only knows the lead id, so a single note
// can't be addressed here. Editing and deleting one lives in [noteId]/route.ts.
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@lib/supabase/admin";
import { NoteSchema } from "./schema";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const parsed = NoteSchema.safeParse(await req.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Note cannot be empty" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("lead_notes")
    .insert({ lead_id: id, body: parsed.data.body })
    .select()
    .single();

  if (error) {
    console.error("Note insert failed:", error);
    return NextResponse.json({ error: "Could not save note" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, note: data });
}
