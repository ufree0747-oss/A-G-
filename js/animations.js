// animations.js (Premium Upgrade - Stable)
console.log("JS WORKING");

document.addEventListener("DOMContentLoaded", () => {

    const elements = document.querySelectorAll("[data-animate]");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {

                const el = entry.target;
                const delay = el.dataset.delay || 0;

                setTimeout(() => {
                    el.classList.add("animate-in");
                }, delay);

                observer.unobserve(el);
            }
        });
    }, {
        threshold: 0.15
    });

    elements.forEach((el, index) => {
        el.dataset.delay = index * 80; // 🔥 stagger effect
        observer.observe(el);
    });

});

// BLOG SECTION ANIMATION
gsap.utils.toArray(".blog-card").forEach((card, index) => {
    let direction = card.dataset.animate || "up";
    let delay = parseFloat(card.dataset.delay) || 0;

    let x = 0, y = 0;

    if (direction === "left") x = -100;
    if (direction === "right") x = 100;
    if (direction === "up") y = 100;
    if (direction === "down") y = -100;

    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        x: x,
        y: y,
        duration: 1,
        delay: delay,
        ease: "power3.out"
    });
});

// BLOG HOVER EFFECT
document.querySelectorAll(".blog-card").forEach(card => {
    card.addEventListener("mouseenter", () => {
        gsap.to(card, {
            y: -10,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    card.addEventListener("mouseleave", () => {
        gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});