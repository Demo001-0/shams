/* js/main.js — shared layout (header/footer), data renderers, filters, reveal, contact form.
   Plain script (no modules) so the site also works from file://. Data files load before this one. */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const page = document.body.dataset.page || "home";
  const T = window.__t || (x => x);
  const LANG = window.__lang || "en";
  const PHONES = SITE.phones || (SITE.phone ? [SITE.phone] : []);
  const EMAILS = SITE.emails || (SITE.email ? [SITE.email] : []);
  const telOf = p => p.replace(/[^\d+]/g, "");
  const waOf = p => p.replace(/\D/g, "");

  /* ---------- icons ---------- */
  const svg = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const ICON = {
    flame: svg('<path d="M12 3c.6 3.2-2.8 4.6-3.6 7.6-.5 2 .3 3.6 1.2 4.4C9 13.6 9.8 12 11 11c.2 2 3 2.6 3 5.2A3 3 0 0 1 8.4 18C6.3 16.7 5 14.6 5 12.2 5 8.2 9 6.7 12 3z"/><path d="M12 21a4 4 0 0 0 4-4c0-1.6-1-2.7-2-3.6"/>'),
    bell: svg('<path d="M18 16v-5a6 6 0 1 0-12 0v5l-2 2h16z"/><path d="M10 21a2 2 0 0 0 4 0"/>'),
    wind: svg('<path d="M3 9h11a3 3 0 1 0-3-3"/><path d="M3 14h15a3 3 0 1 1-3 3"/><path d="M3 19h6"/>'),
    plug: svg('<path d="M9 3v5M15 3v5"/><path d="M6 8h12v3a6 6 0 0 1-12 0z"/><path d="M12 17v4"/>'),
    chip: svg('<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/><path d="M10 10h4v4h-4z"/>'),
    shield: svg('<path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6z"/><path d="M9 12l2 2 4-4"/>'),
    arrow: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    phone: svg('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>'),
    mail: svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>'),
    pin: svg('<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>'),
    clock: svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    check: svg('<path d="M5 12.5l4.5 4.5L19 7"/>'),
    heart: svg('<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>'),
    scale: svg('<path d="M12 4v16M5 20h14M5 8h14"/><path d="M5 8l-3 7a3 3 0 0 0 6 0zM19 8l-3 7a3 3 0 0 0 6 0z"/>'),
    chat: svg('<path d="M4 5h16v11H9l-5 4z"/>'),
    star: svg('<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>'),
    whatsapp: svg('<path d="M3 21l1.6-4.7A8.5 8.5 0 1 1 8 19.5z"/><path d="M9 9c0 3 3 6 6 6l1-2-2-1-1 .8c-1-.4-2-1.4-2.4-2.4L11.5 9 11 7z"/>')
  };
  const blob = (cls, fill, d) => `<svg class="blob ${cls}" viewBox="0 0 400 400" aria-hidden="true"><path fill="${fill}" d="${d}"/></svg>`;
  const BLOBS = {
    a: "M318 52c48 32 66 98 40 156s-82 86-140 122-104 42-134-4S36 246 62 186 148 92 206 58s64-38 112-6z",
    b: "M96 40c52-18 96 10 128 48s70 52 86 96-6 92-48 124-92 40-140 28S42 296 30 236s-6-96 20-140c10-28 22-48 46-56z",
    c: "M140 30c40-20 94-4 126 28s34 82 16 124-52 62-84 92-76 52-112 30S22 266 36 212s-6-84 22-124c16-26 44-44 82-58z"
  };
  window.__blob = (k) => BLOBS[k];

  /* ---------- header + footer ---------- */
  function layout() {
    const NAVICON = { "index.html": '<path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/>', "services.html": '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>', "products.html": '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5l8 4.5 8-4.5M12 12v9"/>', "projects.html": '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18"/>', "about.html": '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>', "contact.html": '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>' };
    const links = `<div class="nav-frame">` + NAV.map(([h, t]) => `<a class="nl${h === `${page === "home" ? "index" : page}.html` ? " active" : ""}" href="${h}"><svg class="nic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${NAVICON[h] || ""}</svg><span>${t}</span></a>`).join("") + `</div>`;
    document.body.insertAdjacentHTML("afterbegin", `
      <a class="skip" href="#main">Skip to content</a>
      <header class="header" id="header"><div class="wrap">
        <a class="brand" href="index.html" aria-label="Shams — home"><img src="assets/images/logo.png" alt="Shams — Modern Sun for Contracting" width="170" height="40"></a>
        <button type="button" class="lang-ico" id="langIco" lang="${LANG === "ar" ? "en" : "ar"}" aria-label="${LANG === "ar" ? "Switch to English" : "التبديل إلى العربية"}" data-no-i18n><span>${LANG === "ar" ? "EN" : "ع"}</span></button>
        <button class="menu-btn" id="menuBtn" aria-label="Menu" aria-expanded="false"><span></span></button>
        <nav class="nav" id="nav" aria-label="Main">${links}<button type="button" class="lang-btn" id="langBtn" lang="${LANG === "ar" ? "en" : "ar"}" aria-label="${LANG === "ar" ? "Switch to English" : "التبديل إلى العربية"}" data-no-i18n>${LANG === "ar" ? "English" : "العربية"}</button><a class="btn btn-primary btn-sm" href="contact.html">Get a quote</a></nav>
      </div></header>`);

    const contactList = [
      ...PHONES.map(p => `<li><a href="tel:${esc(telOf(p))}" dir="ltr">${esc(p)}</a></li>`),
      ...EMAILS.map(m => `<li><a href="mailto:${esc(m)}">${esc(m)}</a></li>`),
      `<li>${esc(SITE.city)}</li><li><a href="cosmetics/home.html">Shams Cosmetics →</a></li>`
    ].filter(Boolean).join("");
    document.body.insertAdjacentHTML("beforeend", `
      <footer class="footer"><div class="wrap">
        <div class="cols">
          <div><a class="logo-plate" href="index.html"><img src="assets/images/logo.png" alt="Shams" width="153" height="36"></a>
            <p>${esc(T(SITE.tagline))} — ${T("supply, installation, testing and commissioning for fire protection, fire alarm, HVAC, low current, BMS and security.")}</p></div>
          <div><h4>Explore</h4><ul>${NAV.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join("")}</ul></div>
          <div><h4>Services</h4><ul>${SERVICES.map(s => `<li><a href="services.html">${esc(s.title)}</a></li>`).join("")}</ul></div>
          <div><h4>Contact</h4><ul>${contactList}</ul></div>
        </div>
        <div class="copy"><span>© ${new Date().getFullYear()} ${T("Shams")} — ${esc(T(SITE.tagline))}. ${T("All rights reserved.")}</span></div>
      </div></footer>`);

    ["#langBtn", "#langIco"].forEach(s => $(s).addEventListener("click", () => window.__setLang && window.__setLang(LANG === "ar" ? "en" : "ar")));
    const hdr = $("#header"), btn = $("#menuBtn");
    const onScroll = () => hdr.classList.toggle("scrolled", scrollY > 8);
    onScroll(); addEventListener("scroll", onScroll, { passive: true });
    btn.addEventListener("click", () => {
      const open = document.documentElement.classList.toggle("menu-open");
      document.body.classList.toggle("menu-open", open); btn.setAttribute("aria-expanded", open);
    });
    $$("#nav a").forEach(a => a.addEventListener("click", () => { document.documentElement.classList.remove("menu-open"); document.body.classList.remove("menu-open"); btn.setAttribute("aria-expanded", false); }));
  }

  /* ---------- renderers (each looks for a [data-render] mount) ---------- */
  const R = {
    ticker(el) {
      const items = SERVICES.map(s => `<span>${esc(s.title)}</span>`).join("");
      el.innerHTML = `<div class="ticker-track">${items}${items}${items}${items}</div>`;
    },
    "services-detail"(el) {
      const jump = `<nav class="svc-jump" aria-label="Services">${SERVICES.map((s, i) => `<a href="#${s.id}">${esc(s.title)}</a>`).join("")}</nav>`;
      el.innerHTML = jump + SERVICES.map((s, i) => `
        <article class="svc-detail ${s.color === "blue" ? "blue" : ""} reveal" id="${s.id}">
          <div class="svc-head"><span class="ico">${ICON[s.icon]}</span><small class="svc-no">0${i + 1}</small><h3 class="h2">${esc(s.title)}</h3></div>
          <div class="svc-body"><p class="lead">${esc(s.summary)}</p><ul>${s.points.map(p => `<li>${esc(p)}</li>`).join("")}</ul></div>
        </article>`).join("");
    },
    scope(el) {
      el.innerHTML = SCOPE.map(([t, d]) => `<li class="reveal"><h3>${esc(t)}</h3>${d ? `<p>${esc(d)}</p>` : ""}</li>`).join("");
    },
    partners(el) {
      el.innerHTML = PARTNERS.map(([f, n]) => `<div class="logo-tile reveal"><img src="assets/partners/${f}.png" alt="${esc(n)}" loading="lazy"></div>`).join("");
    },
    clients(el) {
      const n = +el.dataset.limit || CLIENTS.length;
      el.innerHTML = CLIENTS.slice(0, n).map(([f, nm]) => `<div class="logo-tile reveal"><img src="assets/clients/${f}.png" alt="${esc(nm)}" loading="lazy"></div>`).join("");
    },
    "featured-products"(el) {
      const list = SYSTEMS.filter(s => ["fm200", "alarm", "aerosol", "pumps"].includes(s.id));
      el.innerHTML = list.map(s => `
        <article class="prod reveal"><div class="prod-media n2">${s.images.slice(0, 2).map(([src, alt]) => `<div><img src="${src}" alt="${esc(alt)}" loading="lazy"></div>`).join("")}</div>
          <div class="prod-body"><span class="cat">${esc(s.catLabel)}</span><h3 class="h3">${esc(s.name)}</h3><p>${esc(s.desc)}</p>
          <a class="link-arrow" href="products.html#${s.id}">View product ${ICON.arrow}</a></div></article>`).join("");
    },
    systems(el) {
      el.innerHTML = SYSTEMS.map(s => `
        <article class="prod reveal${s.wide ? " wide" : ""}" id="${s.id}" data-cat="${s.cat}">
          <div class="prod-media n${s.wide ? Math.min(s.images.length, 4) === 4 ? 2 : s.images.length : s.images.length}">${s.images.map(([src, alt]) => `<div><img src="${src}" alt="${esc(alt)}" loading="lazy"></div>`).join("")}</div>
          <div class="prod-body"><span class="cat">${esc(s.catLabel)}</span><h3 class="h3">${esc(s.name)}</h3><p>${esc(s.desc)}</p>
            <div class="brands">${s.brands.map(b => `<span>${esc(b)}</span>`).join("")}</div>
            <a class="link-arrow" href="contact.html?product=${encodeURIComponent(s.name)}">Request a quote ${ICON.arrow}</a></div>
        </article>`).join("");
    },
    catalog(el) {
      el.innerHTML = CATALOG.map(c => `
        <article class="catalog ${c.color} reveal" id="${c.id}" data-cat="${c.cat}">
          <div class="thumbs">${c.icons.map(i => `<img src="assets/products/icon-${i}.png" alt="" loading="lazy">`).join("")}</div>
          <h3>${esc(c.title)}</h3><ul class="${c.items.length > 8 ? "two" : ""}">${c.items.map(i => `<li>${esc(i)}</li>`).join("")}</ul>
          <a class="link-arrow" href="contact.html?product=${encodeURIComponent(c.title)}">Request a quote ${ICON.arrow}</a>
        </article>`).join("");
    },
    filters(el) {
      el.innerHTML = CATS.map(([k, l]) => `<button class="chip" data-cat="${k}" aria-pressed="${k === "all"}">${esc(l)}</button>`).join("");
      const apply = k => {
        $$("button", el).forEach(b => b.setAttribute("aria-pressed", b.dataset.cat === k));
        $$("[data-cat].prod, [data-cat].catalog").forEach(n => { n.hidden = !(k === "all" || n.dataset.cat === k); });
        $$("[data-group]").forEach(g => { g.hidden = !$$("[data-cat]", g).some(n => !n.hidden); });
      };
      el.addEventListener("click", e => { const b = e.target.closest("button"); if (b) apply(b.dataset.cat); });
    },
    projects(el) {
      if (!PROJECTS.length) { el.closest("section").hidden = true; return; }
      el.innerHTML = PROJECTS.map(p => `<article class="proj reveal">${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy">` : ""}<div><small>${esc(p.client || "")}${p.city ? " · " + esc(p.city) : ""}</small><h3 class="h3">${esc(p.title)}</h3><p>${esc(p.scope || "")}</p></div></article>`).join("");
    },
    contact(el) {
      const rows = [
        PHONES.length && ["phone", "Phone", `<ul class="c-list">${PHONES.map(p => `<li><a class="c-main" href="tel:${esc(telOf(p))}" dir="ltr">${esc(p)}</a><a class="c-chip" href="https://wa.me/${esc(waOf(p))}" target="_blank" rel="noopener" aria-label="WhatsApp ${esc(p)}">${ICON.whatsapp}<span>WhatsApp</span></a></li>`).join("")}</ul>`],
        EMAILS.length && ["mail", "Email", `<ul class="c-list">${EMAILS.map(m => `<li><a class="c-main" href="mailto:${esc(m)}" dir="ltr">${esc(m)}</a></li>`).join("")}</ul>`],
        ["pin", "Location", `<span>${esc(SITE.address || SITE.city)}</span>${SITE.address ? `<br><span class="muted">${esc(SITE.city)}</span>` : ""}`],
        ["check", "What we cover", `<span>Fire protection · Fire alarm · HVAC · Low current · BMS · Security</span>`],
        ["clock", "Response time", `<span>We reply to every request, usually within one working day.</span>`],
        SITE.hours && ["clock", "Working hours", `<span>${esc(SITE.hours)}</span>`]
      ].filter(Boolean);
      el.innerHTML = rows.map(([i, t, v]) => `<div class="info-card"><i>${ICON[i]}</i><div><b>${t}</b>${v}</div></div>`).join("");
    }
  };
  function renderAll() { $$("[data-render]").forEach(el => { const f = R[el.dataset.render]; if (f) f(el); }); }

  /* ---------- hash → filter (products.html#fm200 etc.) ---------- */
  function hashFocus() {
    const id = location.hash.slice(1); if (!id) return;
    const t = document.getElementById(id); if (!t) return;
    if (t.hidden) $('.chip[data-cat="all"]')?.click();
    setTimeout(() => t.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
  }

  /* ---------- contact form (mailto — no backend) ---------- */
  function contactForm() {
    const f = $("#quoteForm"); if (!f) return;
    const q = new URLSearchParams(location.search);
    const prod = q.get("product");
    if (prod) f.message.value = `${T("Hello Shams team,\n\nI'd like a quotation for: ")}${prod}.\n\n${T("Project details:\n")}`;
    $("#service").innerHTML = `<option value="">Select a service…</option>` + SERVICES.map(s => `<option>${esc(s.title)}</option>`).join("") + `<option>Supply only (equipment)</option><option>Other</option>`;
    f.addEventListener("submit", e => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(f));
      const body = `${d.message}\n\n— ${d.name}${d.company ? " (" + d.company + ")" : ""}\n${T("Phone")}: ${d.phone || "-"}\n${T("Email")}: ${d.email}\n${T("Service")}: ${d.service || "-"}`;
      const st = $("#formStatus");
      if (EMAILS.length) {
        location.href = `mailto:${EMAILS.join(",")}?subject=${encodeURIComponent(T("Quote request — ") + (d.service || T("General")))}&body=${encodeURIComponent(body)}`;
        st.textContent = T("Opening your email app… if nothing happens, write to us directly at ") + EMAILS[0] + ".";
      } else {
        st.textContent = T("Thank you — your message is ready. (Site owner: add an email address in js/data/site.js to receive requests.)");
      }
      st.hidden = false;
    });
  }

  /* ---------- email links: phones open the mail app; desktops open Gmail compose (no mail client needed) ---------- */
  document.addEventListener("click", e => {
    const a = e.target.closest && e.target.closest('a[href^="mailto:"]');
    if (!a || /Android|iPhone|iPad|iPod|Mobi/i.test(navigator.userAgent)) return;
    e.preventDefault();
    const to = decodeURIComponent(a.getAttribute("href").slice(7).split("?")[0]);
    window.open("https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(to), "_blank", "noopener");
  });

  /* ---------- reveal on scroll ---------- */
  function reveal() {
    const els = $$(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
    const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { rootMargin: "0px 0px -8% 0px", threshold: .08 });
    els.forEach((e, i) => { e.style.transitionDelay = Math.min((i % 6) * 60, 300) + "ms"; io.observe(e); });
  }

  document.documentElement.classList.remove("no-js");
  layout(); renderAll(); contactForm(); window.__applyLang && window.__applyLang(); reveal(); hashFocus();
  addEventListener("hashchange", hashFocus);
  $$("[data-icon]").forEach(n => { n.innerHTML = ICON[n.dataset.icon] || ""; });
  $$("[data-blob]").forEach(n => { n.setAttribute("d", BLOBS[n.dataset.blob]); });
})();
