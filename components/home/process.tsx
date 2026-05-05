import React from "react";
import "@css/home/process.css";
import Link from "next/link";

function Process() {
  return (
    <section
      id="process"
      className="wn-process-v2"
      aria-labelledby="wn-process-v2-title"
    >
      <div className="wn-process-v2__bg-grid"></div>
      <div className="wn-process-v2__glow wn-process-v2__glow--one"></div>
      <div className="wn-process-v2__glow wn-process-v2__glow--two"></div>

      <div className="wn-container">
        <div className="wn-process-v2__header">
          <div className="wn-section-tag">How We Work</div>
          <h2 id="wn-process-v2-title" className="wn-process-v2__title">
            We build systems that
            <span>do real work</span>
          </h2>
          <p className="wn-process-v2__text">
            Webtech Ninjas is not built around vague campaign language or
            surface-level polish. We design, structure, and implement digital
            systems that support trust, lead flow, automation, and long-term
            growth.
          </p>
        </div>

        <div className="wn-process-v2__hero-row">
          <div className="wn-process-v2__intro-card">
            <div className="wn-process-v2__intro-tag">
              Systems-First Approach
            </div>
            <h3 className="wn-process-v2__intro-title">
              Not your local marketing agency. Not another pretty mockup.
            </h3>
            <p className="wn-process-v2__intro-text">
              Our work starts with what the business actually needs to do
              better: communicate clearly, convert cleanly, reduce friction, and
              build a stronger digital foundation.
            </p>

            <div className="wn-process-v2__intro-points">
              <div className="wn-process-v2__intro-point">
                <strong>Clarity before decoration</strong>
                <span>Structure comes first so design has a job to do.</span>
              </div>
              <div className="wn-process-v2__intro-point">
                <strong>Systems before slogans</strong>
                <span>
                  We build what supports operations, trust, and growth.
                </span>
              </div>
              <div className="wn-process-v2__intro-point">
                <strong>Execution before theater</strong>
                <span>
                  Ideas matter, but implementation is where business changes.
                </span>
              </div>
            </div>
          </div>

          <div className="wn-process-v2__system-card">
            <div className="wn-process-v2__system-top">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="wn-process-v2__system-body">
              <div className="wn-process-v2__system-label">
                Workflow Snapshot
              </div>

              <div className="wn-process-v2__workflow">
                <div className="wn-process-v2__workflow-node">
                  <strong>Discover</strong>
                  <span>Business goals</span>
                </div>
                <i></i>
                <div className="wn-process-v2__workflow-node">
                  <strong>Design</strong>
                  <span>Structure + UX</span>
                </div>
                <i></i>
                <div className="wn-process-v2__workflow-node">
                  <strong>Build</strong>
                  <span>Site + systems</span>
                </div>
                <i></i>
                <div className="wn-process-v2__workflow-node">
                  <strong>Refine</strong>
                  <span>Improve and iterate</span>
                </div>
              </div>

              <div className="wn-process-v2__system-metrics">
                <div className="wn-process-v2__metric">
                  <span className="wn-process-v2__metric-label">Focus</span>
                  <strong>Trust + Performance</strong>
                </div>
                <div className="wn-process-v2__metric">
                  <span className="wn-process-v2__metric-label">Outcome</span>
                  <strong>Cleaner Digital Flow</strong>
                </div>
              </div>
            </div>

            <div className="wn-process-v2__floating-proof">
              <span>Built to convert</span>
              <span>Workflow-aware</span>
              <span>Business-first</span>
            </div>
          </div>
        </div>

        <div className="wn-process-v2__timeline">
          <div className="wn-process-v2__timeline-line"></div>

          <article className="wn-process-v2__step">
            <div className="wn-process-v2__step-marker">01</div>
            <div className="wn-process-v2__step-card">
              <div className="wn-process-v2__step-meta">
                <span className="wn-process-v2__pill wn-process-v2__pill--primary">
                  Discovery
                </span>
                <span className="wn-process-v2__pill">Business Clarity</span>
              </div>
              <h3 className="wn-process-v2__step-title">
                Clarify what the business actually needs
              </h3>
              <p className="wn-process-v2__step-text">
                Before anything gets styled or built, we identify what has to
                improve: trust, visibility, lead flow, onboarding, performance,
                or internal efficiency.
              </p>
              <ul className="wn-process-v2__step-list">
                <li>Define business goals</li>
                <li>Identify friction points</li>
                <li>Map what success should look like</li>
              </ul>
            </div>
          </article>

          <article className="wn-process-v2__step wn-process-v2__step--offset">
            <div className="wn-process-v2__step-marker">02</div>
            <div className="wn-process-v2__step-card">
              <div className="wn-process-v2__step-meta">
                <span className="wn-process-v2__pill wn-process-v2__pill--primary">
                  Design
                </span>
                <span className="wn-process-v2__pill">Structure + UX</span>
              </div>
              <h3 className="wn-process-v2__step-title">
                Design the system with intention
              </h3>
              <p className="wn-process-v2__step-text">
                We don’t decorate first and hope it works later. We design the
                information flow, CTA hierarchy, user journey, and content
                structure so every section has a purpose.
              </p>
              <ul className="wn-process-v2__step-list">
                <li>Conversion-focused layout planning</li>
                <li>Clear hierarchy and navigation</li>
                <li>Action paths aligned to user intent</li>
              </ul>
            </div>
          </article>

          <article className="wn-process-v2__step">
            <div className="wn-process-v2__step-marker">03</div>
            <div className="wn-process-v2__step-card">
              <div className="wn-process-v2__step-meta">
                <span className="wn-process-v2__pill wn-process-v2__pill--primary">
                  Build
                </span>
                <span className="wn-process-v2__pill">Execution + Systems</span>
              </div>
              <h3 className="wn-process-v2__step-title">
                Build what moves the business forward
              </h3>
              <p className="wn-process-v2__step-text">
                This is where we separate from the usual agency script. We don’t
                stop at strategy decks. We build the site, connect the tools,
                shape the workflows, and make the machine work.
              </p>
              <ul className="wn-process-v2__step-list">
                <li>Modern website development</li>
                <li>Lead capture and automation integration</li>
                <li>Performance-minded implementation</li>
              </ul>
            </div>
          </article>

          <article className="wn-process-v2__step wn-process-v2__step--offset">
            <div className="wn-process-v2__step-marker">04</div>
            <div className="wn-process-v2__step-card">
              <div className="wn-process-v2__step-meta">
                <span className="wn-process-v2__pill wn-process-v2__pill--primary">
                  Refine
                </span>
                <span className="wn-process-v2__pill">Improve + Iterate</span>
              </div>
              <h3 className="wn-process-v2__step-title">
                Refine, measure, and sharpen over time
              </h3>
              <p className="wn-process-v2__step-text">
                Launch is not the finish line. We look at where users drop off,
                what feels slow, and what can be improved so the system gets
                sharper as the business grows.
              </p>
              <ul className="wn-process-v2__step-list">
                <li>Speed and UX review</li>
                <li>SEO and conversion improvements</li>
                <li>Iteration based on real use</li>
              </ul>
            </div>
          </article>
        </div>

        <div className="wn-process-v2__compare">
          <div className="wn-process-v2__compare-intro">
            <div className="wn-process-v2__compare-tag">
              What Makes Us Different
            </div>
            <h3 className="wn-process-v2__compare-title">
              The difference between surface marketing and real digital
              infrastructure
            </h3>
            <p className="wn-process-v2__compare-text">
              Most agencies stop at campaigns, reports, and presentation.
              Webtech Ninjas focuses on the underlying system: what gets built,
              how it functions, and whether it helps the business move cleanly.
            </p>
          </div>

          <div className="wn-process-v2__compare-grid">
            <div className="wn-process-v2__compare-card">
              <div className="wn-process-v2__compare-label">
                Typical Agency Pattern
              </div>
              <ul className="wn-process-v2__compare-list wn-process-v2__compare-list--muted">
                <li>Polish without deeper system thinking</li>
                <li>Campaign language without stronger structure</li>
                <li>Vanity metrics over business operations</li>
                <li>Hand-off without technical follow-through</li>
              </ul>
            </div>

            <div className="wn-process-v2__compare-card wn-process-v2__compare-card--highlight">
              <div className="wn-process-v2__compare-label">
                The Webtech Ninjas Way
              </div>
              <ul className="wn-process-v2__compare-list">
                <li>Business-first websites and system design</li>
                <li>Clear conversion paths and cleaner workflows</li>
                <li>Automation that reduces manual friction</li>
                <li>Execution tied to real business outcomes</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="wn-process-v2__footer">
          <p>
            The goal is simple: build a digital presence that looks credible,
            works intelligently, and supports growth without the usual chaos.
          </p>
          <Link href="#contact" className="wn-btn wn-btn--primary">
            Let’s Build the Right System
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Process;
