import React from "react";
import "@css/home/cases.css";
import Image from "next/image";
import mcx from "@img/thumbnails/mcx.jpg";
import vfw from "@img/thumbnails/VFW.png";
import butcher from "@img/thumbnails/butcher.jpg";
import Link from "next/link";

function CaseStudy() {
  return (
    <section
      id="case-studies"
      className="wn-case-v2"
      aria-labelledby="wn-case-v2-title"
    >
      <div className="wn-container">
        <div className="wn-case-v2__header">
          <div className="wn-section-tag">Case Studies</div>
          <h2 id="wn-case-v2-title" className="wn-case-v2__title">
            Proof that looks good,
            <span>works better</span>
          </h2>
          <p className="wn-case-v2__text">
            We don’t just redesign pages. We rebuild trust, clarify the user
            journey, and create cleaner systems that support visibility, lead
            flow, and better digital performance.
          </p>
        </div>

        <div className="wn-case-v2__stack">
          <article className="wn-case-v2__featured">
            <div className="wn-case-v2__visual">
              <div className="wn-case-v2__browser">
                <div className="wn-case-v2__browser-top">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div className="wn-case-v2__browser-body">
                  <div className="wn-case-v2__browser-url">
                    client-project.com
                  </div>

                  <div className="wn-case-v2__screen">
                    <Image
                      src={mcx}
                      alt="Featured website case study preview"
                    />
                  </div>
                </div>
              </div>

              <div className="wn-case-v2__floating wn-case-v2__floating--metric">
                <div className="wn-case-v2__floating-label">Outcome Focus</div>
                <div className="wn-case-v2__floating-value">
                  Clearer Conversion Flow
                </div>
                <div className="wn-case-v2__progress">
                  <span></span>
                </div>
              </div>

              <div className="wn-case-v2__floating wn-case-v2__floating--tag">
                <span>Trust-First Layout</span>
                <span>Cleaner UX</span>
                <span>Better Lead Path</span>
              </div>
            </div>

            <div className="wn-case-v2__content">
              <div className="wn-case-v2__meta">
                <span className="wn-case-v2__pill wn-case-v2__pill--primary">
                  Featured Project
                </span>
                <span className="wn-case-v2__pill">Website + Lead Flow</span>
              </div>

              <h3 className="wn-case-v2__case-title">
                A dated service-business website rebuilt into a cleaner, more
                credible growth system
              </h3>

              <p className="wn-case-v2__case-text">
                The original website looked tired, lacked hierarchy, and made it
                too hard for visitors to understand the offer or take action.
                The rebuild focused on clarity, trust, structure, and a more
                intentional path from interest to inquiry.
              </p>

              <div className="wn-case-v2__detail-grid">
                <div className="wn-case-v2__detail">
                  <span className="wn-case-v2__label">Problem</span>
                  <p>
                    Weak messaging, poor section flow, unclear calls to action,
                    and an experience that created friction instead of
                    confidence.
                  </p>
                </div>

                <div className="wn-case-v2__detail">
                  <span className="wn-case-v2__label">Solution</span>
                  <p>
                    Reworked the information hierarchy, tightened the visual
                    structure, improved lead capture placement, and rebuilt the
                    front-end experience around trust.
                  </p>
                </div>
              </div>

              <div className="wn-case-v2__outcomes">
                <span className="wn-case-v2__label">Outcome</span>
                <div className="wn-case-v2__chips">
                  <span className="wn-chip">Clearer positioning</span>
                  <span className="wn-chip">Stronger user flow</span>
                  <span className="wn-chip">More credible presentation</span>
                  <span className="wn-chip">Better lead intent support</span>
                </div>
              </div>

              <Link href="#contact" className="wn-case-v2__link">
                Talk About a Similar Build
              </Link>
            </div>
          </article>

          <div className="wn-case-v2__grid">
            <article className="wn-case-v2__card">
              <div className="wn-case-v2__card-visual">
                <div className="wn-case-v2__mini-browser">
                  <div className="wn-case-v2__mini-top">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="wn-case-v2__mini-screen">
                    <Image
                      src={vfw}
                      alt="Automation workflow case stufy preview"
                    />
                  </div>
                </div>
              </div>

              <div className="wn-case-v2__card-body">
                <div className="wn-case-v2__meta">
                  <span className="wn-case-v2__pill wn-case-v2__pill--primary">
                    Automation
                  </span>
                  <span className="wn-case-v2__pill">Workflow + Intake</span>
                </div>

                <h3 className="wn-case-v2__card-title">
                  Manual onboarding replaced with a cleaner, more reliable
                  intake system
                </h3>

                <p className="wn-case-v2__card-text">
                  The business had inquiries coming in, but too much of the
                  follow-up depended on inboxes, memory, and repeated admin
                  work. The system needed structure behind the scenes.
                </p>

                <div className="wn-case-v2__detail">
                  <span className="wn-case-v2__label">System Built</span>
                  <p>
                    Intake logic, response routing, internal workflow structure,
                    and a more dependable post-inquiry experience.
                  </p>
                </div>

                <div className="wn-case-v2__chips">
                  <span className="wn-chip">Less manual friction</span>
                  <span className="wn-chip">Cleaner handoff</span>
                  <span className="wn-chip">More reliable process</span>
                </div>

                <Link href="#contact" className="wn-case-v2__link">
                  Explore Automation Setup
                </Link>
              </div>
            </article>

            <article className="wn-case-v2__card">
              <div className="wn-case-v2__card-visual">
                <div className="wn-case-v2__mini-browser">
                  <div className="wn-case-v2__mini-top">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="wn-case-v2__mini-screen">
                    <Image
                      src={butcher}
                      alt="Performance optimization case study preview"
                    />
                  </div>
                </div>
              </div>

              <div className="wn-case-v2__card-body">
                <div className="wn-case-v2__meta">
                  <span className="wn-case-v2__pill wn-case-v2__pill--primary">
                    Performance
                  </span>
                  <span className="wn-case-v2__pill">Speed + Structure</span>
                </div>

                <h3 className="wn-case-v2__card-title">
                  A cluttered, underperforming site refined into a cleaner,
                  faster experience
                </h3>

                <p className="wn-case-v2__card-text">
                  The original build felt heavy and visually noisy. The goal was
                  to improve usability, reduce friction, and create a stronger
                  sense of speed and professionalism.
                </p>

                <div className="wn-case-v2__detail">
                  <span className="wn-case-v2__label">Approach</span>
                  <p>
                    Simplified layout decisions, reduced unnecessary front-end
                    weight, improved content flow, and tightened the overall
                    user experience.
                  </p>
                </div>

                <div className="wn-case-v2__chips">
                  <span className="wn-chip">Cleaner experience</span>
                  <span className="wn-chip">Better usability</span>
                  <span className="wn-chip">Stronger trust signal</span>
                </div>

                <Link href="#contact" className="wn-case-v2__link">
                  Improve Website Performance
                </Link>
              </div>
            </article>
          </div>
        </div>

        <div className="wn-case-v2__footer">
          <div className="wn-case-v2__footer-copy">
            <h3>Every strong build solves more than one problem</h3>
            <p>
              The best digital systems don’t just look sharper. They guide users
              better, support the business better, and create less friction at
              every stage.
            </p>
          </div>

          <div className="wn-case-v2__footer-actions">
            <Link
              href="/contact"
              className="wn-btn wn-btn--primary"
            >
              Book a Strategy Call
            </Link>
            <Link href="#services" className="wn-btn wn-btn--secondary">
              View Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CaseStudy;
