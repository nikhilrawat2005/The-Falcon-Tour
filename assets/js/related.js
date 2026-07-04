// Shared post catalogue used by blog.html and related-posts widgets on post pages
const FALCON_POSTS = [
  { slug: "dubai", tag: "UAE · 8 Days", title: "Dubai on Fast Forward: A First-Timer's 8 Days", desc: "Skyscrapers by morning, dunes by sunset — how we pace a Dubai week so nothing feels rushed.", img: "../assets/images/dubai/3.jpg" },
  { slug: "turkey", tag: "Turkey · 10 Days", title: "Cappadocia at Dawn: Chasing Balloons Over Turkey", desc: "Why we build every Turkey itinerary around one 5am alarm — and it's worth every minute of lost sleep.", img: "../assets/images/turkey/4.jpg" },
  { slug: "singapore", tag: "Singapore · 5 Days", title: "Singapore in 5 Days: The Ultimate City-State Loop", desc: "Gardens by the Bay, Sentosa and hawker-stall diplomacy — our tested rhythm for a short, dense trip.", img: "../assets/images/singapore/3.jpg" },
  { slug: "sri-lanka", tag: "Sri Lanka · 7 Days", title: "Sri Lanka Slow Travel: Tea Hills to Turquoise Coast", desc: "From Ella's misty ridgelines to the south coast surf towns — an island that rewards a slower itinerary.", img: "../assets/images/sri-lanka/4.jpg" },
  { slug: "new-zealand", tag: "New Zealand · 12 Days", title: "New Zealand: Two Islands, One Impossible Itinerary", desc: "How we split North and South Island without spending the whole trip in transit.", img: "../assets/images/new-zealand/4.jpg" },
  { slug: "azerbaijan", tag: "Azerbaijan · 6 Days", title: "Baku's Quiet Comeback: Azerbaijan's Underrated Week", desc: "Flame Towers, mud volcanoes and a Silk Road old town most travellers still haven't heard of.", img: "../assets/images/azerbaijan/3.jpg" },
  { slug: "malaysia", tag: "Malaysia · 6 Days", title: "Kuala Lumpur to the Islands: Malaysia Both Ways", desc: "Why the best Malaysia trips spend half the time in a city and half nowhere near one.", img: "../assets/images/malaysia/3.jpg" },
  { slug: "europe", tag: "Europe · 14 Days", title: "Europe Without the Rush: A 14-Day Multi-City Route", desc: "Three countries, one train pass, and the packing list that actually survives a fortnight.", img: "../assets/images/europe/3.jpg" },
  { slug: "phu-quoc", tag: "Vietnam · 5 Days", title: "Phu Quoc: Vietnam's Island Exhale", desc: "The quiet stretch of coast we send travellers to when they need the trip to slow down.", img: "../assets/images/phu-quoc/3.jpg" },
];

function renderRelated(currentSlug, mountId) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  const others = FALCON_POSTS.filter(p => p.slug !== currentSlug).sort(() => 0.5 - Math.random()).slice(0, 3);
  mount.innerHTML = others.map((p, i) => `
    <div class="blog-card reveal tilt" style="--i:${i}">
      <div class="img-slot has-img"><img src="${p.img}" alt="${p.title}" loading="lazy"></div>
      <div class="blog-body">
        <span class="tag">${p.tag}</span>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <a href="blog-${p.slug}.html" class="readmore">Read the story →</a>
      </div>
    </div>
  `).join('');

  // re-observe reveal + tilt + magnetic on injected nodes
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  mount.querySelectorAll('.reveal').forEach(el => io.observe(el));
  mount.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `rotateY(${px * 8}deg) rotateX(${py * -8}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.RELATED_SLUG) renderRelated(window.RELATED_SLUG, 'relatedGrid');
});
