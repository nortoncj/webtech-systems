"use client";
import React, { useState, useMemo } from "react";
import {
  FaMagnifyingGlass as Search,
  FaSliders as SlidersHorizontal,
  FaPlus as Plus,
  FaChevronRight as ChevronRight,
  FaChevronLeft as ChevronLeft,
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
  FaCircleCheck as CircleCheck,
  FaFileInvoiceDollar as Invoice,
  FaArrowUpRightFromSquare as ExternalLink,
  FaServer as Server,
  FaArrowTrendUp as TrendUp,
  FaArrowTrendDown as TrendDown,
} from "react-icons/fa6";

const PHASE: Record<string, { bg: string; fg: string }> = {
  Onboarding: { bg: "#EEF0FF", fg: "#4338CA" },
  "In build": { bg: "#FDF0DC", fg: "#B45309" },
  Review: { bg: "#EDEBFF", fg: "#6D28D9" },
  Live: { bg: "#E5F5EA", fg: "#15803D" },
  "On hold": { bg: "#F1F1EF", fg: "#52525B" },
  Churned: { bg: "#FDECEC", fg: "#B91C1C" },
};

const PLANS = ["Care plan", "Care plan + SEO", "Hosting only", "None"] as const;

type Note = { at: string; body: string; by: string };
type Invoice = {
  id: string;
  label: string;
  amount: number;
  due: string;
  paid: boolean;
};

type Client = {
  id: string;
  business: string;
  contact: string;
  email: string;
  phone: string;
  location: string;
  phase: keyof typeof PHASE;
  plan: string;
  mrr: number;
  contract: number;
  started: string;
  nextInvoice: string;
  siteUrl: string;
  host: string;
  scope: string;
  notes: Note[];
  invoices: Invoice[];
};

