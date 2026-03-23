/**
 * CLEAN DASHBOARD - STABLE + ALIVE
 */

class PersonalDashboard {
  constructor() {
    this.init();
  }

  init() {
    this.fakeActivityFeed();
    this.updateNowSection();
  }

  // Fake activity feed (makes site feel alive)
  fakeActivityFeed() {
    const activities = [
      "Exploring new AI tools",
      "Working on personal website UI",
      "Learning advanced JavaScript",
      "Planning a new project idea",
      "Improving daily productivity",
      "Researching future opportunities"
    ];

    const feed = document.querySelector(".activity-feed");

    if (!feed) return;

    let index = 0;

    setInterval(() => {
      const item = document.createElement("div");
      item.className = "activity-item";
      item.textContent = activities[index];

      feed.prepend(item);

      if (feed.children.length > 6) {
        feed.removeChild(feed.lastChild);
      }

      index = (index + 1) % activities.length;
    }, 3000);
  }

  // "Now" section updater
  updateNowSection() {
    const nowElement = document.querySelector(".now-status");

    if (!nowElement) return;

    const states = [
      "Building something meaningful",
      "Learning & improving daily",
      "Focused on growth",
      "Exploring new ideas"
    ];

    let i = 0;

    setInterval(() => {
      nowElement.textContent = states[i];
      i = (i + 1) % states.length;
    }, 4000);
  }
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  new PersonalDashboard();
});