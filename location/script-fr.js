const transitItems = document.querySelectorAll(".transit-item");
let activeBannerLayer = document.querySelector(".banner-bg-a");
let inactiveBannerLayer = document.querySelector(".banner-bg-b");

transitItems.forEach((item) => {
  item.addEventListener("click", () => {
    const url = item.dataset.banner;
    if (!url || item.classList.contains("is-active")) return;

    transitItems.forEach((i) => i.classList.remove("is-active"));
    item.classList.add("is-active");

    inactiveBannerLayer.style.backgroundImage = `url('${url}')`;
    inactiveBannerLayer.offsetHeight; // force reflow so the opacity transition triggers
    inactiveBannerLayer.style.opacity = "1";
    activeBannerLayer.style.opacity = "0";

    [activeBannerLayer, inactiveBannerLayer] = [inactiveBannerLayer, activeBannerLayer];
  });
});

document.querySelectorAll(".detail-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".arrival-card");
    const row = card.closest(".arrival-row");
    const wasExpanded = card.classList.contains("is-expanded");

    // Only one card can take over the row at a time — collapse whichever is open.
    row.querySelectorAll(".arrival-card").forEach((c) => {
      c.classList.remove("is-expanded");
      c.querySelector(".arrival-detail").hidden = false; // stays in DOM; CSS handles show/hide
      c.querySelector(".detail-btn").textContent = "Detail";
    });

    if (wasExpanded) {
      row.classList.remove("has-expanded");
    } else {
      row.classList.add("has-expanded");
      card.classList.add("is-expanded");
      btn.textContent = "Close";
    }
  });
});

// ---------- Scroll reveal (Arrival & Nearby Attractions; map excluded) ----------

document.querySelectorAll(".arrival-card").forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.1}s`;
});
document.querySelectorAll(".attraction-card").forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.1}s`;
});

const revealTargets = document.querySelectorAll(
  ".arrival .section-title, .arrival-card, .attractions .section-title, .attraction-card, .divider"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add("is-visible");
      revealObserver.unobserve(el);

      if (el.style.transitionDelay) {
        const clearDelay = () => {
          el.style.transitionDelay = "";
          el.removeEventListener("transitionend", clearDelay);
        };
        el.addEventListener("transitionend", clearDelay);
      }
    });
  },
  { threshold: 0.15 }
);

revealTargets.forEach((el) => revealObserver.observe(el));

let map;
let markers = {};
let activeFilter = "all";
let activePlaceId = null;
let currentPage = 1;
const PLACES_PER_PAGE = 8;

const listEl = document.getElementById("mapList");
const paginationEl = document.getElementById("mapPagination");
const detailCard = document.getElementById("mapDetailCard");
const detailClose = document.getElementById("mapDetailClose");
const detailPhoto = document.getElementById("mapDetailPhoto");
const detailName = document.getElementById("mapDetailName");
const detailBadge = document.getElementById("mapDetailBadge");
const detailBlurb = document.getElementById("mapDetailBlurb");

// Leaflet's default marker icon points at relative image paths that don't
// resolve when leaflet.js is loaded from a CDN — point them at the CDN's own images.
const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function renderList() {
  const filtered = PLACES.filter((p) => activeFilter === "all" || p.category === activeFilter);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PLACES_PER_PAGE));
  if (currentPage > pageCount) currentPage = pageCount;

  const start = (currentPage - 1) * PLACES_PER_PAGE;
  const pageItems = filtered.slice(start, start + PLACES_PER_PAGE);

  listEl.innerHTML = "";
  pageItems.forEach((place) => {
    const li = document.createElement("li");
    li.className = "map-list-item" + (place.id === activePlaceId ? " is-active" : "");
    li.dataset.id = place.id;

    if (place.img) {
      const img = document.createElement("img");
      img.className = "map-thumb";
      img.src = place.img;
      img.alt = place.name;
      li.appendChild(img);
    } else {
      const fallback = document.createElement("div");
      fallback.className = "map-thumb-fallback";
      fallback.textContent = place.name.charAt(0);
      li.appendChild(fallback);
    }

    const name = document.createElement("span");
    name.className = "map-list-name";
    name.textContent = place.name;
    li.appendChild(name);

    li.addEventListener("click", () => selectPlace(place.id));
    listEl.appendChild(li);
  });

  renderPagination(pageCount);
}

