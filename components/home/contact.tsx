import React from "react";
import "@css/home/cta.css";
import Link from "next/link";

function Contact() {
  return (
    <section
      id="contact"
      className="wn-cta-v2"
      aria-labelledby="wn-cta-v2-title"
    >
      <div className="wn-cta-v2__bg-grid"></div>
      <div className="wn-cta-v2__glow wn-cta-v2__glow--one"></div>
      <div className="wn-cta-v2__glow wn-cta-v2__glow--two"></div>

      <div className="wn-container">
        <div className="wn-cta-v2__wrap">
          <div className="wn-cta-v2__content">
            <div className="wn-section-tag">Let’s Build</div>

            <h2 id="wn-cta-v2-title" className="wn-cta-v2__title">
              Ready for a digital system that
              <span>actually supports growth</span>
            </h2>

            <p className="wn-cta-v2__text">
              If your website feels outdated, your lead flow feels inconsistent,
              or your operations still rely on too much manual cleanup, Webtech
              Ninjas is built for exactly that kind of work.
            </p>

            <div className="wn-cta-v2__actions">
              <Link
                href="https://calendar.app.google/X8GheJdXzBvZ3Spu9"
                className="wn-btn wn-btn--primary"
              >
                Book a Strategy Call
              </Link>
              <Link href="#services" className="wn-btn wn-btn--secondary">
                Review Services
              </Link>
            </div>

            <div className="wn-cta-v2__microproof">
              <span>Clear process</span>
              <span className="wn-dot"></span>
              <span>Clean execution</span>
              <span className="wn-dot"></span>
              <span>Built for real business growth</span>
            </div>

            <div className="wn-cta-v2__steps">
              <div className="wn-cta-v2__step">
                <div className="wn-cta-v2__step-number">01</div>
                <div className="wn-cta-v2__step-copy">
                  <strong>Start the conversation</strong>
                  <span>
                    Tell us what feels messy, outdated, or underperforming.
                  </span>
                </div>
              </div>

              <div className="wn-cta-v2__step">
                <div className="wn-cta-v2__step-number">02</div>
                <div className="wn-cta-v2__step-copy">
                  <strong>Clarify the system</strong>
                  <span>
                    We identify where structure, trust, and workflow need to
                    improve.
                  </span>
                </div>
              </div>

              <div className="wn-cta-v2__step">
                <div className="wn-cta-v2__step-number">03</div>
                <div className="wn-cta-v2__step-copy">
                  <strong>Build the right solution</strong>
                  <span>
                    Website, automation, lead flow, or the full machine.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="wn-cta-v2__panel">
            <div className="wn-cta-v2__card">
              <div className="wn-cta-v2__card-top">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="wn-cta-v2__card-body">
                <div className="wn-cta-v2__eyebrow">Best Fit</div>

                <h3 className="wn-cta-v2__card-title">
                  Businesses ready to stop patching things together
                </h3>

                <p className="wn-cta-v2__card-text">
                  This is for businesses that need more than cosmetic updates.
                  It is for owners who want a cleaner digital presence, smarter
                  workflows, and systems that feel built with intention.
                </p>

                <div className="wn-cta-v2__fit-list">
                  <div className="wn-cta-v2__fit-item">
                    <strong>Modern Websites</strong>
                    <span>Clear, credible, performance-minded builds</span>
                  </div>

                  <div className="wn-cta-v2__fit-item">
                    <strong>Automation Systems</strong>
                    <span>Less manual friction and cleaner follow-up</span>
                  </div>

                  <div className="wn-cta-v2__fit-item">
                    <strong>Lead Capture Infrastructure</strong>
                    <span>More intentional paths from visitor to inquiry</span>
                  </div>
                </div>

                <div className="wn-cta-v2__chips">
                  <span className="wn-chip">Trust-First</span>
                  <span className="wn-chip">Systems-Focused</span>
                  <span className="wn-chip">Results-Driven</span>
                </div>

                <a
                  href="https://calendar.app.google/X8GheJdXzBvZ3Spu9"
                  className="wn-cta-v2__link"
                >
                  Start the conversation
                </a>
              </div>
            </div>

            <div className="wn-cta-v2__floating">
              <div className="wn-cta-v2__floating-label">
                What you’re really building
              </div>
              <div className="wn-cta-v2__floating-value">
                A cleaner digital operating system
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
