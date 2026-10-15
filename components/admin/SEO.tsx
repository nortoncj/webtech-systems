"use client";

import { useMemo, useState } from "react";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type ReportState =
  | "sent" // client already has this month's report
  | "ready" // data is in, report can be generated
  | "generating" // job running
  | "waiting" // GSC data not final yet (2-3 day lag)
  | "paused"; // retainer paused, skip this client

export interface MonthMetrics {
  /** ISO month, e.g. "2026-08" */
  month: string;
  clicks: number;
  impressions: number;
  avgPosition: number;
}

export interface PastReport {
  id: string;
  /** ISO month the report covers */
  month: string;
  sentAt: string | null;
  url: string;
}

export interface Client {
  id: string;
  name: string;
  domain: string;
  plan: string;
  state: ReportState;
  /** Metrics for the reporting month */
  current: MonthMetrics;
  /** Same month one year earlier. Null when history is too short. */
  yearAgo: MonthMetrics | null;
  /** Earliest month with data. Drives the YoY unlock message. */
  dataSince: string;
  reports: PastReport[];
}

interface ClientsPanelProps {
  clients: Client[];
  /** Reporting month in ISO form, e.g. "2026-08" */
  month: string;
  availableMonths: string[];
  onMonthChange?: (month: string) => void;
  onGenerate?: (clientId: string, month: string) => void;
  onGenerateAll?: (month: string) => void;
  onOpenReport?: (report: PastReport) => void;
}

/* ------------------------------------------------------------------ */
/* Formatting                                                          */
/* ------------------------------------------------------------------ */

const nf = new Intl.NumberFormat("en-US");

function monthLabel(iso: string, long = false) {
  const [y, m] = iso.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString("en-US", {
    month: long ? "long" : "short",
    year: "numeric",
  });
}

