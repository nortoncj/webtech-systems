// MOBILE NAVIGATION
const mobileBtn = document.querySelector("#mobile-nav");
const sideNav = document.querySelector(".side-nav");
const closeBtn = document.querySelector("#close-btn");

function toggleSideNav() {
  if (sideNav.classList.contains("side-off")) {
    sideNav.classList.remove("side-off");
    sideNav.classList.add("side-active");
  } else {
    sideNav.classList.remove("side-active");
    sideNav.classList.add("side-off");
  }
}

const closeSideNav = () => {
  sideNav.classList.remove("side-active");
  sideNav.classList.add("side-off");
};

mobileBtn.addEventListener("click", toggleSideNav);
closeBtn.addEventListener("click", closeSideNav);

// Header

document.addEventListener("DOMContentLoaded", () => {
  // Enhanced CTA tracking
  const ctaButton = document.querySelector(".cta");

  ctaButton.addEventListener("click", (e) => {
    // Analytics tracking
    console.log("Hero CTA clicked: Strategy Session Booking");

    // Add visual feedback
    ctaButton.style.transform = "translateY(-2px) scale(0.98)";
    setTimeout(() => {
      ctaButton.style.transform = "";
    }, 200);
  });

  // Intersection Observer for scroll animations
  const observerHeaderOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  };

  const observerHeader = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerHeaderOptions);

  // Animate stats on load
  const animateStats = () => {
    const statNumbers = document.querySelectorAll(".stat-number");
    statNumbers.forEach((stat) => {
      const target = parseInt(stat.textContent);
      const suffix = stat.textContent.includes("%")
        ? "%"
        : stat.textContent.includes("h")
        ? "h"
        : "+";
      let current = 0;
      const increment = target / 40;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        stat.textContent = Math.floor(current) + suffix;
      }, 50);
    });
  };

  // Start stats animation after page load
  setTimeout(animateStats, 1500);

  // Orbit icon hover effects
  const orbitIcons = document.querySelectorAll(".orbit-icon");
  orbitIcons.forEach((icon) => {
    icon.addEventListener("mouseenter", () => {
      icon.style.animationPlayState = "paused";
    });

    icon.addEventListener("mouseleave", () => {
      icon.style.animationPlayState = "running";
    });
  });

  // Parallax effect for floating elements
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector(".floating-elements");
    const speed = scrolled * 0.5;

    if (parallax) {
      parallax.style.transform = `translateY(${speed}px)`;
    }
  });

  // Enhanced particle system
  function createHeroParticle() {
    const heroSection = document.querySelector(".header-section");
    const particle = document.createElement("div");
    particle.style.cssText = `
          position: absolute;
          width: 4px;
          height: 4px;
          background: linear-gradient(45deg, #8B1538, #B8336A);
          border-radius: 50%;
          opacity: 0.6;
          pointer-events: none;
          z-index: 1;
      `;

    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = "100%";

    heroSection.appendChild(particle);

    particle.animate(
      [
        { transform: "translateY(0) scale(0)", opacity: 0.6 },
        { transform: "translateY(-100vh) scale(1)", opacity: 0 },
      ],
      {
        duration: 6000 + Math.random() * 4000,
        easing: "ease-out",
      }
    ).onfinish = () => particle.remove();
  }

  // Create particles periodically
  setInterval(createHeroParticle, 2000);

  // Smooth scroll for scroll indicator
  const scrollIndicator = document.querySelector(".scroll-indicator");
  scrollIndicator.addEventListener("click", () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  });
});

// Banner

