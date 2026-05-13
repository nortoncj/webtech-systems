import React from "react";
import "@css/home/hero.css";
import Image from "next/image";
import gsc from "@img/home/GSC.png"
import Link from "next/link";

function Hero() {
  return (
    <section className="wn-hero-upgraded" id="hero">
      <div className="wn-hero-upgraded__bg-grid"></div>
      <div className="wn-hero-upgraded__glow wn-hero-upgraded__glow--one"></div>
      <div className="wn-hero-upgraded__glow wn-hero-upgraded__glow--two"></div>

      <div className="wn-container">
        <div className="wn-hero-upgraded__wrap">
          <div className="wn-hero-upgraded__content">
            <div className="wn-hero-upgraded__eyebrow">
              Modern Websites • Automation • Growth Systems
            </div>

            <h1 className="wn-hero-upgraded__title">
              Performance-driven 
              <span>web systems</span>
            </h1>

            <p className="wn-hero-upgraded__text">
              Webtech Ninjas helps small businesses build modern websites,
              smarter workflows, and growth-ready digital systems that feel
              credible, run cleaner, and convert with more confidence.
            </p>

            <div className="wn-hero-upgraded__actions">
              <Link
                href="https://calendar.app.google/X8GheJdXzBvZ3Spu9"
                className="wn-btn wn-btn--primary"
              >
                Book a Strategy Call
              </Link>
              <Link href="#services" className="wn-btn wn-btn--secondary">
                View Services
              </Link>
            </div>

            <div className="wn-hero-upgraded__trust">
              <div className="wn-hero-upgraded__trust-item">
                <strong>Clean Builds</strong>
                <span>Modern websites with strong structure</span>
              </div>

              <div className="wn-hero-upgraded__trust-item">
                <strong>Smart Systems</strong>
                <span>Automation designed to reduce friction</span>
              </div>

              <div className="wn-hero-upgraded__trust-item">
                <strong>Business Focus</strong>
                <span>Built for trust, lead flow, and results</span>
              </div>
            </div>

            <div className="wn-hero-upgraded__microproof">
              <span>Built for small businesses</span>
              <span className="wn-dot"></span>
              <span>Clear process</span>
              <span className="wn-dot"></span>
              <span>Results-focused execution</span>
            </div>
          </div>

          <div className="wn-hero-upgraded__visual">
            <div className="wn-hero-upgraded__main-card">
              <div className="wn-browser-frame">
                <div className="wn-browser-frame__top">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div className="wn-browser-frame__body">
                  <div className="wn-browser-frame__url">webtechninjas.com</div>

                  <div className="wn-browser-frame__screen">
                    <Image src={gsc} alt="Google Search Console dashboard preview" />
                    
                  </div>
                </div>
              </div>
            </div>

            <div className="wn-floating-card wn-floating-card--stat">
              <div className="wn-floating-card__label">Lead Capture</div>
              <div className="wn-floating-card__value">Optimized</div>
              <div className="wn-floating-card__bar">
                <span></span>
              </div>
            </div>

            <div className="wn-floating-card wn-floating-card--workflow">
              <div className="wn-floating-card__label">Workflow</div>
              <div className="wn-workflow-mini">
                <span>Form</span>
                <i></i>
                <span>CRM</span>
                <i></i>
                <span>Follow-up</span>
              </div>
            </div>

            <div className="wn-floating-card wn-floating-card--proof">
              <div className="wn-proof-chip">Fast</div>
              <div className="wn-proof-chip">Systems-First</div>
              <div className="wn-proof-chip">Built to Convert</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
