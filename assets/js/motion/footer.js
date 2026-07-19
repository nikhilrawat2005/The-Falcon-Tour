/* ==========================================================================
   The Falcon Tour — Footer Motion (Stage 2: Global Components)
   Fade-up on enter, once:true. Targets <footer> directly (no markup change
   needed — footer tag/id/class is universal across all 171 pages).
   ========================================================================== */

(function (window, document) {
  "use strict";

  if (!(window.TFT && window.TFT.Motion)) return;

  window.TFT.Motion.register("footer", function (state, tokens, gsap, ScrollTrigger) {
    var footer = document.querySelector("footer");
    if (!footer || !gsap) return;

    if (!state.allowReveal) return; // final state only, no animation

    gsap.set(footer, { autoAlpha: 0, y: 32 });
    gsap.to(footer, {
      autoAlpha: 1,
      y: 0,
      duration: tokens.duration.base,
      ease: tokens.ease.out,
      scrollTrigger: {
        trigger: footer,
        start: "top 90%",
        once: true,
      },
    });
  });
})(window, document);