// Enhanced CTA tracking and interactions
document.addEventListener("DOMContentLoaded", () => {
  const ctaButton = document.querySelector(".cta");
  const images = document.querySelectorAll(".image1, .image2");

  // CTA button interactions
  ctaButton.addEventListener("click", (e) => {
    e.preventDefault();

    // Add success animation
    ctaButton.style.transform = "scale(0.95)";
    setTimeout(() => {
      ctaButton.style.transform = "";
    }, 150);

    // Analytics tracking
    console.log("CTA clicked: Free Consultation");

    // You can replace this with your actual booking/contact logic
    alert(
      "🥷 Ready to dominate your digital presence? This would normally open your booking calendar or contact form!"
    );

    // Example: Redirect to booking page
    // window.open('https://calendly.com/your-booking-link', '_blank');
  });

  // Image hover effects with stats animation
  images.forEach((image) => {
    const container = image.parentElement;
    const statsOverlay = container.querySelector(".stats-overlay");

    image.addEventListener("mouseenter", () => {
      if (statsOverlay) {
        statsOverlay.style.transform = "translateX(-50%) translateY(-10px)";
        statsOverlay.style.boxShadow = "0 15px 40px rgba(139, 21, 56, 0.3)";
      }
    });

    image.addEventListener("mouseleave", () => {
      if (statsOverlay) {
        statsOverlay.style.transform = "translateX(-50%) translateY(0)";
        statsOverlay.style.boxShadow = "0 10px 30px rgba(139, 21, 56, 0.2)";
      }
    });
  });

  // Intersection Observer for scroll animations
  const observerBannerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  };

  const observerBanner = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerBannerOptions);

  // Observe stats overlays for animation
  const statsOverlays = document.querySelectorAll(".stats-overlay");
  statsOverlays.forEach((overlay, index) => {
    overlay.style.opacity = "0";
    overlay.style.transform = "translateX(-50%) translateY(30px)";
    overlay.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    overlay.style.transitionDelay = `${index * 0.3}s`;
    observerBanner.observe(overlay);
  });

  // Number counting animation for stats
  const animateNumbers = () => {
    const numbers = document.querySelectorAll(".stats-number");
    numbers.forEach((number) => {
      const target = parseInt(number.textContent);
      const suffix = number.textContent.includes("%") ? "%" : "+";
      let current = 0;
      const increment = target / 30;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        number.textContent = Math.floor(current) + suffix;
      }, 50);
    });
  };

  // Trigger number animation when section comes into view
  const bannerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(animateNumbers, 1000);
          bannerObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  bannerObserver.observe(document.querySelector(".banner"));
});

// Particle effect for enhanced visual appeal (optional)
function createFloatingElement() {
  const banner = document.querySelector(".banner");
  const particle = document.createElement("div");
  particle.style.cssText = `
      position: absolute;
      width: 6px;
      height: 6px;
      background: linear-gradient(45deg, #8B1538, #B8336A);
      border-radius: 50%;
      opacity: 0.3;
      pointer-events: none;
      z-index: 1;
  `;

  particle.style.left = Math.random() * 100 + "%";
  particle.style.top = "100%";

  banner.appendChild(particle);

  particle.animate(
    [
      { transform: "translateY(0) scale(0)", opacity: 0.3 },
      { transform: "translateY(-100vh) scale(1)", opacity: 0 },
    ],
    {
      duration: 8000 + Math.random() * 4000,
      easing: "ease-out",
    }
  ).onfinish = () => particle.remove();
}

// Create floating particles occasionally
setInterval(createFloatingElement, 3000);

// PORTFOLIO
// Portfolio functionality
class PortfolioManager {
  constructor() {
    this.cards = document.querySelectorAll(".portfolio-link");
    this.navLinks = document.querySelectorAll(".portfolio-nav__link");
    this.init();
  }

  init() {
    this.setupHoverEffects();
    this.setupFiltering();
  }

  setupHoverEffects() {
    this.cards.forEach((card, index) => {
      const textElement = card.querySelector(".portfolio-text");
      const badgeElement = card.querySelector(".category");
      const filterElement = card.querySelector(".card-filter");

      card.addEventListener("mouseenter", () => {
        textElement.classList.add("active");
        badgeElement.classList.add("active");
        filterElement.classList.add("active");
      });

      card.addEventListener("mouseleave", () => {
        textElement.classList.remove("active");
        badgeElement.classList.remove("active");
        filterElement.classList.remove("active");
      });
    });
  }

  setupFiltering() {
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        // Update active nav link
        this.navLinks.forEach((navLink) => navLink.classList.remove("active"));
        link.classList.add("active");

        // Get filter value
        const filter = link.getAttribute("data-filter");

        // Filter cards
        this.filterCards(filter);
      });
    });
  }

  filterCards(filter) {
    this.cards.forEach((card, index) => {
      const cardContainer = card.querySelector(".portfolio-card");
      const category = card.getAttribute("data-category");

      if (filter === "all" || category === filter) {
        card.style.display = "block";
        // Stagger animation
        setTimeout(() => {
          cardContainer.style.animation = `fadeInUp 0.6s ease forwards`;
        }, index * 100);
      } else {
        card.style.display = "none";
      }
    });
  }
}