const SEED: Client[] = [
  {
    id: "cli_vfw004",
    business: "VFW Post 4",
    contact: "Ron Whitaker",
    email: "ron@vfwpost4.org",
    phone: "(727) 555-0143",
    location: "Tarpon Springs, FL",
    phase: "In build",
    plan: "Care plan",
    mrr: 79,
    contract: 900,
    started: "2025-05-02",
    nextInvoice: "2025-06-01",
    siteUrl: "https://vfwpost4.org",
    host: "Cloudways · DO 1GB",
    scope:
      "Five page brochure site. Member roster, announcements feed, resource links. Barter: two workshop mornings per month plus footer link.",
    notes: [
      {
        at: "2025-05-02 09:10",
        body: "Board approved. 50% deposit invoiced.",
        by: "Christopher",
      },
      {
        at: "2025-05-09 15:22",
        body: "Got the member photos. Half are 200px wide. Asked for originals.",
        by: "Christopher",
      },
      {
        at: "2025-05-16 11:40",
        body: "Staging up. Ron reviewing announcements layout.",
        by: "Christopher",
      },
    ],
    invoices: [
      {
        id: "inv_001",
        label: "Deposit (50%)",
        amount: 450,
        due: "2025-05-02",
        paid: true,
      },
      {
        id: "inv_002",
        label: "Balance on launch",
        amount: 450,
        due: "2025-06-06",
        paid: false,
      },
    ],
  },
  {
    id: "cli_dnserv",
    business: "DN Services",
    contact: "David Nguyen",
    email: "david@dnservices.io",
    phone: "(206) 555-0129",
    location: "Seattle, WA",
    phase: "Live",
    plan: "Care plan + SEO",
    mrr: 179,
    contract: 1800,
    started: "2025-02-14",
    nextInvoice: "2025-06-14",
    siteUrl: "https://dnservices.io",
    host: "Cloudways · DO 2GB",
    scope:
      "Five page site plus intake automation routing into their CRM. SEO retainer started month two.",
    notes: [
      {
        at: "2025-02-14 10:00",
        body: "Signed. Full payment up front, asked for a small discount.",
        by: "Christopher",
      },
      {
        at: "2025-04-03 16:12",
        body: "Added SEO retainer. First content batch live.",
        by: "Christopher",
      },
    ],
    invoices: [
      {
        id: "inv_010",
        label: "Build in full",
        amount: 1800,
        due: "2025-02-14",
        paid: true,
      },
      {
        id: "inv_011",
        label: "May care plan + SEO",
        amount: 179,
        due: "2025-05-14",
        paid: true,
      },
      {
        id: "inv_012",
        label: "June care plan + SEO",
        amount: 179,
        due: "2025-06-14",
        paid: false,
      },
    ],
  },
  {
    id: "cli_torres",
    business: "Torres Consulting",
    contact: "Michael Torres",
    email: "mike@torresconsulting.co",
    phone: "(512) 555-0110",
    location: "Austin, TX",
    phase: "Review",
    plan: "Care plan",
    mrr: 79,
    contract: 1400,
    started: "2025-04-21",
    nextInvoice: "2025-06-01",
    siteUrl: "https://staging.torresconsulting.co",
    host: "Cloudways · DO 1GB",
    scope:
      "Squarespace rebuild. Four pages, case study template, contact routing to email plus Slack.",
    notes: [
      {
        at: "2025-04-21 13:30",
        body: "Deposit paid same day. Good sign.",
        by: "Christopher",
      },
      {
        at: "2025-05-18 09:05",
        body: "Third round of copy edits. Flagged that revisions past round two are billable.",
        by: "Christopher",
      },
    ],
    invoices: [
      {
        id: "inv_020",
        label: "Deposit (50%)",
        amount: 700,
        due: "2025-04-21",
        paid: true,
      },
      {
        id: "inv_021",
        label: "Balance on launch",
        amount: 700,
        due: "2025-06-02",
        paid: false,
      },
    ],
  },
  {
    id: "cli_clarkco",
    business: "Clark Coaching",
    contact: "Emily Clark",
    email: "emily@clarkcoaching.com",
    phone: "(615) 555-0184",
    location: "Nashville, TN",
    phase: "Onboarding",
    plan: "Hosting only",
    mrr: 40,
    contract: 750,
    started: "2025-05-20",
    nextInvoice: "2025-06-20",
    siteUrl: "—",
    host: "Not provisioned",
    scope:
      "Single landing page for a course launch. Email capture into Brevo. Intake form still outstanding.",
    notes: [
      {
        at: "2025-05-20 14:00",
        body: "Contract signed. Waiting on brand assets and course copy.",
        by: "Christopher",
      },
    ],
    invoices: [
      {
        id: "inv_030",
        label: "Deposit (50%)",
        amount: 375,
        due: "2025-05-20",
        paid: true,
      },
      {
        id: "inv_031",
        label: "Balance on launch",
        amount: 375,
        due: "2025-06-25",
        paid: false,
      },
    ],
  },
  {
    id: "cli_grantbk",
    business: "Grant Bookkeeping",
    contact: "Holly Grant",
    email: "holly@grantbooks.com",
    phone: "(208) 555-0166",
    location: "Boise, ID",
    phase: "On hold",
    plan: "None",
    mrr: 0,
    contract: 1200,
    started: "2025-03-11",
    nextInvoice: "—",
    siteUrl: "—",
    host: "Not provisioned",
    scope:
      "Trust focused four page site. Paused while she sorts out a partner buyout.",
    notes: [
      { at: "2025-03-11 11:20", body: "Deposit paid.", by: "Christopher" },
      {
        at: "2025-04-28 08:45",
        body: "Asked to pause until Q3. Deposit is non-refundable per agreement. She is fine with it.",
        by: "Christopher",
      },
    ],
    invoices: [
      {
        id: "inv_040",
        label: "Deposit (50%)",
        amount: 600,
        due: "2025-03-11",
        paid: true,
      },
    ],
  },
  {
    id: "cli_pateldnt",
    business: "Patel Dental",
    contact: "Nina Patel",
    email: "nina@pateldental.com",
    phone: "(919) 555-0192",
    location: "Raleigh, NC",
    phase: "Live",
    plan: "Care plan",
    mrr: 79,
    contract: 1100,
    started: "2025-01-08",
    nextInvoice: "2025-06-08",
    siteUrl: "https://pateldental.com",
    host: "Cloudways · DO 1GB",
    scope:
      "Four page site with online new patient forms replacing paper intake.",
    notes: [
      {
        at: "2025-01-08 10:15",
        body: "Signed and launched in 12 days. Smoothest one yet.",
        by: "Christopher",
      },
      {
        at: "2025-05-05 12:00",
        body: "Asked about adding online booking. Quoted $600 as a phase two.",
        by: "Christopher",
      },
    ],
    invoices: [
      {
        id: "inv_050",
        label: "Build in full",
        amount: 1100,
        due: "2025-01-08",
        paid: true,
      },
      {
        id: "inv_051",
        label: "May care plan",
        amount: 79,
        due: "2025-05-08",
        paid: true,
      },
      {
        id: "inv_052",
        label: "June care plan",
        amount: 79,
        due: "2025-06-08",
        paid: false,
      },
    ],
  },
];

