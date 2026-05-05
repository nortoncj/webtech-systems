import React from 'react'
import "@css/home/who.css"
import Link from 'next/link';

function Who() {
  return (
    <section
      id="who-we-serve"
      className="wn-qualifier"
      aria-labelledby="wn-qualifier-title"
    >
      <div className="wn-container">
        <div className="wn-qualifier__header">
          <div className="wn-section-tag">Who We Serve</div>
          <h2 id="wn-qualifier-title" className="wn-qualifier__title">
            Built for businesses that need working systems, not just a prettier
            website
          </h2>
          <p className="wn-qualifier__text">
            Webtech Ninjas works best with business owners who want clarity,
            professionalism, and digital systems that actually support growth.
            If you care about trust, performance, lead flow, and clean
            execution, you’re in the right place.
          </p>
        </div>

        <div className="wn-qualifier__grid">
          <div className="wn-qualifier-panel wn-qualifier-panel--ideal">
            <div className="wn-qualifier-panel__intro">
              <span className="wn-qualifier-panel__tag">Best Fit</span>
              <h3 className="wn-qualifier-panel__title">
                We work best with businesses like these
              </h3>
              <p className="wn-qualifier-panel__text">
                Our process is built for people who want structure, results, and
                a digital presence that feels credible from the first click.
              </p>
            </div>

            <div className="wn-qualifier-card-wrap">
              <article className="wn-qualifier-card">
                <div className="wn-qualifier-card__icon">01</div>
                <div className="wn-qualifier-card__content">
                  <h4>Small and growing businesses</h4>
                  <p>
                    Businesses that need a modern online presence, stronger
                    trust signals, and a system that can support real momentum.
                  </p>
                </div>
              </article>

              <article className="wn-qualifier-card">
                <div className="wn-qualifier-card__icon">02</div>
                <div className="wn-qualifier-card__content">
                  <h4>Service-based brands and operators</h4>
                  <p>
                    Consultants, agencies, local businesses, and professional
                    service providers who need clean lead capture and a more
                    polished client journey.
                  </p>
                </div>
              </article>

              <article className="wn-qualifier-card">
                <div className="wn-qualifier-card__icon">03</div>
                <div className="wn-qualifier-card__content">
                  <h4>Entrepreneurs and freelancers leveling up</h4>
                  <p>
                    Builders who are ready to move beyond pieced-together tools
                    and create a digital foundation that reflects where the
                    business is going.
                  </p>
                </div>
              </article>

              <article className="wn-qualifier-card">
                <div className="wn-qualifier-card__icon">04</div>
                <div className="wn-qualifier-card__content">
                  <h4>Teams ready for smarter workflows</h4>
                  <p>
                    Businesses that are losing time to manual tasks, messy
                    onboarding, slow follow-up, or disconnected tools behind the
                    scenes.
                  </p>
                </div>
              </article>
            </div>
          </div>

          <div className="wn-qualifier-panel wn-qualifier-panel--not-fit">
            <div className="wn-qualifier-panel__intro">
              <span className="wn-qualifier-panel__tag wn-qualifier-panel__tag--muted">
                Not the Right Fit
              </span>
              <h3 className="wn-qualifier-panel__title">
                We may not be the best fit if you’re looking for
              </h3>
              <p className="wn-qualifier-panel__text">
                Not every project should be a match. We’re not built for noise,
                shortcuts, or trend-chasing dressed up as strategy.
              </p>
            </div>

            <div className="wn-qualifier-note-list">
              <div className="wn-qualifier-note">
                <strong>Quick-fix marketing with no system behind it</strong>
                <p>
                  If the goal is pure hype without structure, automation, or
                  follow-through, we’re probably not your team.
                </p>
              </div>

              <div className="wn-qualifier-note">
                <strong>A website that only needs to “look nice”</strong>
                <p>
                  Design matters, but we build for trust, usability, conversion,
                  and performance — not decoration alone.
                </p>
              </div>

              <div className="wn-qualifier-note">
                <strong>
                  The cheapest possible build with no long-term thinking
                </strong>
                <p>
                  We focus on clean systems that support growth. That means
                  strategy, structure, and implementation with purpose.
                </p>
              </div>

              <div className="wn-qualifier-note">
                <strong>Endless complexity without business clarity</strong>
                <p>
                  If the offer, process, or goals are still foggy, we help
                  create clarity first — because strong systems need strong
                  direction.
                </p>
              </div>
            </div>

            <div className="wn-qualifier-callout">
              <strong>The sweet spot</strong>
              <p>
                Clients who value clean execution, clear communication, and
                systems that do real work usually get the best results with
                Webtech Ninjas.
              </p>
            </div>
          </div>
        </div>

        <div className="wn-qualifier__footer">
          <p>
            If you want a digital presence that looks credible, works
            intelligently, and supports the business behind it, we should talk.
          </p>
          <Link href="#contact" className="wn-btn wn-btn--primary">
            See If We’re a Fit
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Who