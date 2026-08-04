/**
 * The Falcon Tour — Real Interactive Map (Leaflet.js)
 * Dark tiles + animated flight arcs + custom amber pins
 * Features tile fallback, automatic resize invalidation, and robust dark theme styling.
 */
document.addEventListener('DOMContentLoaded', () => {
  const mapContainer = document.getElementById('flightMapContainer');
  if (!mapContainer) return;

  function initMap() {
    if (typeof L === 'undefined') {
      setTimeout(initMap, 100);
      return;
    }
    buildMap();
  }

  function buildMap() {
    // --- Falcon Tour destinations ---
    const hub = {
      lat: 29.64,
      lng: 79.43,
      name: 'Ranikhet · India',
      page: null
    };

    const destinations = [
      { name: 'Europe',           lat: 48.85,  lng: 2.35,   page: 'destinations/destination-europe.html',      emoji: '🇪🇺' },
      { name: 'Dubai · UAE',      lat: 25.20,  lng: 55.27,  page: 'destinations/destination-dubai.html',       emoji: '🇦🇪' },
      { name: 'Singapore',        lat: 1.35,   lng: 103.82, page: 'destinations/destination-singapore.html',   emoji: '🇸🇬' },
      { name: 'Japan',            lat: 35.68,  lng: 139.69, page: 'packages/package-japan.html',                emoji: '🇯🇵' },
      { name: 'Sri Lanka',        lat: 7.87,   lng: 80.77,  page: 'destinations/destination-sri-lanka.html',   emoji: '🇱🇰' },
      { name: 'New Zealand',      lat: -40.90, lng: 174.88, page: 'destinations/destination-new-zealand.html', emoji: '🇳🇿' },
      { name: 'Turkey',           lat: 39.92,  lng: 32.85,  page: 'destinations/destination-turkey.html',      emoji: '🇹🇷' },
      { name: 'Azerbaijan',       lat: 40.41,  lng: 49.87,  page: 'destinations/destination-azerbaijan.html',  emoji: '🇦🇿' },
      { name: 'Malaysia',         lat: 3.14,   lng: 101.69, page: 'destinations/destination-malaysia.html',    emoji: '🇲🇾' },
      { name: 'Bali · Indonesia', lat: -8.34,  lng: 115.09, page: 'packages/package-bali-essentials.html',     emoji: '🇮🇩' },
      { name: 'Thailand',         lat: 13.75,  lng: 100.52, page: 'packages/package-thailand-essentials.html', emoji: '🇹🇭' },
    ];

    // --- Initialise Leaflet map ---
    const map = L.map('flightMapContainer', {
      center: [25, 55],
      zoom: 3,
      minZoom: 2,
      maxZoom: 10,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      dragging: true,
      doubleClickZoom: true,
    });

    // Dark tile layer with fallbacks
    const tileLayers = [
      'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'
    ];

    let currentTileIdx = 0;
    let mainTileLayer = L.tileLayer(tileLayers[currentTileIdx], {
      subdomains: 'abcd',
      maxZoom: 19,
      crossOrigin: true
    }).addTo(map);

    mainTileLayer.on('tileerror', function () {
      if (currentTileIdx < tileLayers.length - 1) {
        currentTileIdx++;
        map.removeLayer(mainTileLayer);
        mainTileLayer = L.tileLayer(tileLayers[currentTileIdx], { maxZoom: 19, crossOrigin: true }).addTo(map);
      }
    });

    // Ensure proper size calculation on load & scroll into view
    setTimeout(() => { map.invalidateSize(); }, 300);
    setTimeout(() => { map.invalidateSize(); }, 1000);

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            map.invalidateSize();
          }
        });
      }, { threshold: 0.1 });
      observer.observe(mapContainer);
    }

    // Re-enable scroll wheel zoom on click
    map.on('click', () => { map.scrollWheelZoom.enable(); });
    mapContainer.addEventListener('mouseleave', () => { map.scrollWheelZoom.disable(); });

    // Zoom controls
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Custom hub icon (Ranikhet)
    const hubIcon = L.divIcon({
      className: '',
      html: `<div class="fm-hub-pin">
               <div class="fm-hub-ring"></div>
               <div class="fm-hub-ring fm-hub-ring--2"></div>
               <div class="fm-hub-dot"></div>
             </div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });

    // Custom destination pin icon
    function destIcon() {
      return L.divIcon({
        className: '',
        html: `<div class="fm-dest-pin">
                 <div class="fm-dest-dot"></div>
                 <div class="fm-dest-ring"></div>
               </div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, -14],
      });
    }

    // Place hub marker
    L.marker([hub.lat, hub.lng], { icon: hubIcon, zIndexOffset: 1000 })
      .addTo(map)
      .bindPopup(`
        <div class="fm-popup">
          <div class="fm-popup-title">✦ Ranikhet · India</div>
          <div class="fm-popup-sub">Falcon Tour HQ — Uttarakhand Himalayas</div>
        </div>
      `, { className: 'fm-popup-wrap', maxWidth: 220 });

    // Place destination markers + draw arc lines
    destinations.forEach((dest, idx) => {
      const arcPoints = getArcPoints([hub.lat, hub.lng], [dest.lat, dest.lng], 60);
      const arc = L.polyline(arcPoints, {
        color: '#D4AF37',
        weight: 1.4,
        opacity: 0.6,
        smoothFactor: 1,
        dashArray: '6 5',
      }).addTo(map);

      const marker = L.marker([dest.lat, dest.lng], { icon: destIcon(), zIndexOffset: 500 })
        .addTo(map)
        .bindPopup(`
          <div class="fm-popup">
            <div class="fm-popup-flag">${dest.emoji}</div>
            <div class="fm-popup-title">${dest.name}</div>
            <a href="${dest.page}" class="fm-popup-cta">Explore →</a>
          </div>
        `, { className: 'fm-popup-wrap', maxWidth: 180 });

      marker.on('click', () => {
        marker.openPopup();
      });
    });
  }

  function getArcPoints(from, to, steps) {
    const points = [];
    const [lat1, lng1] = from;
    const [lat2, lng2] = to;

    let dLng = lng2 - lng1;
    if (Math.abs(dLng) > 180) dLng = dLng > 0 ? dLng - 360 : dLng + 360;

    const dist = Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(dLng, 2));
    const arcHeight = Math.min(dist * 0.22, 35);

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const lat = lat1 + (lat2 - lat1) * t;
      const lng = lng1 + dLng * t;
      const lift = arcHeight * Math.sin(Math.PI * t);
      points.push([lat + lift, lng]);
    }
    return points;
  }

  initMap();
});