// Initialize portfolio when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new PortfolioManager();
});

// Intersection Observer for scroll animations
const observerPortfolioOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observerPortfolio = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerPortfolioOptions);

// Observe all portfolio cards
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".portfolio-card");
  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    observerPortfolio.observe(card);
  });
});

// Slider functionality

class ServiceSlider {
  constructor() {
    this.slider = document.querySelector(".service-slider-track");
    this.indicators = document.querySelectorAll(".service-slider__nav .circle");
    this.cards = document.querySelectorAll(".service-card");
    this.currentSlide = 0;
    this.totalSlides = 6; // Only count original cards
    this.isAutoPlaying = true;
    this.autoPlayInterval = null;

    this.init();
  }

  init() {
    this.startAutoPlay();
    this.setupEventListeners();
    this.updateIndicators();
  }

  setupEventListeners() {
    // Pause on hover
    this.slider.addEventListener("mouseenter", () => {
      this.pauseAutoPlay();
    });

    this.slider.addEventListener("mouseleave", () => {
      this.resumeAutoPlay();
    });

    // Indicator clicks
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        this.goToSlide(index);
      });
    });

    // Card clicks for interaction
    this.cards.forEach((card, index) => {
      card.addEventListener("click", () => {
        const service = card.getAttribute("data-service");
        this.handleServiceClick(service);
      });
    });

    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;

    this.slider.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      this.pauseAutoPlay();
    });

    this.slider.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      this.handleSwipe(startX, endX);
      this.resumeAutoPlay();
    });
  }

  handleSwipe(startX, endX) {
    const threshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe left - next slide
        this.nextSlide();
      } else {
        // Swipe right - previous slide
        this.prevSlide();
      }
    }
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  pauseAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  resumeAutoPlay() {
    if (!this.autoPlayInterval) {
      this.startAutoPlay();
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateIndicators();
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.updateIndicators();
  }

  goToSlide(slideIndex) {
    this.currentSlide = slideIndex;
    this.updateIndicators();
    this.pauseAutoPlay();
    setTimeout(() => this.resumeAutoPlay(), 2000);
  }

  updateIndicators() {
    this.indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === this.currentSlide);
    });
  }

  handleServiceClick(service) {
    // Add your service-specific interaction logic here
    console.log(`Service clicked: ${service}`);

    // Example: Show modal, navigate to service page, etc.
    // You can customize this based on your needs

    // For now, let's add a subtle feedback
    const clickedCards = document.querySelectorAll(
      `[data-service="${service}"]`
    );
    clickedCards.forEach((card) => {
      card.style.transform = "scale(0.95)";
      setTimeout(() => {
        card.style.transform = "";
      }, 150);
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ServiceSlider();
});

// Intersection Observer for performance
const observerSliderOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observerSlider = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerSliderOptions);

// Observe service cards for scroll animations
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".service-card");
  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    card.style.transitionDelay = `${index * 0.1}s`;
    observerSlider.observe(card);
  });
});

// Testimonial slider functionality

class TestimonialSlider {
  constructor() {
    this.slider = document.getElementById("testimonialSlider");
    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");
    this.indicators = document.querySelectorAll(".indicator");
    this.currentSlide = 0;
    this.totalSlides = 3;
    this.autoPlayInterval = null;
    this.isTransitioning = false;

    this.init();
  }

