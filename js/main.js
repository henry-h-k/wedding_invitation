document.addEventListener("DOMContentLoaded", () => {
  applyTheme();
  renderCover();
  renderGreeting();
  renderGallery();
  renderWeddingInfo();
  renderAccounts();
  renderShare();
  renderFooter();
  initScrollAnimations();
  initModal();
});

// ── Theme ──────────────────────────────────────
function applyTheme() {
  const t = CONFIG.theme;
  const root = document.documentElement;
  root.style.setProperty("--primary", t.primaryColor);
  root.style.setProperty("--bg", t.backgroundColor);
  root.style.setProperty("--text", t.textColor);
  root.style.setProperty("--text-light", t.lightTextColor);
  root.style.setProperty("--accent", t.accentColor);
  root.style.setProperty("--font-main", t.fontFamily);
}

// ── Cover ──────────────────────────────────────
function renderCover() {
  const { groom, bride, weddings, images } = CONFIG;
  document.getElementById("cover-img").src = images.main;
  document.getElementById("cover-groom").textContent =
    groom.lastName + groom.firstName;
  document.getElementById("cover-bride").textContent =
    bride.lastName + bride.firstName;

  // Show all wedding dates on cover
  const dateEl = document.getElementById("cover-date");
  const lines = weddings.map((w) => {
    const d = new Date(w.date + "T" + w.time);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")} ${w.dayOfWeek} ${formatTime(d)} (${w.label})`;
  });
  dateEl.innerHTML = lines.join("<br>");
}

