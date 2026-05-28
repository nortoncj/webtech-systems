"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const colors = {
  charcoal: "#1F2430",
  offWhite: "#F8F7F4",
  white: "#FFFFFF",
  indigo: "#4F46E5",
  softPurple: "#8B5CF6",
  lavender: "#F3F0FF",
};

// ---------- STYLES ----------
const styles = {
  formContainer: {
    background: colors.white,
    padding: "48px",
    maxWidth: "600px",
    margin: "0 auto",
    borderRadius: "12px",
  },

  label: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 500,
    fontSize: "14px",
    color: colors.charcoal,
    marginBottom: "8px",
    display: "block",
  },

  input: {
    background: colors.white,
    border: "1px solid rgba(31, 36, 48, 0.15)",
    borderRadius: "8px",
    padding: "14px 16px",
    fontFamily: "Inter, sans-serif",
    fontSize: "16px",
    color: colors.charcoal,
    width: "100%",
    marginBottom: "20px",
  },

  inputFocus: {
    borderColor: colors.indigo,
    outline: "none",
    boxShadow: "0 0 0 3px rgba(79, 70, 229, 0.1)",
  },

  button: {
    background: colors.indigo,
    color: colors.white,
    fontFamily: "Inter, sans-serif",
    fontWeight: 600,
    fontSize: "16px",
    padding: "16px 32px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    width: "100%",
    transition: "background 0.2s ease",
  },

  buttonHover: {
    background: "#4338CA",
  },
};

// ---------- COMPONENT ----------

const N8N_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_N8N_LEAD_URL ?? "http://localhost:5678/webhook/intake";

export default function IntakeFormSimple() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    const formData = Object.fromEntries(new FormData(e.target));

    try {
      await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setSubmitted(true);

      setTimeout(() => {
        router.push("/case-studies");
      }, 5000);
    } catch (error) {
      console.error("Form submit failed:", error);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div
        style={{
          ...styles.formContainer,
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "32px",
            marginBottom: "16px",
            color: colors.charcoal,
            fontWeight: 700,
          }}
        >
          Got it.
        </h2>

        <p
          style={{
            color: colors.charcoal,
            lineHeight: 1.7,
            fontSize: "16px",
            marginBottom: "16px",
          }}
        >
          I&apos;ll review your info and get back to you within 24 hours
          <br />
          (usually faster).
        </p>

        <p
          style={{
            color: "rgba(31,36,48,0.7)",
            lineHeight: 1.7,
            fontSize: "15px",
          }}
        >
          Keep an eye on your inbox and check spam just in case.
        </p>

        <p
          style={{
            marginTop: "32px",
            fontWeight: 600,
            color: colors.charcoal,
          }}
        >
          - Chris
        </p>

        <p
          style={{
            marginTop: "24px",
            fontSize: "14px",
            opacity: 0.6,
          }}
        >
          Redirecting...
        </p>
      </div>
    );
  }

  return (
    <form
     
      style={styles.formContainer}
      onSubmit={handleSubmit}
    >
      <label style={styles.label}>Name</label>
      <input style={styles.input} name="name" required />
      <div className=" flex gap-4">
        <div className="">
          <label style={styles.label}>Email</label>
          <input style={styles.input} name="email" type="email" required />
        </div>
        <div className="">
          <label style={styles.label}>Phone</label>
          <input style={styles.input} name="phone" type="tel" />
        </div>
      </div>

      <label style={styles.label}>Business Name</label>
      <input
        style={styles.input}
        placeholder="If you have one"
        name="businessName"
      />

      <div className="flex gap-4">
        <div className="">
          <label style={styles.label}>What do you need help with?</label>
          <select name="needHelp" required style={styles.input}>
            <option value="">Select one</option>
            <option value="new-website">New website</option>
            <option value="fix-existing">Fix existing site</option>
            <option value="seo-leads">SEO & lead generation</option>
            <option value="automation">Automation setup</option>
            <option value="not-sure">Not sure yet</option>
          </select>
        </div>
        <div className="">
          <label style={styles.label}>Budget</label>
          <select name="budget" required style={styles.input}>
            <option value="">Select one</option>
            <option value="< $1K"> Less than $1K</option>
            <option value="$1K - 2K">$1K - $2K </option>
            <option value="$2K - 3K">$2K - $3K </option>
            <option value="$3K - 4K">$3K - $4K </option>
            <option value="$4K - 5K">$4K - $5K </option>
            <option value="> $5K">more than $5K</option>
          </select>
        </div>
      </div>
      <label style={styles.label}>Notes</label>
      <textarea
        style={styles.input}
        placeholder="Anything I should know?"
        name="notes"
        rows={4}
      />

      <label style={styles.label}>How did you hear about us?</label>
      <select name="source" required style={styles.input}>
        <option value="">Select one</option>
        <option value="facebook">Facebook</option>
        <option value="email">Email</option>
        <option value="referral">Referral</option>
        <option value="google">Google</option>
        <option value="other">Other</option>
      </select>

      <button
        onMouseOver={(e) =>
          (e.currentTarget.style.background = styles.buttonHover.background)
        }
        onMouseOut={(e) =>
          (e.currentTarget.style.background = styles.button.background)
        }
        style={styles.button}
        type="submit"
        disabled={loading}
      >
        {loading ? "Sending..." : "Let's Talk"}
      </button>
    </form>
  );
}