  init() {
    // Initialize the slider position
    this.updateSlider();

    // Add event listeners
    this.prevBtn.addEventListener("click", () => this.prevSlide());
    this.nextBtn.addEventListener("click", () => this.nextSlide());

    // Indicator click events
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => this.goToSlide(index));
    });

    // Auto-play functionality
    this.startAutoPlay();

    // Pause auto-play on hover
    this.slider.addEventListener("mouseenter", () => this.stopAutoPlay());
    this.slider.addEventListener("mouseleave", () => this.startAutoPlay());

    // Touch/swipe support
    this.setupTouchEvents();

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.prevSlide();
      if (e.key === "ArrowRight") this.nextSlide();
    });
  }

  updateSlider() {
    if (this.isTransitioning) return;

    this.isTransitioning = true;

    // Calculate the transform value
    const translateX = -this.currentSlide * (100 / this.totalSlides);
    this.slider.style.transform = `translateX(${translateX}%)`;

    // Update indicators
    this.indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === this.currentSlide);
    });

    // Update button states
    this.prevBtn.disabled = this.currentSlide === 0;
    this.nextBtn.disabled = this.currentSlide === this.totalSlides - 1;

    // Reset transition flag
    setTimeout(() => {
      this.isTransitioning = false;
    }, 600);
  }

  nextSlide() {
    if (this.currentSlide < this.totalSlides - 1) {
      this.currentSlide++;
      this.updateSlider();
    } else {
      // Loop back to first slide
      this.currentSlide = 0;
      this.updateSlider();
    }
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.updateSlider();
    } else {
      // Loop to last slide
      this.currentSlide = this.totalSlides - 1;
      this.updateSlider();
    }
  }

  goToSlide(slideIndex) {
    if (slideIndex !== this.currentSlide && !this.isTransitioning) {
      this.currentSlide = slideIndex;
      this.updateSlider();
      this.stopAutoPlay();
      setTimeout(() => this.startAutoPlay(), 3000);
    }
  }

  startAutoPlay() {
    this.stopAutoPlay(); // Clear any existing interval
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 6000);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  setupTouchEvents() {
    let startX = 0;
    let endX = 0;
    let startY = 0;
    let endY = 0;

    this.slider.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      this.stopAutoPlay();
    });

    this.slider.addEventListener("touchmove", (e) => {
      e.preventDefault();
    });

    this.slider.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      endY = e.changedTouches[0].clientY;

      const deltaX = startX - endX;
      const deltaY = startY - endY;

      // Only trigger swipe if horizontal movement is greater than vertical
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
      }

      setTimeout(() => this.startAutoPlay(), 3000);
    });
  }
}

// Initialize the slider when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new TestimonialSlider();
});

// Intersection Observer for performance
const observerTestimonialOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observerTestimonial = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerTestimonialOptions);

// Observe testimonial cards for scroll animations
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".testimonial-card");
  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    card.style.transitionDelay = `${index * 0.2}s`;
    observerTestimonial.observe(card);
  });
});

// Blog functionality

const observerBlogOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observerBlog = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerBlogOptions);

// Initialize scroll animations when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".blog-card");
  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    card.style.transitionDelay = `${index * 0.1}s`;
    observerBlog.observe(card);
  });
});

// Add click tracking for analytics (optional)
document.addEventListener("DOMContentLoaded", () => {
  const blogCards = document.querySelectorAll(".blog-card");
  blogCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      const title = card.querySelector(".cardTitle").textContent;
      const category = card.querySelector(".category").textContent;

      // Analytics tracking (you can replace with your preferred analytics)
      console.log(`Blog card clicked: ${title} in ${category}`);

      // You can add your analytics code here
      // gtag('event', 'blog_card_click', {
      //     'article_title': title,
      //     'article_category': category
      // });
    });
  });
});

// Footer functionality
class FooterManager {
  constructor() {
    this.newsletterForm = document.getElementById("newsletterForm");
    this.emailInput = document.getElementById("emailInput");
    this.subscribeBtn = document.getElementById("subscribeBtn");
    this.successMessage = document.getElementById("successMessage");
    this.currentYearSpan = document.getElementById("currentYear");

    this.init();
  }

  init() {
    this.setCurrentYear();
    this.setupNewsletterForm();
    this.setupIntersectionObserver();
    this.setupSocialTracking();
  }

  setCurrentYear() {
    this.currentYearSpan.textContent = new Date().getFullYear();
  }

