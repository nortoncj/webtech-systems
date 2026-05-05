import React from "react";
import "@css/home/proof.css";
import carnival from "@img/icons/carnival.png";
import ce from "@img/icons/carrier-enterprise.png";
import jm from "@img/icons/jo-malone.png";
import nyl from "@img/icons/new-york-life.png";
import vfw from "@img/icons/vfw.png";
import lucky from "@img/icons/lucky_logo.png";
import Image from "next/image";

const companies = [
  {
    name: "Carvinal Cruises",
    logo: carnival,
    alt: "Carnival Cruises",
  },
  {
    name: "Carrier Enterprise",
    logo: ce,
    alt: "Carrier Enterprise",
  },
  {
    name: "Jo Malone",
    logo: jm,
    alt: "Jo Malone",
  },
  {
    name: "New York Life",
    logo: nyl,
    alt: "New York Life",
  },
  {
    name: "Veteran of Foreign Wars",
    logo: vfw,
    alt: "Veteran of Foreign Wars",
  },
  {
    name: "Lucky Clover Bar and Restaurant",
    logo: lucky,
    alt: "Lucky Clover Bar and Restaurant",
  },
  // part 2
  {
    name: "Carvinal Cruises",
    logo: carnival,
    alt: "Carnival Cruises",
  },
  {
    name: "Carrier Enterprise",
    logo: ce,
    alt: "Carrier Enterprise",
  },
  {
    name: "Jo Malone",
    logo: jm,
    alt: "Jo Malone",
  },
  {
    name: "New York Life",
    logo: nyl,
    alt: "New York Life",
  },
  {
    name: "Veteran of Foreign Wars",
    logo: vfw,
    alt: "Veteran of Foreign Wars",
  },
  {
    name: "Lucky Clover Bar and Restaurant",
    logo: lucky,
    alt: "Lucky Clover Bar and Restaurant",
  },
];

function Proof() {
  return (
    <section className="wn-proof-v2" aria-labelledby="wn-proof-v2-title">
      <div className="wn-proof-v2__bg-grid"></div>
      <div className="wn-proof-v2__glow wn-proof-v2__glow--one"></div>
      <div className="wn-proof-v2__glow wn-proof-v2__glow--two"></div>

      <div className="wn-container">
        <div className="wn-proof-v2__header">
          <div className="wn-section-tag">Trusted By</div>
          <h2 id="wn-proof-v2-title" className="wn-proof-v2__title">
            Built for businesses that value
            <span>clarity, performance, and clean execution</span>
          </h2>
          <p className="wn-proof-v2__text">
            Webtech Ninjas works with growing businesses, service brands, and
            business owners who need more than a polished look, they need
            digital systems that actually support the work.
          </p>
        </div>

        <div className="wn-proof-v2__rail-wrap">
          <div className="wn-proof-v2__fade wn-proof-v2__fade--left"></div>
          <div className="wn-proof-v2__fade wn-proof-v2__fade--right"></div>

          <div className="wn-proof-v2__rail">
            <div className="wn-proof-v2__track">
              {companies.map((company, index) => (
                <div key={index} className="wn-proof-v2__logo">
                  <Image
                    height={30}
                    width={100}
                    src={company.logo}
                    alt={company.alt}
                  />
                </div>
              ))}
             
            </div>
          </div>
        </div>

        <div className="wn-proof-v2__meta">
          <div className="wn-proof-v2__meta-card">
            <strong>Clean Builds</strong>
            <span>
              Modern websites with strong structure and trust-first design
            </span>
          </div>

          <div className="wn-proof-v2__meta-card">
            <strong>Smart Systems</strong>
            <span>
              Automation and workflow support where it actually matters
            </span>
          </div>

          <div className="wn-proof-v2__meta-card">
            <strong>Business Focus</strong>
            <span>
              Built to support clarity, lead flow, and long-term growth
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Proof;
