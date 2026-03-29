document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // Defensive checks for animations
    const heroElements = ".hero-title, .sub-headline h2, .sub-headline p, .cta-section, .nav-left, .nav-links a, .nav-right";
    if (document.querySelector(".nav-left")) {
        gsap.set(heroElements, { opacity: 0, y: 30 });
        gsap.set(".bread-img, .yellow-blob, .badge-tag", { scale: 0, opacity: 0 });

        const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 } });

        tl.to(".nav-left, .nav-links a, .nav-right", {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8
        });

        if (document.querySelector(".hero-title")) {
            tl.to(".hero-title", { opacity: 1, y: 0, duration: 1 }, "-=0.5");
        }

        if (document.querySelector(".badge-tag")) {
            tl.to(".badge-tag", { scale: 1, opacity: 1, stagger: 0.2, ease: "back.out(1.7)" }, "-=0.8");
        }

        if (document.querySelector(".sub-headline h2")) {
            tl.to(".sub-headline h2, .sub-headline p, .cta-section", { opacity: 1, y: 0, stagger: 0.2 }, "-=0.8");
        }

        tl.to(".yellow-blob", { scale: 1, opacity: 1, duration: 1.5, ease: "elastic.out(1, 0.5)" }, "-=1.5");
        tl.to(".bread-img", { scale: 1, opacity: 1, duration: 1.2 }, "-=1.2");
    }

    // Steam and badge floating checks
    if (document.querySelector(".badge-tag.green")) {
        gsap.to(".badge-tag.green", { y: "-=10", duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }
    if (document.querySelector(".badge-tag.orange")) {
        gsap.to(".badge-tag.orange", { y: "+=15", duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5 });
    }
    if (document.querySelector(".steam-line")) {
        gsap.to(".steam-line", { y: -10, opacity: 0.4, duration: 1.5, stagger: 0.2, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }

    // --- Order Button Hover check ---
    const orderBtn = document.querySelector(".order-btn");
    if (orderBtn) {
        orderBtn.addEventListener("mouseenter", () => {
            gsap.to(".order-btn .dot", { scale: 2, duration: 0.3 });
        });
        orderBtn.addEventListener("mouseleave", () => {
            gsap.to(".order-btn .dot", { scale: 1, duration: 0.3 });
        });
    }

    // --- GSAP Sections existence checks ---
    if (document.querySelector(".delight-top")) {
        gsap.from(".delight-heading, .delight-text, .featured-label", {
            scrollTrigger: { trigger: ".delight-top", start: "top 80%", toggleActions: "play none none reverse" },
            opacity: 0, y: 40, stagger: 0.2, duration: 1, ease: "power3.out"
        });
    }

    if (document.querySelector(".featured-card")) {
        gsap.from(".featured-card", {
            scrollTrigger: { trigger: ".featured-card", start: "top 90%", toggleActions: "play none none reverse" },
            opacity: 0, x: 50, duration: 1, ease: "back.out(1.7)"
        });
    }

    if (document.querySelector(".delight-left")) {
        gsap.from(".featured-bread-img", {
            scrollTrigger: { trigger: ".delight-left", start: "top 70%" },
            opacity: 0, scale: 0.8, rotate: -10, duration: 1.5, ease: "elastic.out(1, 0.75)"
        });
        gsap.from(".blue-backdrop", {
            scrollTrigger: { trigger: ".delight-left", start: "top 75%" },
            opacity: 0, scale: 0.5, duration: 1.2, ease: "power2.out"
        });
        gsap.from(".bread-bottom-img", {
            scrollTrigger: { trigger: ".delight-left", start: "top 60%" },
            opacity: 0, y: 100, duration: 1, delay: 0.3, ease: "power4.out"
        });
    }

    const headline = document.querySelector(".products-headline");
    if (headline) {
        gsap.from(".products-headline", {
            scrollTrigger: { trigger: ".products-banner", start: "top 80%" },
            opacity: 0, y: 50, duration: 1
        });
    }

    if (document.querySelector(".tag-container")) {
        gsap.from(".product-tag", {
            scrollTrigger: { trigger: ".tags-container", start: "top 85%" },
            opacity: 0, stagger: 0.1, duration: 0.8, ease: "power2.out"
        });
    }

    if (document.querySelector(".baking-art-section")) {
        gsap.from(".baking-art-section", {
            scrollTrigger: { trigger: ".baking-art-section", start: "top 80%" },
            opacity: 0, y: 100, duration: 1.2, ease: "power4.out"
        });
        gsap.from(".art-left img", {
            scrollTrigger: { trigger: ".baking-art-section", start: "top 70%" },
            scale: 0.8, rotate: -5, opacity: 0, duration: 1.5, ease: "elastic.out(1, 0.75)"
        });
    }

    if (document.querySelector(".art-right")) {
        gsap.from(".art-right > *", {
            scrollTrigger: { trigger: ".art-right", start: "top 85%" },
            opacity: 0, x: 50, stagger: 0.2, duration: 1
        });
    }

    if (document.querySelector(".product-gallery-simple")) {
        gsap.from(".product-card-simple", {
            scrollTrigger: { trigger: ".product-gallery-simple", start: "top 85%" },
            opacity: 0, y: 60, stagger: 0.2, duration: 1, ease: "power4.out"
        });
    }

    // Bread basket floating checks
    if (document.querySelector(".featured-bread-img")) {
        gsap.to(".featured-bread-img", { y: -15, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }
    if (document.querySelector(".bread-bottom-img")) {
        gsap.to(".bread-bottom-img", { y: "+=10", rotate: "+=5", duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5 });
    }
    // --- Carousel Navigation Logic ---
    const track = document.querySelector(".gallery-track");
    const nextBtn = document.querySelector(".nav-btn.next");
    const prevBtn = document.querySelector(".nav-btn.prev");
    const cards = document.querySelectorAll(".product-card-simple");

    if (track && nextBtn && prevBtn && cards.length > 0) {
        let currentIndex = 0;
        const totalCards = cards.length;
        
        // Function to determine how many cards are visible based on screen width
        const getCardsToShow = () => {
            if (window.innerWidth <= 768) return 1;
            if (window.innerWidth <= 1024) return 2;
            return 3;
        };

        function updateCarousel() {
            const cardsToShow = getCardsToShow();
            // Clamp currentIndex to prevent sliding too far
            if (currentIndex > totalCards - cardsToShow) {
                currentIndex = Math.max(0, totalCards - cardsToShow);
            }

            const cardWidth = cards[0].getBoundingClientRect().width;
            const gap = parseFloat(getComputedStyle(track).gap) || 48;
            const moveDistance = (cardWidth + gap) * currentIndex;
            
            track.style.transform = `translateX(-${moveDistance}px)`;
            
            // Update button states (optional opacity/disabled)
            prevBtn.style.opacity = currentIndex === 0 ? "0.5" : "1";
            nextBtn.style.opacity = currentIndex >= totalCards - cardsToShow ? "0.5" : "1";
        }

        nextBtn.addEventListener("click", () => {
            const cardsToShow = getCardsToShow();
            if (currentIndex < totalCards - cardsToShow) {
                currentIndex++;
                updateCarousel();
            }
        });

        prevBtn.addEventListener("click", () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });

        // Initialize button states
        updateCarousel();

        // Update on resize to maintain correct spacing
        window.addEventListener("resize", updateCarousel);
    }

    // --- Mobile Menu Toggle Logic ---
    const mobileBtn = document.querySelector(".mobile-menu-btn");
    const closeBtn = document.querySelector(".close-menu-btn");
    const overlay = document.querySelector(".mobile-nav-overlay");
    const links = document.querySelectorAll(".mobile-nav-links a");

    if (mobileBtn && closeBtn && overlay) {
        mobileBtn.addEventListener("click", () => {
            overlay.classList.add("active");
            document.body.style.overflow = "hidden";
        });

        closeBtn.addEventListener("click", () => {
            overlay.classList.remove("active");
            document.body.style.overflow = "auto";
        });

        links.forEach(link => {
            link.addEventListener("click", () => {
                overlay.classList.remove("active");
                document.body.style.overflow = "auto";
            });
        });
    }
});