  setupNewsletterForm() {
    this.newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleNewsletterSubmission();
    });

    // Real-time email validation
    this.emailInput.addEventListener("input", () => {
      this.validateEmail();
    });
  }

  validateEmail() {
    const email = this.emailInput.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && !emailRegex.test(email)) {
      this.emailInput.style.borderColor = "rgba(244, 67, 54, 0.8)";
    } else {
      this.emailInput.style.borderColor = "rgba(255, 255, 255, 0.2)";
    }
  }

  async handleNewsletterSubmission() {
    const email = this.emailInput.value.trim();

    if (!email || !this.isValidEmail(email)) {
      this.showError("Please enter a valid email address");
      return;
    }

    // Show loading state
    this.setLoadingState(true);

    try {
      // Simulate API call (replace with your actual endpoint)
      await this.submitToNewsletter(email);

      // Show success
      this.showSuccess();
      this.emailInput.value = "";

      // Analytics tracking
      console.log("Newsletter subscription:", email);
    } catch (error) {
      this.showError("Something went wrong. Please try again.");
      console.error("Newsletter subscription error:", error);
    } finally {
      this.setLoadingState(false);
    }
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async submitToNewsletter(email) {
    // Replace this with your actual newsletter API endpoint
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate successful subscription
        resolve({ success: true });
      }, 1500);
    });

    // Example of actual API call:
    // const response = await fetch('/api/newsletter/subscribe', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email })
    // });
    // return response.json();
  }

  setLoadingState(loading) {
    if (loading) {
      this.newsletterForm.classList.add("loading");
      this.subscribeBtn.disabled = true;
      this.subscribeBtn.textContent = "Joining...";
    } else {
      this.newsletterForm.classList.remove("loading");
      this.subscribeBtn.disabled = false;
      this.subscribeBtn.textContent = "Subscribe";
    }
  }

  showSuccess() {
    this.successMessage.style.display = "block";
    this.emailInput.style.borderColor = "rgba(76, 175, 80, 0.8)";

    // Hide success message after 5 seconds
    setTimeout(() => {
      this.successMessage.style.display = "none";
      this.emailInput.style.borderColor = "rgba(255, 255, 255, 0.2)";
    }, 5000);
  }

  showError(message) {
    // Create or update error message
    let errorDiv = document.querySelector(".newsletter-error");
    if (!errorDiv) {
      errorDiv = document.createElement("div");
      errorDiv.className = "newsletter-error";
      errorDiv.style.cssText = `
              display: block;
              margin-top: 1rem;
              padding: 1rem;
              background: rgba(244, 67, 54, 0.2);
              border-radius: 10px;
              border: 1px solid rgba(244, 67, 54, 0.3);
              color: #FFCDD2;
              font-size: 0.9rem;
          `;
      this.newsletterForm.parentNode.appendChild(errorDiv);
    }

    errorDiv.textContent = message;
    this.emailInput.style.borderColor = "rgba(244, 67, 54, 0.8)";

    // Hide error after 5 seconds
    setTimeout(() => {
      errorDiv.style.display = "none";
      this.emailInput.style.borderColor = "rgba(255, 255, 255, 0.2)";
    }, 5000);
  }

  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, observerOptions);

    // Observe footer sections
    const footerSections = document.querySelectorAll(".footer-section");
    footerSections.forEach((section, index) => {
      section.style.opacity = "0";
      section.style.transform = "translateY(30px)";
      section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      section.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(section);
    });
  }

  setupSocialTracking() {
    const socialLinks = document.querySelectorAll(".social-link");
    socialLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const platform = link.getAttribute("aria-label");
        console.log(`Social link clicked: ${platform}`);

        // Analytics tracking
        // gtag('event', 'social_click', {
        //     'platform': platform,
        //     'location': 'footer'
        // });
      });
    });

    // Footer link tracking
    const footerLinks = document.querySelectorAll(
      ".footer-section a:not(.social-link)"
    );
    footerLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const linkText = link.textContent.trim();
        console.log(`Footer link clicked: ${linkText}`);
      });
    });
  }
}

// Initialize footer functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new FooterManager();
});

// Enhanced smooth scrolling for footer links
document.addEventListener("DOMContentLoaded", () => {
  const footerLinks = document.querySelectorAll('.footer-section a[href^="#"]');
  footerLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

// Floating particles effect for footer
function createFooterParticle() {
  const footer = document.querySelector("footer");
  const particle = document.createElement("div");
  particle.style.cssText = `
      position: absolute;
      width: 3px;
      height: 3px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      opacity: 0.6;
      pointer-events: none;
      z-index: 1;
  `;

  particle.style.left = Math.random() * 100 + "%";
  particle.style.bottom = "0";

  footer.appendChild(particle);

  particle.animate(
    [
      { transform: "translateY(0) scale(0)", opacity: 0.6 },
      { transform: "translateY(-200px) scale(1)", opacity: 0 },
    ],
    {
      duration: 4000 + Math.random() * 2000,
      easing: "ease-out",
    }
  ).onfinish = () => particle.remove();
}

// Create subtle floating particles in footer
setInterval(createFooterParticle, 3000);
