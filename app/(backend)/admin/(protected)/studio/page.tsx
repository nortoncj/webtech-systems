"use client";

import { useState, useRef } from "react";
import {
  FaStar as Sparkles,
  FaWandMagicSparkles as Wand2,
  FaTableCellsLarge as LayoutGrid,
  FaTableCells as LayoutTemplate,
  FaImages as GalleryHorizontalEnd,
  FaQuoteLeft as MessageSquareQuote,
  FaBullhorn as Megaphone,
  FaChartBar as BarChart3,
  FaSquare as Square,
  FaMobile as Smartphone,
  FaPanorama as RectangleHorizontal,
  FaImagePortrait as RectangleVertical,
  FaDownload as Download,
  FaSun as Sun,
  FaMoon as Moon,
  FaArrowsLeftRight as ChevronsLeftRight,
  FaVideo as Video,
  FaFileImage as ImagePlus,
  FaXmark as X,
} from "react-icons/fa6";
import {
  TEMPLATES,
  RATIOS,
  STYLES,
  RATIO_TO_CSS,
  type Template,
  type RatioId,
  type StyleId,
} from "@lib/templates";

const ICONS: Record<
  string,
  React.ComponentType<{ size?: number; color?: string }>
> = {
  LayoutTemplate,
  GalleryHorizontalEnd,
  MessageSquareQuote,
  Megaphone,
  BarChart3,
  Square,
  Smartphone,
  RectangleHorizontal,
  RectangleVertical,
  Video,
};

type Generation = {
  url: string;
  prompt: string;
  ratio: RatioId;
  usedRefs: boolean;
};

// Downscale + compress in the browser BEFORE sending.
//
// WHY THIS EXISTS: a raw phone photo is 3–8MB. Vercel rejects request bodies
// over ~4.5MB, and base64 inflates size by ~33% on top of that. One unedited
// selfie would fail the request outright. 1536px on the long edge is plenty
// for a reference image — the model isn't reading fine detail off it.
const MAX_EDGE = 1536;
const JPEG_QUALITY = 0.85;

function fileToDataUri(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > MAX_EDGE || height > MAX_EDGE) {
          const scale = MAX_EDGE / Math.max(width, height);
          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas unavailable"));
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", JPEG_QUALITY));
      };
      img.onerror = () => reject(new Error("Could not read that image"));
      img.src = String(reader.result);
    };
    reader.onerror = () => reject(new Error("Could not read that file"));
    reader.readAsDataURL(file);
  });
}

