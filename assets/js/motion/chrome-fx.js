/* ==========================================================================
   The Falcon Tour — Chrome FX Motion (Stage 5: Final QA pass)
   --------------------------------------------------------------------------
   The only two pieces of legacy journal.js that weren't already duplicated
   by Stage 2 component scripts: the custom cursor ring/dot, and the
   scroll-progress bar. Ported here so journal.js can be removed from every
   page without losing them.

   1. Custom cursor (#cursorDot / #cursorRing): desktop-only decorative fx
      (gated to allowFx). journal.css already hides these via
      `@media (hover:none), (max-width:980px)`, so this only adds the
      reduced-motion / save-data gate on top of the existing touch gate.
   2. Scroll-progress bar (#scrollProgress): not decorative fx — it's a
      position indicator, not a movement effect — so it runs regardless of
      motion preference, same as before. Left as plain scroll-linked width,
      no GSAP needed.
   ========================================================================== */

(function (window, document) {
  "use strict";

  if (!(window.TFT && window.TFT.Motion)) return;

  window.TFT.Motion.register("chrome-fx", function (state, tokens, gsap) {
    /* ------------------------------------------------------------------
     * 1. Custom cursor
     * ---------------------------------------------------------------- */
    var cursorDot = document.getElementById("cursorDot");
    var cursorRing = document.getElementById("cursorRing");

    if (cursorDot && cursorRing) {
      cursorDot.setAttribute("data-motion-fx", "");
      cursorRing.setAttribute("data-motion-fx", "");

      if (state.allowFx) {
        var mx = 0,
          my = 0,
          rx = 0,
          ry = 0;

        window.addEventListener("mousemove", function (e) {
          mx = e.clientX;
          my = e.clientY;
          cursorDot.style.left = mx + "px";
          cursorDot.style.top = my + "px";
        });

        (function loop() {
          rx += (mx - rx) * 0.16;
          ry += (my - ry) * 0.16;
          cursorRing.style.left = rx + "px";
          cursorRing.style.top = ry + "px";
          requestAnimationFrame(loop);
        })();

        document.querySelectorAll("a, button, .dest-pill, .tilt").forEach(function (el) {
          el.addEventListener("mouseenter", function () {
            cursorRing.classList.add("grow");
          });
          el.addEventListener("mouseleave", function () {
            cursorRing.classList.remove("grow");
          });
        });
      }
    }

    /* ------------------------------------------------------------------
     * 2. Scroll-progress bar
     * ---------------------------------------------------------------- */
    var progressBar = document.getElementById("scrollProgress");
    if (progressBar && window.CSS && !CSS.supports("animation-timeline", "scroll()")) {
      window.addEventListener(
        "scroll",
        function () {
          var h = document.documentElement;
          var scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
          progressBar.style.width = scrolled + "%";
        },
        { passive: true }
      );
    }
  });
})(window, document);
