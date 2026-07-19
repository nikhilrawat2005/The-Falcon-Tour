/* ==========================================================================
   The Falcon Tour — Reveal + Tilt Motion (Stage 5: Final QA pass)
   --------------------------------------------------------------------------
   Replaces the legacy, ungated listeners in assets/js/journal.js that were
   still double-driving these same elements on destinations/*, activities/*
   and packages/trip-*.html pages alongside the Stage 2 component scripts
   (navbar/footer/buttons/images/counters already loaded there). journal.js
   is no longer included on those pages — see chrome-fx.js for the cursor
   ring/dot + scroll-progress bits that were the only genuinely unique
   pieces of journal.js worth keeping.

   1. `.reveal` — generic fade-up-on-scroll for headings/blocks that aren't
      `.img-slot` and aren't already animated by another registered
      component (`.pkg-card-list`/`.dest-card`/`.activity-card` grid items
      get their entrance from listing.js's own ScrollTrigger stagger —
      double-tagging them here would fight that GSAP tween with a second,
      CSS-transition-driven one). Uses the existing CSS transition in
      journal.css (`.reveal` / `.reveal.is-visible`) via a class toggle, so
      this stays a plain IntersectionObserver (no GSAP tween needed) but now
      respects reduced-motion (final state applied instantly, never
      observed) and never runs twice.
   2. `.tilt` — desktop-only 3D hover tilt, gated to allowFx (never on
      touch, never with reduced-motion, never with save-data). Same grid-item
      exclusion as `.reveal` above: listing.js already gives
      `.pkg-card-list`/`.dest-card`/`.activity-card` their own hover
      lift+scale, so a second transform-driven hover here would fight it.
   ========================================================================== */

(function (window, document) {
  "use strict";

  if (!(window.TFT && window.TFT.Motion)) return;

  window.TFT.Motion.register("reveal-tilt", function (state, tokens, gsap, ScrollTrigger) {
    /* ------------------------------------------------------------------
     * 1. .reveal fade-up
     * ---------------------------------------------------------------- */
    var revealEls = document.querySelectorAll(
      ".reveal:not(.img-slot):not(.pkg-card-list):not(.dest-card):not(.activity-card)"
    );

    if (revealEls.length) {
      if (!state.allowReveal) {
        revealEls.forEach(function (el) {
          el.classList.add("is-visible");
        });
      } else if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                io.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.15 }
        );
        revealEls.forEach(function (el) {
          io.observe(el);
        });
      } else {
        // no IntersectionObserver support: show immediately, no motion
        revealEls.forEach(function (el) {
          el.classList.add("is-visible");
        });
      }
    }

    /* ------------------------------------------------------------------
     * 2. .tilt — desktop-only decorative fx
     * ---------------------------------------------------------------- */
    var tiltEls = document.querySelectorAll(".tilt:not(.pkg-card-list):not(.dest-card):not(.activity-card)");
    if (!tiltEls.length) return;

    tiltEls.forEach(function (card) {
      card.setAttribute("data-motion-fx", "");
      if (!state.allowFx) return;

      var rotateX = gsap && gsap.quickTo ? gsap.quickTo(card, "rotationX", { duration: 0.4, ease: tokens.ease.soft }) : null;
      var rotateY = gsap && gsap.quickTo ? gsap.quickTo(card, "rotationY", { duration: 0.4, ease: tokens.ease.soft }) : null;
      var liftY = gsap && gsap.quickTo ? gsap.quickTo(card, "y", { duration: 0.4, ease: tokens.ease.soft }) : null;

      function onMove(e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        if (rotateX && rotateY && liftY) {
          rotateX(py * -8);
          rotateY(px * 8);
          liftY(-4);
        }
      }

      function onLeave() {
        if (rotateX && rotateY && liftY) {
          rotateX(0);
          rotateY(0);
          liftY(0);
        }
      }

      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", onLeave);
    });
  });
})(window, document);
