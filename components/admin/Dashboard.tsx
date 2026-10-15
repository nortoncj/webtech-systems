"use client";
import React, { useState, useMemo } from "react";
import "@css/admin/dashboard.css";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  FaCircleExclamation as Alert,
  FaClock as Clock,
  FaEnvelopeOpenText as Envelope,
  FaFileInvoiceDollar as Invoice,
  FaArrowRight as ArrowRight,
  FaArrowTrendUp as TrendUp,
  FaArrowTrendDown as TrendDown,
  FaCircleCheck as CircleCheck,
  FaHammer as Hammer,
  FaUserPlus as UserPlus,
} from "react-icons/fa6";
import Link from "next/link";
const INDIGO = "#4F46E5";
const PURPLE = "#8B5CF6";
const LAV = "#C7C2F5";
const CHAR = "#1F2430";
const MUT = "#6E7382";

const MRR_HISTORY = [
  { month: "Mar", mrr: 40, clients: 1 },
  { month: "Apr", mrr: 119, clients: 2 },
  { month: "May", mrr: 198, clients: 3 },
  { month: "Jun", mrr: 277, clients: 4 },
  { month: "Jul", mrr: 426, clients: 6 },
  { month: "Aug", mrr: 505, clients: 6 },
  { month: "Sep", mrr: 605, clients: 7 },
];

const REVENUE = [
  { month: "Apr", builds: 1800, recurring: 119 },
  { month: "May", builds: 750, recurring: 198 },
  { month: "Jun", builds: 1400, recurring: 277 },
  { month: "Jul", builds: 0, recurring: 426 },
  { month: "Aug", builds: 900, recurring: 505 },
  { month: "Sep", builds: 450, recurring: 605 },
];

const SOURCES = [
  { name: "Referral", value: 21, fill: INDIGO },
  { name: "Website", value: 18, fill: PURPLE },
  { name: "Instagram", value: 12, fill: LAV },
  { name: "Google Ads", value: 9, fill: "#A8A4C9" },
  { name: "Facebook", value: 8, fill: "#D8D5EE" },
];

const FUNNEL = [
  { stage: "New", count: 27, fill: INDIGO },
  { stage: "Contacted", count: 19, fill: "#6D66E0" },
  { stage: "Proposal", count: 14, fill: PURPLE },
  { stage: "Won", count: 7, fill: "#A99CF0" },
];

type Task = {
  id: string;
  kind: "money" | "stale" | "build" | "lead";
  title: string;
  meta: string;
  href: string;
};

const TASKS: Task[] = [
  {
    id: "t1",
    kind: "money",
    title: "Torres Consulting payment failed",
    meta: "$79 · 3 days ago · card declined",
    href: "/admin/recurring",
  },
  {
    id: "t2",
    kind: "money",
    title: "VFW Post 4 balance is due",
    meta: "$450 · due Sep 6 · not yet invoiced",
    href: "/admin/clients",
  },
  {
    id: "t3",
    kind: "stale",
    title: "4 leads have gone cold",
    meta: "No contact in 7+ days · oldest is 19 days",
    href: "/admin/leads",
  },
  {
    id: "t4",
    kind: "build",
    title: "Clark Coaching is still in onboarding",
    meta: "Started 16 days ago · waiting on brand assets",
    href: "/admin/clients",
  },
  {
    id: "t5",
    kind: "lead",
    title: "3 new leads since yesterday",
    meta: "Nina Patel, Sam Okafor, Robert Wilson",
    href: "/admin/leads",
  },
];

const KIND: Record<
  Task["kind"],
  { bg: string; fg: string; Icon: typeof Alert }
> = {
  money: { bg: "#FDECEC", fg: "#B91C1C", Icon: Invoice },
  stale: { bg: "#FDF0DC", fg: "#B45309", Icon: Clock },
  build: { bg: "#EEF0FF", fg: "#4338CA", Icon: Hammer },
  lead: { bg: "#E5F5EA", fg: "#15803D", Icon: UserPlus },
};

const ACTIVITY = [
  {
    at: "2h ago",
    body: "Robert Wilson submitted the intake form",
    tone: INDIGO,
  },
  { at: "5h ago", body: "Patel Dental care plan charged $79", tone: "#15803D" },
  { at: "Yesterday", body: "Torres Consulting charge failed", tone: "#B91C1C" },
  { at: "Yesterday", body: "You moved Davis Plumbing to Dead", tone: MUT },
  {
    at: "2 days ago",
    body: "VFW Post 4 staging site shared with Ron",
    tone: INDIGO,
  },
  {
    at: "3 days ago",
    body: "Reed Auto Detail blog automation charged $149",
    tone: "#15803D",
  },
];

