"use client";
import React, { useState, useMemo } from "react";
import {
  FaMagnifyingGlass as Search,
  FaSliders as SlidersHorizontal,
  FaPlus as Plus,
  FaChevronRight as ChevronRight,
  FaXmark as X,
  FaCalendar as Calendar,
  FaPen as Pencil,
  FaCircleCheck as CircleCheck,
  FaCircleExclamation as Alert,
  FaPause as Pause,
  FaPlay as Play,
  FaServer as Server,
  FaReceipt as Receipt,
  FaArrowTrendUp as TrendUp,
  FaArrowTrendDown as TrendDown,
  FaArrowRotateRight as Retry,
} from "react-icons/fa6";

const STATE: Record<string, { bg: string; fg: string }> = {
  Active: { bg: "#E5F5EA", fg: "#15803D" },
  "Past due": { bg: "#FDECEC", fg: "#B91C1C" },
  Paused: { bg: "#F1F1EF", fg: "#52525B" },
  Canceled: { bg: "#F1F1EF", fg: "#52525B" },
};

const PLAN_CATALOG = [
  { name: "Hosting only", price: 40, cost: 14 },
  { name: "Care plan", price: 79, cost: 14 },
  { name: "Care plan + SEO", price: 179, cost: 14 },
  { name: "Blog automation", price: 149, cost: 22 },
];

type Charge = {
  id: string;
  date: string;
  amount: number;
  status: "Paid" | "Failed" | "Refunded";
};

type Sub = {
  id: string;
  business: string;
  contact: string;
  plan: string;
  price: number;
  cost: number;
  state: keyof typeof STATE;
  anchorDay: number;
  startedOn: string;
  host: string;
  charges: Charge[];
};

const SEED: Sub[] = [
  {
    id: "sub_vfw004",
    business: "VFW Post 4",
    contact: "Ron Whitaker",
    plan: "Care plan",
    price: 79,
    cost: 14,
    state: "Active",
    anchorDay: 1,
    startedOn: "2025-06-01",
    host: "Cloudways · DO 1GB",
    charges: [{ id: "ch_v1", date: "2025-06-01", amount: 79, status: "Paid" }],
  },
  {
    id: "sub_dnserv",
    business: "DN Services",
    contact: "David Nguyen",
    plan: "Care plan + SEO",
    price: 179,
    cost: 14,
    state: "Active",
    anchorDay: 14,
    startedOn: "2025-03-14",
    host: "Cloudways · DO 2GB",
    charges: [
      { id: "ch_d4", date: "2025-06-14", amount: 179, status: "Paid" },
      { id: "ch_d3", date: "2025-05-14", amount: 179, status: "Paid" },
      { id: "ch_d2", date: "2025-04-14", amount: 179, status: "Paid" },
      { id: "ch_d1", date: "2025-03-14", amount: 179, status: "Paid" },
    ],
  },
  {
    id: "sub_torres",
    business: "Torres Consulting",
    contact: "Michael Torres",
    plan: "Care plan",
    price: 79,
    cost: 14,
    state: "Past due",
    anchorDay: 2,
    startedOn: "2025-06-02",
    host: "Cloudways · DO 1GB",
    charges: [
      { id: "ch_t2", date: "2025-08-02", amount: 79, status: "Failed" },
      { id: "ch_t1", date: "2025-07-02", amount: 79, status: "Paid" },
    ],
  },
  {
    id: "sub_pateldnt",
    business: "Patel Dental",
    contact: "Nina Patel",
    plan: "Care plan",
    price: 79,
    cost: 14,
    state: "Active",
    anchorDay: 8,
    startedOn: "2025-02-08",
    host: "Cloudways · DO 1GB",
    charges: [
      { id: "ch_p3", date: "2025-08-08", amount: 79, status: "Paid" },
      { id: "ch_p2", date: "2025-07-08", amount: 79, status: "Paid" },
      { id: "ch_p1", date: "2025-06-08", amount: 79, status: "Paid" },
    ],
  },
  {
    id: "sub_clarkco",
    business: "Clark Coaching",
    contact: "Emily Clark",
    plan: "Hosting only",
    price: 40,
    cost: 14,
    state: "Active",
    anchorDay: 20,
    startedOn: "2025-06-20",
    host: "Cloudways · DO 1GB",
    charges: [
      { id: "ch_c2", date: "2025-08-20", amount: 40, status: "Paid" },
      { id: "ch_c1", date: "2025-07-20", amount: 40, status: "Paid" },
    ],
  },
  {
    id: "sub_grantbk",
    business: "Grant Bookkeeping",
    contact: "Holly Grant",
    plan: "Care plan",
    price: 79,
    cost: 0,
    state: "Paused",
    anchorDay: 11,
    startedOn: "2025-03-11",
    host: "Deprovisioned",
    charges: [
      { id: "ch_g1", date: "2025-04-11", amount: 79, status: "Refunded" },
    ],
  },
  {
    id: "sub_reedauto",
    business: "Reed Auto Detail",
    contact: "Marcus Reed",
    plan: "Blog automation",
    price: 149,
    cost: 22,
    state: "Active",
    anchorDay: 25,
    startedOn: "2025-05-25",
    host: "Cloudways · DO 1GB",
    charges: [
      { id: "ch_r3", date: "2025-08-25", amount: 149, status: "Paid" },
      { id: "ch_r2", date: "2025-07-25", amount: 149, status: "Paid" },
    ],
  },
];

