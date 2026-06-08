import React from "react";
import "@css/footer.css";
import Image from "next/image";
import logo from "@/public/WebTechLogo.svg";
import Link from "next/link";
import { socials } from "@data/socials";
import { contact, navigation, services } from "@/data/navigation";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="wn-footer" aria-labelledby="wn-footer-title">
      <div className="wn-container">
        <div className="wn-footer__wrap">
          <div className="wn-footer__top">
            <div className="wn-footer__brand-col">
              <Link
                href="#top"
                className="wn-footer__brand"
                aria-label="Webtech Ninjas home"
              >
                <Image
                  src={logo}
                  alt="Webtech Ninjas"
                  className="wn-footer__logo"
                />

                <span className="wn-footer__brand-text">Webtech Ninjas</span>
              </Link>

              <h2 id="wn-footer-title" className="wn-footer__title">
                Clean systems. Better growth.
              </h2>

              <p className="wn-footer__text">
                Webtech Ninjas builds modern websites, automation workflows, and
                digital systems for businesses that want more than a polished
                look. They want structure, clarity, and results that hold up
                under real use.
              </p>

              <div className="wn-footer__social">
                {socials.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    aria-label={social.name}
                    className="wn-footer__social-link"
                  >
                    <social.icon />
                  </Link>
                ))}
              </div>
            </div>

            <div className="wn-footer__nav-col">
              <div className="wn-footer__group">
                <h3>Navigate</h3>
                <ul>
                  {navigation.map((item, index) => (
                    <li key={index}>
                      <Link href={item.href}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="wn-footer__group">
                <h3>Services</h3>
                <ul>
                  {services.map((service, index) => (
                    <li key={index}>
                      <Link href={service.href}>{service.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="wn-footer__group">
                <h3>Contact</h3>
                <ul>
                  {contact.map((item, index) => (
                    <li key={index}>
                      <Link href={item.href}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="wn-footer__cta-strip">
            <div className="wn-footer__cta-copy">
              <strong>
                Built for businesses ready to stop patching things together
              </strong>
              <span>
                Modern websites, smarter workflows, cleaner growth
                infrastructure.
              </span>
            </div>

            <div className="wn-footer__cta-actions">
              <Link
                href="/contact"
                className="wn-btn wn-btn--primary"
              >
                Book a Call
              </Link>
              <Link href="#services" className="wn-btn wn-btn--secondary">
                View Services
              </Link>
            </div>
          </div>

          <div className="wn-footer__bottom">
            <p>
              © <span className="wn-current-year">{currentYear}</span> Webtech
              Ninjas. All rights reserved.
            </p>

            <div className="wn-footer__bottom-links">
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Terms</Link>
              <Link href="#hero">Back to Top</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
