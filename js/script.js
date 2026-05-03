document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initSmoothScroll();
//   initActiveNavLinks();
  initRevealOnScroll();
  initFooterYear();
  initOptionalHeroParallax();
});

/* =========================
   Mobile Navigation
========================= */
function initMobileNav() {
  const header = document.querySelector(".wn-header");
  const toggle = document.querySelector(".wn-header__toggle");
  const mobileMenu = document.querySelector(".wn-mobile-menu");
  const mobileLinks = document.querySelectorAll(".wn-mobile-menu a");

  if (!toggle || !mobileMenu) return;

  const openMenu = () => {
    mobileMenu.classList.add("is-open");
    toggle.classList.add("is-active");
    toggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("wn-menu-open");
  };

  const closeMenu = () => {
    mobileMenu.classList.remove("is-open");
    toggle.classList.remove("is-active");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("wn-menu-open");
  };

  const toggleMenu = () => {
    const isOpen = mobileMenu.classList.contains("is-open");
    isOpen ? closeMenu() : openMenu();
  };

  toggle.addEventListener("click", toggleMenu);

  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (e) => {
    const clickedInsideHeader = header && header.contains(e.target);
    const clickedInsideMenu = mobileMenu.contains(e.target);

    if (!clickedInsideHeader && !clickedInsideMenu) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1080) {
      closeMenu();
    }
  });
}

/* =========================
   Smooth Scroll With Offset
========================= */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const header = document.querySelector(".wn-header");
      const headerHeight = header ? header.offsetHeight : 0;
      const extraOffset = 18;
      const targetTop =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight -
        extraOffset;

      window.scrollTo({
        top: targetTop,
        behavior: "smooth",
      });
    });
  });
}

/* =========================
   Active Nav Link On Scroll
========================= */
function initActiveNavLinks() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(
    '.wn-header__menu a[href^="#"], .wn-mobile-menu a[href^="#"]',
  );

  if (!sections.length || !navLinks.length) return;

  const linkMap = new Map();
  navLinks.forEach((link) => {
    linkMap.set(link.getAttribute("href"), link);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = `#${entry.target.id}`;
        const desktopLink = document.querySelector(
          `.wn-header__menu a[href="${id}"]`,
        );
        const mobileLink = document.querySelector(
          `.wn-mobile-menu a[href="${id}"]`,
        );

        if (entry.isIntersecting) {
          document
            .querySelectorAll(".wn-header__menu a, .wn-mobile-menu a")
            .forEach((link) => link.classList.remove("is-current"));

          if (desktopLink) desktopLink.classList.add("is-current");
          if (mobileLink) mobileLink.classList.add("is-current");
        }
      });
    },
    {
      rootMargin: "-35% 0px -50% 0px",
      threshold: 0.1,
    },
  );

  sections.forEach((section) => observer.observe(section));
}

/* =========================
   Reveal On Scroll
========================= */
function initRevealOnScroll() {
  const revealTargets = document.querySelectorAll(`
    .wn-services-v2__card,
    .wn-case-v2__card,
    .wn-process-v2__step-card,
    .wn-testimonial-card,
    .wn-qualifier-card,
    .wn-proof__logo,
    .wn-services-v2__featured,
    .wn-case-v2__featured,
    .wn-cta-v2__wrap
  `);

  if (!revealTargets.length) return;

  revealTargets.forEach((el, index) => {
    el.classList.add("wn-reveal");
    el.style.setProperty("--reveal-delay", `${index * 60}ms`);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  revealTargets.forEach((el) => observer.observe(el));
}

/* =========================
   Footer Year
========================= */
function initFooterYear() {
  const yearEls = document.querySelectorAll(".wn-current-year");
  if (!yearEls.length) return;

  const year = new Date().getFullYear();
  yearEls.forEach((el) => {
    el.textContent = year;
  });
}

/* =========================
   Optional Hero Parallax
   Subtle, not flashy
========================= */
function initOptionalHeroParallax() {
  const hero = document.querySelector(".wn-hero-upgraded, .wn-cta-v2");
  if (!hero || window.innerWidth < 1024) return;

  const movingBits = hero.querySelectorAll(`
    .wn-floating-card,
    .wn-services-v2__floating,
    .wn-case-v2__floating,
    .wn-cta-v2__floating
  `);

  if (!movingBits.length) return;

  let rafId = null;

  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    if (rafId) cancelAnimationFrame(rafId);

    rafId = requestAnimationFrame(() => {
      movingBits.forEach((el, index) => {
        const strength = (index + 1) * 4;
        const moveX = x * strength;
        const moveY = y * strength;

        el.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    });
  });

  hero.addEventListener("mouseleave", () => {
    movingBits.forEach((el) => {
      el.style.transform = "translate(0, 0)";
    });
  });
}
