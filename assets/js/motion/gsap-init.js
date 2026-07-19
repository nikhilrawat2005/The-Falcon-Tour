/* ==========================================================================
   The Falcon Tour — Motion Foundation (GSAP + ScrollTrigger)
   Stage 1: Foundation & Hardening
   --------------------------------------------------------------------------
   This file ONLY sets up shared infrastructure. It does not add, remove,
   or change any visual animation. Per-component motion is added in later
   stages (2–5) and should be authored as separate files under
   assets/js/motion/, each registering itself through TFT.Motion below.
   ========================================================================== */

(function (window, document) {
  "use strict";

  if (window.TFT && window.TFT.Motion) return; // avoid double-init

  /* --------------------------------------------------------------------
   * 1. Register GSAP plugins (safe no-op if GSAP/ScrollTrigger missing)
   * ------------------------------------------------------------------ */
  var hasGSAP = typeof window.gsap !== "undefined";
  var hasST = typeof window.ScrollTrigger !== "undefined";

  if (hasGSAP && hasST) {
    window.gsap.registerPlugin(window.ScrollTrigger);
  }

  /* --------------------------------------------------------------------
   * 2. Capability / preference gating
   *    - prefers-reduced-motion: user has asked for no/definitely-less motion
   *    - coarse pointer (touch): heavier hover/parallax/tilt fx are skipped
   *    - saveData / slow connection: skip decorative-only motion
   * ------------------------------------------------------------------ */
  var reduceMotionMQ = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : { matches: false, addEventListener: function () {} };

  var coarsePointerMQ = window.matchMedia
    ? window.matchMedia("(pointer: coarse)")
    : { matches: false, addEventListener: function () {} };

  var saveData =
    !!(navigator.connection && navigator.connection.saveData) || false;

  function computeState() {
    return {
      reducedMotion: reduceMotionMQ.matches,
      coarsePointer: coarsePointerMQ.matches,
      saveData: saveData,
      // "fx" = the class of animations that are purely decorative
      // (parallax, tilt, magnetic buttons, cursor fx). These are gated
      // hardest. "reveal" = base scroll-reveal / fade-up motion, gated
      // only by reduced-motion.
      allowReveal: !reduceMotionMQ.matches,
      allowFx: !reduceMotionMQ.matches && !coarsePointerMQ.matches && !saveData,
    };
  }

  var state = computeState();
  var listeners = [];

  function notify() {
    state = computeState();
    listeners.forEach(function (fn) {
      try {
        fn(state);
      } catch (e) {
        /* never let one bad listener break the rest */
        console.error("[TFT.Motion] listener error", e);
      }
    });
    document.documentElement.classList.toggle("motion-reduced", !state.allowReveal);
    document.documentElement.classList.toggle("motion-fx-off", !state.allowFx);
  }

  if (reduceMotionMQ.addEventListener) {
    reduceMotionMQ.addEventListener("change", notify);
  }
  if (coarsePointerMQ.addEventListener) {
    coarsePointerMQ.addEventListener("change", notify);
  }

  /* --------------------------------------------------------------------
   * 3. Shared timing / easing tokens — single source of truth so every
   *    stage/component uses the same feel instead of inventing new ones.
   * ------------------------------------------------------------------ */
  var tokens = {
    ease: {
      out: "power3.out",
      inOut: "power2.inOut",
      soft: "power1.out",
    },
    duration: {
      fast: 0.35,
      base: 0.6,
      slow: 0.9,
    },
    stagger: {
      tight: 0.06,
      base: 0.1,
      loose: 0.16,
    },
    scrollTrigger: {
      start: "top 85%",
      once: true,
    },
  };

  /* --------------------------------------------------------------------
   * 4. Registry — components register an init function; init runs
   *    immediately if GSAP is ready, otherwise queues until ready.
   *    This keeps every page's markup/script order simple: just include
   *    gsap-init.js once, then any number of assets/js/motion/*.js files,
   *    each calling TFT.Motion.register(name, fn).
   * ------------------------------------------------------------------ */
  var registry = {};
  var ready = hasGSAP; // ScrollTrigger checked per-component if it needs scroll

  function register(name, fn) {
    if (registry[name]) return; // idempotent across duplicate includes
    registry[name] = fn;
    if (ready) runOne(name, fn);
  }

  function runOne(name, fn) {
    try {
      fn(state, tokens, window.gsap, window.ScrollTrigger);
    } catch (e) {
      console.error("[TFT.Motion] component failed: " + name, e);
    }
  }

  function refreshAll() {
    if (hasST) window.ScrollTrigger.refresh();
  }

  /* --------------------------------------------------------------------
   * 5. Public API
   * ------------------------------------------------------------------ */
  window.TFT = window.TFT || {};
  window.TFT.Motion = {
    hasGSAP: hasGSAP,
    hasScrollTrigger: hasST,
    tokens: tokens,
    getState: function () {
      return state;
    },
    onChange: function (fn) {
      listeners.push(fn);
    },
    register: register,
    refresh: refreshAll,
  };

  // initial class sync (before first paint-adjacent script runs)
  notify();

  document.addEventListener("DOMContentLoaded", function () {
    refreshAll();
  });
})(window, document);