const money = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

const fmtDate = (iso: string) =>
  iso === "—"
    ? "—"
    : new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

export default function Clients() {
  const [clients, setClients] = useState<Client[]>(SEED);
  const [query, setQuery] = useState("");
  const [phaseFilter, setPhaseFilter] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortAsc, setSortAsc] = useState(false);
  const [page, setPage] = useState(1);
  const [openId, setOpenId] = useState<string | null>(null);
  const [tab, setTab] = useState("Overview");
  const [noteDraft, setNoteDraft] = useState("");
  const [noteError, setNoteError] = useState("");
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState({
    business: "",
    contact: "",
    email: "",
    contract: "",
    plan: "Care plan",
  });
  const [draftError, setDraftError] = useState("");

  const perPage = 10;

  const totals = useMemo(() => {
    const active = clients.filter((c) =>
      ["Onboarding", "In build", "Review", "Live"].includes(c.phase),
    );
    const mrr = active.reduce((s, c) => s + c.mrr, 0);
    const outstanding = clients.reduce(
      (s, c) =>
        s + c.invoices.filter((i) => !i.paid).reduce((t, i) => t + i.amount, 0),
      0,
    );
    const building = clients.filter((c) =>
      ["Onboarding", "In build", "Review"].includes(c.phase),
    ).length;
    return { active: active.length, building, mrr, outstanding };
  }, [clients]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return clients
      .filter((c) => phaseFilter === "All" || c.phase === phaseFilter)
      .filter(
        (c) =>
          !q ||
          c.business.toLowerCase().includes(q) ||
          c.contact.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q),
      )
      .sort((a, b) =>
        sortAsc
          ? a.started.localeCompare(b.started)
          : b.started.localeCompare(a.started),
      );
  }, [clients, query, phaseFilter, sortAsc]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(page, totalPages);
  const rows = filtered.slice((safePage - 1) * perPage, safePage * perPage);
  const open = clients.find((c) => c.id === openId);

  const owed = (c: Client) =>
    c.invoices.filter((i) => !i.paid).reduce((t, i) => t + i.amount, 0);

  const stats = [
    {
      label: "Active clients",
      value: String(totals.active),
      delta: 25,
      up: true,
      tone: PHASE.Live.fg,
      filter: "All",
    },
    {
      label: "In production",
      value: String(totals.building),
      delta: 12,
      up: true,
      tone: PHASE["In build"].fg,
      filter: "In build",
    },
    {
      label: "MRR",
      value: money(totals.mrr),
      delta: 9,
      up: true,
      tone: "#4338CA",
      filter: "All",
    },
    {
      label: "Outstanding",
      value: money(totals.outstanding),
      delta: 6,
      up: false,
      tone: PHASE.Churned.fg,
      filter: "All",
    },
  ];

  const setPhase = (id: string, phase: keyof typeof PHASE) =>
    setClients((cs) => cs.map((c) => (c.id === id ? { ...c, phase } : c)));

  const togglePaid = (clientId: string, invId: string) =>
    setClients((cs) =>
      cs.map((c) =>
        c.id !== clientId
          ? c
          : {
              ...c,
              invoices: c.invoices.map((i) =>
                i.id === invId ? { ...i, paid: !i.paid } : i,
              ),
            },
      ),
    );

  const addNote = () => {
    if (!noteDraft.trim()) {
      setNoteError("Write something first");
      return;
    }
    const stamp = new Date().toISOString().slice(0, 16).replace("T", " ");
    setClients((cs) =>
      cs.map((c) =>
        c.id === openId
          ? {
              ...c,
              notes: [
                ...c.notes,
                { at: stamp, body: noteDraft.trim(), by: "Christopher" },
              ],
            }
          : c,
      ),
    );
    setNoteDraft("");
    setNoteError("");
  };

  const addClient = () => {
    const value = Number(draft.contract);
    if (!draft.business.trim() || !draft.email.trim()) {
      setDraftError("Business and email are required");
      return;
    }
    if (draft.contract && (Number.isNaN(value) || value < 0)) {
      setDraftError("Contract value must be a number");
      return;
    }
    const id = `cli_${Math.random().toString(36).slice(2, 8)}`;
    const today = new Date().toISOString().slice(0, 10);
    const mrr =
      draft.plan === "Care plan + SEO"
        ? 179
        : draft.plan === "Care plan"
          ? 79
          : draft.plan === "Hosting only"
            ? 40
            : 0;
    setClients((cs) => [
      {
        id,
        business: draft.business.trim(),
        contact: draft.contact.trim() || "—",
        email: draft.email.trim(),
        phone: "—",
        location: "—",
        phase: "Onboarding",
        plan: draft.plan,
        mrr,
        contract: Math.round(value) || 0,
        started: today,
        nextInvoice: "—",
        siteUrl: "—",
        host: "Not provisioned",
        scope: "Scope not written up yet.",
        notes: [],
        invoices: value
          ? [
              {
                id: `inv_${id}`,
                label: "Deposit (50%)",
                amount: Math.round(value / 2),
                due: today,
                paid: false,
              },
            ]
          : [],
      },
      ...cs,
    ]);
    setAdding(false);
    setOpenId(id);
    setTab("Overview");
    setPage(1);
    setDraft({
      business: "",
      contact: "",
      email: "",
      contract: "",
      plan: "Care plan",
    });
    setDraftError("");
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
        <h1>Clients</h1>
        <div className="search">
          <Search size={18} aria-hidden="true" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search clients"
            aria-label="Search clients"
          />
        </div>
        <div style={{ position: "relative" }}>
          <button
            className="ghostbtn"
            onClick={() => setFilterOpen((v) => !v)}
            aria-expanded={filterOpen}
          >
            <SlidersHorizontal size={17} aria-hidden="true" />
            {phaseFilter === "All" ? "Filter" : phaseFilter}
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
                width: 168,
                zIndex: 10,
                boxShadow: "0 8px 24px rgba(31,36,48,.09)",
              }}
            >
              {["All", ...Object.keys(PHASE)].map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setPhaseFilter(p);
                    setFilterOpen(false);
                    setPage(1);
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "8px 10px",
                    borderRadius: 7,
                    fontWeight: phaseFilter === p ? 600 : 400,
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
        <button className="primary" onClick={() => setAdding(true)}>
          <Plus size={18} aria-hidden="true" /> New client
        </button>
      </div>

      <div className="stats">
        {stats.map((s) => (
          <button
            key={s.label}
            className={`stat ${phaseFilter === s.filter && s.filter !== "All" ? "on" : ""}`}
            onClick={() => {
              setPhaseFilter(s.filter);
              setPage(1);
            }}
          >
            <b>{s.value}</b>
            <span>{s.label}</span>
            <div
              className="delta"
              style={{ color: s.up ? s.tone : PHASE.Churned.fg }}
            >
              {s.up ? (
                <TrendUp size={14} aria-hidden="true" />
              ) : (
                <TrendDown size={14} aria-hidden="true" />
              )}
              {s.delta}%
            </div>
          </button>
        ))}
      </div>

      <div className="panel">
        <div className="tablewrap">
          <table>
            <colgroup>
              <col style={{ width: "22%" }} />
              <col style={{ width: "17%" }} />
              <col style={{ width: "13%" }} />
              <col style={{ width: "16%" }} />
              <col style={{ width: "11%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: 44 }} />
            </colgroup>
            <thead>
              <tr>
                <th>Business</th>
                <th>Contact</th>
                <th>Phase</th>
                <th>Plan</th>
                <th>MRR</th>
                <th>
                  <button
                    className="sortbtn"
                    onClick={() => setSortAsc((v) => !v)}
                  >
                    Started{" "}
                    {sortAsc ? (
                      <ArrowUp size={13} aria-hidden="true" />
                    ) : (
                      <ArrowDown size={13} aria-hidden="true" />
                    )}
                  </button>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr
                  key={c.id}
                  className={openId === c.id ? "on" : ""}
                  onClick={() => {
                    setOpenId(c.id);
                    setTab("Overview");
                  }}
                >
                  <td style={{ fontWeight: 600 }}>
                    {c.business}
                    {owed(c) > 0 && (
                      <span
                        className="pill"
                        style={{
                          background: PHASE.Churned.bg,
                          color: PHASE.Churned.fg,
                          marginLeft: 8,
                          fontSize: 11,
                          padding: "3px 8px",
                        }}
                      >
                        {money(owed(c))} due
                      </span>
                    )}
                  </td>
                  <td className="muted">{c.contact}</td>
                  <td>
                    <span
                      className="pill"
                      style={{
                        background: PHASE[c.phase].bg,
                        color: PHASE[c.phase].fg,
                      }}
                    >
                      {c.phase}
                    </span>
                  </td>
                  <td className="muted">{c.plan}</td>
                  <td>
                    {c.mrr ? money(c.mrr) : <span className="muted">—</span>}
                  </td>
                  <td className="muted">{fmtDate(c.started)}</td>
                  <td>
                    <ChevronRight
                      size={16}
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
                    No clients match that. Clear the search or pick a different
                    phase.
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
            {filtered.length} clients
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
        <section
          className="drawer"
          aria-label={`Client detail for ${open.business}`}
        >
          <div className="dhead">
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <div style={{ marginRight: "auto" }}>
                <h2>{open.business}</h2>
                <div className="muted" style={{ fontSize: 15, marginTop: 2 }}>
                  {open.contact}
                </div>
              </div>
              <button onClick={() => setOpenId(null)} aria-label="Close detail">
                <X size={20} />
              </button>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", marginTop: 14 }}
            >
              <select
                value={open.phase}
                onChange={(e) =>
                  setPhase(open.id, e.target.value as keyof typeof PHASE)
                }
                aria-label="Project phase"
                style={{
                  width: "auto",
                  padding: "5px 10px",
                  borderRadius: 15,
                  background: PHASE[open.phase].bg,
                  color: PHASE[open.phase].fg,
                  border: "none",
                  fontWeight: 600,
                  fontSize: 12,
                }}
              >
                {Object.keys(PHASE).map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <span
                className="muted"
                style={{ marginLeft: "auto", fontSize: 12.5 }}
              >
                {open.id}
              </span>
            </div>
            <div className="tabs">
              {["Overview", `Notes (${open.notes.length})`, "Billing"].map(
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
                      Contact
                    </h3>
                    <button
                      className="ghostbtn"
                      style={{ height: 32, padding: "0 11px", fontSize: 13 }}
                    >
                      <Pencil size={13} aria-hidden="true" /> Edit
                    </button>
                  </div>
                  <div className="row">
                    <Mail size={16} aria-hidden="true" />
                    {open.email}
                  </div>
                  <div className="row">
                    <Phone size={16} aria-hidden="true" />
                    {open.phone}
                  </div>
                  <div className="row" style={{ marginBottom: 0 }}>
                    <MapPin size={16} aria-hidden="true" />
                    {open.location}
                  </div>
                </div>

                <div className="card">
                  <h3>Project</h3>
                  <p
                    style={{
                      margin: "0 0 12px",
                      lineHeight: 1.6,
                      fontSize: 13.5,
                    }}
                  >
                    {open.scope}
                  </p>
                  <div className="row">
                    <Globe size={16} aria-hidden="true" />
                    {open.siteUrl === "—" ? (
                      <span className="muted">Not launched</span>
                    ) : (
                      <a
                        href={open.siteUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          color: "#4F46E5",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        {open.siteUrl.replace("https://", "")}{" "}
                        <ExternalLink size={11} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                  <div className="row">
                    <Server size={16} aria-hidden="true" />
                    {open.host}
                  </div>
                  <div className="row" style={{ marginBottom: 0 }}>
                    <Calendar size={16} aria-hidden="true" />
                    Started {fmtDate(open.started)}
                  </div>
                </div>
              </>
            )}

            {tab === "Notes" && (
              <div className="card">
                <h3>Notes</h3>
                {open.notes.length === 0 && (
                  <p
                    className="muted"
                    style={{ margin: "4px 0 0", fontSize: 13.5 }}
                  >
                    Nothing logged yet. Add the first note after your kickoff
                    call.
                  </p>
                )}
                {open.notes.map((n, i) => (
                  <div className="note" key={i}>
                    <span className="dot" aria-hidden="true" />
                    <div style={{ flex: 1 }}>
                      <div className="muted" style={{ fontSize: 12.5 }}>
                        {n.at}
                      </div>
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
                    </div>
                    <button aria-label="Note actions">
                      <MoreHorizontal size={16} style={{ color: "#9AA0AC" }} />
                    </button>
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
                    <Plus size={16} aria-hidden="true" /> Add note
                  </button>
                </div>
              </div>
            )}

            {tab === "Billing" && (
              <>
                <div className="card">
                  <h3>Summary</h3>
                  <div className="kv">
                    <span className="muted">Contract value</span>
                    <span>{money(open.contract)}</span>
                    <span className="muted">Collected</span>
                    <span>
                      {money(
                        open.invoices
                          .filter((i) => i.paid)
                          .reduce((t, i) => t + i.amount, 0),
                      )}
                    </span>
                    <span className="muted">Outstanding</span>
                    <span
                      style={{
                        color: owed(open) ? PHASE.Churned.fg : undefined,
                        fontWeight: owed(open) ? 600 : 400,
                      }}
                    >
                      {money(owed(open))}
                    </span>
                    <span className="muted">Plan</span>
                    <span>{open.plan}</span>
                    <span className="muted">MRR</span>
                    <span>{open.mrr ? money(open.mrr) : "—"}</span>
                    <span className="muted">Next invoice</span>
                    <span>{fmtDate(open.nextInvoice)}</span>
                  </div>
                </div>

                <div className="card">
                  <h3>Invoices</h3>
                  {open.invoices.length === 0 && (
                    <p
                      className="muted"
                      style={{ margin: "4px 0 0", fontSize: 13.5 }}
                    >
                      No invoices yet. Send the deposit before you write a line
                      of code.
                    </p>
                  )}
                  {open.invoices.map((inv) => (
                    <div
                      key={inv.id}
                      className="note"
                      style={{ alignItems: "center" }}
                    >
                      <Invoice
                        size={16}
                        style={{ color: "#9AA0AC", marginTop: 2 }}
                        aria-hidden="true"
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13.5, fontWeight: 500 }}>
                          {inv.label}
                        </div>
                        <div className="muted" style={{ fontSize: 12.5 }}>
                          Due {fmtDate(inv.due)}
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontWeight: 600, fontSize: 13.5 }}>
                          {money(inv.amount)}
                        </div>
                        <button
                          onClick={() => togglePaid(open.id, inv.id)}
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            marginTop: 2,
                            color: inv.paid
                              ? PHASE.Live.fg
                              : PHASE["In build"].fg,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <CircleCheck size={12} aria-hidden="true" />
                          {inv.paid ? "Paid" : "Mark paid"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="dfoot">
            <button className="ghostbtn" onClick={() => setTab("Billing")}>
              <Invoice size={15} aria-hidden="true" /> Invoices
            </button>
            <button
              className="ghostbtn"
              onClick={() => setPhase(open.id, "Live")}
            >
              <CircleCheck size={15} aria-hidden="true" /> Mark live
            </button>
            <button
              className="primary"
              style={{
                flex: 1,
                justifyContent: "center",
                fontSize: 13,
                padding: "0 10px",
              }}
            >
              <Pencil size={14} aria-hidden="true" /> Edit client
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
                New client
              </h2>
              <button onClick={() => setAdding(false)} aria-label="Close">
                <X size={19} />
              </button>
            </div>
            {(
              [
                ["business", "Business", "VFW Post 4"],
                ["contact", "Contact name", "Ron Whitaker"],
                ["email", "Email", "ron@vfwpost4.org"],
                ["contract", "Contract value", "900"],
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
                  inputMode={k === "contract" ? "numeric" : undefined}
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
                Plan
              </span>
              <select
                value={draft.plan}
                onChange={(e) => setDraft({ ...draft, plan: e.target.value })}
              >
                {PLANS.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </label>
            {draftError && <div className="err">{draftError}</div>}
            <button
              className="primary"
              style={{ width: "100%", justifyContent: "center", marginTop: 16 }}
              onClick={addClient}
            >
              Save client
            </button>
          </div>
        </div>
      )}
    </>
  );
}
