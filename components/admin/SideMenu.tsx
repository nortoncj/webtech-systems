"use client";
import React, { useState, useMemo } from "react";
import {
  FaTableCellsLarge as LayoutGrid,
  FaUsers as Users,
  FaBriefcase as Briefcase,
  FaArrowsRotate as RefreshCw,
  FaWandMagicSparkles as Wand2,
  FaChevronDown as ChevronDown,
  FaMagnifyingGlass as MagnifyingGlass,
  FaGear as Gear,
} from "react-icons/fa6";
import "@css/admin/nav.css";
import { useRouter, usePathname } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr/dist/module/createBrowserClient";

type Child = { label: string; key: string; badge?: number };
type Item = {
  label: string;
  key: string;
  Icon: React.ElementType;
  badge?: number;
  children?: Child[];
};

const NAV: Item[] = [
  { label: "Dashboard", key: "", Icon: LayoutGrid },
  {
    label: "Leads",
    key: "leads",
    Icon: Users,
    badge: 3,
    children: [
      { label: "All leads", key: "leads" },
      { label: "Add lead", key: "leads/new" },
      { label: "Needs follow up", key: "leads/stale", badge: 4 },
      { label: "Archived", key: "leads/archived" },
    ],
  },
  {
    label: "Clients",
    key: "clients",
    Icon: Briefcase,
    children: [
      { label: "All clients", key: "clients" },
      { label: "Add client", key: "clients/new" },
      { label: "Projects", key: "clients/projects" },
    ],
  },
  {
    label: "Subscriptions",
    key: "subscriptions",
    Icon: RefreshCw,
    badge: 1,
    children: [
      { label: "Subscriptions", key: "subscriptions" },
      { label: "Invoices", key: "subscriptions/invoices" },
      { label: "Failed charges", key: "subscriptions/failed", badge: 1 },
      { label: "Plans", key: "subscriptions/plans" },
    ],
  },
  {
    label: "Studio",
    key: "studio",
    Icon: Wand2,
    children: [
      { label: "Generate image", key: "studio" },
      { label: "Generate video", key: "studio/video" },
      { label: "Library", key: "studio/library" },
      { label: "Presets", key: "studio/presets" },
    ],
  },
  {
    label: "SEO",
    key: "seo",
    Icon: MagnifyingGlass,
    children: [
      { label: "Overview", key: "seo" },
      { label: "Keywords", key: "seo/keywords" },
      { label: "Site audits", key: "seo/audits" },
      { label: "Content queue", key: "seo/content" },
    ],
  },
  {
    label: "Settings",
    key: "settings",
    Icon: Gear,
    children: [
      { label: "Profile", key: "settings" },
      { label: "Integrations", key: "settings/integrations" },
      { label: "Email templates", key: "settings/email" },
    ],
  },
];

const groupOf = (key: string) => key.split("/")[0];

export default function SideMenu({ email }: Readonly<{ email?: string }>) {
  const router = useRouter();
  const pathname = usePathname();

  // Extract active nav key from URL
  const nav = pathname.replace("/admin/", "") || "dashboard";

  const [openGroups, setOpenGroups] = useState<string[]>([groupOf(nav)]);
  const activeGroup = useMemo(() => groupOf(nav), [nav]);

  const toggle = (item: Item) => {
    if (!item.children) return;
    setOpenGroups((g) =>
      g.includes(item.key) ? g.filter((k) => k !== item.key) : [...g, item.key],
    );
  };
  // in SideMenu.tsx
  const signOut = async () => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <aside className="side">
      <div className="mark">
        <svg
          className="glyph"
          viewBox="0 0 48 48"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M5 9 L15 39 L24 19 L33 39 L43 9"
            stroke="#4F46E5"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="24" cy="10" r="3.6" fill="#1F2430" />
        </svg>
        <div className="wordmark">
          WEBTECH
          <br />
          NINJAS
        </div>
      </div>

      <nav className="navscroll" aria-label="Admin">
        {NAV.map((item) => {
          const { label, key, Icon, children, badge } = item;
          const expanded = openGroups.includes(key);
          const inGroup = activeGroup === key;
          const isLeafActive = !children && nav === key;

          return (
            <div key={key} className="navgroup">
              <button
                className={`navitem ${isLeafActive || (inGroup && !expanded) ? "on" : ""} ${inGroup ? "ingroup" : ""}`}
                onClick={() => router.push(`/admin/${key}`)}
                aria-expanded={children ? expanded : undefined}
                aria-controls={children ? `sub-${key}` : undefined}
              >
                <Icon size={19} aria-hidden="true" />
                <span>{label}</span>
                {badge ? <span className="navbadge">{badge}</span> : null}
                {children && (
                  <ChevronDown
                    size={13}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggle(item);
                    }}
                    aria-hidden="true"
                    className={`navcaret ${expanded ? "open" : ""}`}
                  />
                )}
              </button>

              {children && (
                <div
                  id={`sub-${key}`}
                  className={`subwrap ${expanded ? "open" : ""}`}
                >
                  <div className="subinner">
                    {children.map((c) => (
                      <button
                        key={c.key}
                        className={`subitem ${nav === c.key ? "on" : ""}`}
                        onClick={() => router.push(`/admin/${c.key}`)}
                        tabIndex={expanded ? 0 : -1}
                      >
                        <span>{c.label}</span>
                        {c.badge ? (
                          <span className="navbadge sub">{c.badge}</span>
                        ) : null}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <button className="who" onClick={signOut}>
        <div className="avatar">CN</div>
        <span style={{ textAlign: "left", lineHeight: 1.3 }}>
          <div style={{ fontWeight: 600, fontSize: 13.5 }}>Christopher</div>
          <div className="muted" style={{ fontSize: 12 }}>
            Owner
          </div>
        </span>
        <ChevronDown
          size={17}
          style={{ marginLeft: "auto", color: "#6E7382" }}
          aria-hidden="true"
        />
      </button>
    </aside>
  );
}
