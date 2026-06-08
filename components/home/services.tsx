import React from "react";
import "@css/home/services.css";
import  service from "@img/thumbnails/DataDoor.png"
import Image from "next/image";
import Link from "next/link";

function Services() {
  return (
    <section
      id="services"
      className="wn-services-v2"
      aria-labelledby="wn-services-v2-title"
    >
      <div className="wn-services-v2__bg-grid"></div>
      <div className="wn-services-v2__glow wn-services-v2__glow--one"></div>
      <div className="wn-services-v2__glow wn-services-v2__glow--two"></div>

      <div className="wn-container">
        <div className="wn-services-v2__header">
          <div className="wn-section-tag">Services</div>
          <h2 id="wn-services-v2-title" className="wn-services-v2__title">
            Services built like
            <span>real digital systems</span>
          </h2>
          <p className="wn-services-v2__text">
            Webtech Ninjas helps small businesses build clean digital
            infrastructure from modern websites to automation and lead systems.
            We design to support trust, performance, and growth without the
            usual clutter.
          </p>
        </div>

        <div className="wn-services-v2__featured">
          <div className="wn-services-v2__featured-content">
            <div className="wn-services-v2__meta">
              <span className="wn-services-v2__pill wn-services-v2__pill--primary">
                Featured Offer
              </span>
              <span className="wn-services-v2__pill">Growth System</span>
            </div>

            <h3 className="wn-services-v2__featured-title">
              A website and lead system built to support visibility, trust, and
              momentum
            </h3>

            <p className="wn-services-v2__featured-text">
              This is more than a website build. It is a structured digital
              system designed to help your business show up professionally,
              guide users clearly, and turn interest into real opportunities.
            </p>

            <div className="wn-services-v2__featured-points">
              <div className="wn-services-v2__point">
                <strong>Conversion-aware structure</strong>
                <span>Pages planned around trust, flow, and action.</span>
              </div>

              <div className="wn-services-v2__point">
                <strong>SEO-ready foundation</strong>
                <span>Clean architecture built to support visibility.</span>
              </div>

              <div className="wn-services-v2__point">
                <strong>Lead capture support</strong>
                <span>
                  Forms, intake paths, and response logic with purpose.
                </span>
              </div>
            </div>

            <div className="wn-services-v2__chips">
              <span className="wn-chip">Website + Strategy</span>
              <span className="wn-chip">Lead Flow</span>
              <span className="wn-chip">Performance-Minded</span>
              <span className="wn-chip">Built to Scale</span>
            </div>

            <Link href="#contact" className="wn-services-v2__link">
              Build a Growth System
            </Link>
          </div>

          <div className="wn-services-v2__featured-visual">
            <div className="wn-services-v2__browser">
              <div className="wn-services-v2__browser-top">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="wn-services-v2__browser-body">
                <div className="wn-services-v2__browser-url">
                  growth-system-preview
                </div>

                <div className="wn-services-v2__screen">
                  <Image src={service} alt="Growth system website preview" />
                  
                </div>
              </div>
            </div>

            <div className="wn-services-v2__floating wn-services-v2__floating--metric">
              <div className="wn-services-v2__floating-label">System Focus</div>
              <div className="wn-services-v2__floating-value">
                Lead Flow Optimized
              </div>
              <div className="wn-services-v2__progress">
                <span></span>
              </div>
            </div>

            <div className="wn-services-v2__floating wn-services-v2__floating--tags">
              <span>Trust-First</span>
              <span>SEO-Ready</span>
              <span>Built to Convert</span>
            </div>
          </div>
        </div>

        <div className="wn-services-v2__grid">
          <article className="wn-services-v2__card">
            <div className="wn-services-v2__card-icon">01</div>

            <div className="wn-services-v2__card-meta">
              <span className="wn-services-v2__pill wn-services-v2__pill--primary">
                Starter Site
              </span>
              <span className="wn-services-v2__pill">Website Build</span>
            </div>

            <h3 className="wn-services-v2__card-title">
              A clean, modern website that helps your business look credible
              fast
            </h3>

            <p className="wn-services-v2__card-text">
              Perfect for businesses that need a polished online presence with
              clear messaging, strong visual hierarchy, and a sharper first
              impression.
            </p>

            <ul className="wn-services-v2__list">
              <li>Custom homepage and core page layout</li>
              <li>Mobile-friendly responsive build</li>
              <li>Clear calls to action and trust structure</li>
              <li>Fast, clean front-end implementation</li>
            </ul>

            <div className="wn-services-v2__chips">
              <span className="wn-chip">Modern</span>
              <span className="wn-chip">Credible</span>
              <span className="wn-chip">Responsive</span>
            </div>

            <Link href="#contact" className="wn-services-v2__link">
              Start with a Starter Site
            </Link>
          </article>

          <article className="wn-services-v2__card wn-services-v2__card--tinted">
            <div className="wn-services-v2__card-icon">02</div>

            <div className="wn-services-v2__card-meta">
              <span className="wn-services-v2__pill wn-services-v2__pill--primary">
                Automation Setup
              </span>
              <span className="wn-services-v2__pill">Workflow Build</span>
            </div>

            <h3 className="wn-services-v2__card-title">
              Smarter workflows that reduce busywork and clean up the handoff
            </h3>

            <p className="wn-services-v2__card-text">
              We connect the moving parts behind your business so forms,
              inquiries, and onboarding don’t disappear into inboxes and
              improvisation.
            </p>

            <ul className="wn-services-v2__list">
              <li>Form and CRM workflow setup</li>
              <li>Notifications, routing, and automation logic</li>
              <li>Onboarding and follow-up structure</li>
              <li>System flow built around your process</li>
            </ul>

            <div className="wn-services-v2__chips">
              <span className="wn-chip">Automation</span>
              <span className="wn-chip">Efficiency</span>
              <span className="wn-chip">Less Friction</span>
            </div>

            <Link href="#contact" className="wn-services-v2__link">
              Set Up Automation
            </Link>
          </article>

          <article className="wn-services-v2__card">
            <div className="wn-services-v2__card-icon">03</div>

            <div className="wn-services-v2__card-meta">
              <span className="wn-services-v2__pill wn-services-v2__pill--primary">
                Lead Capture System
              </span>
              <span className="wn-services-v2__pill">Conversion Support</span>
            </div>

            <h3 className="wn-services-v2__card-title">
              Turn more attention into qualified inquiries and better next steps
            </h3>

            <p className="wn-services-v2__card-text">
              Built for businesses that need a more intentional path from
              visitor to booked call, submitted form, or onboarding pipeline.
            </p>

            <ul className="wn-services-v2__list">
              <li>Strategic intake form design</li>
              <li>Lead routing and response planning</li>
              <li>CTA placement and conversion support</li>
              <li>Optional AI onboarding pipeline planning</li>
            </ul>

            <div className="wn-services-v2__chips">
              <span className="wn-chip">Lead Flow</span>
              <span className="wn-chip">Clarity</span>
              <span className="wn-chip">Better Intent</span>
            </div>

            <Link href="#contact" className="wn-services-v2__link">
              Improve Lead Capture
            </Link>
          </article>
        </div>

        <div className="wn-services-v2__footer">
          <div className="wn-services-v2__footer-copy">
            <h3>The right service should solve more than one problem</h3>
            <p>
              Every offer is designed to improve how your business looks, how it
              functions, and how smoothly it moves from attention to action.
            </p>
          </div>

          <div className="wn-services-v2__footer-actions">
            <Link
              href="/contact"
              className="wn-btn wn-btn--primary"
            >
              Book a Strategy Call
            </Link>
            <Link href="#process" className="wn-btn wn-btn--secondary">
              See How We Work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
