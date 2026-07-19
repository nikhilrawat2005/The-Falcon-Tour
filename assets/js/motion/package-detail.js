/* ==========================================================================
   The Falcon Tour — Package Detail Motion (Stage 3: Package Detail Pages)
   --------------------------------------------------------------------------
   Runs only on pages that have the relevant markup (packages/package-*.html,
   packages/trip-*.html) — every selector is guarded, so this is a safe no-op
   anywhere else.

   1. Hero image (.pkg-hero-bg): fade+scale-in on load, desktop-only parallax.
   2. Itinerary (.timeline .tl-day): converted at runtime into an accordion
      (day 1 open, rest collapsed) — GSAP height tween + chevron rotate.
      Markup is transformed into the .tl-day-accordion / .tl-accordion-trigger
      / .tl-accordion-content / .tl-accordion-icon structure already defined
      in assets/css/package-detail.css, so ~40 varied page sources don't all
      need hand editing.
   3. Inclusions/exclusions (.inc-exc .inc-item): staggered fade-up on enter.
   4. Gallery (.gallery-grid .g-item): staggered fade-in grid on enter
      (existing lightbox click-handler on the images is untouched).
   5. Sticky sidebar (.pkg-sidebar .sidebar-card): fade-up on enter. The
      "sticky" behaviour itself is plain CSS (`position: sticky`) already —
      no ScrollTrigger pin needed, so nothing fights the mobile layout.
   ========================================================================== */

