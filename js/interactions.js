/**
 * CLEAN INTERACTIONS - STABLE VERSION
 */

class WebsiteInteractions {
  constructor() {
    this.init();
  }

  init() {
    this.smoothScroll();
    this.navHighlight();
    this.buttonEffects();
  }

  // Smooth scroll for nav links
  smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Active nav highlight
  navHighlight() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
      let current = "";

      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (pageYOffset >= sectionTop) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      });
    });
  }

  // Button hover glow
  buttonEffects() {
    document.querySelectorAll(".btn").forEach(btn => {
      btn.addEventListener("mouseenter", () => {
        btn.style.transform = "scale(1.05)";
      });

      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "scale(1)";
      });
    });
  }
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  new WebsiteInteractions();
});