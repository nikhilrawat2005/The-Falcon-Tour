/* ==========================================================================
   The Falcon Tour — Listing Pages Motion (Stage 4: Listing Pages Parity)
   --------------------------------------------------------------------------
   Runs on: packages/index.html, destinations/index.html, activities/index.html,
   why-us/index.html. Every selector is guarded, so this is a safe no-op on
   any page that doesn't have the matching markup.

   1. Index hero (.idx-hero): fade+up entrance on load, parity with the
      home hero treatment (no image here, so no scale/parallax needed).
   2. Card grids: staggered fade-up on scroll enter, once:true. Covers
      packages (.pkgs-grid .pkg-card-list), destinations
      (.dest-grid-cards .dest-card), activities (.activities-grid .activity-card).
   3. Card hover: image scale + shadow-lift, desktop-only (data-motion-fx).
      Replaces the old ad-hoc 3D `.tilt` mousemove handler with a single
      lightweight GSAP hover that respects allowFx gating everywhere.
   4. Filter pills (.filter-container .filter-pill): active-state underline
      slides via GSAP instead of an instant class swap.
   5. Package filtering (window.filterPackages): re-implemented on GSAP so
      the legacy Motion One (`motion@11`) dependency can be removed from
      packages/index.html.
   6. Why Us feature rows (.why-item): alternating slide-in-from-side on
      scroll enter (even rows from the left, odd rows from the right).
   ========================================================================== */