(function (window, document) {
  "use strict";

  if (!(window.TFT && window.TFT.Motion)) return;

  window.TFT.Motion.register("package-detail", function (state, tokens, gsap, ScrollTrigger) {
    if (!gsap) return;

    /* ------------------------------------------------------------------
     * 1. Hero image
     * ---------------------------------------------------------------- */
    var heroBg = document.querySelector(".pkg-hero-bg");
    if (heroBg) {
      if (state.allowReveal) {
        gsap.fromTo(
          heroBg,
          { autoAlpha: 0, scale: 1.08 },
          { autoAlpha: 1, scale: 1, duration: tokens.duration.slow, ease: tokens.ease.out }
        );
      } else {
        gsap.set(heroBg, { autoAlpha: 1, scale: 1 });
      }

      if (ScrollTrigger) {
        heroBg.setAttribute("data-motion-fx", "");
        if (state.allowFx) {
          var heroSection = heroBg.closest(".pkg-hero") || heroBg;
          gsap.to(heroBg, {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: heroSection,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      }
    }

    /* ------------------------------------------------------------------
     * 2. Itinerary accordion
     * ---------------------------------------------------------------- */
    var days = document.querySelectorAll(".timeline .tl-day");

    days.forEach(function (day, i) {
      var right = day.querySelector(".tl-right");
      var title = right && right.querySelector(".tl-title");
      if (!right || !title || day.classList.contains("tl-day-accordion")) return;

      var label = right.querySelector(".tl-day-label");
      var desc = right.querySelector(".tl-desc");
      var highlights = right.querySelector(".tl-highlights");

      day.classList.add("tl-day-accordion");

      var trigger = document.createElement("div");
      trigger.className = "tl-accordion-trigger";
      trigger.setAttribute("role", "button");
      trigger.setAttribute("tabindex", "0");

      var headWrap = document.createElement("div");
      headWrap.className = "tl-accordion-head";
      if (label) headWrap.appendChild(label);
      headWrap.appendChild(title);

      var icon = document.createElement("span");
      icon.className = "tl-accordion-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = "+";

      trigger.appendChild(headWrap);
      trigger.appendChild(icon);

      var content = document.createElement("div");
      content.className = "tl-accordion-content";
      if (desc) content.appendChild(desc);
      if (highlights) content.appendChild(highlights);

      right.innerHTML = "";
      right.appendChild(trigger);
      right.appendChild(content);

      var isFirst = i === 0;
      trigger.setAttribute("aria-expanded", isFirst ? "true" : "false");
      if (isFirst) {
        day.classList.add("is-expanded");
        gsap.set(content, { height: "auto", opacity: 1, autoAlpha: 1 });
      } else {
        gsap.set(content, { height: 0, opacity: 0 });
      }

      var open = isFirst;

      function toggle() {
        open = !open;
        day.classList.toggle("is-expanded", open);
        trigger.setAttribute("aria-expanded", open ? "true" : "false");

        if (!state.allowReveal) {
          gsap.set(content, { height: open ? "auto" : 0, opacity: open ? 1 : 0 });
          gsap.set(icon, { rotate: open ? 45 : 0 });
          return;
        }

        if (open) {
          var targetHeight = content.scrollHeight;
          gsap.fromTo(
            content,
            { height: 0, opacity: 0 },
            {
              height: targetHeight,
              opacity: 1,
              duration: tokens.duration.base,
              ease: tokens.ease.inOut,
              onComplete: function () {
                if (open) content.style.height = "auto";
              },
            }
          );
        } else {
          gsap.to(content, {
            height: 0,
            opacity: 0,
            duration: tokens.duration.base,
            ease: tokens.ease.inOut,
          });
        }
        gsap.to(icon, { rotate: open ? 45 : 0, duration: tokens.duration.base, ease: tokens.ease.inOut });
      }

      trigger.addEventListener("click", toggle);
      trigger.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      });

      // Subtle fade-up reveal for the whole day card as it scrolls in.
      if (ScrollTrigger && state.allowReveal) {
        gsap.fromTo(
          day,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: tokens.duration.base,
            ease: tokens.ease.out,
            scrollTrigger: { trigger: day, start: "top 92%", once: true },
          }
        );
      } else {
        gsap.set(day, { autoAlpha: 1, y: 0 });
      }
    });

    /* ------------------------------------------------------------------
     * 3. Inclusions / exclusions checklist
     * ---------------------------------------------------------------- */
    document.querySelectorAll(".inc-exc").forEach(function (box) {
      var items = box.querySelectorAll(".inc-item");
      if (!items.length) return;

      if (state.allowReveal && ScrollTrigger) {
        gsap.set(items, { autoAlpha: 0, y: 14 });
        gsap.to(items, {
          autoAlpha: 1,
          y: 0,
          duration: tokens.duration.base,
          ease: tokens.ease.out,
          stagger: tokens.stagger.base,
          scrollTrigger: { trigger: box, start: "top 88%", once: true },
        });
      } else {
        gsap.set(items, { autoAlpha: 1, y: 0 });
      }
    });

    /* ------------------------------------------------------------------
     * 4. Gallery grid (lightbox click handler on .g-item img is untouched)
     * ---------------------------------------------------------------- */
    document.querySelectorAll(".gallery-grid").forEach(function (grid) {
      var items = grid.querySelectorAll(".g-item");
      if (!items.length) return;

      if (state.allowReveal && ScrollTrigger) {
        gsap.set(items, { autoAlpha: 0, y: 20 });
        gsap.to(items, {
          autoAlpha: 1,
          y: 0,
          duration: tokens.duration.base,
          ease: tokens.ease.out,
          stagger: tokens.stagger.tight,
          scrollTrigger: { trigger: grid, start: "top 90%", once: true },
        });
      } else {
        gsap.set(items, { autoAlpha: 1, y: 0 });
      }
    });

    /* ------------------------------------------------------------------
     * 5. Sticky sidebar / booking card (sticky positioning is plain CSS —
     *    only the entrance fade is animated here)
     * ---------------------------------------------------------------- */
    var sidebarCard = document.querySelector(".pkg-sidebar .sidebar-card");
    if (sidebarCard) {
      if (state.allowReveal && ScrollTrigger) {
        gsap.set(sidebarCard, { autoAlpha: 0, y: 24 });
        gsap.to(sidebarCard, {
          autoAlpha: 1,
          y: 0,
          duration: tokens.duration.base,
          ease: tokens.ease.out,
          scrollTrigger: { trigger: sidebarCard, start: "top 95%", once: true },
        });
      } else {
        gsap.set(sidebarCard, { autoAlpha: 1, y: 0 });
      }
    }
  });
})(window, document);
