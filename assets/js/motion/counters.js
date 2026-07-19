/* ==========================================================================
   The Falcon Tour — Counters Motion (Stage 2: Global Components)
   Count-up via gsap.to({val}, {onUpdate, scrollTrigger:{once:true}}).
   Targets .stat elements; reads target number from data-count or the
   element's existing text content (digits only, preserves suffix like "+").
   ========================================================================== */

(function (window, document) {
  "use strict";

  if (!(window.TFT && window.TFT.Motion)) return;

  window.TFT.Motion.register("counters", function (state, tokens, gsap, ScrollTrigger) {
    var stats = document.querySelectorAll(".stat, [data-count]");
    if (!stats.length || !gsap) return;

    stats.forEach(function (el) {
      var raw = el.getAttribute("data-count") || el.textContent || "";
      var match = raw.match(/-?[\d,.]+/);
      if (!match) return;

      var target = parseFloat(match[0].replace(/,/g, ""));
      if (isNaN(target)) return;

      var prefix = raw.slice(0, match.index);
      var suffix = raw.slice(match.index + match[0].length);
      var decimals = (match[0].split(".")[1] || "").length;

      if (!state.allowReveal) {
        el.textContent = prefix + target + suffix;
        return;
      }

      var counter = { val: 0 };
      el.textContent = prefix + "0" + suffix;

      gsap.to(counter, {
        val: target,
        duration: tokens.duration.slow,
        ease: tokens.ease.out,
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true,
        },
        onUpdate: function () {
          var v = decimals ? counter.val.toFixed(decimals) : Math.round(counter.val);
          el.textContent = prefix + v.toLocaleString() + suffix;
        },
        onComplete: function () {
          el.textContent = prefix + target.toLocaleString() + suffix;
        },
      });
    });
  });
})(window, document);
