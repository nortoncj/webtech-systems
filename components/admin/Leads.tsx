'use client';
import React from 'react'
import {useState,useEffect, useMemo} from 'react'
import {
  FaTableCellsLarge as LayoutGrid,
  FaUsers as Users,
  FaBriefcase as Briefcase,
  FaArrowsRotate as RefreshCw,
  FaWandMagicSparkles as Wand2,
  FaMagnifyingGlass as Search,
  FaSliders as SlidersHorizontal,
  FaPlus as Plus,
  FaChevronRight as ChevronRight,
  FaChevronLeft as ChevronLeft,
  FaChevronDown as ChevronDown,
  FaXmark as X,
  FaEnvelope as Mail,
  FaPhone as Phone,
  FaLocationDot as MapPin,
  FaGlobe as Globe,
  FaCalendar as Calendar,
  FaPen as Pencil,
  FaEllipsis as MoreHorizontal,
  FaArrowUp as ArrowUp,
  FaArrowDown as ArrowDown,
  FaSquareCheck as CheckSquare,
  FaTrashCan as Trash2,
  FaArrowTrendUp as ArrowUpRight,
  FaArrowTrendDown as ArrowDownRight,
} from "react-icons/fa6";
import "@css/admin/leads.css";
import { useRouter } from "next/navigation";



const STATUS: Record<string, { label: string; bg: string; fg: string }> = {
  new: { label: "New", bg: "#EEF0FF", fg: "#4338CA" },
  contacted: { label: "Contacted", bg: "#F1F1EF", fg: "#52525B" },
  qualified: { label: "Qualified", bg: "#EEF0FF", fg: "#4338CA" },
  proposal: { label: "Proposal", bg: "#FDF0DC", fg: "#B45309" },
  won: { label: "Won", bg: "#E5F5EA", fg: "#15803D" },
  lost: { label: "Lost", bg: "#FDECEC", fg: "#B91C1C" },
  nurturing: { label: "Nurturing", bg: "#F1F1EF", fg: "#52525B" },
};

const statusMeta = (status: string) => STATUS[status] ?? STATUS.new;

const SOURCES = [
  "Website",
  "Google Ads",
  "Referral",
  "Facebook",
  "Instagram",
  "Cold Outreach",
];

