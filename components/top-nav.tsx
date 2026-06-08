"use client";

import React, { useState } from "react";
import "@css/nav.css";
import logo from "@/public/WebTechLogo.svg";
import Image from "next/image";
import Link from "next/link";
import { navigation } from "@/data/navigation";

function TopNav() {
  const [open, setOpen] = useState(false);

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

          {/* MOBILE TOGGLE */}
          <button
            className={`wn-header__toggle ${open ? "is-active" : ""}`}
            type="button"
            aria-expanded={open}
            aria-controls="wn-mobile-menu"
            aria-label="Toggle navigation"
            onClick={() => setOpen(!open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* DESKTOP NAV */}
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

      {/* MOBILE MENU */}
      <div
        className={`wn-mobile-menu ${open ? "is-open" : ""}`}
        id="wn-mobile-menu"
      >
        <nav className="wn-mobile-menu__nav" aria-label="Mobile navigation">
          <ul className="wn-mobile-menu__list">
            {navigation.map((item, index) => (
              <li key={index}>
                <Link href={item.href} onClick={() => setOpen(false)}>
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                className="wn-mobile-menu__cta"
                onClick={() => setOpen(false)}
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