/** The month YoY becomes possible: 12 months after the first month of data. */
function yoyUnlockMonth(dataSince: string) {
  const [y, m] = dataSince.split("-").map(Number);
  const d = new Date(y, m - 1 + 12, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function pctChange(now: number, then: number) {
  if (then === 0) return null;
  return ((now - then) / then) * 100;
}

/* ------------------------------------------------------------------ */
/* State presentation                                                  */
/* ------------------------------------------------------------------ */

const STATE_META: Record<
  ReportState,
  { rail: string; label: string; tone: string }
> = {
  ready: {
    rail: "bg-[#6F5AF6]",
    label: "Needs report",
    tone: "text-[#B7ADFF] bg-[#6F5AF6]/12 ring-[#6F5AF6]/30",
  },
  generating: {
    rail: "bg-[#6F5AF6]/50",
    label: "Generating",
    tone: "text-[#B7ADFF] bg-[#6F5AF6]/8 ring-[#6F5AF6]/20",
  },
  sent: {
    rail: "bg-[#3DD68C]",
    label: "Sent",
    tone: "text-[#7FE3B4] bg-[#3DD68C]/10 ring-[#3DD68C]/25",
  },
  waiting: {
    rail: "bg-[#F2B441]",
    label: "Waiting on data",
    tone: "text-[#F5CE84] bg-[#F2B441]/10 ring-[#F2B441]/25",
  },
  paused: {
    rail: "bg-[#3A4560]",
    label: "Paused",
    tone: "text-[#7C8AA8] bg-[#3A4560]/25 ring-[#3A4560]/40",
  },
};

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

function StatePill({ state }: { state: ReportState }) {
  const meta = STATE_META[state];
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${meta.tone}`}
    >
      {meta.label}
    </span>
  );
}

function Delta({ now, then }: { now: number; then: number | null }) {
  if (then === null) {
    return <span className="text-sm text-[#5D6A85]">No comparison yet</span>;
  }
  const pct = pctChange(now, then);
  if (pct === null) {
    return <span className="text-sm text-[#5D6A85]">New</span>;
  }
  const up = pct >= 0;
  return (
    <span
      className={`inline-flex items-baseline gap-1 text-sm font-medium tabular-nums ${
        up ? "text-[#7FE3B4]" : "text-[#F58A8A]"
      }`}
    >
      <svg
        viewBox="0 0 10 10"
        aria-hidden="true"
        className={`h-2.5 w-2.5 self-center ${up ? "" : "rotate-180"}`}
      >
        <path d="M5 1 9 8H1z" fill="currentColor" />
      </svg>
      {Math.abs(pct).toFixed(0)}%
    </span>
  );
}

/** Two-bar comparison. Cheaper and more legible than a chart library. */
function YoYBars({
  label,
  now,
  then,
  nowLabel,
  thenLabel,
}: {
  label: string;
  now: number;
  then: number;
  nowLabel: string;
  thenLabel: string;
}) {
  const max = Math.max(now, then, 1);
  return (
    <div>
      <div className="mb-3 text-sm text-[#8C99B4]">{label}</div>
      <div className="space-y-2">
        {[
          { v: then, l: thenLabel },
          { v: now, l: nowLabel },
        ].map((bar, i) => (
          <div key={bar.l} className="flex items-center gap-3">
            <span className="w-20 shrink-0 text-xs text-[#6E7C99]">
              {bar.l}
            </span>
            <div className="h-6 flex-1 rounded bg-[#151E33]">
              <div
                className={`h-full rounded ${
                  i === 0 ? "bg-[#2E3A57]" : "bg-[#6F5AF6]"
                }`}
                style={{ width: `${Math.max((bar.v / max) * 100, 2)}%` }}
              />
            </div>
            <span className="w-16 shrink-0 text-right text-sm tabular-nums text-[#D6DEEE]">
              {nf.format(bar.v)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Row                                                                 */
/* ------------------------------------------------------------------ */

function ClientRow({
  client,
  month,
  onSelect,
  onGenerate,
}: {
  client: Client;
  month: string;
  onSelect: () => void;
  onGenerate: () => void;
}) {
  const meta = STATE_META[client.state];
  const actionable = client.state === "ready";

  return (
    <div className="group relative flex items-center gap-4 border-b border-[#1B2439] pl-4 pr-3 transition-colors hover:bg-[#111A2B]">
      <span
        aria-hidden="true"
        className={`absolute left-0 top-0 h-full w-[3px] ${meta.rail}`}
      />

      <button
        onClick={onSelect}
        className="flex flex-1 items-center gap-4 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6F5AF6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1220]"
      >
        <span className="min-w-0 flex-1">
          <span className="block truncate font-semibold text-[#EEF2FA]">
            {client.name}
          </span>
          <span className="block truncate text-sm text-[#6E7C99]">
            {client.domain}
          </span>
        </span>

        <span className="hidden w-28 shrink-0 text-sm text-[#8C99B4] sm:block">
          {client.plan}
        </span>

        <span className="hidden w-28 shrink-0 text-right md:block">
          <span className="block text-base font-semibold tabular-nums text-[#EEF2FA]">
            {nf.format(client.current.clicks)}
          </span>
          <span className="block text-xs text-[#5D6A85]">clicks</span>
        </span>

        <span className="hidden w-32 shrink-0 text-right lg:block">
          <Delta
            now={client.current.clicks}
            then={client.yearAgo?.clicks ?? null}
          />
          <span className="block text-xs text-[#5D6A85]">vs last year</span>
        </span>

        <span className="w-32 shrink-0">
          <StatePill state={client.state} />
        </span>
      </button>

      <button
        onClick={onGenerate}
        disabled={!actionable}
        className="shrink-0 rounded-md border border-[#2A3550] px-3 py-1.5 text-sm font-medium text-[#C4CEE2] transition-colors enabled:hover:border-[#6F5AF6] enabled:hover:text-white disabled:cursor-not-allowed disabled:border-[#1B2439] disabled:text-[#4A566F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6F5AF6]"
      >
        {client.state === "sent" ? "Regenerate" : "Generate"}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Detail drawer                                                       */
/* ------------------------------------------------------------------ */

function ReportDrawer({
  client,
  month,
  onClose,
  onGenerate,
  onOpenReport,
}: {
  client: Client;
  month: string;
  onClose: () => void;
  onGenerate: () => void;
  onOpenReport?: (r: PastReport) => void;
}) {
  const unlock = yoyUnlockMonth(client.dataSince);

  return (
    <aside className="flex h-full w-full max-w-md flex-col border-l border-[#1B2439] bg-[#0D1524]">
      <header className="flex items-start justify-between gap-4 border-b border-[#1B2439] px-6 py-5">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-[#EEF2FA]">
            {client.name}
          </h3>
          <p className="truncate text-sm text-[#6E7C99]">{client.domain}</p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close panel"
          className="rounded-md p-1.5 text-[#6E7C99] transition-colors hover:bg-[#151E33] hover:text-[#EEF2FA] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6F5AF6]"
        >
          <svg viewBox="0 0 14 14" className="h-4 w-4" aria-hidden="true">
            <path
              d="M1 1l12 12M13 1L1 13"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </header>

      <div className="flex-1 space-y-8 overflow-y-auto px-6 py-6">
        {/* On-demand generation */}
        <section>
          <div className="flex items-center justify-between gap-3 rounded-lg border border-[#2A3550] bg-[#111A2B] px-4 py-3.5">
            <div>
              <p className="font-medium text-[#EEF2FA]">
                {monthLabel(month, true)} report
              </p>
              <p className="text-sm text-[#6E7C99]">
                {client.state === "sent"
                  ? "Already sent to the client"
                  : client.state === "waiting"
                    ? "Search Console data lands in 2 to 3 days"
                    : "Ready to build"}
              </p>
            </div>
            <button
              onClick={onGenerate}
              disabled={client.state === "waiting" || client.state === "paused"}
              className="shrink-0 rounded-md bg-[#6F5AF6] px-3.5 py-2 text-sm font-semibold text-white transition-colors enabled:hover:bg-[#5D46F0] disabled:cursor-not-allowed disabled:bg-[#252F47] disabled:text-[#5D6A85] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6F5AF6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1524]"
            >
              {client.state === "generating" ? "Building…" : "Build now"}
            </button>
          </div>
        </section>

        {/* Year over year */}
        <section>
          <h4 className="mb-4 font-semibold text-[#EEF2FA]">
            {monthLabel(month)} against last year
          </h4>

          {client.yearAgo ? (
            <div className="space-y-6">
              <YoYBars
                label="Clicks"
                now={client.current.clicks}
                then={client.yearAgo.clicks}
                nowLabel={monthLabel(month)}
                thenLabel={monthLabel(client.yearAgo.month)}
              />
              <YoYBars
                label="Impressions"
                now={client.current.impressions}
                then={client.yearAgo.impressions}
                nowLabel={monthLabel(month)}
                thenLabel={monthLabel(client.yearAgo.month)}
              />
              <div className="flex items-baseline justify-between border-t border-[#1B2439] pt-4">
                <span className="text-sm text-[#8C99B4]">Average position</span>
                <span className="text-sm tabular-nums text-[#D6DEEE]">
                  {client.current.avgPosition.toFixed(1)}{" "}
                  <span className="text-[#5D6A85]">
                    from {client.yearAgo.avgPosition.toFixed(1)}
                  </span>
                </span>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-[#2A3550] px-4 py-6 text-center">
              <p className="text-sm text-[#8C99B4]">
                We started collecting data in{" "}
                {monthLabel(client.dataSince, true)}.
              </p>
              <p className="mt-1 text-sm text-[#6E7C99]">
                Year over year comparison opens up in {monthLabel(unlock, true)}
                .
              </p>
            </div>
          )}
        </section>

        {/* History */}
        <section>
          <h4 className="mb-3 font-semibold text-[#EEF2FA]">Past reports</h4>
          {client.reports.length === 0 ? (
            <p className="text-sm text-[#6E7C99]">
              Nothing sent yet. The first report goes out after a full month of
              data.
            </p>
          ) : (
            <ul className="divide-y divide-[#1B2439]">
              {client.reports.map((r) => (
                <li key={r.id}>
                  <button
                    onClick={() => onOpenReport?.(r)}
                    className="flex w-full items-center justify-between py-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6F5AF6]"
                  >
                    <span className="text-sm text-[#D6DEEE]">
                      {monthLabel(r.month, true)}
                    </span>
                    <span className="text-xs text-[#5D6A85]">
                      {r.sentAt
                        ? `Sent ${new Date(r.sentAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            },
                          )}`
                        : "Not sent"}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/* Panel                                                               */
/* ------------------------------------------------------------------ */

export default function ClientsPanel({
  clients,
  month,
  availableMonths,
  onMonthChange,
  onGenerate,
  onGenerateAll,
  onOpenReport,
}: ClientsPanelProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = clients.find((c) => c.id === selectedId) ?? null;

  const pending = useMemo(
    () => clients.filter((c) => c.state === "ready").length,
    [clients],
  );

  return (
    <div className="flex  h-screen bg-[#0B1220] font-[Inter,system-ui,sans-serif]">
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-b border-[#1B2439] px-6 py-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-[PlusJakartaSans,Inter,sans-serif] text-2xl font-bold tracking-tight text-[#EEF2FA]">
                Clients
              </h2>
              <p className="mt-1 text-sm text-[#6E7C99]">
                {pending === 0
                  ? `Every ${monthLabel(month)} report is out the door.`
                  : `${pending} ${
                      pending === 1 ? "client is" : "clients are"
                    } waiting on a ${monthLabel(month)} report.`}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <label className="sr-only" htmlFor="report-month">
                Reporting month
              </label>
              <select
                id="report-month"
                value={month}
                onChange={(e) => onMonthChange?.(e.target.value)}
                className="rounded-md border border-[#2A3550] bg-[#111A2B] px-3 py-2 text-sm text-[#D6DEEE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6F5AF6]"
              >
                {availableMonths.map((m) => (
                  <option key={m} value={m}>
                    {monthLabel(m, true)}
                  </option>
                ))}
              </select>

              <button
                onClick={() => onGenerateAll?.(month)}
                disabled={pending === 0}
                className="rounded-md bg-[#6F5AF6] px-3.5 py-2 text-sm font-semibold text-white transition-colors enabled:hover:bg-[#5D46F0] disabled:cursor-not-allowed disabled:bg-[#252F47] disabled:text-[#5D6A85] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6F5AF6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1220]"
              >
                Build {pending || "all"} report{pending === 1 ? "" : "s"}
              </button>
            </div>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto">
          {clients.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="font-medium text-[#EEF2FA]">No clients yet</p>
              <p className="mt-1 text-sm text-[#6E7C99]">
                Convert a lead to start tracking search performance.
              </p>
            </div>
          ) : (
            clients.map((c) => (
              <ClientRow
                key={c.id}
                client={c}
                month={month}
                onSelect={() => setSelectedId(c.id)}
                onGenerate={() => onGenerate?.(c.id, month)}
              />
            ))
          )}
        </div>
      </div>

      {selected && (
        <ReportDrawer
          client={selected}
          month={month}
          onClose={() => setSelectedId(null)}
          onGenerate={() => onGenerate?.(selected.id, month)}
          onOpenReport={onOpenReport}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mock data so it renders immediately                                 */
/* ------------------------------------------------------------------ */

export const mockClients: Client[] = [
  {
    id: "c_troy",
    name: "Troy Hardwood Co.",
    domain: "troyhardwood.com",
    plan: "Growth",
    state: "ready",
    current: {
      month: "2026-08",
      clicks: 1842,
      impressions: 51230,
      avgPosition: 12.4,
    },
    yearAgo: {
      month: "2025-08",
      clicks: 1104,
      impressions: 38900,
      avgPosition: 18.1,
    },
    dataSince: "2025-03",
    reports: [
      { id: "r1", month: "2026-07", sentAt: "2026-08-03", url: "#" },
      { id: "r2", month: "2026-06", sentAt: "2026-07-02", url: "#" },
    ],
  },
  {
    id: "c_lachelle",
    name: "Lachelle Travels",
    domain: "lachelletravels.com",
    plan: "Monitoring",
    state: "sent",
    current: {
      month: "2026-08",
      clicks: 3410,
      impressions: 128400,
      avgPosition: 9.8,
    },
    yearAgo: {
      month: "2025-08",
      clicks: 3980,
      impressions: 141200,
      avgPosition: 8.2,
    },
    dataSince: "2025-01",
    reports: [
      { id: "r3", month: "2026-08", sentAt: "2026-09-02", url: "#" },
      { id: "r4", month: "2026-07", sentAt: "2026-08-02", url: "#" },
    ],
  },
  {
    id: "c_newco",
    name: "Bayside Roofing",
    domain: "baysideroofingfl.com",
    plan: "Monitoring",
    state: "waiting",
    current: {
      month: "2026-08",
      clicks: 267,
      impressions: 9840,
      avgPosition: 22.6,
    },
    yearAgo: null,
    dataSince: "2026-04",
    reports: [],
  },
  {
    id: "c_paused",
    name: "Gulfview Dental",
    domain: "gulfviewdental.com",
    plan: "Monitoring",
    state: "paused",
    current: { month: "2026-08", clicks: 0, impressions: 0, avgPosition: 0 },
    yearAgo: null,
    dataSince: "2026-02",
    reports: [{ id: "r5", month: "2026-05", sentAt: "2026-06-04", url: "#" }],
  },
];

export const mockMonths = ["2026-08", "2026-07", "2026-06", "2026-05"];