function renderPagination(pageCount) {
  paginationEl.innerHTML = "";
  if (pageCount <= 1) return;

  for (let i = 1; i <= pageCount; i++) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "map-page-btn" + (i === currentPage ? " is-active" : "");
    btn.textContent = i;
    btn.addEventListener("click", () => {
      currentPage = i;
      renderList();
    });
    paginationEl.appendChild(btn);
  }
}

function selectPlace(id) {
  activePlaceId = id;
  const place = PLACES.find((p) => p.id === id);
  if (!place || !map) return;

  map.flyTo([place.lat, place.lng], 16, { duration: 0.6 });

  detailPhoto.style.backgroundImage = `url('${place.photo}')`;
  detailName.textContent = place.name;
  detailBadge.textContent = place.category;
  detailBlurb.textContent = place.blurb;
  detailCard.hidden = false;

  renderList();
}

detailClose.addEventListener("click", () => {
  detailCard.hidden = true;
});

function setFilter(filter) {
  activeFilter = filter;
  currentPage = 1;
  document.querySelectorAll(".map-tab").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.filter === filter);
  });
  Object.entries(markers).forEach(([id, marker]) => {
    const place = PLACES.find((p) => p.id === id);
    const visible = filter === "all" || place.category === filter;
    if (visible && !map.hasLayer(marker)) marker.addTo(map);
    if (!visible && map.hasLayer(marker)) map.removeLayer(marker);
  });
  renderList();
}

document.querySelectorAll(".map-tab").forEach((btn) => {
  btn.addEventListener("click", () => setFilter(btn.dataset.filter));
});

function initMap() {
  map = L.map("map", { scrollWheelZoom: true, zoomControl: false }).setView([MAP_CENTER.lat, MAP_CENTER.lng], 15);
  map.attributionControl.setPosition("bottomleft");

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  PLACES.forEach((place) => {
    const marker = L.marker([place.lat, place.lng], { icon: markerIcon })
      .addTo(map)
      .bindTooltip(place.name);
    marker.on("click", () => selectPlace(place.id));
    markers[place.id] = marker;
  });

  renderList();
}

document.addEventListener("DOMContentLoaded", initMap);

// ---------- Le Louis XV menu / reservation modal ----------

const openMenuBtn = document.getElementById("louisXvCard");
const closeMenuBtn = document.getElementById("closeMenuBtn");
const menuOverlay = document.getElementById("menuModal");
const bookViewport = document.getElementById("bookViewport");
const book = document.getElementById("book");
const pageDotsWrap = document.getElementById("pageDots");
const menuPageTitle = document.getElementById("pageTitle");

// 예시 구성 — 실제 메뉴 문구는 별도로 교체
const menuGroups = [
  {
    course: "Entrées",
    dishes: [
      ["Légumes de saison & burrata", "78", "Huile d'olive et réduction balsamique"],
      ["Tartare de thon", "86", "Avocat et citron vert"],
      ["Carpaccio de Saint-Jacques", "92", "Huile de truffe et agrumes"],
    ],
  },
  {
    course: "Plats",
    dishes: [
      ["Carré d'agneau en croûte d'herbes", "145", "Jus au romarin et légumes de saison"],
      ["Bar de Méditerranée grillé", "160", "Artichaut et beurre blanc au citron"],
      ["Filet de bœuf maturé", "175", "Servi avec un gratin dauphinois"],
    ],
  },
  {
    course: "Desserts",
    dishes: [
      ["Mille-feuille à la vanille", "42", "Crème à la vanille de Madagascar"],
      ["Soufflé au chocolat", "48", "Glace à la pistache"],
    ],
  },
];

const menuPageEls = [];
const menuPageCount = 2; // 1) 메뉴  2) 예약

// ---- page 1: menu ----
const menuPage = document.createElement("div");
menuPage.className = "book-page";
const menuFront = document.createElement("div");
menuFront.className = "page-face front";
menuFront.innerHTML = menuGroups.map((group) => `
  <div class="course-label">${group.course}</div>
  ${group.dishes.map(([name, price, desc]) => `
    <div class="dish">
      <div class="dish-row">
        <span class="dish-name">${name}</span>
        <span class="dish-price">${price}</span>
      </div>
      <div class="dish-desc">${desc}</div>
    </div>
  `).join("")}
`).join("");
menuPage.appendChild(menuFront);
book.appendChild(menuPage);
menuPageEls.push(menuPage);

