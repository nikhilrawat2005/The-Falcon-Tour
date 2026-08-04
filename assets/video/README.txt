HERO VIDEO — drop files here to go live
=========================================

The homepage hero is wired to auto-play a short looping video on top of the
existing static image. Right now this folder is empty, so the site simply
keeps showing the static fallback image (no errors, no broken hero).

To activate it, add these files (H.264 .mp4 + VP9 .webm pair recommended):

  hero-default.mp4   hero-default.webm    -> shown Mar-May & Sep-Nov
  hero-winter.mp4     hero-winter.webm    -> shown Dec, Jan, Feb (snow footage)
  hero-summer.mp4     hero-summer.webm    -> shown Jun, Jul, Aug (greener footage)

Guidelines (per redesign report):
- Keep each clip 6–8 seconds, looped seamlessly — not a long cut.
- Compress hard: target under ~3–5MB per clip for a fast first paint.
- Muted, no audio track needed (video plays muted + autoplay only).
- 16:9, at least 1920x1080 source, cropped center via object-fit:cover.

If a file is missing or fails to load, the site automatically falls back to
the static image already in place — nothing to configure.
