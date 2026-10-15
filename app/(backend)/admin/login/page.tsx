// app/(backend)/admin/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const signIn = async () => {
    if (!email || !password) {
      setError("Please fill in your email and password.");
      return;
    }

    setLoading(true);
    setError("");

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  const inputBase:any = {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 10,
    padding: "11px 14px",
    fontSize: 14,
    color: "#F8F7F4",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "'Inter', sans-serif",
    transition: "border-color 0.2s",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#1F2430",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Soft indigo ambient glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(79,70,229,0.12) 0%, transparent 65%)",
          pointerEvents: "none",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Card */}
      <div
        style={{
          background: "#252B3B",
          border: "1px solid rgba(79,70,229,0.18)",
          borderRadius: 14,
          padding: "40px 36px 32px",
          width: "100%",
          maxWidth: 380,
          position: "relative",
          zIndex: 1,
          boxShadow: "0 24px 48px rgba(0,0,0,0.4)",
        }}
      >
        {/* Brand mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 9,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              background: "#4F46E5",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 2L13 5V11L8 14L3 11V5L8 2Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <circle cx="8" cy="8" r="2" fill="white" />
            </svg>
          </div>
          <span
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 15,
              fontWeight: 700,
              color: "#F8F7F4",
              letterSpacing: "-0.01em",
            }}
          >
            Webtech Ninjas
          </span>
        </div>

        {/* Heading */}
        <h1
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: 22,
            fontWeight: 700,
            color: "#F8F7F4",
            margin: "0 0 4px",
            letterSpacing: "-0.02em",
          }}
        >
          Sign in
        </h1>
        <p
          style={{
            fontSize: 14,
            color: "rgba(248,247,244,0.45)",
            margin: "0 0 28px",
          }}
        >
          Admin access only
        </p>

        {/* Email */}
        <div style={{ marginBottom: 12 }}>
          <label
            style={{
              display: "block",
              fontSize: 13,
              fontWeight: 500,
              color: "rgba(248,247,244,0.6)",
              marginBottom: 6,
            }}
          >
            Email
          </label>
          <input
            type="email"
            value={email}
            placeholder="you@example.com"
            autoComplete="username"
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && signIn()}
            style={inputBase}
            onFocus={(e) =>
              (e.target.style.borderColor = "rgba(79,70,229,0.7)")
            }
            onBlur={(e) =>
              (e.target.style.borderColor = "rgba(255,255,255,0.08)")
            }
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: 6 }}>
          <label
            style={{
              display: "block",
              fontSize: 13,
              fontWeight: 500,
              color: "rgba(248,247,244,0.6)",
              marginBottom: 6,
            }}
          >
            Password
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="••••••••"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && signIn()}
              style={{ ...inputBase, paddingRight: 46 }}
              onFocus={(e) =>
                (e.target.style.borderColor = "rgba(79,70,229,0.7)")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "rgba(255,255,255,0.08)")
              }
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(248,247,244,0.35)",
                padding: 0,
                fontSize: 12,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                letterSpacing: "0.02em",
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Forgot */}
        <div style={{ textAlign: "right", marginBottom: 22 }}>
          <a
            href="#"
            style={{
              fontSize: 13,
              color: "#8B5CF6",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Forgot password?
          </a>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.2)",
              borderRadius: 8,
              padding: "10px 14px",
              fontSize: 13,
              color: "#FCA5A5",
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 16 }}>⚠</span>
            {error}
          </div>
        )}

        {/* CTA */}
        <button
          onClick={signIn}
          disabled={loading}
          style={{
            width: "100%",
            background: loading ? "rgba(79,70,229,0.55)" : "#4F46E5",
            border: "none",
            borderRadius: 10,
            padding: "12px",
            fontSize: 14,
            fontWeight: 600,
            color: "#fff",
            cursor: loading ? "not-allowed" : "pointer",
            fontFamily: "'Manrope', sans-serif",
            letterSpacing: "-0.01em",
            transition: "background 0.2s, transform 0.1s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
          onMouseEnter={(e) => {
            if (!loading) e.currentTarget.style.background = "#4338CA";
          }}
          onMouseLeave={(e) => {
            if (!loading) e.currentTarget.style.background = "#4F46E5";
          }}
          onMouseDown={(e) => {
            if (!loading) e.currentTarget.style.transform = "scale(0.98)";
          }}
          onMouseUp={(e) => {
            if (!loading) e.currentTarget.style.transform = "scale(1)";
          }}
        >
          {loading ? (
            <>
              <span
                style={{
                  width: 14,
                  height: 14,
                  border: "2px solid rgba(255,255,255,0.25)",
                  borderTopColor: "#fff",
                  borderRadius: "50%",
                  display: "inline-block",
                  animation: "wtn-spin 0.7s linear infinite",
                }}
              />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </button>

        {/* Footer */}
        <p
          style={{
            textAlign: "center",
            fontSize: 12,
            color: "rgba(248,247,244,0.2)",
            marginTop: 24,
            marginBottom: 0,
          }}
        >
          Webtech Ninjas CRM · Admin only
        </p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Manrope:wght@600;700&display=swap');
        @keyframes wtn-spin { to { transform: rotate(360deg); } }
        input::placeholder { color: rgba(248,247,244,0.2) !important; }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 1000px #252B3B inset !important;
          -webkit-text-fill-color: #F8F7F4 !important;
        }
      `}</style>
    </div>
  );
}