function formatTime(d) {
  const h = d.getHours();
  const m = d.getMinutes();
  const period = h < 12 ? "오전" : "오후";
  const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${period} ${hour12}시${m > 0 ? ` ${m}분` : ""}`;
}

// ── Greeting ───────────────────────────────────
function renderGreeting() {
  const { groom, bride, greeting } = CONFIG;

  document.getElementById("greeting-title").textContent = greeting.title;
  document.getElementById("greeting-message").textContent = greeting.message;

  const groomParent = `${groom.fatherName} · ${groom.motherName}${groom.fatherSuffix} <span class="name-highlight">${groom.firstName}</span>`;
  const brideParent = `${bride.fatherName} · ${bride.motherName}${bride.fatherSuffix} <span class="name-highlight">${bride.firstName}</span>`;

  document.getElementById("couple-groom-parents").innerHTML = groomParent;
  document.getElementById("couple-bride-parents").innerHTML = brideParent;
}

// ── Gallery ────────────────────────────────────
function renderGallery() {
  const track = document.getElementById("gallery-track");
  const dotsContainer = document.getElementById("gallery-dots");
  const imgs = CONFIG.images.gallery;

  if (!imgs || imgs.length === 0) {
    document.getElementById("gallery").style.display = "none";
    return;
  }

  imgs.forEach((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `갤러리 사진 ${i + 1}`;
    img.loading = "lazy";
    img.addEventListener("click", () => openModal(src));
    track.appendChild(img);

    const dot = document.createElement("button");
    dot.className = "gallery-dot" + (i === 0 ? " active" : "");
    dot.setAttribute("aria-label", `사진 ${i + 1}`);
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  let current = 0;
  const total = imgs.length;

  function goToSlide(index) {
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsContainer.querySelectorAll(".gallery-dot").forEach((d, i) => {
      d.classList.toggle("active", i === current);
    });
  }

  document.getElementById("gallery-prev").addEventListener("click", () => {
    goToSlide((current - 1 + total) % total);
  });
  document.getElementById("gallery-next").addEventListener("click", () => {
    goToSlide((current + 1) % total);
  });

  // Swipe support
  let startX = 0;
  let diff = 0;
  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });
  track.addEventListener("touchmove", (e) => {
    diff = e.touches[0].clientX - startX;
  });
  track.addEventListener("touchend", () => {
    if (Math.abs(diff) > 50) {
      if (diff < 0) goToSlide((current + 1) % total);
      else goToSlide((current - 1 + total) % total);
    }
    diff = 0;
  });
}

// ── Wedding Info (Tabs: Calendar + Location) ──
function renderWeddingInfo() {
  const weddings = CONFIG.weddings;
  const tabsContainer = document.getElementById("region-tabs");
  const contentContainer = document.getElementById("wedding-content");

  // Build tab buttons
  weddings.forEach((w, i) => {
    const btn = document.createElement("button");
    btn.className = "region-tab" + (i === 0 ? " active" : "");
    btn.textContent = w.label;
    btn.addEventListener("click", () => switchTab(i));
    tabsContainer.appendChild(btn);
  });

  // Build panels
  weddings.forEach((w, i) => {
    const panel = document.createElement("div");
    panel.className = "wedding-panel" + (i === 0 ? " active" : "");
    panel.dataset.index = i;

    const calendarHtml = buildCalendarHtml(w);
    const locationHtml = buildLocationHtml(w, i);
    panel.innerHTML = calendarHtml + locationHtml;
    contentContainer.appendChild(panel);

    // Bind copy-address button
    const copyBtn = panel.querySelector(".map-btn-copy");
    if (copyBtn) {
      copyBtn.addEventListener("click", (e) => {
        e.preventDefault();
        copyToClipboard(w.locationAddress);
        showToast("주소가 복사되었습니다");
      });
    }
  });

  function switchTab(index) {
    tabsContainer.querySelectorAll(".region-tab").forEach((btn, i) => {
      btn.classList.toggle("active", i === index);
    });
    contentContainer.querySelectorAll(".wedding-panel").forEach((panel, i) => {
      panel.classList.toggle("active", i === index);
    });
  }
}

function buildCalendarHtml(w) {
  const weddingDate = new Date(w.date + "T" + w.time);
  const year = weddingDate.getFullYear();
  const month = weddingDate.getMonth();
  const day = weddingDate.getDate();

  const dateText = `${year}년 ${month + 1}월 ${day}일 ${w.dayOfWeek} ${formatTime(weddingDate)}`;

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  let grid = `<p class="calendar-month-header">${monthNames[month]} ${year}</p>`;
  grid += "<table><thead><tr>";
  ["일", "월", "화", "수", "목", "금", "토"].forEach(
    (d) => (grid += `<th>${d}</th>`)
  );
  grid += "</tr></thead><tbody>";

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const prevLastDate = new Date(year, month, 0).getDate();

  let dayCount = 1;
  let nextDayCount = 1;

  for (let row = 0; row < 6; row++) {
    grid += "<tr>";
    for (let col = 0; col < 7; col++) {
      const cellIndex = row * 7 + col;
      if (cellIndex < firstDay) {
        const d = prevLastDate - firstDay + col + 1;
        grid += `<td class="other-month">${d}</td>`;
      } else if (dayCount > lastDate) {
        grid += `<td class="other-month">${nextDayCount++}</td>`;
      } else {
        const cls = dayCount === day ? "wedding-day" : "";
        grid += `<td class="${cls}">${dayCount}</td>`;
        dayCount++;
      }
    }
    grid += "</tr>";
    if (dayCount > lastDate) break;
  }
  grid += "</tbody></table>";

  // D-day
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const wDate = new Date(w.date);
  wDate.setHours(0, 0, 0, 0);
  const diffDays = Math.ceil((wDate - today) / (1000 * 60 * 60 * 24));
  let ddayText = "";
  if (diffDays > 0) ddayText = `결혼식까지 ${diffDays}일 남았습니다`;
  else if (diffDays === 0) ddayText = "오늘 결혼식입니다!";

  return `
    <p class="calendar-date-text">${dateText}</p>
    <div class="calendar-grid">${grid}</div>
    <p class="calendar-dday">${ddayText}</p>
  `;
}

function buildLocationHtml(w, index) {
  const telHtml = w.locationTel ? `<p class="location-tel">Tel. ${w.locationTel}</p>` : "";

  let mapBtns = "";
  w.mapLinks.forEach((link) => {
    mapBtns += `<a href="${link.url}" target="_blank" class="map-btn"><span>${link.name}</span></a>`;
  });
  mapBtns += `<a href="javascript:void(0)" class="map-btn map-btn-copy"><span>주소 복사</span></a>`;

  const query = encodeURIComponent(w.locationAddress);
  const mapIframe = `<div class="map-container"><iframe src="https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=&output=embed" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>`;

  return `
    <div class="location-divider"></div>
    <div class="location-info">
      <h3>${w.locationName}</h3>
      <p>${w.locationHall}</p>
      <p class="location-address">${w.locationAddress}</p>
      ${telHtml}
    </div>
    ${mapIframe}
    <div class="map-buttons">${mapBtns}</div>
  `;
}

// ── Accounts ───────────────────────────────────
function renderAccounts() {
  renderAccountGroup("groom-accounts", CONFIG.groom, "신랑");
  renderAccountGroup("bride-accounts", CONFIG.bride, "신부");

  document.querySelectorAll(".account-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = document.getElementById(btn.dataset.target);
      btn.classList.toggle("open");
      target.classList.toggle("open");
    });
  });
}

function renderAccountGroup(containerId, person, role) {
  const container = document.getElementById(containerId);
  const accounts = [];

  if (person.account && person.account.number) {
    accounts.push({ label: role, ...person.account });
  }
  if (person.fatherAccount && person.fatherAccount.number) {
    accounts.push({ label: `${role} 아버지`, ...person.fatherAccount });
  }
  if (person.motherAccount && person.motherAccount.number) {
    accounts.push({ label: `${role} 어머니`, ...person.motherAccount });
  }

  accounts.forEach((acc) => {
    const item = document.createElement("div");
    item.className = "account-item";
    item.innerHTML = `
      <div class="account-detail">
        <p class="account-label">${acc.label} ${acc.holder}</p>
        <p class="account-number">${acc.bank} ${acc.number}</p>
      </div>
      <button class="account-copy-btn" data-copy="${acc.bank} ${acc.number} ${acc.holder}">복사</button>
    `;
    item.querySelector(".account-copy-btn").addEventListener("click", function () {
      copyToClipboard(this.dataset.copy);
      showToast("계좌번호가 복사되었습니다");
    });
    container.appendChild(item);
  });
}

// ── Share ──────────────────────────────────────
function renderShare() {
  document.getElementById("btn-share-link").addEventListener("click", () => {
    copyToClipboard(window.location.href);
    showToast("링크가 복사되었습니다");
  });
}

// ── Footer ────────────────────────────────────
function renderFooter() {
  // no-op
}

// ── Scroll Animations ─────────────────────────
function initScrollAnimations() {
  // Immediately show cover elements
  document.querySelectorAll("#cover .fade-in").forEach((el) => {
    el.classList.add("visible");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
}

// ── Modal ─────────────────────────────────────
function initModal() {
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.innerHTML = '<button class="modal-close">&times;</button><img src="" alt="확대 사진">';
  document.body.appendChild(overlay);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay || e.target.classList.contains("modal-close")) {
      overlay.classList.remove("open");
    }
  });
}

function openModal(src) {
  const overlay = document.querySelector(".modal-overlay");
  overlay.querySelector("img").src = src;
  overlay.classList.add("open");
}

// ── Utilities ─────────────────────────────────
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  }
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}