// ---- page 2: reservation ----
const resPage = document.createElement("div");
resPage.className = "book-page";
const resFront = document.createElement("div");
resFront.className = "page-face front";

const lunchSlots = ["12:00", "13:00", "14:00"];
const dinnerSlots = ["19:00", "20:00", "21:00", "22:00"];

resFront.innerHTML = `
  <div class="res-section-label">Déjeuner</div>
  <div class="slot-grid" id="lunchGrid">
    ${lunchSlots.map((t) => `<button type="button" class="slot-btn" data-time="${t}">${t}</button>`).join("")}
  </div>

  <div class="res-section-label">Dîner</div>
  <div class="slot-grid" id="dinnerGrid">
    ${dinnerSlots.map((t) => `<button type="button" class="slot-btn" data-time="${t}">${t}</button>`).join("")}
  </div>

  <div class="party-row">
    <span class="label">Nombre de personnes</span>
    <div class="stepper">
      <button type="button" id="partyMinus">&minus;</button>
      <span class="count" id="partyCount">2</span>
      <button type="button" id="partyPlus">+</button>
    </div>
  </div>

  <button type="button" class="reserve-btn" id="reserveBtn" disabled>Réserver</button>
  <div class="res-confirm" id="resConfirm"></div>
`;

resPage.appendChild(resFront);
book.appendChild(resPage);
menuPageEls.push(resPage);

// ---- reservation interactivity ----
let selectedTime = null;
let partyCount = 2;

const partyCountEl = resFront.querySelector("#partyCount");
const reserveBtn = resFront.querySelector("#reserveBtn");
const resConfirm = resFront.querySelector("#resConfirm");

function stopBubble(el) {
  el.addEventListener("pointerdown", (e) => e.stopPropagation());
}

resFront.querySelectorAll(".slot-btn").forEach((btn) => {
  stopBubble(btn);
  btn.addEventListener("click", () => {
    resFront.querySelectorAll(".slot-btn").forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");
    selectedTime = btn.dataset.time;
    reserveBtn.disabled = false;
    resConfirm.classList.remove("show");
  });
});

const partyMinus = resFront.querySelector("#partyMinus");
const partyPlus = resFront.querySelector("#partyPlus");
stopBubble(partyMinus);
stopBubble(partyPlus);
partyMinus.addEventListener("click", () => {
  partyCount = Math.max(1, partyCount - 1);
  partyCountEl.textContent = partyCount;
});
partyPlus.addEventListener("click", () => {
  partyCount = Math.min(10, partyCount + 1);
  partyCountEl.textContent = partyCount;
});

stopBubble(reserveBtn);
reserveBtn.addEventListener("click", () => {
  if (!selectedTime) return;
  resConfirm.textContent = `Votre réservation pour ${partyCount} personne(s) à ${selectedTime} a bien été enregistrée.`;
  resConfirm.classList.add("show");
});

// ---- dots ----
for (let i = 0; i < menuPageCount; i++) {
  const dot = document.createElement("div");
  dot.className = "dot" + (i === 0 ? " active" : "");
  pageDotsWrap.appendChild(dot);
}
const menuDots = pageDotsWrap.querySelectorAll(".dot");

let currentMenuIndex = 0;
let menuViewportWidth = 0;

function updateMenuDots() {
  menuDots.forEach((d, i) => d.classList.toggle("active", i === currentMenuIndex));
  menuPageTitle.textContent = currentMenuIndex === 0 ? "Menu" : "Réservation";
}

const menuTurnShadow = document.getElementById("turnShadow");

function layoutMenuBook(animate, direction) {
  book.style.transition = animate ? "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)" : "none";
  book.style.transform = `translateX(${-currentMenuIndex * menuViewportWidth}px)`;
  updateMenuDots();

  if (animate && direction) {
    menuTurnShadow.classList.remove("sweep-forward", "sweep-backward");
    // force reflow so the animation restarts
    void menuTurnShadow.offsetWidth;
    menuTurnShadow.classList.add(direction === "forward" ? "sweep-forward" : "sweep-backward");
  }
}

function openMenuModal() {
  menuOverlay.classList.add("open");
  document.body.classList.add("modal-open");
  currentMenuIndex = 0;
  menuViewportWidth = bookViewport.getBoundingClientRect().width;
  layoutMenuBook(false);
}

function closeMenuModal() {
  menuOverlay.classList.remove("open");
  document.body.classList.remove("modal-open");
}

