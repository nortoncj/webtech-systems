// lib/leads.ts
export type Note = { at: string; body: string; by: string };
export type Lead = {
  /* your existing type */
};

export function toLead(r: any): Lead {
  return {
    id: r.id,
    name: r.name,
    business: r.business_name ?? "—",
    status: r.status,
    source: r.source ?? "Website",
    created: (r.created_at as string).slice(0, 10),
    location: "—",
    email: r.email,
    phone: r.phone ?? "—",
    summary: r.notes ?? "No summary provided.",
    notes: (r.lead_notes ?? []).map((n: any) => ({
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
    },
  };
}
