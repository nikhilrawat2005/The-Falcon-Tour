/**
 * The Falcon Tour — Custom Gold Ring Cursor (Desktop Only)
 */
document.addEventListener('DOMContentLoaded', () => {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const dot = document.createElement('div');
  dot.id = 'cursorDot';
  dot.className = 'cursor-dot';

  const ring = document.createElement('div');
  ring.id = 'cursorRing';
  ring.className = 'cursor-ring';

  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, input, select, .pkg-card, .activity-card, .blog-card, .map-pin').forEach(elem => {
    elem.addEventListener('mouseenter', () => ring.classList.add('grow'));
    elem.addEventListener('mouseleave', () => ring.classList.remove('grow'));
  });
});
