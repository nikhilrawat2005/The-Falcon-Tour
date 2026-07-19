/* ==========================================================================
   The Falcon Tour — Images Motion (Stage 2: Global Components)
   - .img-slot (hero/card images): fade+scale-in on scroll enter, once:true.
   - #heroParallax (home hero, ported from legacy Motion One parallax):
     subtle scroll parallax, gated to allowFx + desktop only.
   ========================================================================== */

(function (window, document) {
  "use strict";

  if (!(window.TFT && window.TFT.Motion)) return;

  window.TFT.Motion.register("images", function (state, tokens, gsap, ScrollTrigger) {
    if (!gsap) return;

    /* 1. Generic fade+scale-in for all img-slot elements */
    var slots = document.querySelectorAll(".img-slot");
    if (slots.length && state.allowReveal) {
      slots.forEach(function (slot) {
        gsap.set(slot, { autoAlpha: 0, scale: 1.04 });
        gsap.to(slot, {
          autoAlpha: 1,
          scale: 1,
          duration: tokens.duration.base,
          ease: tokens.ease.out,
          scrollTrigger: {
            trigger: slot,
            start: "top 88%",
            once: true,
          },
        });
      });
    } else if (slots.length) {
      // reduced motion: ensure final visible state, no animation
      slots.forEach(function (slot) {
        gsap.set(slot, { autoAlpha: 1, scale: 1 });
      });
    }

    /* 2. Hero parallax — desktop-only decorative fx */
    var heroParallax = document.getElementById("heroParallax");
    if (heroParallax && ScrollTrigger) {
      heroParallax.setAttribute("data-motion-fx", "");
      if (state.allowFx) {
        gsap.to(heroParallax, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: heroParallax,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }
  });
})(window, document);
