import React from "react";
import "@css/nav.css";
import logo from "@/public/WebTechLogo.svg";
import Image from "next/image";
import Link from "next/link";
import { navigation } from "@/data/navigation";
function TopNav() {
  return (
    <div className="wn-header" id="top">
      <div className="wn-container">
        <div className="wn-header__inner">
          <Link
            href="/#top"
            className="wn-header__brand"
            aria-label="Webtech Ninjas home"
          >
            <Image
              src={logo}
              alt="Webtech Ninjas"
              className="wn-header__logo"
            />

            <span className="wn-header__brand-text">Webtech Ninjas</span>
          </Link>

          <button
            className="wn-header__toggle"
            type="button"
            aria-expanded="false"
            aria-controls="wn-mobile-menu"
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className="wn-header__nav" aria-label="Primary navigation">
            <ul className="wn-header__menu">
              {navigation.map((item, index) => (
                <li key={index}>
                  <Link href={item.href}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="wn-header__actions">
            <Link
              href="https://calendar.app.google/X8GheJdXzBvZ3Spu9"
              className="wn-btn wn-btn--primary wn-header__cta"
            >
              Book a Call
            </Link>
          </div>
        </div>
      </div>

      <div className="wn-mobile-menu" id="wn-mobile-menu">
        <nav className="wn-mobile-menu__nav" aria-label="Mobile navigation">
          <ul className="wn-mobile-menu__list">
            <li>
              <Link href="#services">Services</Link>
            </li>
            <li>
              <Link href="#process">Process</Link>
            </li>
            <li>
              <Link href="#portfolio">Case Studies</Link>
            </li>
            <li>
              <Link href="#testimonials">Testimonials</Link>
            </li>
            <li>
              <Link href="#who-we-serve">Who We Serve</Link>
            </li>
            <li>
              <Link
                href="https://calendar.app.google/X8GheJdXzBvZ3Spu9"
                className="wn-mobile-menu__cta"
              >
                Book a Strategy Call
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default TopNav;
