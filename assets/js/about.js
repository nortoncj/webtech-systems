// Ninja Progress Indicator
function updateProgress() {
  const scrolled =
    (window.pageYOffset /
      (document.documentElement.scrollHeight - window.innerHeight)) *
    100;
  document.querySelector(".ninja-progress-bar").style.width = scrolled + "%";
}

// Floating Particles
function createParticles() {
  const particles = document.getElementById("particles");
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className =
      Math.random() > 0.5 ? "particle ninja-star" : "particle code";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 6 + "s";
    particle.style.animationDuration = Math.random() * 4 + 4 + "s";
    particles.appendChild(particle);
  }
}

// Scroll-triggered animations
function animateOnScroll() {
  const elements = document.querySelectorAll(".animate-on-scroll");
  const windowHeight = window.innerHeight;

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add("animated");
    }
  });
}

// Image card interactions
function setupImageCards() {
  const imageCards = document.querySelectorAll(".image-card");

  imageCards.forEach((card) => {
    card.addEventListener("click", function () {
      // Simple lightbox effect
      const overlay = this.querySelector(".image-overlay");
      overlay.style.opacity = overlay.style.opacity === "1" ? "0" : "1";
    });
  });
}

// Service card hover effects
function setupServiceCards() {
  const serviceCards = document.querySelectorAll(".service-card");

  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });
}

// Ninja star rotation on scroll
function rotateNinjaStars() {
  const scrolled = window.pageYOffset;
  const ninjaStars = document.querySelectorAll(
    ".ninja-star-main, .particle.ninja-star"
  );

  ninjaStars.forEach((star) => {
    star.style.transform = `rotate(${scrolled * 0.5}deg)`;
  });
}

// Initialize everything
document.addEventListener("DOMContentLoaded", function () {
  createParticles();
  setupImageCards();
  setupServiceCards();
  animateOnScroll();
});

// Event listeners
window.addEventListener("scroll", function () {
  updateProgress();
  animateOnScroll();
  rotateNinjaStars();
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Easter egg: Konami code for special ninja effect
let konamiCode = [];
const konamiSequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

document.addEventListener("keydown", function (e) {
  konamiCode.push(e.code);
  konamiCode = konamiCode.slice(-10);

  if (konamiCode.join("") === konamiSequence.join("")) {
    // Special ninja effect
    document.body.style.filter = "invert(1) hue-rotate(180deg)";
    setTimeout(() => {
      document.body.style.filter = "none";
    }, 2000);

    // Create special ninja star explosion
    for (let i = 0; i < 20; i++) {
      const star = document.createElement("div");
      star.className = "particle ninja-star";
      star.style.position = "fixed";
      star.style.left = "50%";
      star.style.top = "50%";
      star.style.transform = `translate(-50%, -50%) rotate(${
        Math.random() * 360
      }deg)`;
      star.style.animation = `float 2s ease-out forwards`;
      star.style.opacity = "1";
      star.style.zIndex = "9999";
      document.body.appendChild(star);

      setTimeout(() => {
        star.remove();
      }, 2000);
    }
  }
});

// Performance optimization: Throttle scroll events
// let ticking = false;
// function requestTick() {
//   if (!ticking) {
//     requestAnimationFrame(updateAnimations);
//     ticking = true;
//   }
// }

function updateAnimations() {
  updateProgress();
  animateOnScroll();
  rotateNinjaStars();
  ticking = false;
}

window.addEventListener("scroll", requestTick);


/* Timeline Section */
// Scroll-triggered animations
function animateOnScroll() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  const windowHeight = window.innerHeight;
  
  elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < windowHeight - elementVisible) {
          element.classList.add('animated');
      }
  });
}

// Enhanced timeline animations with stagger effect
function animateTimelineItems() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  const windowHeight = window.innerHeight;
  
  timelineItems.forEach((item, index) => {
      const elementTop = item.getBoundingClientRect().top;
      const elementVisible = 200;
      
      if (elementTop < windowHeight - elementVisible) {
          setTimeout(() => {
              item.classList.add('animated');
          }, index * 150); // Stagger animation by 150ms
      }
  });
}

// Add ninja star rotation on scroll
function rotateNinjaStars() {
  const scrolled = window.pageYOffset;
  const ninjaStars = document.querySelectorAll('.ninja-star');
  
  ninjaStars.forEach(star => {
      star.style.transform = `rotate(${scrolled * 0.3}deg)`;
  });
}

// Add parallax effect to timeline line
function parallaxTimelineLine() {
  const timeline = document.querySelector('.timeline');
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;
  
  if (timeline) {
      timeline.style.transform = `translateY(${rate}px)`;
  }
}

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
  animateOnScroll();
  animateTimelineItems();
});

// Throttled scroll event handler
let ticking = false;
function requestTick() {
  if (!ticking) {
      requestAnimationFrame(updateAnimations);
      ticking = true;
  }
}

function updateAnimations() {
  animateOnScroll();
  animateTimelineItems();
  rotateNinjaStars();
  ticking = false;
}

window.addEventListener('scroll', requestTick);

// Add hover and click interactions for timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
  const dot = item.querySelector('.timeline-dot');
  const content = item.querySelector('.timeline-content');
  let isClicked = false;

  // Hover to show content
  item.addEventListener('mouseenter', function() {
      if (!isClicked) {
          content.classList.add('show');
      }
  });

  // Mouse leave to hide content (unless clicked)
  item.addEventListener('mouseleave', function() {
      if (!isClicked) {
          content.classList.remove('show');
      }
  });

  // Click to toggle permanent visibility
  dot.addEventListener('click', function(e) {
      e.stopPropagation();
      
      // Remove active state from all other dots
      document.querySelectorAll('.timeline-dot').forEach(otherDot => {
          if (otherDot !== dot) {
              otherDot.classList.remove('active');
              otherDot.closest('.timeline-item').querySelector('.timeline-content').classList.remove('permanent');
          }
      });

      // Remove clicked state from all other items
      document.querySelectorAll('.timeline-item').forEach(otherItem => {
          if (otherItem !== item) {
              otherItem.isClicked = false;
          }
      });

      // Toggle current item
      isClicked = !isClicked;
      
      if (isClicked) {
          dot.classList.add('active');
          content.classList.add('permanent');
          content.classList.add('show');
      } else {
          dot.classList.remove('active');
          content.classList.remove('permanent');
          content.classList.remove('show');
      }

      // Add a subtle pulse effect when clicked
      dot.style.transform = 'scale(1.15)';
      setTimeout(() => {
          dot.style.transform = isClicked ? 'scale(1.05)' : 'scale(1)';
      }, 200);
  });

  // Store clicked state on the item
  item.isClicked = isClicked;
});

// Click outside to close all opened content
document.addEventListener('click', function(e) {
  if (!e.target.closest('.timeline-item')) {
      document.querySelectorAll('.timeline-item').forEach(item => {
          const dot = item.querySelector('.timeline-dot');
          const content = item.querySelector('.timeline-content');
          
          item.isClicked = false;
          dot.classList.remove('active');
          content.classList.remove('permanent');
          content.classList.remove('show');
      });
  }
});

// Add intersection observer for better performance
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('animated');
          }
      });
  }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
  });
}