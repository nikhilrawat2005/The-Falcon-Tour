/* ==========================================================================
   The Falcon Tour — Navbar Motion (Stage 2: Global Components)
   --------------------------------------------------------------------------
   - On-load fade/slide-down (once).
   - Header always keeps the dark "scrolled" background so page content
     (breadcrumb etc.) never overlaps a transparent taller header.
   - Mobile-nav panel slide + stagger of nav links.
   - Burger icon morph (class toggle driven, CSS handles the visual morph).
   ========================================================================== */

(function (window, document) {
  "use strict";

  if (!(window.TFT && window.TFT.Motion)) return;

  window.TFT.Motion.register("navbar", function (state, tokens, gsap, ScrollTrigger) {
    var header = document.getElementById("siteHeader");
    if (!header) return;

    /* 1. On-load entrance (once, respects reduced motion) */
    if (state.allowReveal && gsap) {
      gsap.fromTo(
        header,
        { y: -24, opacity: 0 },
        { y: 0, opacity: 1, duration: tokens.duration.base, ease: tokens.ease.out }
      );
    }

    /* 2. Header always keeps the compact dark "scrolled" state, so the
       breadcrumb / page content never slides under a taller transparent
       header near the top of the page. */
    header.classList.add("scrolled");

    /* 3. Mobile nav open/close */
    var burger = document.getElementById("burgerBtn");
    var mobileNav = document.getElementById("mobileNav");
    var mobileNavClose = document.getElementById("mobileNavClose");
    if (!burger || !mobileNav) return;

    var navLinks = mobileNav.querySelectorAll("a");
    var isOpen = false;

    function openNav() {
      isOpen = true;
      mobileNav.style.display = "block";
      burger.classList.add("is-open");
      burger.setAttribute("aria-label", "Close menu");
      burger.setAttribute("aria-expanded", "true");
      if (gsap && state.allowReveal) {
        gsap.fromTo(
          mobileNav,
          { x: 24, opacity: 0 },
          { x: 0, opacity: 1, duration: tokens.duration.fast, ease: tokens.ease.out }
        );
        if (navLinks.length) {
          gsap.fromTo(
            navLinks,
            { y: 12, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: tokens.duration.fast,
              ease: tokens.ease.out,
              stagger: tokens.stagger.tight,
              delay: 0.05,
            }
          );
        }
      }
    }

    function closeNav() {
      isOpen = false;
      burger.classList.remove("is-open");
      burger.setAttribute("aria-label", "Open menu");
      burger.setAttribute("aria-expanded", "false");
      if (gsap && state.allowReveal) {
        gsap.to(mobileNav, {
          x: 24,
          opacity: 0,
          duration: tokens.duration.fast,
          ease: tokens.ease.inOut,
          onComplete: function () {
            mobileNav.style.display = "none";
          },
        });
      } else {
        mobileNav.style.display = "none";
      }
    }

    burger.addEventListener("click", function () {
      if (isOpen) closeNav();
      else openNav();
    });

    if (mobileNavClose) {
      mobileNavClose.addEventListener("click", closeNav);
    }

    navLinks.forEach(function (a) {
      a.addEventListener("click", closeNav);
    });
  });
})(window, document);