const money = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

function ChartTip({ active, payload, label, prefix = "" }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #E8E6E1",
        borderRadius: 10,
        padding: "9px 12px",
        fontSize: 12.5,
        boxShadow: "0 6px 20px rgba(31,36,48,.1)",
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 4 }}>{label}</div>
      {payload.map((p: any) => (
        <div
          key={p.dataKey}
          style={{ color: p.color ?? p.fill, display: "flex", gap: 10 }}
        >
          <span style={{ textTransform: "capitalize" }}>{p.name}</span>
          <span style={{ marginLeft: "auto", fontWeight: 600 }}>
            {prefix}
            {typeof p.value === "number" ? p.value.toLocaleString() : p.value}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const [dismissed, setDismissed] = useState<string[]>([]);
  const tasks = TASKS.filter((t) => !dismissed.includes(t.id));

  const mrr = MRR_HISTORY[MRR_HISTORY.length - 1].mrr;
  const prev = MRR_HISTORY[MRR_HISTORY.length - 2].mrr;
  const growth = Math.round(((mrr - prev) / prev) * 100);

  const ytd = useMemo(
    () => REVENUE.reduce((t, r) => t + r.builds + r.recurring, 0),
    [],
  );

  const hero = [
    {
      label: "MRR",
      value: money(mrr),
      sub: "7 subscriptions",
      delta: growth,
      up: true,
    },
    {
      label: "Collected in Sep",
      value: money(1055),
      sub: "builds plus recurring",
      delta: 12,
      up: true,
    },
    {
      label: "Outstanding",
      value: money(1604),
      sub: "4 unpaid invoices",
      delta: 22,
      up: false,
    },
    {
      label: "Pipeline",
      value: money(4300),
      sub: "14 open proposals",
      delta: 8,
      up: true,
    },
  ];

  return (
    <>
      <div className="top">
        <h1>Dashboard</h1>
        <span className="muted" style={{ fontSize: 13 }}>
          Saturday, September 5
        </span>
      </div>

      <div className="stats">
        {hero.map((h) => (
          <div key={h.label} className="stat" style={{ cursor: "default" }}>
            <b>{h.value}</b>
            <span>
              {h.label} · {h.sub}
            </span>
            <div className="delta" style={{ color: h.up ? INDIGO : "#B91C1C" }}>
              {h.up ? (
                <TrendUp size={14} aria-hidden="true" />
              ) : (
                <TrendDown size={14} aria-hidden="true" />
              )}
              {h.delta}%
            </div>
          </div>
        ))}
      </div>

      <div className="dashgrid">
        <div className="panel chartcard" style={{ gridColumn: "span 2" }}>
          <div className="cardhead">
            <div>
              <h2>Recurring revenue</h2>
              <p className="muted">
                Monthly, net of nothing. This is the number that compounds.
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: 24,
                  fontWeight: 700,
                }}
              >
                {money(mrr * 12)}
              </div>
              <div className="muted" style={{ fontSize: 12.5 }}>
                run rate
              </div>
            </div>
          </div>
          <div style={{ height: 218, marginTop: 6 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={MRR_HISTORY}
                margin={{ top: 4, right: 4, left: -18, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="mrrFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={INDIGO} stopOpacity={0.22} />
                    <stop offset="100%" stopColor={INDIGO} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#EFEDE8"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: MUT, fontSize: 12 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: MUT, fontSize: 12 }}
                  tickFormatter={(v) => `$${v}`}
                />
                <Tooltip
                  content={<ChartTip prefix="$" />}
                  cursor={{ stroke: LAV }}
                />
                <Area
                  type="monotone"
                  dataKey="mrr"
                  name="MRR"
                  stroke={INDIGO}
                  strokeWidth={2.5}
                  fill="url(#mrrFill)"
                  dot={{ r: 3, fill: INDIGO, strokeWidth: 0 }}
                  activeDot={{ r: 5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel chartcard">
          <div className="cardhead">
            <div>
              <h2>Needs you today</h2>
              <p className="muted">{tasks.length} open</p>
            </div>
          </div>
          <div className="tasklist">
            {tasks.map((t) => {
              const { bg, fg, Icon } = KIND[t.kind];
              return (
                <Link key={t.id} href="#" className="task">
                  <span
                    className="taskicon"
                    style={{ background: bg, color: fg }}
                  >
                    <Icon size={13} aria-hidden="true" />
                  </span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span className="tasktitle">{t.title}</span>
                    <span className="muted taskmeta">{t.meta}</span>
                  </span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setDismissed((d) => [...d, t.id]);
                    }}
                    aria-label={`Dismiss: ${t.title}`}
                    className="muted"
                    style={{ fontSize: 12, flexShrink: 0 }}
                  >
                    Done
                  </button>
                </Link>
              );
            })}
            {tasks.length === 0 && (
              <div style={{ padding: "34px 4px", textAlign: "center" }}>
                <CircleCheck
                  size={22}
                  style={{ color: "#15803D", marginBottom: 8 }}
                  aria-hidden="true"
                />
                <p style={{ margin: 0, fontSize: 13.5, fontWeight: 500 }}>
                  Nothing on fire
                </p>
                <p
                  className="muted"
                  style={{ margin: "3px 0 0", fontSize: 13 }}
                >
                  Go send three cold emails.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="panel chartcard">
          <div className="cardhead">
            <div>
              <h2>Revenue mix</h2>
              <p className="muted">{money(ytd)} collected since April</p>
            </div>
          </div>
          <div style={{ height: 190, marginTop: 6 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={REVENUE}
                margin={{ top: 4, right: 4, left: -18, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#EFEDE8"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: MUT, fontSize: 12 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: MUT, fontSize: 12 }}
                  tickFormatter={(v) => `$${v >= 1000 ? `${v / 1000}k` : v}`}
                />
                <Tooltip
                  content={<ChartTip prefix="$" />}
                  cursor={{ fill: "#F5F3FF" }}
                />
                <Bar
                  dataKey="recurring"
                  name="Recurring"
                  stackId="a"
                  fill={INDIGO}
                  radius={[0, 0, 3, 3]}
                />
                <Bar
                  dataKey="builds"
                  name="Builds"
                  stackId="a"
                  fill={LAV}
                  radius={[3, 3, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="legend">
            <span>
              <i style={{ background: INDIGO }} />
              Recurring
            </span>
            <span>
              <i style={{ background: LAV }} />
              One-off builds
            </span>
          </div>
        </div>

        <div className="panel chartcard">
          <div className="cardhead">
            <div>
              <h2>Lead funnel</h2>
              <p className="muted">26% of proposals close</p>
            </div>
          </div>
          <div style={{ height: 190, marginTop: 6 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={FUNNEL}
                layout="vertical"
                margin={{ top: 4, right: 16, left: 8, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#EFEDE8"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: MUT, fontSize: 12 }}
                />
                <YAxis
                  type="category"
                  dataKey="stage"
                  width={72}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: CHAR, fontSize: 12.5 }}
                />
                <Tooltip content={<ChartTip />} cursor={{ fill: "#F5F3FF" }} />
                <Bar
                  dataKey="count"
                  name="Leads"
                  radius={[0, 5, 5, 0]}
                  barSize={22}
                >
                  {FUNNEL.map((f) => (
                    <Cell key={f.stage} fill={f.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel chartcard">
          <div className="cardhead">
            <div>
              <h2>Where leads come from</h2>
              <p className="muted">Last 90 days</p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginTop: 6,
            }}
          >
            <div style={{ width: 150, height: 150, flexShrink: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={SOURCES}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={44}
                    outerRadius={68}
                    paddingAngle={2}
                    strokeWidth={0}
                  >
                    {SOURCES.map((s) => (
                      <Cell key={s.name} fill={s.fill} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              {SOURCES.map((s) => (
                <div
                  key={s.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 13,
                    padding: "4px 0",
                  }}
                >
                  <i
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: 3,
                      background: s.fill,
                      flexShrink: 0,
                      display: "block",
                    }}
                  />
                  <span style={{ marginRight: "auto" }}>{s.name}</span>
                  <span style={{ fontWeight: 600 }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="panel chartcard" style={{ gridColumn: "span 2" }}>
          <div className="cardhead">
            <div>
              <h2>Recent activity</h2>
              <p className="muted">Everything the system did without you</p>
            </div>
            <Link href="#" className="seeall">
              All leads <ArrowRight size={11} aria-hidden="true" />
            </Link>
          </div>
          <div className="feed">
            {ACTIVITY.map((a, i) => (
              <div key={i} className="feeditem">
                <span
                  className="feeddot"
                  style={{ background: a.tone }}
                  aria-hidden="true"
                />
                <span style={{ flex: 1, fontSize: 13.5 }}>{a.body}</span>
                <span
                  className="muted"
                  style={{ fontSize: 12.5, flexShrink: 0 }}
                >
                  {a.at}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