// const SEED = [
//   [
//     "Jason Miller",
//     "Miller Electric",
//     "New",
//     "Website",
//     "2025-05-19",
//     "Tampa, FL",
//     "jason@miller-electric.com",
//     "(813) 555-0198",
//     "Looking for a modern website to showcase services, generate leads, and improve online visibility.",
//   ],
//   [
//     "Sarah Johnson",
//     "Johnson Realty Group",
//     "Contacted",
//     "Google Ads",
//     "2025-05-18",
//     "Orlando, FL",
//     "sarah@johnsonrealty.com",
//     "(407) 555-0142",
//     "Wants listings pulled in automatically and a lead form that texts her.",
//   ],
//   [
//     "Michael Torres",
//     "Torres Consulting",
//     "Proposal",
//     "Referral",
//     "2025-05-17",
//     "Austin, TX",
//     "mike@torresconsulting.co",
//     "(512) 555-0110",
//     "Rebuild of an aging Squarespace site plus a monthly SEO retainer.",
//   ],
//   [
//     "Amanda Lee",
//     "Lee Wellness",
//     "New",
//     "Website",
//     "2025-05-16",
//     "Denver, CO",
//     "amanda@leewellness.com",
//     "(303) 555-0177",
//     "Booking integration and a blog she can actually update herself.",
//   ],
//   [
//     "Brian Smith",
//     "Smith Renovations",
//     "Contacted",
//     "Facebook",
//     "2025-05-15",
//     "Charlotte, NC",
//     "brian@smithreno.com",
//     "(704) 555-0163",
//     "Portfolio gallery with before and after sliders. No blog needed.",
//   ],
//   [
//     "David Nguyen",
//     "DN Services",
//     "Active",
//     "Cold Outreach",
//     "2025-05-14",
//     "Seattle, WA",
//     "david@dnservices.io",
//     "(206) 555-0129",
//     "Five page site plus intake automation into their CRM.",
//   ],
//   [
//     "Emily Clark",
//     "Clark Coaching",
//     "Proposal",
//     "Instagram",
//     "2025-05-13",
//     "Nashville, TN",
//     "emily@clarkcoaching.com",
//     "(615) 555-0184",
//     "Landing page for a course launch with email capture.",
//   ],
//   [
//     "Chris Davis",
//     "Davis Plumbing",
//     "Dead",
//     "Google Ads",
//     "2025-05-12",
//     "Phoenix, AZ",
//     "chris@davisplumbing.net",
//     "(602) 555-0155",
//     "Budget came in well under scope. Went with a template.",
//   ],
//   [
//     "Jessica Martinez",
//     "Martinez Law",
//     "Contacted",
//     "Referral",
//     "2025-05-11",
//     "Miami, FL",
//     "jm@martinezlaw.com",
//     "(305) 555-0121",
//     "Practice area pages and a consultation request flow.",
//   ],
//   [
//     "Robert Wilson",
//     "Wilson Roofing",
//     "New",
//     "Website",
//     "2025-05-10",
//     "Atlanta, GA",
//     "rob@wilsonroofing.com",
//     "(404) 555-0138",
//     "Storm damage landing pages targeting three counties.",
//   ],
//   [
//     "Nina Patel",
//     "Patel Dental",
//     "New",
//     "Website",
//     "2025-05-09",
//     "Raleigh, NC",
//     "nina@pateldental.com",
//     "(919) 555-0192",
//     "New patient forms online instead of a clipboard.",
//   ],
//   [
//     "Marcus Reed",
//     "Reed Auto Detail",
//     "Contacted",
//     "Instagram",
//     "2025-05-08",
//     "Dallas, TX",
//     "marcus@reeddetail.com",
//     "(214) 555-0147",
//     "Booking calendar and a gallery of past work.",
//   ],
//   [
//     "Holly Grant",
//     "Grant Bookkeeping",
//     "Proposal",
//     "Referral",
//     "2025-05-07",
//     "Boise, ID",
//     "holly@grantbooks.com",
//     "(208) 555-0166",
//     "Trust focused site with client portal down the road.",
//   ],
//   [
//     "Sam Okafor",
//     "Okafor Fitness",
//     "New",
//     "Facebook",
//     "2025-05-06",
//     "Chicago, IL",
//     "sam@okaforfitness.com",
//     "(312) 555-0173",
//     "Class schedule embed and a free trial signup.",
//   ],
//   [
//     "Tina Brooks",
//     "Brooks Interiors",
//     "Dead",
//     "Cold Outreach",
//     "2025-05-05",
//     "Portland, OR",
//     "tina@brooksinteriors.com",
//     "(503) 555-0119",
//     "Ghosted after the second follow up.",
//   ],
// ];


export type Note = { id: string; at: string; body: string; by: string };

type Lead = {
  id: string;
  name: string;
  business: string;
  status: string;
  source: string;
  created: string;
  location: string;
  email: string;
  phone: string;
  summary: string;
  notes: Note[];
  raw: Record<string, string | string[]>;
};

// const buildLeads = (): Lead[] => {
//   const out: Lead[] = [];
//   for (let i = 0; i < 68; i++) {
//     const s = SEED[i % SEED.length];
//     const dup = Math.floor(i / SEED.length);
//     const d = new Date(s[4]);
//     d.setDate(d.getDate() - dup * 17);
//     out.push({
//       id: `lead_${(i + 1).toString(36).padStart(4, "0")}${dup}`,
//       name: s[0],
//       business: s[1],
//       status: s[2],
//       source: s[3],
//       created: d.toISOString().slice(0, 10),
//       location: s[5],
//       email: s[6],
//       phone: s[7],
//       summary: s[8],
//       notes: [
//         {
//           at: `${s[4]} 14:40`,
//           body: "Lead submitted website intake form.",
//           by: "Christopher",
//         },
//         {
//           at: `${s[4]} 10:15`,
//           body: "Sent welcome email and calendar link.",
//           by: "Christopher",
//         },
//         {
//           at: `${s[4]} 09:32`,
//           body: "Spoke on phone. Interested in site plus SEO.",
//           by: "Christopher",
//         },
//         {
//           at: `${s[4]} 11:05`,
//           body: "Follow up email sent with proposal overview.",
//           by: "Christopher",
//         },
//       ],
//       raw: {
//         full_name: s[0],
//         business_name: s[1],
//         email: s[6],
//         phone: s[7],
//         budget_range: "$800 - $2,000",
//         timeline: "4-6 weeks",
//         services: ["website", "seo"],
//         referrer: s[3].toLowerCase().replace(" ", "_"),
//       },
//     });
//   }
//   return out;
// };

