/* ==========================================================================
   The Falcon Tour — Buttons Motion (Stage 2: Global Components)
   - Magnetic hover: desktop-only (allowFx), ported from legacy mousemove
     magnetic handler.
   - Press-scale on pointerdown/pointerup: all devices, tiny + safe.
   ========================================================================== */

(function (window, document) {
  "use strict";

  if (!(window.TFT && window.TFT.Motion)) return;

  window.TFT.Motion.register("buttons", function (state, tokens, gsap, ScrollTrigger) {
    var buttons = document.querySelectorAll(".btn-primary, .btn-outline, .btn-dark, .magnetic");
    if (!buttons.length || !gsap) return;

    buttons.forEach(function (btn) {
      btn.setAttribute("data-motion-fx", "");

      /* Magnetic hover — desktop only, re-checked live via onChange below */
      function onMove(e) {
        if (!window.TFT.Motion.getState().allowFx) return;
        var r = btn.getBoundingClientRect();
        var mx = (e.clientX - r.left - r.width / 2) * 0.25;
        var my = (e.clientY - r.top - r.height / 2) * 0.3;
        gsap.to(btn, { x: mx, y: my, duration: 0.3, ease: tokens.ease.soft });
      }
      function onLeave() {
        gsap.to(btn, { x: 0, y: 0, duration: tokens.duration.fast, ease: tokens.ease.out });
      }
      btn.addEventListener("mousemove", onMove);
      btn.addEventListener("mouseleave", onLeave);

      /* Press-scale — works everywhere, no fx gating (purely a tap/click
         acknowledgment, not decorative parallax-class motion) */
      btn.addEventListener("pointerdown", function () {
        gsap.to(btn, { scale: 0.96, duration: 0.12, ease: tokens.ease.out });
      });
      var release = function () {
        gsap.to(btn, { scale: 1, duration: 0.2, ease: tokens.ease.out });
      };
      btn.addEventListener("pointerup", release);
      btn.addEventListener("pointercancel", release);
    });

    /* If fx gets turned off mid-session (media query change), snap back */
    window.TFT.Motion.onChange(function (newState) {
      if (!newState.allowFx) {
        buttons.forEach(function (btn) {
          gsap.set(btn, { x: 0, y: 0 });
        });
      }
    });
  });
})(window, document);