const TODAY = new Date("2026-09-05T12:00:00");

const money = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

const fmtDate = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const nextCharge = (anchorDay: number) => {
  const d = new Date(TODAY);
  const daysInMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  let day = Math.min(anchorDay, daysInMonth);
  if (d.getDate() >= day) {
    d.setMonth(d.getMonth() + 1);
    const next = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    day = Math.min(anchorDay, next);
  }
  return new Date(d.getFullYear(), d.getMonth(), day)
    .toISOString()
    .slice(0, 10);
};

const daysUntil = (iso: string) =>
  Math.round(
    (new Date(iso + "T12:00:00").getTime() - TODAY.getTime()) / 86400000,
  );

export default function Recurring() {
  const [subs, setSubs] = useState<Sub[]>(SEED);
  const [query, setQuery] = useState("");
  const [stateFilter, setStateFilter] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [tab, setTab] = useState("Overview");
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState({
    business: "",
    contact: "",
    plan: "Care plan",
    anchorDay: "1",
  });
  const [draftError, setDraftError] = useState("");

  const billing = useMemo(
    () => subs.filter((s) => s.state === "Active" || s.state === "Past due"),
    [subs],
  );

  const totals = useMemo(() => {
    const mrr = billing.reduce((t, s) => t + s.price, 0);
    const cost = billing.reduce((t, s) => t + s.cost, 0);
    const pastDue = subs
      .filter((s) => s.state === "Past due")
      .reduce(
        (t, s) =>
          t +
          s.charges
            .filter((c) => c.status === "Failed")
            .reduce((a, c) => a + c.amount, 0),
        0,
      );
    return { mrr, cost, margin: mrr - cost, arr: mrr * 12, pastDue };
  }, [subs, billing]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return subs
      .filter((s) => stateFilter === "All" || s.state === stateFilter)
      .filter(
        (s) =>
          !q ||
          s.business.toLowerCase().includes(q) ||
          s.contact.toLowerCase().includes(q),
      )
      .sort((a, b) => {
        const rank = (s: Sub) =>
          s.state === "Past due" ? 0 : s.state === "Active" ? 1 : 2;
        if (rank(a) !== rank(b)) return rank(a) - rank(b);
        return nextCharge(a.anchorDay).localeCompare(nextCharge(b.anchorDay));
      });
  }, [subs, query, stateFilter]);

  const open = subs.find((s) => s.id === openId);

  const stats = [
    {
      label: "MRR",
      value: money(totals.mrr),
      sub: `${billing.length} billing`,
      delta: 14,
      up: true,
      tone: "#4338CA",
    },
    {
      label: "Margin",
      value: money(totals.margin),
      sub: `${money(totals.cost)} in hosting`,
      delta: 11,
      up: true,
      tone: STATE.Active.fg,
    },
    {
      label: "Run rate",
      value: money(totals.arr),
      sub: "annualized",
      delta: 14,
      up: true,
      tone: "#1F2430",
    },
    {
      label: "Past due",
      value: money(totals.pastDue),
      sub: `${subs.filter((s) => s.state === "Past due").length} failed`,
      delta: 100,
      up: false,
      tone: STATE["Past due"].fg,
    },
  ];

  const setState = (id: string, state: keyof typeof STATE) =>
    setSubs((ss) => ss.map((s) => (s.id === id ? { ...s, state } : s)));

  const retryCharge = (id: string) =>
    setSubs((ss) =>
      ss.map((s) =>
        s.id !== id
          ? s
          : {
              ...s,
              state: "Active",
              charges: s.charges.map((c, i) =>
                i === 0 && c.status === "Failed" ? { ...c, status: "Paid" } : c,
              ),
            },
      ),
    );

  const addSub = () => {
    const day = Number(draft.anchorDay);
    if (!draft.business.trim()) {
      setDraftError("Business is required");
      return;
    }
    if (!Number.isInteger(day) || day < 1 || day > 28) {
      setDraftError("Billing day must be 1 to 28");
      return;
    }
    const plan = PLAN_CATALOG.find((p) => p.name === draft.plan)!;
    setSubs((ss) => [
      {
        id: `sub_${Math.random().toString(36).slice(2, 8)}`,
        business: draft.business.trim(),
        contact: draft.contact.trim() || "—",
        plan: plan.name,
        price: plan.price,
        cost: plan.cost,
        state: "Active",
        anchorDay: day,
        startedOn: TODAY.toISOString().slice(0, 10),
        host: "Cloudways · DO 1GB",
        charges: [],
      },
      ...ss,
    ]);
    setAdding(false);
    setDraft({ business: "", contact: "", plan: "Care plan", anchorDay: "1" });
    setDraftError("");
  };

  return (
    <>
      <div className="top">
        <h1>Recurring</h1>
        <div className="search">
          <Search size={18} aria-hidden="true" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search subscriptions"
            aria-label="Search subscriptions"
          />
        </div>
        <div style={{ position: "relative" }}>
          <button
            className="ghostbtn"
            onClick={() => setFilterOpen((v) => !v)}
            aria-expanded={filterOpen}
          >
            <SlidersHorizontal size={17} aria-hidden="true" />
            {stateFilter === "All" ? "Filter" : stateFilter}
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
              {["All", ...Object.keys(STATE)].map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setStateFilter(s);
                    setFilterOpen(false);
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "8px 10px",
                    borderRadius: 7,
                    fontWeight: stateFilter === s ? 600 : 400,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
        <button className="primary" onClick={() => setAdding(true)}>
          <Plus size={18} aria-hidden="true" /> New subscription
        </button>
      </div>

      <div className="stats">
        {stats.map((s) => (
          <div key={s.label} className="stat" style={{ cursor: "default" }}>
            <b>{s.value}</b>
            <span>
              {s.label} · {s.sub}
            </span>
            <div
              className="delta"
              style={{ color: s.up ? s.tone : STATE["Past due"].fg }}
            >
              {s.up ? (
                <TrendUp size={14} aria-hidden="true" />
              ) : (
                <TrendDown size={14} aria-hidden="true" />
              )}
              {s.delta}%
            </div>
          </div>
        ))}
      </div>

      {totals.pastDue > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 16,
            padding: "13px 16px",
            borderRadius: 12,
            background: STATE["Past due"].bg,
            color: STATE["Past due"].fg,
            fontSize: 13.5,
            fontWeight: 500,
          }}
        >
          <Alert size={17} aria-hidden="true" />
          {money(totals.pastDue)} failed to collect. Chase it before the card
          expires entirely.
        </div>
      )}

      <div className="panel">
        <div className="tablewrap">
          <table>
            <colgroup>
              <col style={{ width: "22%" }} />
              <col style={{ width: "18%" }} />
              <col style={{ width: "13%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "19%" }} />
              <col style={{ width: 44 }} />
            </colgroup>
            <thead>
              <tr>
                <th>Business</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Price</th>
                <th>Margin</th>
                <th>Next charge</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => {
                const next = nextCharge(s.anchorDay);
                const days = daysUntil(next);
                const dormant = s.state === "Paused" || s.state === "Canceled";
                return (
                  <tr
                    key={s.id}
                    className={openId === s.id ? "on" : ""}
                    onClick={() => {
                      setOpenId(s.id);
                      setTab("Overview");
                    }}
                  >
                    <td style={{ fontWeight: 600 }}>{s.business}</td>
                    <td className="muted">{s.plan}</td>
                    <td>
                      <span
                        className="pill"
                        style={{
                          background: STATE[s.state].bg,
                          color: STATE[s.state].fg,
                        }}
                      >
                        {s.state}
                      </span>
                    </td>
                    <td>{money(s.price)}</td>
                    <td className="muted">
                      {dormant ? "—" : money(s.price - s.cost)}
                    </td>
                    <td>
                      {dormant ? (
                        <span className="muted">Not billing</span>
                      ) : (
                        <>
                          {fmtDate(next)}
                          <span
                            className="muted"
                            style={{ marginLeft: 7, fontSize: 12.5 }}
                          >
                            {days === 0
                              ? "today"
                              : days === 1
                                ? "tomorrow"
                                : `in ${days}d`}
                          </span>
                        </>
                      )}
                    </td>
                    <td>
                      <ChevronRight
                        size={16}
                        style={{ color: "#9AA0AC" }}
                        aria-hidden="true"
                      />
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    style={{ padding: "48px 16px", textAlign: "center" }}
                    className="muted"
                  >
                    Nothing here. Every website you build should leave one of
                    these behind.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="pager">
          <span className="muted" style={{ marginRight: "auto", fontSize: 13 }}>
            {billing.length} billing · {money(totals.mrr)} per month ·{" "}
            {money(totals.margin)} after hosting
          </span>
        </div>
      </div>

      {open && (
        <section
          className="drawer"
          aria-label={`Subscription for ${open.business}`}
        >
          <div className="dhead">
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <div style={{ marginRight: "auto" }}>
                <h2>{open.business}</h2>
                <div className="muted" style={{ fontSize: 15, marginTop: 2 }}>
                  {open.plan}
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
                  background: STATE[open.state].bg,
                  color: STATE[open.state].fg,
                }}
              >
                {open.state}
              </span>
              <span
                className="muted"
                style={{ marginLeft: "auto", fontSize: 12.5 }}
              >
                {open.id}
              </span>
            </div>
            <div className="tabs">
              {["Overview", `Charges (${open.charges.length})`].map((t) => {
                const key = t.startsWith("Charges") ? "Charges" : t;
                return (
                  <button
                    key={t}
                    className={`tab ${tab === key ? "on" : ""}`}
                    onClick={() => setTab(key)}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="dbody">
            {tab === "Overview" && (
              <>
                {open.state === "Past due" && (
                  <div
                    className="card"
                    style={{ borderColor: STATE["Past due"].fg }}
                  >
                    <h3 style={{ color: STATE["Past due"].fg }}>
                      Payment failed
                    </h3>
                    <p
                      style={{
                        margin: "0 0 12px",
                        fontSize: 13.5,
                        lineHeight: 1.6,
                      }}
                    >
                      Last charge on {fmtDate(open.charges[0]?.date ?? "")} did
                      not go through. Retry it, and if it fails twice, call{" "}
                      {open.contact} instead of sending a fourth email.
                    </p>
                    <button
                      className="primary"
                      style={{ width: "100%", justifyContent: "center" }}
                      onClick={() => retryCharge(open.id)}
                    >
                      <Retry size={15} aria-hidden="true" /> Retry charge
                    </button>
                  </div>
                )}

                <div className="card">
                  <h3>Unit economics</h3>
                  <div className="kv">
                    <span className="muted">They pay</span>
                    <span>{money(open.price)} / month</span>
                    <span className="muted">Hosting costs</span>
                    <span>{money(open.cost)} / month</span>
                    <span className="muted">You keep</span>
                    <span style={{ fontWeight: 600, color: STATE.Active.fg }}>
                      {money(open.price - open.cost)} / month
                    </span>
                    <span className="muted">Annualized</span>
                    <span>{money((open.price - open.cost) * 12)}</span>
                  </div>
                </div>

                <div className="card">
                  <h3>Schedule</h3>
                  <div className="row">
                    <Calendar size={16} aria-hidden="true" />
                    Bills on day {open.anchorDay} of each month
                  </div>
                  <div className="row">
                    <Receipt size={16} aria-hidden="true" />
                    {open.state === "Paused" || open.state === "Canceled"
                      ? "Not scheduled"
                      : `Next: ${fmtDate(nextCharge(open.anchorDay))}`}
                  </div>
                  <div className="row">
                    <Server size={16} aria-hidden="true" />
                    {open.host}
                  </div>
                  <div className="row" style={{ marginBottom: 0 }}>
                    <CircleCheck size={16} aria-hidden="true" />
                    Started {fmtDate(open.startedOn)}
                  </div>
                </div>
              </>
            )}

            {tab === "Charges" && (
              <div className="card">
                <h3>Charge history</h3>
                {open.charges.length === 0 && (
                  <p
                    className="muted"
                    style={{ margin: "4px 0 0", fontSize: 13.5 }}
                  >
                    Nothing collected yet. First charge lands{" "}
                    {fmtDate(nextCharge(open.anchorDay))}.
                  </p>
                )}
                {open.charges.map((c) => {
                  const tone =
                    c.status === "Paid"
                      ? STATE.Active
                      : c.status === "Failed"
                        ? STATE["Past due"]
                        : STATE.Paused;
                  return (
                    <div
                      key={c.id}
                      className="note"
                      style={{ alignItems: "center" }}
                    >
                      <Receipt
                        size={15}
                        style={{ color: "#9AA0AC" }}
                        aria-hidden="true"
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13.5, fontWeight: 500 }}>
                          {fmtDate(c.date)}
                        </div>
                        <div className="muted" style={{ fontSize: 12.5 }}>
                          {open.plan}
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontWeight: 600, fontSize: 13.5 }}>
                          {money(c.amount)}
                        </div>
                        <span
                          className="pill"
                          style={{
                            background: tone.bg,
                            color: tone.fg,
                            fontSize: 11,
                            padding: "2px 8px",
                            marginTop: 3,
                          }}
                        >
                          {c.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
                {open.charges.length > 0 && (
                  <div
                    style={{
                      marginTop: 13,
                      paddingTop: 12,
                      borderTop: "1px solid #E8E6E1",
                      display: "flex",
                    }}
                  >
                    <span
                      className="muted"
                      style={{ marginRight: "auto", fontSize: 13 }}
                    >
                      Collected to date
                    </span>
                    <span style={{ fontWeight: 600, fontSize: 13.5 }}>
                      {money(
                        open.charges
                          .filter((c) => c.status === "Paid")
                          .reduce((t, c) => t + c.amount, 0),
                      )}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="dfoot">
            {open.state === "Paused" ? (
              <button
                className="ghostbtn"
                onClick={() => setState(open.id, "Active")}
              >
                <Play size={14} aria-hidden="true" /> Resume
              </button>
            ) : (
              <button
                className="ghostbtn"
                onClick={() => setState(open.id, "Paused")}
              >
                <Pause size={14} aria-hidden="true" /> Pause
              </button>
            )}
            <button
              className="ghostbtn"
              onClick={() => setState(open.id, "Canceled")}
            >
              <X size={14} aria-hidden="true" /> Cancel
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
              <Pencil size={14} aria-hidden="true" /> Change plan
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
                New subscription
              </h2>
              <button onClick={() => setAdding(false)} aria-label="Close">
                <X size={19} />
              </button>
            </div>
            {(
              [
                ["business", "Business", "VFW Post 4"],
                ["contact", "Contact name", "Ron Whitaker"],
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
            <label style={{ display: "block", marginBottom: 11 }}>
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
                {PLAN_CATALOG.map((p) => (
                  <option key={p.name} value={p.name}>
                    {p.name} · {money(p.price)}
                  </option>
                ))}
              </select>
            </label>
            <label style={{ display: "block", marginBottom: 4 }}>
              <span
                className="muted"
                style={{ fontSize: 13, display: "block", marginBottom: 5 }}
              >
                Billing day (1 to 28)
              </span>
              <input
                className="field"
                value={draft.anchorDay}
                inputMode="numeric"
                placeholder="1"
                onChange={(e) => {
                  setDraft({ ...draft, anchorDay: e.target.value });
                  if (draftError) setDraftError("");
                }}
              />
            </label>
            {draftError && <div className="err">{draftError}</div>}
            <button
              className="primary"
              style={{ width: "100%", justifyContent: "center", marginTop: 16 }}
              onClick={addSub}
            >
              Save subscription
            </button>
          </div>
        </div>
      )}
    </>
  );
}
