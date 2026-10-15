// app/(backend)/admin/leads/page.tsx
import Leads from "@/components/admin/Leads";
import { createClient } from "@lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("leads")
    .select("*, lead_notes(id, body, author, created_at)")
    .order("created_at", { ascending: false })
    .order("created_at", { referencedTable: "lead_notes", ascending: false });
  
  


  if (error) {
    return <div className="panel">Failed to load leads: {error.message}</div>;
  }

  const leads = (data ?? []).map((r) => ({
    id: r.id,
    name: r.name,
    business: r.business_name ?? "—",
    status: r.status ?? "new",
    source: r.source ?? "Website",
    created: (r.created_at as string).slice(0, 10),
    location: "—",
    email: r.email,
    phone: r.phone ?? "—",
    summary: r.notes ?? "No summary provided.",
    notes: (r.lead_notes ?? []).map((n: any) => ({
      // id is what the edit/delete calls address the note by — without it
      // they hit /notes/undefined.
      id: n.id,
      at: n.created_at.slice(0, 16).replace("T", " "),
      body: n.body,
      by: n.author ?? "—",
    })),
    raw: {
      full_name: r.name,
      business_name: r.business_name ?? "",
      email: r.email,
      phone: r.phone ?? "",
      need_help: r.need_help ?? "",
      budget: r.budget ?? "",
      source: r.source ?? "",
      notes: r.notes ?? "",
    },
  }));

  return <Leads leads={leads} />;
}