openMenuBtn.addEventListener("click", openMenuModal);
openMenuBtn.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    openMenuModal();
  }
});
closeMenuBtn.addEventListener("click", closeMenuModal);
menuOverlay.addEventListener("click", (e) => { if (e.target === menuOverlay) closeMenuModal(); });

document.addEventListener("keydown", (e) => {
  if (!menuOverlay.classList.contains("open")) return;
  if (e.key === "Escape") closeMenuModal();
  if (e.key === "ArrowRight" && currentMenuIndex < menuPageCount - 1) { currentMenuIndex++; layoutMenuBook(true, "forward"); }
  if (e.key === "ArrowLeft" && currentMenuIndex > 0) { currentMenuIndex--; layoutMenuBook(true, "backward"); }
});

// ---- drag to change page (flat slide, page width never changes) ----
let isMenuDragging = false;
let menuDragStartX = null;
let menuDragDeltaX = 0;

bookViewport.addEventListener("pointerdown", (e) => {
  isMenuDragging = true;
  menuViewportWidth = bookViewport.getBoundingClientRect().width;
  menuDragStartX = e.clientX;
  menuDragDeltaX = 0;
  book.style.transition = "none";
  bookViewport.classList.add("grabbing");
  bookViewport.setPointerCapture(e.pointerId);
});

bookViewport.addEventListener("pointermove", (e) => {
  if (!isMenuDragging) return;
  menuDragDeltaX = e.clientX - menuDragStartX;
});

function endMenuDrag() {
  if (!isMenuDragging) return;
  isMenuDragging = false;
  bookViewport.classList.remove("grabbing");

  const threshold = menuViewportWidth * 0.18;
  let direction = null;
  if (menuDragDeltaX < -threshold && currentMenuIndex < menuPageCount - 1) {
    currentMenuIndex++;
    direction = "forward";
  } else if (menuDragDeltaX > threshold && currentMenuIndex > 0) {
    currentMenuIndex--;
    direction = "backward";
  }
  menuDragDeltaX = 0;
  layoutMenuBook(true, direction);
}

bookViewport.addEventListener("pointerup", endMenuDrag);
bookViewport.addEventListener("pointercancel", endMenuDrag);
bookViewport.addEventListener("pointerleave", () => { if (isMenuDragging) endMenuDrag(); });

window.addEventListener("resize", () => {
  if (menuOverlay.classList.contains("open")) {
    menuViewportWidth = bookViewport.getBoundingClientRect().width;
    layoutMenuBook(false);
  }
});

// ---------- Casino de Monte-Carlo visitor info modal ----------

const openCasinoBtn = document.getElementById("casinoCard");
const closeCasinoBtn = document.getElementById("closeCasinoBtn");
const casinoOverlay = document.getElementById("casinoModal");

function openCasinoModal() {
  casinoOverlay.classList.add("open");
  document.body.classList.add("modal-open");
}

function closeCasinoModal() {
  casinoOverlay.classList.remove("open");
  document.body.classList.remove("modal-open");
}

openCasinoBtn.addEventListener("click", openCasinoModal);
openCasinoBtn.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    openCasinoModal();
  }
});
closeCasinoBtn.addEventListener("click", closeCasinoModal);
casinoOverlay.addEventListener("click", (e) => { if (e.target === casinoOverlay) closeCasinoModal(); });

document.addEventListener("keydown", (e) => {
  if (!casinoOverlay.classList.contains("open")) return;
  if (e.key === "Escape") closeCasinoModal();
});

// ---------- Port Hercule harbor guide modal ----------

const openPortBtn = document.getElementById("portCard");
const closePortBtn = document.getElementById("closePortBtn");
const portOverlay = document.getElementById("portModal");

function openPortModal() {
  portOverlay.classList.add("open");
  document.body.classList.add("modal-open");
}

function closePortModal() {
  portOverlay.classList.remove("open");
  document.body.classList.remove("modal-open");
}

openPortBtn.addEventListener("click", openPortModal);
openPortBtn.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    openPortModal();
  }
});
closePortBtn.addEventListener("click", closePortModal);
portOverlay.addEventListener("click", (e) => { if (e.target === portOverlay) closePortModal(); });

document.addEventListener("keydown", (e) => {
  if (!portOverlay.classList.contains("open")) return;
  if (e.key === "Escape") closePortModal();
});
