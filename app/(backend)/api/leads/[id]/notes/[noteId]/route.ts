// app/(backend)/api/leads/[id]/notes/[noteId]/route.ts
// Single note. Both handlers match on lead_id as well as the note id so a
// note can only be touched through the lead it actually belongs to.
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@lib/supabase/admin";
import { NoteSchema } from "../schema";

type Params = { params: Promise<{ id: string; noteId: string }> };

export async function PATCH(req: Request, { params }: Params) {
  const { id, noteId } = await params;
  const parsed = NoteSchema.safeParse(await req.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Note cannot be empty" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("lead_notes")
    .update({ body: parsed.data.body })
    .eq("id", noteId)
    .eq("lead_id", id)
    .select()
    .maybeSingle();

  if (error) {
    console.error("Note update failed:", error);
    return NextResponse.json(
      { error: "Could not update note" },
      { status: 500 },
    );
  }

  if (!data) {
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, note: data });
}

export async function DELETE(_req: Request, { params }: Params) {
  const { id, noteId } = await params;

  const { data, error } = await supabaseAdmin
    .from("lead_notes")
    .delete()
    .eq("id", noteId)
    .eq("lead_id", id)
    .select();

  if (error) {
    console.error("Note delete failed:", error);
    return NextResponse.json(
      { error: "Could not delete note" },
      { status: 500 },
    );
  }

  if (!data || data.length === 0) {
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
