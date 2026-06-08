import React from 'react'
import "@css/home/testimonials.css"
import Link from 'next/link'

function Reviews() {
  return (
    <section
      id="reviews"
      className="wn-testimonials-v2"
      aria-labelledby="wn-testimonials-v2-title"
    >
      <div className="wn-testimonials-v2__bg-grid"></div>
      <div className="wn-testimonials-v2__glow wn-testimonials-v2__glow--one"></div>
      <div className="wn-testimonials-v2__glow wn-testimonials-v2__glow--two"></div>

      <div className="wn-container">
        <div className="wn-testimonials-v2__header">
          <div className="wn-section-tag">Testimonials</div>
          <h2 id="wn-testimonials-v2-title" className="wn-testimonials-v2__title">
            Trusted by clients who value
            <span>clarity, structure, and clean execution</span>
          </h2>
          <p className="wn-testimonials-v2__text">
            The best feedback usually sounds the same: the process felt clear,
            the work felt solid, and the result made the business feel sharper,
            more credible, and easier to run.
          </p>
        </div>

        <div className="wn-testimonials-v2__layout">
          
          <article className="wn-testimonials-v2__featured">
            <div className="wn-testimonials-v2__featured-top">
              <div className="wn-testimonials-v2__quote-icon">“</div>

              <div className="wn-testimonials-v2__meta">
                <div className="wn-testimonials-v2__avatar">JT</div>
                <div className="wn-testimonials-v2__person">
                  <strong>Dr. Travis</strong>
                  <span>Consultant / Small Business Founder</span>
                </div>
              </div>
            </div>

            <blockquote className="wn-testimonials-v2__featured-quote">
              What stood out most was the way everything was thought through.
              This wasn’t just a redesign. It was a system. The site felt more
              intentional, the structure made more sense, and the process was
              organized from start to finish.
            </blockquote>

            <div className="wn-testimonials-v2__featured-bottom">
              <div className="wn-testimonials-v2__pill-group">
                <span className="wn-chip">Clear Process</span>
                <span className="wn-chip">Stronger Structure</span>
                <span className="wn-chip">Professional Execution</span>
              </div>

              <Link href="#contact" className="wn-testimonials-v2__link"
                >Start a Similar Project</Link>
            </div>
          </article>

          
          <div className="wn-testimonials-v2__stack">
            <article className="wn-testimonials-v2__card">
              <div className="wn-testimonials-v2__card-quote-mark">“</div>

              <p className="wn-testimonials-v2__card-quote">
                Chris helped us turn a messy website into something that
                finally felt clear, modern, and professional. The level of service he provides is unmatched. He really invests into the vision of the business.
              </p>

              <div className="wn-testimonials-v2__meta">
                <div className="wn-testimonials-v2__avatar">ZM</div>
                <div className="wn-testimonials-v2__person">
                  <strong>Zainab M.</strong>
                  <span>Brand Operator</span>
                </div>
              </div>
            </article>

            <article
              className="wn-testimonials-v2__card wn-testimonials-v2__card--tinted"
            >
              <div className="wn-testimonials-v2__card-quote-mark">“</div>

              <p className="wn-testimonials-v2__card-quote">
                We needed someone who understood both the technical side and the
                business side. Webtech Ninjas brought both. The communication
                was clear, the build was clean, and the final result gave us a
                much stronger foundation to grow from.
              </p>

              <div className="wn-testimonials-v2__meta">
                <div className="wn-testimonials-v2__avatar">LS</div>
                <div className="wn-testimonials-v2__person">
                  <strong>Lachelle S.</strong>
                  <span>SmallBusiness Founder</span>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div className="wn-testimonials-v2__proof-bar">
          <div className="wn-testimonials-v2__proof-item">
            <strong>Clear Communication</strong>
            <span
              >Clients know what’s happening, what matters, and what comes
              next.</span
            >
          </div>

          <div className="wn-testimonials-v2__proof-item">
            <strong>Structured Delivery</strong>
            <span
              >Projects are approached like systems, not random creative
              swings.</span
            >
          </div>

          <div className="wn-testimonials-v2__proof-item">
            <strong>Better Business Foundations</strong>
            <span
              >The outcome is not just prettier, it’s cleaner, smarter, and
              more useful.</span
            >
          </div>
        </div>

        <div className="wn-testimonials-v2__footer">
          <div className="wn-testimonials-v2__footer-copy">
            <h3>Good work tends to leave the same kind of trail</h3>
            <p>
              Clear process. Strong communication. Clean execution. A better
              digital foundation. That’s the kind of trust we aim to earn every
              time.
            </p>
          </div>

          <div className="wn-testimonials-v2__footer-actions">
            <Link
              href="/contact"
              className="wn-btn wn-btn--primary"
              >Book a Strategy Call</Link>
            <Link href="#portfolio" className="wn-btn wn-btn--secondary"
              >View Case Studies </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Reviews