const fmtDate = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export default function Leads({ leads: initial }: { leads: Lead[] }) {
    const router = useRouter();
    const [leads, setLeads] = useState<Lead[]>(initial);
      
      const [query, setQuery] = useState("");
      const [statusFilter, setStatusFilter] = useState("All");
      const [filterOpen, setFilterOpen] = useState(false);
      const [sortAsc, setSortAsc] = useState(false);
      const [page, setPage] = useState(1);
      const [checked, setChecked] = useState<string[]>([]);
      const [openId, setOpenId] = useState<string | null>(null);
      const [tab, setTab] = useState("Overview");
      const [noteDraft, setNoteDraft] = useState("");
  const [noteError, setNoteError] = useState("");
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editNoteDraft, setEditNoteDraft] = useState("");
      const [adding, setAdding] = useState(false);
      const [draft, setDraft] = useState({
        name: "",
        business: "",
        email: "",
        source: "Website",
      });
  const [draftError, setDraftError] = useState("");
  const [editing, setEditing] = useState(false);
  const [editDraft, setEditDraft] = useState({
    name: "",
    email: "",
    phone: "",
    business_name: "",
    summary: "",
    status: "",
    source: "",
  });
  const [editError, setEditError] = useState("");

  const saveNoteEdit = async (noteId: string) => {
    const body = editNoteDraft.trim();
    if (!body || !openId) return;

    const prev = leads;
    setLeads((ls) =>
      ls.map((l) =>
        l.id === openId
          ? {
              ...l,
              notes: l.notes.map((n) => (n.id === noteId ? { ...n, body } : n)),
            }
          : l,
      ),
    );
    setEditingNoteId(null);

    try {
      const res = await fetch(`/api/leads/${openId}/notes/${noteId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body }),
      });
      if (!res.ok) throw new Error(await res.text());
    } catch (e) {
      console.error("Note edit failed:", e);
      setLeads(prev);
    }
  };

  const deleteNote = async (noteId: string) => {
    if (!openId) return;
    if (!confirm("Delete this note?")) return;

    const prev = leads;
    setLeads((ls) =>
      ls.map((l) =>
        l.id === openId
          ? { ...l, notes: l.notes.filter((n) => n.id !== noteId) }
          : l,
      ),
    );

    try {
      const res = await fetch(`/api/leads/${openId}/notes/${noteId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(await res.text());
    } catch (e) {
      console.error("Note delete failed:", e);
      setLeads(prev);
    }
  };

  const startEdit = () => {
    if (!open) return;
    setEditDraft({
      name: open.name,
      email: open.email,
      phone: open.phone === "—" ? "" : open.phone,
      business_name: open.business === "—" ? "" : open.business,
      summary: open.summary === "—" ? "" : open.summary,
      status: open.status,
      source: open.source,
    });
    setEditError("");
    setEditing(true);
  };

  const saveEdit = async () => {
    if (!openId) return;
    if (!editDraft.name.trim() || !editDraft.email.trim()) {
      setEditError("Name and email are required");
      return;
    }

    try {
      const res = await fetch(`/api/leads/${openId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editDraft.name.trim(),
          email: editDraft.email.trim(),
          phone: editDraft.phone.trim() || null,
          business_name: editDraft.business_name.trim() || null,
          source: editDraft.source,
          status: editDraft.status,
          notes: editDraft.summary.trim() || null,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setEditError(err.error ?? "Could not save");
        return;
      }

      const { lead: r } = await res.json();

      setLeads((ls) =>
        ls.map((l) =>
          l.id === openId
            ? {
                ...l,
                name: r.name,
                email: r.email,
                phone: r.phone ?? "—",
                business: r.business_name ?? "—",
                source: r.source ?? "Website",
                status: r.status,
                summary: r.notes ?? "No summary provided.",
              }
            : l,
        ),
      );
      setEditing(false);
      router.refresh();
    } catch (e) {
      console.error("Edit failed:", e);
      setEditError("Something went wrong");
    }
  };
    
  const perPage = 10;
  


    
      const counts = useMemo(() => {
        const c: Record<string, number> = {
          new: 0,
          contacted: 0,
          proposal: 0,
          lost: 0,
        };
        leads.forEach((l) => {
          if (c[l.status] !== undefined) c[l.status]++;
        });
        return c;
      }, [leads]);
    
      const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return leads
          .filter((l) => statusFilter === "All" || l.status === statusFilter)
          .filter(
            (l) =>
              !q ||
              l.name.toLowerCase().includes(q) ||
              l.business.toLowerCase().includes(q) ||
              l.email.toLowerCase().includes(q),
          )
          .sort((a, b) =>
            sortAsc
              ? a.created.localeCompare(b.created)
              : b.created.localeCompare(a.created),
          );
      }, [leads, query, statusFilter, sortAsc]);
    
      const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
      const safePage = Math.min(page, totalPages);
      const rows = filtered.slice((safePage - 1) * perPage, safePage * perPage);
      const open = leads.find((l) => l.id === openId);
    
      const stats = [
        {
          key: "new",
          label: "New",
          value: counts.new,
          delta: 18,
          up: true,
          tone: STATUS.new.fg,
        },
        {
          key: "contacted",
          label: "Contacted",
          value: counts.contacted,
          delta: 7,
          up: true,
          tone: STATUS.contacted.fg,
        },
        {
          key: "proposal",
          label: "Proposal",
          value: counts.proposal,
          delta: 12,
          up: true,
          tone: STATUS.proposal.fg,
        },
        {
          key: "lost",
          label: "Lost",
          value: counts.lost,
          delta: 8,
          up: false,
          tone: STATUS.lost.fg,
        },
        {
          key: null,
          label: "Total leads",
          value: leads.length,
          delta: 11,
          up: true,
          tone: "#1F2430",
        },
      ];
    
      const updateLeadStatus = async (id: string, status: string) => {
        const prevLeads = leads;
        setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, status } : l)));
        try {
          const res = await fetch(`/api/leads/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
          });
          if (!res.ok) throw new Error(await res.text());
          router.refresh();
        } catch (e) {
          console.error("Failed to update lead status:", e);
          setLeads(prevLeads);
        }
      };
    
      const addNote = async () => {
        const body = noteDraft.trim();
        if (!body) {
          setNoteError("Write something first");
          return;
        }
        if (!openId) return;

        setNoteDraft("");
        setNoteError("");

        try {
          const res = await fetch(`/api/leads/${openId}/notes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ body }),
          });
          if (!res.ok) throw new Error(await res.text());

          const { note } = await res.json();

          setLeads((ls) =>
            ls.map((l) =>
              l.id === openId
                ? {
                    ...l,
                    notes: [
                      {
                        id: note.id,
                        at: note.created_at.slice(0, 16).replace("T", " "),
                        body: note.body,
                        by: note.author ?? "—",
                      },
                      ...l.notes,
                    ],
                  }
                : l,
            ),
          );
          router.refresh();
        } catch (e) {
          console.error("Failed to add note:", e);
          setNoteDraft(body);
          setNoteError("Could not save that. Try again.");
        }
      };
    
      const addLead = async () => {
        if (!draft.name.trim() || !draft.email.trim()) {
          setDraftError("Name and email are required");
          return;
        }

        try {
          const res = await fetch("/api/leads/manual", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: draft.name.trim(),
              email: draft.email.trim(),
              business_name: draft.business.trim(),
              source: draft.source,
            }),
          });

          if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            setDraftError(err.error ?? "Could not save lead");
            return;
          }

          const { lead: r } = await res.json();

          setLeads((ls) => [
            {
              id: r.id,
              name: r.name,
              business: r.business_name ?? "—",
              status: r.status,
              source: r.source ?? "Website",
              created: r.created_at.slice(0, 10),
              location: "—",
              email: r.email,
              phone: r.phone ?? "—",
              summary: r.notes ?? "Added manually from the admin panel.",
              notes: [],
              raw: {
                full_name: r.name,
                business_name: r.business_name ?? "",
                email: r.email,
                source: r.source ?? "",
              },
            },
            ...ls,
          ]);

          setAdding(false);
          setDraft({ name: "", business: "", email: "", source: "Website" });
          setDraftError("");
          setOpenId(r.id);
          setPage(1);
          router.refresh();
        } catch (e) {
          console.error("Failed to add lead:", e);
          setDraftError("Something went wrong. Try again.");
        }
      };
  
      const deleteLead = async (id: string) => {
        if (!confirm("Delete this lead? This can't be undone.")) return;

        const prev = leads;
        setLeads((ls) => ls.filter((l) => l.id !== id));
        if (openId === id) setOpenId(null);

        try {
          const res = await fetch(`/api/leads/${id}`, { method: "DELETE" });
          if (!res.ok) throw new Error(await res.text());
        } catch (e) {
          console.error("Delete failed:", e);
          setLeads(prev);
        }
      };
    
      
    
      const pageButtons = (): (number | "…")[] => {
        if (totalPages <= 5)
          return Array.from({ length: totalPages }, (_, i) => i + 1);
        if (safePage <= 3) return [1, 2, 3, "…", totalPages];
        if (safePage >= totalPages - 2)
          return [1, "…", totalPages - 2, totalPages - 1, totalPages];
        return [1, "…", safePage, "…", totalPages];
      };
  return (
    <>
      <div className="top">
        <h1>Leads</h1>
        <div className="search">
          <Search size={18} aria-hidden="true" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search leads"
            aria-label="Search leads"
          />
        </div>
        <div style={{ position: "relative" }}>
          <button
            className="ghostbtn"
            onClick={() => setFilterOpen((v) => !v)}
            aria-expanded={filterOpen}
          >
            <SlidersHorizontal size={17} aria-hidden="true" />
            {statusFilter === "All" ? "Filter" : statusMeta(statusFilter).label}
          </button>
          {filterOpen && (
            <div
              style={{
                position: "absolute",
                top: 47,
                right: 0,
                background: "#fff",
                border: "1px solid #E8E6E1",
                borderRadius: 11,
                padding: 6,
                width: 160,
                zIndex: 10,
                boxShadow: "0 8px 24px rgba(31,36,48,.09)",
              }}
            >
              {["All", ...Object.keys(STATUS)].map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setStatusFilter(s);
                    setFilterOpen(false);
                    setPage(1);
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "8px 10px",
                    borderRadius: 7,
                    fontWeight: statusFilter === s ? 600 : 400,
                  }}
                >
                  {s === "All" ? "All" : statusMeta(s).label}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          className="primary text-black hover:text-white"
          onClick={() => setAdding(true)}
        >
          <Plus size={18} aria-hidden="true" /> New lead
        </button>
      </div>

      <div className="stats">
        {stats.map((s) => {
          const clickable = s.key !== null;
          const active =
            statusFilter === s.key ||
            (s.key === null && statusFilter === "All");
          return (
            <button
              key={s.label}
              className={`stat ${active ? "on" : ""}`}
              onClick={() => {
                setStatusFilter(clickable ? (s.key as string) : "All");
                setPage(1);
              }}
            >
              <b>{s.value}</b>
              <span>{s.label}</span>
              <div
                className="delta"
                style={{ color: s.up ? s.tone : STATUS.lost.fg }}
              >
                {s.up ? (
                  <ArrowUpRight size={14} aria-hidden="true" />
                ) : (
                  <ArrowDownRight size={14} aria-hidden="true" />
                )}
                {s.delta}%
              </div>
            </button>
          );
        })}
      </div>

      <div className="panel">
        <div className="tablewrap">
          <table>
            <colgroup>
              <col style={{ width: 46 }} />
              <col style={{ width: "22%" }} />
              <col style={{ width: "24%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "19%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: 44 }} />
            </colgroup>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    aria-label="Select all"
                    checked={
                      rows.length > 0 &&
                      rows.every((r) => checked.includes(r.id))
                    }
                    onChange={(e) =>
                      setChecked(e.target.checked ? rows.map((r) => r.id) : [])
                    }
                  />
                </th>
                <th>Name</th>
                <th>Business</th>
                <th>Status</th>
                <th>Source</th>
                <th>
                  <button
                    className="sortbtn"
                    onClick={() => setSortAsc((v) => !v)}
                  >
                    Created{" "}
                    {sortAsc ? (
                      <ArrowUp size={14} aria-hidden="true" />
                    ) : (
                      <ArrowDown size={14} aria-hidden="true" />
                    )}
                  </button>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rows.map((l) => (
                <tr
                  key={l.id}
                  className={openId === l.id ? "on" : ""}
                  onClick={() => {
                    setOpenId(l.id);
                    setTab("Overview");
                  }}
                >
                  <td onClick={(e) => e.stopPropagation()}>
                    {checked.length > 0 && (
                      <div className="bulkbar">
                        <span>{checked.length} selected</span>
                        <button
                          className="ghostbtn"
                          onClick={async () => {
                            await Promise.all(
                              checked.map((id) =>
                                updateLeadStatus(id, "contacted"),
                              ),
                            );
                            setChecked([]);
                          }}
                        >
                          Mark contacted
                        </button>
                        <button
                          className="ghostbtn"
                          onClick={async () => {
                            if (!confirm(`Delete ${checked.length} leads?`))
                              return;
                            await Promise.all(
                              checked.map((id) => deleteLead(id)),
                            );
                            setChecked([]);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                    {/* <input
                      type="checkbox"
                      aria-label={`Select ${l.name}`}
                      checked={checked.includes(l.id)}
                      onChange={(e) =>
                        setChecked((c) =>
                          e.target.checked
                            ? [...c, l.id]
                            : c.filter((x) => x !== l.id),
                        )
                      }
                    /> */}
                  </td>
                  <td style={{ fontWeight: 600 }}>{l.name}</td>
                  <td className="muted">{l.business}</td>
                  <td>
                    <span
                      className="pill"
                      style={{
                        background: statusMeta(l.status).bg,
                        color: statusMeta(l.status).fg,
                      }}
                    >
                      {statusMeta(l.status).label}
                    </span>
                  </td>
                  <td className="muted">{l.source}</td>
                  <td className="muted">{fmtDate(l.created)}</td>
                  <td>
                    <ChevronRight
                      size={17}
                      style={{ color: "#9AA0AC" }}
                      aria-hidden="true"
                    />
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    style={{ padding: "48px 16px", textAlign: "center" }}
                    className="muted"
                  >
                    No leads match that. Clear the search or pick a different
                    status.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="pager">
          <span className="muted" style={{ marginRight: "auto", fontSize: 13 }}>
            Showing {filtered.length === 0 ? 0 : (safePage - 1) * perPage + 1}{" "}
            to {Math.min(safePage * perPage, filtered.length)} of{" "}
            {filtered.length} leads
          </span>
          <button
            className="pagebtn"
            onClick={() => setPage(safePage - 1)}
            disabled={safePage === 1}
            aria-label="Previous page"
          >
            <ChevronLeft size={16} aria-hidden="true" />
          </button>
          {pageButtons().map((p, i) =>
            p === "…" ? (
              <span key={`e${i}`} className="muted">
                …
              </span>
            ) : (
              <button
                key={p}
                className={`pagebtn ${p === safePage ? "on" : ""}`}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ),
          )}
          <button
            className="pagebtn"
            onClick={() => setPage(safePage + 1)}
            disabled={safePage === totalPages}
            aria-label="Next page"
          >
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      {open && (
        <section className="drawer" aria-label={`Lead detail for ${open.name}`}>
          <div className="dhead">
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <div style={{ marginRight: "auto" }}>
                <h2>{open.name}</h2>
                <div className="muted" style={{ fontSize: 15, marginTop: 2 }}>
                  {open.business}
                </div>
              </div>
              <button onClick={() => setOpenId(null)} aria-label="Close detail">
                <X size={20} />
              </button>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", marginTop: 14 }}
            >
              <span
                className="pill"
                style={{
                  background: statusMeta(open.status).bg,
                  color: statusMeta(open.status).fg,
                }}
              >
                {statusMeta(open.status).label}
              </span>
              <span
                className="muted"
                style={{ marginLeft: "auto", fontSize: 12.5 }}
              >
                Lead ID: {open.id}
              </span>
            </div>
            <div className="tabs">
              {["Overview", `Notes (${open.notes.length})`, "Form data"].map(
                (t) => {
                  const key = t.startsWith("Notes") ? "Notes" : t;
                  return (
                    <button
                      key={t}
                      className={`tab ${tab === key ? "on" : ""}`}
                      onClick={() => setTab(key)}
                    >
                      {t}
                    </button>
                  );
                },
              )}
            </div>
          </div>

          <div className="dbody">
            {tab === "Overview" && (
              <>
                <div className="card">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 11,
                    }}
                  >
                    <h3 style={{ marginRight: "auto", marginBottom: 0 }}>
                      Contact info
                    </h3>
                    <button
                      className="ghostbtn"
                      style={{ height: 32, padding: "0 11px", fontSize: 13 }}
                      onClick={startEdit}
                    >
                      <Pencil size={14} aria-hidden="true" /> Edit
                    </button>
                  </div>
                  <div className="row">
                    <Mail size={17} aria-hidden="true" />
                    {open.email}
                  </div>
                  <div className="row">
                    <Phone size={17} aria-hidden="true" />
                    {open.phone}
                  </div>
                  <div className="row" style={{ marginBottom: 0 }}>
                    <MapPin size={17} aria-hidden="true" />
                    {open.location}
                  </div>
                </div>

                <div className="card">
                  <h3>Source</h3>
                  <div className="row">
                    <Globe size={17} aria-hidden="true" />
                    {open.source}
                  </div>
                  <div className="row" style={{ marginBottom: 0 }}>
                    <Calendar size={17} aria-hidden="true" />
                    {fmtDate(open.created)} at 2:34 PM
                  </div>
                </div>

                <div className="card">
                  <h3>Project summary</h3>
                  <p style={{ margin: 0, lineHeight: 1.6, fontSize: 13.5 }}>
                    {open.summary}
                  </p>
                </div>
              </>
            )}

            {tab === "Notes" && (
              <div className="card">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 6,
                  }}
                >
                  <h3 style={{ marginRight: "auto", marginBottom: 0 }}>
                    Notes
                  </h3>
                </div>
                {open.notes.map((n) => (
                  <div className="note" key={n.id}>
                    <span className="dot" aria-hidden="true" />
                    <div style={{ flex: 1 }}>
                      <div className="muted" style={{ fontSize: 12.5 }}>
                        {n.at}
                      </div>

                      {editingNoteId === n.id ? (
                        <>
                          <textarea
                            rows={3}
                            value={editNoteDraft}
                            onChange={(e) =>
                              setEditNoteDraft(e.target.value)
                            }
                            style={{ width: "100%", marginTop: 4 }}
                          />
                          <div
                            style={{
                              display: "flex",
                              gap: 6,
                              marginTop: 6,
                            }}
                          >
                            <button
                              className="primary"
                              style={{ height: 30, fontSize: 12.5 }}
                              onClick={() => saveNoteEdit(n.id)}
                            >
                              Save
                            </button>
                            <button
                              className="ghostbtn"
                              style={{ height: 30, fontSize: 12.5 }}
                              onClick={() => setEditingNoteId(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            style={{
                              margin: "2px 0 3px",
                              fontSize: 13.5,
                              lineHeight: 1.5,
                            }}
                          >
                            {n.body}
                          </div>
                          <div className="muted" style={{ fontSize: 12 }}>
                            by {n.by}
                          </div>
                        </>
                      )}
                    </div>

                    {editingNoteId !== n.id && (
                      <div style={{ display: "flex", gap: 4 }}>
                        <button
                          aria-label="Edit note"
                          onClick={() => {
                            setEditingNoteId(n.id);
                            setEditNoteDraft(n.body);
                          }}
                        >
                          <Pencil
                            size={15}
                            style={{ color: "#9AA0AC" }}
                          />
                        </button>
                        <button
                          aria-label="Delete note"
                          onClick={() => deleteNote(n.id)}
                        >
                          <Trash2
                            size={15}
                            style={{ color: "#9AA0AC" }}
                          />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                <div style={{ marginTop: 13 }}>
                  <textarea
                    rows={3}
                    value={noteDraft}
                    placeholder="What happened?"
                    onChange={(e) => {
                      setNoteDraft(e.target.value);
                      if (noteError) setNoteError("");
                    }}
                  />
                  {noteError && <div className="err">{noteError}</div>}
                  <button
                    className="primary"
                    style={{
                      marginTop: 9,
                      width: "100%",
                      justifyContent: "center",
                    }}
                    onClick={addNote}
                  >
                    <Plus size={17} aria-hidden="true" /> Add note
                  </button>
                </div>
              </div>
            )}

            {tab === "Form data" && (
              <div className="card">
                <h3>Raw submission</h3>
                <div className="kv">
                  {Object.entries(open.raw).map(([k, v]) => (
                    <React.Fragment key={k}>
                      <span
                        className="muted"
                        style={{
                          fontFamily: "ui-monospace,monospace",
                          fontSize: 12.5,
                        }}
                      >
                        {k}
                      </span>
                      <span>{Array.isArray(v) ? v.join(", ") : String(v)}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="dfoot">
            <button
              className="ghostbtn"
              onClick={() => updateLeadStatus(open.id, "contacted")}
            >
              <CheckSquare size={16} aria-hidden="true" /> Mark contacted
            </button>
            <button
              className="ghostbtn"
              onClick={() => updateLeadStatus(open.id, "lost")}
            >
              <Trash2 size={16} aria-hidden="true" /> Move to dead
            </button>
            <button
              className="primary"
              style={{
                flex: 1,
                justifyContent: "center",
                fontSize: 13,
                padding: "0 10px",
              }}
              onClick={startEdit}
            >
              <Pencil size={15} aria-hidden="true" /> Edit lead
            </button>
          </div>
        </section>
      )}

      {adding && (
        <div className="scrim" onClick={() => setAdding(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <h2
                style={{ fontSize: 19, fontWeight: 700, marginRight: "auto" }}
              >
                New lead
              </h2>
              <button onClick={() => setAdding(false)} aria-label="Close">
                <X size={19} />
              </button>
            </div>
            {(
              [
                ["name", "Name", "Jason Miller"],
                ["business", "Business", "Miller Electric"],
                ["email", "Email", "jason@miller-electric.com"],
              ] as const
            ).map(([k, label, ph]) => (
              <label key={k} style={{ display: "block", marginBottom: 11 }}>
                <span
                  className="muted"
                  style={{ fontSize: 13, display: "block", marginBottom: 5 }}
                >
                  {label}
                </span>
                <input
                  className="field"
                  value={draft[k]}
                  placeholder={ph}
                  onChange={(e) => {
                    setDraft({ ...draft, [k]: e.target.value });
                    if (draftError) setDraftError("");
                  }}
                />
              </label>
            ))}
            <label style={{ display: "block", marginBottom: 4 }}>
              <span
                className="muted"
                style={{ fontSize: 13, display: "block", marginBottom: 5 }}
              >
                Source
              </span>
              <select
                value={draft.source}
                onChange={(e) => setDraft({ ...draft, source: e.target.value })}
              >
                {SOURCES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            {draftError && <div className="err">{draftError}</div>}
            <button
              className="primary"
              style={{ width: "100%", justifyContent: "center", marginTop: 16 }}
              onClick={addLead}
            >
              Save lead
            </button>
          </div>
        </div>
      )}
      {editing && (
        <div className="scrim" onClick={() => setEditing(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <h2
                style={{ fontSize: 19, fontWeight: 700, marginRight: "auto" }}
              >
                Edit lead
              </h2>
              <button onClick={() => setEditing(false)} aria-label="Close">
                <X size={19} />
              </button>
            </div>
            {(
              [
                ["name", "Name", "Jason Miller"],
                ["business_name", "Business", "Miller Electric"],
                ["email", "Email", "jason@miller-electric.com"],
                ["phone", "Phone", "(208) 555-0123"],
                ["summary", "Summary", "Looking for a new website and SEO."],
              ] as const
            ).map(([k, label, ph]) => (
              <label key={k} style={{ display: "block", marginBottom: 11 }}>
                <span
                  className="muted"
                  style={{ fontSize: 13, display: "block", marginBottom: 5 }}
                >
                  {label}
                </span>
                <input
                  className="field"
                  value={editDraft[k]}
                  placeholder={ph}
                  onChange={(e) => {
                    setEditDraft({ ...editDraft, [k]: e.target.value });
                    if (editError) setEditError("");
                  }}
                />
              </label>
            ))}
            <label style={{ display: "block", marginBottom: 11 }}>
              <span
                className="muted"
                style={{ fontSize: 13, display: "block", marginBottom: 5 }}
              >
                Status
              </span>
              <select
                value={editDraft.status}
                onChange={(e) =>
                  setEditDraft({ ...editDraft, status: e.target.value })
                }
              >
                {Object.entries(STATUS).map(([value, meta]) => (
                  <option key={value} value={value}>
                    {meta.label}
                  </option>
                ))}
              </select>
            </label>
            <label style={{ display: "block", marginBottom: 4 }}>
              <span
                className="muted"
                style={{ fontSize: 13, display: "block", marginBottom: 5 }}
              >
                Source
              </span>
              <select
                value={editDraft.source}
                onChange={(e) =>
                  setEditDraft({ ...editDraft, source: e.target.value })
                }
              >
                {SOURCES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            {editError && <div className="err">{editError}</div>}
            <button
              className="primary"
              style={{ width: "100%", justifyContent: "center", marginTop: 16 }}
              onClick={saveEdit}
            >
              Save changes
            </button>
          </div>
        </div>
      )}
    </>
  );
}
