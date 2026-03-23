/**
 * MODERN PERSONAL WEBSITE - MAIN
 * Main application initialization and coordination
 */

window.WebsiteAnimations = undefined;
window.WebsiteInteractions = undefined;
window.PersonalDashboard = undefined;

class PersonalWebsite {
  constructor() {
    this.animations = null;
    this.interactions = null;
    this.dashboard = null;
    this.init();
  }

  init() {
    this.initializeComponents();
    this.setupGlobalEvents();
    this.handleBrowserCompatibility();
    this.setupPerformanceMonitoring();
  }

  // Initialize all components
initializeComponents() {
  console.log("Core system initialized");

  // Core features
  this.initializeParticles();
  this.initializeScrollEffects();
  this.initializeThemeManager();

  // Initialize interactions
  if (typeof WebsiteInteractions !== 'undefined') {
    this.interactions = new WebsiteInteractions();
  }

  // Initialize dashboard
  if (typeof PersonalDashboard !== 'undefined') {
    this.dashboard = new PersonalDashboard();
  }
}

  // Initialize particle effects
  initializeParticles() {
    // This would typically use a particle library like particles.js
    // For now, we'll create a simple particle effect
    const createParticles = () => {
      const container = document.querySelector('.particles-container');
      if (!container) return;

      const particleCount = 50;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
          position: absolute;
          width: ${Math.random() * 3 + 1}px;
          height: ${Math.random() * 3 + 1}px;
          background: var(--accent-primary);
          border-radius: 50%;
          opacity: ${Math.random() * 0.5 + 0.1};
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          animation: float ${Math.random() * 20 + 10}s infinite ease-in-out;
          animation-delay: ${Math.random() * 5}s;
        `;
        container.appendChild(particle);
      }
    };

    createParticles();
  }

  // Initialize scroll effects
  initializeScrollEffects() {
    // Smooth scroll behavior for better UX
    if ('scrollBehavior' in document.documentElement.style) {
      document.documentElement.style.scrollBehavior = 'smooth';
    }

    // Scroll progress indicator
    this.createScrollProgress();
  }

  // Create scroll progress indicator
  createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: var(--accent-gradient);
      z-index: 9999;
      transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
      const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      progressBar.style.width = scrolled + '%';
    });
  }

  // Initialize theme manager
  initializeThemeManager() {
    // Advanced theme switching with system preference detection
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleThemeChange = (e) => {
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme) {
        document.body.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleThemeChange);
  }

  // Setup global events
  setupGlobalEvents() {
    // Window resize handler
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.handleResize();
      }, 250);
    });

    // Visibility change handler
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.handleVisibilityChange(false);
      } else {
        this.handleVisibilityChange(true);
      }
    });

    // Online/offline handlers
    window.addEventListener('online', () => {
      this.handleConnectionChange(true);
    });

    window.addEventListener('offline', () => {
      this.handleConnectionChange(false);
    });

    // Error handler
    window.addEventListener('error', (e) => {
      this.handleError(e);
    });

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (e) => {
      this.handleUnhandledRejection(e);
    });
  }

  // Handle window resize
  handleResize() {
    // Recalculate any position-dependent elements
    if (this.animations && this.animations.recalculatePositions) {
      this.animations.recalculatePositions();
    }

    // Trigger resize event for components
    window.dispatchEvent(new CustomEvent('websiteResize'));
  }

  // Handle visibility change
  handleVisibilityChange(isVisible) {
    if (isVisible) {
      // Resume animations
      if (this.animations && this.animations.resumeAnimations) {
        this.animations.resumeAnimations();
      }
    } else {
      // Pause animations to save resources
      if (this.animations && this.animations.pauseAnimations) {
        this.animations.pauseAnimations();
      }
    }
  }

  // Handle connection changes
  handleConnectionChange(isOnline) {
    const status = document.createElement('div');
    status.className = 'connection-status';
    status.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 16px;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      z-index: 9999;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;

    if (isOnline) {
      status.style.background = '#10b981';
      status.textContent = 'Back online';
    } else {
      status.style.background = '#ef4444';
      status.textContent = 'Offline mode';
    }

    document.body.appendChild(status);

    setTimeout(() => {
      status.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
      status.style.transform = 'translateX(100%)';
      setTimeout(() => {
        status.remove();
      }, 300);
    }, 3000);
  }

  // Handle errors
  handleError(error) {
    console.error('Website Error:', error);
    
    // Show user-friendly error message for critical errors
    if (error.message && error.message.includes('GSAP')) {
      this.showErrorNotification('Some animations may not work properly.');
    }
  }

  // Handle unhandled promise rejections
  handleUnhandledRejection(event) {
    console.error('Unhandled Promise Rejection:', event);
    this.showErrorNotification('A technical issue occurred. Please refresh the page.');
  }

  // Show error notification
  showErrorNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'error-notification';
    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 20px;
      background: #ef4444;
      color: white;
      padding: 12px 16px;
      border-radius: 8px;
      font-weight: 500;
      z-index: 9999;
      transform: translateX(-100%);
      transition: transform 0.3s ease;
      max-width: 300px;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
      notification.style.transform = 'translateX(-100%)';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 5000);
  }

  // Browser compatibility
  handleBrowserCompatibility() {
    // Check for required features
    const features = {
      flexbox: this.checkFlexboxSupport(),
      grid: this.checkGridSupport(),
      backdropFilter: this.checkBackdropFilterSupport(),
      intersectionObserver: 'IntersectionObserver' in window,
      customProperties: this.checkCustomPropertiesSupport()
    };

    // Add fallback classes
    if (!features.backdropFilter) {
      document.body.classList.add('no-backdrop-filter');
    }

    if (!features.customProperties) {
      document.body.classList.add('no-custom-properties');
    }

    // Feature detection notification
    if (!features.intersectionObserver) {
      this.showFallbackNotification('Some animations are disabled for better compatibility.');
    }
  }

  // Check flexbox support
  checkFlexboxSupport() {
    const test = document.createElement('div');
    test.style.display = 'flex';
    return test.style.display === 'flex';
  }

  // Check grid support
  checkGridSupport() {
    const test = document.createElement('div');
    test.style.display = 'grid';
    return test.style.display === 'grid';
  }

  // Check backdrop-filter support
  checkBackdropFilterSupport() {
    const test = document.createElement('div');
    test.style.backdropFilter = 'blur(1px)';
    return test.style.backdropFilter !== '';
  }

  // Check CSS custom properties support
  checkCustomPropertiesSupport() {
    return CSS && CSS.supports && CSS.supports('--test', '0');
  }

  // Show fallback notification
  showFallbackNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fallback-notification';
    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #f59e0b;
      color: white;
      padding: 12px 16px;
      border-radius: 8px;
      font-weight: 500;
      z-index: 9999;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      max-width: 300px;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 4000);
  }

  // Performance monitoring
  setupPerformanceMonitoring() {
    // Monitor Core Web Vitals
    if ('PerformanceObserver' in window) {
      this.monitorCoreWebVitals();
    }

    // Monitor memory usage
    if (performance.memory) {
      this.monitorMemoryUsage();
    }

    // Monitor long tasks
    if ('PerformanceObserver' in window) {
      this.monitorLongTasks();
    }
  }

  // Monitor Core Web Vitals
  monitorCoreWebVitals() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        switch (entry.name) {
          case 'Largest Contentful Paint':
            this.logPerformanceMetric('LCP', entry.startTime);
            break;
          case 'First Input Delay':
            this.logPerformanceMetric('FID', entry.processingStart - entry.startTime);
            break;
          case 'Cumulative Layout Shift':
            this.logPerformanceMetric('CLS', entry.value);
            break;
        }
      }
    });

    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
  }

  // Monitor memory usage
  monitorMemoryUsage() {
    setInterval(() => {
      const memory = performance.memory;
      const usedMB = Math.round(memory.usedJSHeapSize / 1048576);
      const totalMB = Math.round(memory.totalJSHeapSize / 1048576);
      
      if (usedMB > 100) { // Warning threshold
        console.warn(`High memory usage: ${usedMB}MB / ${totalMB}MB`);
      }
    }, 30000); // Check every 30 seconds
  }

  // Monitor long tasks
  monitorLongTasks() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) { // Long task threshold
          console.warn(`Long task detected: ${entry.duration}ms`);
        }
      }
    });

    observer.observe({ entryTypes: ['longtask'] });
  }

  // Log performance metrics
  logPerformanceMetric(metric, value) {
    console.log(`${metric}: ${value}`);
    
    // Store for analysis
    if (!window.websiteMetrics) {
      window.websiteMetrics = {};
    }
    window.websiteMetrics[metric] = value;
  }

  // Public API methods
  getVersion() {
    return '1.0.0';
  }

  getMetrics() {
    return window.websiteMetrics || {};
  }

  refresh() {
    location.reload();
  }

  // Utility methods
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.personalWebsite = new PersonalWebsite();
});

// Expose global functions for HTML onclick handlers
window.smoothScrollTo = function(target) {
  const element = document.querySelector(target);
  if (element) {
    const offsetTop = element.offsetTop - 80;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
};

// FORCE DISABLE SCROLL ANIMATIONS
window.addEventListener('scroll', () => {
  document.querySelectorAll('[style*="opacity: 0"]').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
});

// SIMPLE CLEAN ANIMATIONS (SAFE)

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll("section, .project-card, .glass-card");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, {
    threshold: 0.1
  });

  elements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease";
    observer.observe(el);
  });
});

const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    body.setAttribute("data-theme", savedTheme);
}

themeToggle.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme");

    const newTheme = currentTheme === "dark" ? "light" : "dark";

    body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
});