(function (window, document) {
  "use strict";

  if (!(window.TFT && window.TFT.Motion)) return;

  window.TFT.Motion.register("listing", function (state, tokens, gsap, ScrollTrigger) {
    if (!gsap) return;

    /* ------------------------------------------------------------------
     * 1. Index hero entrance
     * ---------------------------------------------------------------- */
    var hero = document.querySelector(".idx-hero .wrap");
    if (hero) {
      if (state.allowReveal) {
        gsap.fromTo(
          hero,
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: tokens.duration.slow, ease: tokens.ease.out }
        );
      } else {
        gsap.set(hero, { autoAlpha: 1, y: 0 });
      }
    }

    /* ------------------------------------------------------------------
     * 2 & 3. Card grids — staggered reveal + hover fx
     * ---------------------------------------------------------------- */
    var gridConfigs = [
      { grid: ".pkgs-grid", item: ".pkg-card-list" },
      { grid: ".dest-grid-cards", item: ".dest-card" },
      { grid: ".activities-grid", item: ".activity-card" },
    ];

    gridConfigs.forEach(function (cfg) {
      document.querySelectorAll(cfg.grid).forEach(function (grid) {
        var cards = grid.querySelectorAll(cfg.item);
        if (!cards.length) return;

        if (state.allowReveal && ScrollTrigger) {
          gsap.set(cards, { autoAlpha: 0, y: 24 });
          gsap.to(cards, {
            autoAlpha: 1,
            y: 0,
            duration: tokens.duration.base,
            ease: tokens.ease.out,
            stagger: tokens.stagger.base,
            scrollTrigger: { trigger: grid, start: "top 88%", once: true },
          });
        } else {
          gsap.set(cards, { autoAlpha: 1, y: 0 });
        }

        cards.forEach(function (card) {
          card.setAttribute("data-motion-fx", "");
          if (!state.allowFx) return;

          var media = card.querySelector(
            ".trip-card-media, .trip-card-media-front, .card-overlay, img"
          );

          card.addEventListener("mouseenter", function () {
            gsap.to(card, { y: -6, boxShadow: "0 24px 48px rgba(0,0,0,0.18)", duration: tokens.duration.fast, ease: tokens.ease.out });
            if (media) gsap.to(media, { scale: 1.06, duration: tokens.duration.fast, ease: tokens.ease.out });
          });
          card.addEventListener("mouseleave", function () {
            gsap.to(card, { y: 0, boxShadow: "0 0px 0px rgba(0,0,0,0)", duration: tokens.duration.fast, ease: tokens.ease.out });
            if (media) gsap.to(media, { scale: 1, duration: tokens.duration.fast, ease: tokens.ease.out });
          });
        });
      });
    });

    /* ------------------------------------------------------------------
     * 4. Filter pills — active-state swap driven by GSAP (not the CSS
     *    `transition: all .25s ease` catch-all) so it uses the shared
     *    easing tokens. Pills here are filled-background toggles, not
     *    underlined tabs, so the "slide" is a colour/border cross-fade
     *    rather than a moving bar — same intent, matched to the design.
     * ---------------------------------------------------------------- */
    var filterContainer = document.querySelector(".filter-container");
    if (filterContainer && state.allowReveal) {
      var pillActiveVars = { backgroundColor: "var(--ink)", borderColor: "var(--ink)", color: "var(--cream)" };
      var pillIdleVars = { backgroundColor: "rgba(0,0,0,0)", borderColor: "var(--line)", color: "var(--text-dark)" };

      filterContainer.querySelectorAll(".filter-pill").forEach(function (pill) {
        pill.addEventListener("click", function () {
          var allPills = filterContainer.querySelectorAll(".filter-pill");
          allPills.forEach(function (p) {
            gsap.to(p, Object.assign({}, p === pill ? pillActiveVars : pillIdleVars, {
              duration: tokens.duration.fast,
              ease: tokens.ease.inOut,
            }));
          });
        });
      });
    }

    /* ------------------------------------------------------------------
     * 5. Package filtering — GSAP replacement for the old Motion One
     *    implementation (removes the motion@11 CDN dependency).
     * ---------------------------------------------------------------- */
    if (document.querySelector(".pkgs-grid")) {
      window.filterPackages = function (category, element) {
        document.querySelectorAll(".filter-pill").forEach(function (btn) {
          btn.classList.remove("active");
        });
        if (element) element.classList.add("active");

        document.querySelectorAll(".pkg-section-group").forEach(function (sec) {
          var cards = Array.prototype.slice.call(sec.querySelectorAll(".pkg-card-list"));
          var toShow = [];
          var toHide = [];

          cards.forEach(function (card) {
            var cats = (card.getAttribute("data-categories") || "").split(" ");
            if (category === "all" || cats.indexOf(category) !== -1) {
              toShow.push(card);
            } else {
              toHide.push(card);
            }
          });

          if (toHide.length) {
            if (state.allowReveal) {
              gsap.to(toHide, {
                autoAlpha: 0,
                scale: 0.94,
                y: 15,
                duration: tokens.duration.fast,
                ease: "power1.in",
                onComplete: function () {
                  toHide.forEach(function (c) { c.style.display = "none"; });
                },
              });
            } else {
              toHide.forEach(function (c) { c.style.display = "none"; });
            }
          }

          if (toShow.length) {
            toShow.forEach(function (c) { c.style.display = "block"; });
            if (state.allowReveal) {
              gsap.fromTo(
                toShow,
                { autoAlpha: 0.4, scale: 0.96, y: 12 },
                {
                  autoAlpha: 1,
                  scale: 1,
                  y: 0,
                  duration: tokens.duration.base,
                  ease: tokens.ease.out,
                  stagger: tokens.stagger.tight,
                }
              );
            } else {
              gsap.set(toShow, { autoAlpha: 1, scale: 1, y: 0 });
            }
          }

          if (toShow.length > 0) {
            sec.style.display = "block";
            gsap.set(sec, { autoAlpha: 1, height: "auto" });
          } else {
            if (state.allowReveal) {
              gsap.to(sec, {
                autoAlpha: 0,
                height: 0,
                duration: tokens.duration.fast,
                ease: "power1.in",
                onComplete: function () { sec.style.display = "none"; },
              });
            } else {
              sec.style.display = "none";
            }
          }
        });

        if (ScrollTrigger) ScrollTrigger.refresh();
      };
    }

    /* ------------------------------------------------------------------
     * 6. Why Us feature rows — alternating slide-in-from-side
     * ---------------------------------------------------------------- */
    var whyItems = document.querySelectorAll(".why-list .why-item");
    if (whyItems.length) {
      whyItems.forEach(function (item, i) {
        var fromX = i % 2 === 0 ? -32 : 32;
        if (state.allowReveal && ScrollTrigger) {
          gsap.fromTo(
            item,
            { autoAlpha: 0, x: fromX },
            {
              autoAlpha: 1,
              x: 0,
              duration: tokens.duration.base,
              ease: tokens.ease.out,
              scrollTrigger: { trigger: item, start: "top 90%", once: true },
            }
          );
        } else {
          gsap.set(item, { autoAlpha: 1, x: 0 });
        }
      });
    }

    var whyLeft = document.querySelector(".why-left");
    if (whyLeft) {
      if (state.allowReveal && ScrollTrigger) {
        gsap.fromTo(
          whyLeft,
          { autoAlpha: 0, x: -24 },
          {
            autoAlpha: 1,
            x: 0,
            duration: tokens.duration.base,
            ease: tokens.ease.out,
            scrollTrigger: { trigger: whyLeft, start: "top 90%", once: true },
          }
        );
      } else {
        gsap.set(whyLeft, { autoAlpha: 1, x: 0 });
      }
    }
  });
})(window, document);
