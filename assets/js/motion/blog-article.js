/* ==========================================================================
   The Falcon Tour — Blog / Journal Article Motion (Stage 5: lightest touch)
   --------------------------------------------------------------------------
   Runs on: blogs/ subfolders' article pages (any depth). Every selector is
   guarded, so this is a safe no-op on any page that doesn't have the matching markup
   (including blogs/index.html, which has its own hero/grid already handled
   by images.js + reveal-tilt.js).

   Deliberately NOT animated: body copy, paragraph text, blockquote text,
   list items inside `.blog-content`, and the `.blog-faq` question/answer
   `<details>` disclosures themselves (native, left alone) — long-form
   reading pages should stay calm. Only entrance framing gets motion.

   1. Article hero image (`.blog-hero-img`): fade+scale-in only, no
      parallax.
   2. Related-guides block (`.blog-related`): fade-up on enter.
   3. FAQ section container (`.blog-faq`): fade-up on enter — the heading
      and the details wrapper as one block, not each Q&A individually.
   ========================================================================== */

(function (window, document) {
  "use strict";

  if (!(window.TFT && window.TFT.Motion)) return;

  window.TFT.Motion.register("blog-article", function (state, tokens, gsap, ScrollTrigger) {
    if (!gsap) return;

    var targets = [
      document.querySelector(".blog-hero-img"),
      document.querySelector(".blog-related"),
      document.querySelector(".blog-faq"),
    ].filter(Boolean);

    if (!targets.length) return;

    targets.forEach(function (el) {
      var isHero = el.classList.contains("blog-hero-img");
      var fromVars = isHero ? { autoAlpha: 0, scale: 1.03 } : { autoAlpha: 0, y: 20 };
      var toVars = isHero ? { autoAlpha: 1, scale: 1 } : { autoAlpha: 1, y: 0 };

      if (state.allowReveal && ScrollTrigger) {
        gsap.set(el, fromVars);
        gsap.to(
          el,
          Object.assign({}, toVars, {
            duration: tokens.duration.base,
            ease: tokens.ease.out,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          })
        );
      } else {
        gsap.set(el, { autoAlpha: 1, scale: 1, y: 0 });
      }
    });
  });
})(window, document);