export default function StudioPage() {
  const [dark, setDark] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [ratio, setRatio] = useState<RatioId>("1:1");
  const [style, setStyle] = useState<StyleId>("brand");
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);
  const [refs, setRefs] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [gens, setGens] = useState<Generation[]>([]);
  const fileInput = useRef<HTMLInputElement | null>(null);

  const t = dark
    ? {
        bg: "#151921",
        panel: "#1A1F2A",
        sidebar: "#12151C",
        border: "#2A303C",
        text: "#F8F7F4",
        subtext: "#9CA3AF",
        muted: "#6B7280",
        indigo: "#6D64F0",
        indigoSoft: "#2A2550",
        chip: "#232935",
        card: "#1F2430",
      }
    : {
        bg: "#F8F7F4",
        panel: "#FFFFFF",
        sidebar: "#FFFFFF",
        border: "#ECEAE4",
        text: "#1F2430",
        subtext: "#6B7280",
        muted: "#9CA3AF",
        indigo: "#4F46E5",
        indigoSoft: "#F3F0FF",
        chip: "#F3F0FF",
        card: "#F8F7F4",
      };

  function applyTemplate(tpl: Template) {
    setActiveTemplate(tpl.id);
    setRatio(tpl.defaultRatio);
    setPrompt(tpl.prefix + prompt.trim());
  }

  async function addFiles(files: FileList | File[]) {
    const list = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (!list.length) return;
    setError("");
    try {
      const uris = await Promise.all(list.map(fileToDataUri));
      setRefs((r) => [...r, ...uris].slice(0, 10)); // fal caps at 10
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Could not process that image.",
      );
    }
  }

  async function downloadImage(url: string, index: number) {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `seedream-${Date.now()}-${index}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(url, "_blank");
    }
  }

  async function generate() {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          ratio,
          style,
          referenceImages: refs,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(
          data?.detail
            ? `${data.error} ${data.detail}`
            : data?.error || "Generation failed.",
        );
      } else {
        setGens((g) => [
          { url: data.url, prompt, ratio, usedRefs: !!data.usedRefs },
          ...g,
        ]);
      }
    } catch {
      setError("Could not reach the server. Try again.");
    } finally {
      setLoading(false);
    }
  }

  const font = "Manrope, ui-sans-serif, system-ui, -apple-system, sans-serif";

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: t.bg,
        color: t.text,
        fontFamily: font,
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: "232px",
          flexShrink: 0,
          background: t.sidebar,
          borderRight: `1px solid ${t.border}`,
          display: "flex",
          flexDirection: "column",
          padding: "20px 16px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              display: "grid",
              placeItems: "center",
              width: "34px",
              height: "34px",
              borderRadius: "10px",
              background: t.indigo,
              flexShrink: 0,
            }}
          >
            <Sparkles size={19} color="#fff" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "15px", lineHeight: 1.1 }}>
              Webtech Studios
            </div>
            <div style={{ fontSize: "11px", color: t.subtext }}>
              Internal tools
            </div>
          </div>
        </div>

        <NavItem icon={<Wand2 size={17} />} label="Generate" active t={t} />
        <NavItem icon={<LayoutGrid size={17} />} label="Gallery" t={t} />

        <div
          style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.04em",
            color: t.muted,
            margin: "24px 8px 10px",
          }}
        >
          TEMPLATES
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {TEMPLATES.map((tpl) => {
            const Icon = ICONS[tpl.icon];
            const isActive = activeTemplate === tpl.id;
            return (
              <button
                key={tpl.id}
                onClick={() => applyTemplate(tpl)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "9px 8px",
                  borderRadius: "10px",
                  border: "none",
                  background: isActive ? t.indigoSoft : "transparent",
                  cursor: "pointer",
                  textAlign: "left",
                  width: "100%",
                }}
              >
                <span
                  style={{
                    display: "grid",
                    placeItems: "center",
                    width: "30px",
                    height: "30px",
                    borderRadius: "8px",
                    background: t.chip,
                    color: t.indigo,
                    flexShrink: 0,
                  }}
                >
                  {Icon && <Icon size={16} />}
                </span>
                <span style={{ lineHeight: 1.2 }}>
                  <span
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: t.text,
                    }}
                  >
                    {tpl.label}
                  </span>
                  <span style={{ fontSize: "11px", color: t.subtext }}>
                    {tpl.sub}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div style={{ flex: 1 }} />

        <button
          onClick={() => setDark((d) => !d)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 12px",
            borderRadius: "10px",
            border: `1px solid ${t.border}`,
            background: "transparent",
            color: t.indigo,
            cursor: "pointer",
            marginTop: "16px",
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            {dark ? <Moon size={16} /> : <Sun size={16} />}
            {dark ? "Dark Mode" : "Light Mode"}
          </span>
          <ChevronsLeftRight size={15} color={t.subtext} />
        </button>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: "32px 40px", minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <h1
              style={{ fontSize: "26px", fontWeight: 700, margin: "0 0 6px" }}
            >
              Generate Images with Seedream 4
            </h1>
            <p style={{ color: t.subtext, margin: 0, fontSize: "14px" }}>
              Describe your image, drop in references, and let AI do the rest.
            </p>
          </div>
          <button
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle theme"
            style={{
              display: "grid",
              placeItems: "center",
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              border: `1px solid ${t.border}`,
              background: t.panel,
              color: t.text,
              cursor: "pointer",
            }}
          >
            {dark ? <Moon size={17} /> : <Sun size={17} />}
          </button>
        </div>

        {/* Prompt box */}
        <div
          style={{
            marginTop: "22px",
            background: t.panel,
            border: `1px solid ${t.border}`,
            borderRadius: "14px",
            padding: "18px",
          }}
        >
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value.slice(0, 2000))}
            placeholder={
              refs.length
                ? "Describe what to do with the reference…\nExample: Put this person in a neon-lit Tokyo alley at night, cinematic"
                : "Describe the image you want to generate…\nExample: A futuristic cityscape at sunset, cyberpunk style, ultra detailed"
            }
            rows={3}
            style={{
              width: "100%",
              boxSizing: "border-box",
              resize: "vertical",
              border: "none",
              outline: "none",
              background: "transparent",
              color: t.text,
              fontFamily: font,
              fontSize: "14px",
              lineHeight: 1.5,
            }}
          />
          <div style={{ textAlign: "right", fontSize: "12px", color: t.muted }}>
            {prompt.length} / 2000
          </div>
        </div>

        {/* Reference images */}
        <div style={{ marginTop: "22px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "13px",
              fontWeight: 600,
              marginBottom: "10px",
            }}
          >
            Reference Images
            <span
              style={{ fontWeight: 400, color: t.subtext, fontSize: "12px" }}
            >
              optional · up to 10 · switches to edit mode
            </span>
          </div>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              addFiles(e.dataTransfer.files);
            }}
            onClick={() => fileInput.current?.click()}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              alignItems: "center",
              padding: "16px",
              borderRadius: "12px",
              border: `1px dashed ${dragOver ? t.indigo : t.border}`,
              background: dragOver ? t.indigoSoft : t.panel,
              cursor: "pointer",
              transition: "border-color .15s, background .15s",
            }}
          >
            {refs.map((src, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  width: "72px",
                  height: "72px",
                  borderRadius: "10px",
                  overflow: "hidden",
                  border: `1px solid ${t.border}`,
                  flexShrink: 0,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`Reference ${i + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setRefs((r) => r.filter((_, idx) => idx !== i));
                  }}
                  aria-label="Remove reference"
                  style={{
                    position: "absolute",
                    top: "3px",
                    right: "3px",
                    display: "grid",
                    placeItems: "center",
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    border: "none",
                    background: "rgba(31,36,48,0.8)",
                    color: "#fff",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  <X size={11} />
                </button>
              </div>
            ))}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: t.subtext,
                fontSize: "13px",
              }}
            >
              <span
                style={{
                  display: "grid",
                  placeItems: "center",
                  width: "36px",
                  height: "36px",
                  borderRadius: "9px",
                  background: t.chip,
                  color: t.indigo,
                }}
              >
                <ImagePlus size={18} />
              </span>
              {refs.length
                ? "Add another"
                : "Drop an image here, or click to browse"}
            </div>
          </div>

          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              if (e.target.files) addFiles(e.target.files);
              e.target.value = "";
            }}
            style={{ display: "none" }}
          />
        </div>

        {/* Style + ratio + generate */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginTop: "22px",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", gap: "28px", flexWrap: "wrap" }}>
            {/* Style toggle */}
            <div>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  marginBottom: "10px",
                }}
              >
                Style
              </div>
              <div
                style={{
                  display: "inline-flex",
                  padding: "3px",
                  borderRadius: "10px",
                  border: `1px solid ${t.border}`,
                  background: t.panel,
                }}
              >
                {(Object.keys(STYLES) as StyleId[]).map((sid) => {
                  const isActive = style === sid;
                  return (
                    <button
                      key={sid}
                      onClick={() => setStyle(sid)}
                      style={{
                        padding: "8px 16px",
                        borderRadius: "8px",
                        border: "none",
                        background: isActive ? t.indigo : "transparent",
                        color: isActive ? "#fff" : t.text,
                        cursor: "pointer",
                        lineHeight: 1.15,
                        textAlign: "left",
                      }}
                    >
                      <span
                        style={{
                          display: "block",
                          fontSize: "13px",
                          fontWeight: 600,
                        }}
                      >
                        {STYLES[sid].label}
                      </span>
                      <span
                        style={{
                          fontSize: "11px",
                          color: isActive
                            ? "rgba(255,255,255,0.75)"
                            : t.subtext,
                        }}
                      >
                        {STYLES[sid].sub}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Aspect ratio */}
            <div>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  marginBottom: "10px",
                }}
              >
                Aspect Ratio
              </div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {RATIOS.map((r) => {
                  const Icon = ICONS[r.icon];
                  const isActive = ratio === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => setRatio(r.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: `1px solid ${isActive ? t.indigo : t.border}`,
                        background: isActive ? t.indigoSoft : t.panel,
                        color: t.text,
                        cursor: "pointer",
                      }}
                    >
                      <span
                        style={{
                          display: "grid",
                          placeItems: "center",
                          width: "26px",
                          height: "26px",
                          borderRadius: "7px",
                          border: `1px solid ${isActive ? t.indigo : t.border}`,
                          color: isActive ? t.indigo : t.subtext,
                        }}
                      >
                        {Icon && <Icon size={15} />}
                      </span>
                      <span style={{ lineHeight: 1.1, textAlign: "left" }}>
                        <span
                          style={{
                            display: "block",
                            fontSize: "13px",
                            fontWeight: 600,
                          }}
                        >
                          {r.id}
                        </span>
                        <span style={{ fontSize: "11px", color: t.subtext }}>
                          {r.label}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <button
            onClick={generate}
            disabled={loading || !prompt.trim()}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "13px 22px",
              borderRadius: "10px",
              border: "none",
              background: loading || !prompt.trim() ? "#A5A0F0" : t.indigo,
              color: "#fff",
              fontSize: "14px",
              fontWeight: 600,
              cursor: loading || !prompt.trim() ? "default" : "pointer",
            }}
          >
            <Sparkles size={17} />
            {loading
              ? "Generating…"
              : refs.length
                ? "Generate from Reference"
                : "Generate Image"}
          </button>
        </div>

        {/* Template chips */}
        <div style={{ marginTop: "26px" }}>
          <div
            style={{ fontSize: "13px", fontWeight: 600, marginBottom: "12px" }}
          >
            Prompt Templates
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "12px",
            }}
          >
            {TEMPLATES.map((tpl) => {
              const Icon = ICONS[tpl.icon];
              const isActive = activeTemplate === tpl.id;
              return (
                <button
                  key={tpl.id}
                  onClick={() => applyTemplate(tpl)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "14px",
                    borderRadius: "12px",
                    border: `1px solid ${isActive ? t.indigo : t.border}`,
                    background: t.panel,
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      display: "grid",
                      placeItems: "center",
                      width: "34px",
                      height: "34px",
                      borderRadius: "8px",
                      background: t.chip,
                      color: t.indigo,
                      flexShrink: 0,
                    }}
                  >
                    {Icon && <Icon size={17} />}
                  </span>
                  <span style={{ lineHeight: 1.2 }}>
                    <span
                      style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: 600,
                      }}
                    >
                      {tpl.label}
                    </span>
                    <span style={{ fontSize: "11px", color: t.subtext }}>
                      {tpl.sub}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {error && (
          <div
            style={{
              marginTop: "20px",
              padding: "12px 16px",
              borderRadius: "10px",
              background: dark ? "#3A1D1D" : "#FEF2F2",
              border: `1px solid ${dark ? "#5B2A2A" : "#FECACA"}`,
              color: dark ? "#FCA5A5" : "#B91C1C",
              fontSize: "13px",
              wordBreak: "break-word",
            }}
          >
            {error}
          </div>
        )}

        {/* Generations */}
        <div style={{ marginTop: "30px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "14px",
            }}
          >
            <div style={{ fontSize: "16px", fontWeight: 700 }}>
              Your Generations
            </div>
            {gens.length > 0 && (
              <button
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: t.indigo,
                  background: "transparent",
                  border: `1px solid ${t.border}`,
                  borderRadius: "8px",
                  padding: "6px 14px",
                  cursor: "pointer",
                }}
              >
                View all
              </button>
            )}
          </div>

          {gens.length === 0 ? (
            <div
              style={{
                padding: "48px 24px",
                borderRadius: "14px",
                border: `1px dashed ${t.border}`,
                textAlign: "center",
                color: t.subtext,
                fontSize: "14px",
              }}
            >
              Nothing generated yet. Write a prompt or pick a template to start.
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
                gap: "16px",
              }}
            >
              {gens.map((g, i) => (
                <div
                  key={i}
                  style={{
                    position: "relative",
                    borderRadius: "12px",
                    overflow: "hidden",
                    border: `1px solid ${t.border}`,
                    // Driven off the shared map — adding a ratio can no longer
                    // desync this from the generation size.
                    aspectRatio: RATIO_TO_CSS[g.ratio] ?? "1 / 1",
                    background: t.card,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={g.url}
                    alt={g.prompt.slice(0, 60)}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  {g.usedRefs && (
                    <span
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        padding: "4px 8px",
                        borderRadius: "6px",
                        background: "rgba(31,36,48,0.78)",
                        color: "#fff",
                        fontSize: "11px",
                        fontWeight: 600,
                      }}
                    >
                      Ref
                    </span>
                  )}
                  <button
                    onClick={() => downloadImage(g.url, i)}
                    style={{
                      position: "absolute",
                      right: "10px",
                      bottom: "10px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "7px 12px",
                      borderRadius: "8px",
                      border: "none",
                      background: "rgba(255,255,255,0.92)",
                      color: "#1F2430",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    <Download size={14} />
                    Download
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function NavItem({
  icon,
  label,
  active,
  t,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  t: { indigo: string; indigoSoft: string; text: string };
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px",
        borderRadius: "10px",
        background: active ? t.indigoSoft : "transparent",
        color: active ? t.indigo : t.text,
        fontSize: "14px",
        fontWeight: 600,
        cursor: "pointer",
        marginBottom: "2px",
      }}
    >
      {icon}
      {label}
    </div>
  );
}
