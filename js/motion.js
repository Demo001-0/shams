/* js/motion.js — creative motion layer: page transitions, scroll progress, staggered reveals,
   headline word-rise, counters, tilt + spotlight cards, magnetic buttons, parallax. Pure JS, no libs. */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const root = document.documentElement;

  /* ---------- page transition curtain ---------- */
  const brandImg = document.querySelector(".brand img");
  const curtain = document.createElement("div");
  curtain.className = "curtain"; curtain.setAttribute("aria-hidden", "true");
  curtain.innerHTML = '<img src="' + (brandImg ? brandImg.getAttribute("src") : "assets/images/logo.png") + '" alt="">';
  document.body.appendChild(curtain);
  if (!reduce) {
    let navd = false; try { navd = sessionStorage.getItem("shams-nav") === "1"; sessionStorage.removeItem("shams-nav"); } catch (e) {}
    if (navd) {
      /* arrive covered (html.pt hides the page), wait for load, then iris-out smoothly */
      curtain.classList.add("hold"); root.classList.remove("pt");
      const t0 = performance.now(); let gone = false;
      const open = () => { if (gone) return; gone = true;
        const wait = Math.max(0, 220 - (performance.now() - t0));
        setTimeout(() => { curtain.classList.remove("hold"); void curtain.offsetWidth; curtain.classList.add("out");
          setTimeout(() => curtain.remove(), 900); }, wait); };
      if (document.readyState === "complete") open(); else addEventListener("load", open);
      setTimeout(open, 2500);
    } else { root.classList.remove("pt"); }
    addEventListener("pageshow", e => { if (e.persisted) { curtain.remove(); root.classList.remove("pt"); } });
    document.addEventListener("click", e => {
      const a = e.target.closest("a[href]");
      if (a && a.closest("#header")) return; /* nav bar links navigate instantly, no curtain */
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === "_blank" || a.hasAttribute("download")) return;
      const u = new URL(a.href, location.href);
      if (u.origin !== location.origin && location.protocol !== "file:") return;
      if (u.protocol === "mailto:" || u.protocol === "tel:") return;
      if (u.pathname === location.pathname && u.hash) return;
      e.preventDefault();
      try { sessionStorage.setItem("shams-nav", "1"); } catch (err) {}
      curtain.classList.remove("out", "hold");
      curtain.style.setProperty("--cx", e.clientX + "px"); curtain.style.setProperty("--cy", e.clientY + "px");
      void curtain.offsetWidth; curtain.classList.add("cover");
      setTimeout(() => { location.href = a.href; }, 520);
    });
  } else { root.classList.remove("pt"); }

  /* ---------- scroll progress + header hide/show ---------- */
  const bar = document.createElement("div"); bar.className = "progress"; document.body.appendChild(bar);
  const hdr = $("#header"); let lastY = scrollY, ticking = false;
  function onScroll() {
    const max = root.scrollHeight - innerHeight, y = scrollY;
    bar.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";
    if (hdr && !root.classList.contains("menu-open")) hdr.classList.toggle("hide", y > lastY + 4 && y > 240);
    lastY = y;
    if (!reduce) $$(".blob").forEach(b => { const r = b.getBoundingClientRect(); b.style.setProperty("--py", ((r.top + r.height / 2 - innerHeight / 2) * -0.08).toFixed(1) + "px"); });
    ticking = false;
  }
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  if (reduce) return;

  /* ---------- stagger + direction variants ---------- */
  ["[data-render]", ".stats", ".models", ".disc-grid", ".logo-grid", ".proj-grid", ".steps", ".scope", ".info-grid", ".vm"].forEach(sel => {
    $$(sel).forEach(g => {
      $$(":scope > .reveal", g).forEach((el, i) => {
        el.style.setProperty("--d", Math.min(i, 10) * 0.08 + "s");
        if (el.classList.contains("logo-tile")) el.classList.add("zoom");
      });
    });
  });
  $$(".models .model, .vm > *").forEach((el, i) => el.classList.add(i % 2 ? "from-r" : "from-l"));
  $$(".svc-detail").forEach((el, i) => el.classList.add(i % 2 ? "from-r" : "from-l"));
  $$(".stat").forEach(el => el.classList.add("zoom"));
  if (root.dir === "rtl") $$(".from-l,.from-r").forEach(el => { const l = el.classList.contains("from-l"); el.classList.toggle("from-l", !l); el.classList.toggle("from-r", l); });

  /* ---------- headline word-rise ---------- */
  function splitWords(h) {
    const walk = n => {
      Array.from(n.childNodes).forEach(c => {
        if (c.nodeType === 3) {
          const parts = c.textContent.split(/(\s+)/); const f = document.createDocumentFragment();
          parts.forEach(p => {
            if (!p) return;
            if (/^\s+$/.test(p)) { f.appendChild(document.createTextNode(" ")); return; }
            const w = document.createElement("span"); w.className = "w";
            const i = document.createElement("i"); i.textContent = p; i.style.setProperty("--i", h.__n++);
            w.appendChild(i); f.appendChild(w);
          });
          c.replaceWith(f);
        } else if (c.nodeType === 1 && !c.classList.contains("w")) walk(c);
      });
    };
    h.__n = 0; walk(h);
  }
  const heads = $$(".page-hero .h1, .sec-head .h2, .cta h2, .splash-lead").filter(h => !h.matches("[data-no-i18n]"));
  heads.forEach(splitWords);
  const hio = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add("words-in"); hio.unobserve(en.target); }
  }), { threshold: .2 });
  heads.forEach(h => { h.classList.contains("splash-lead") ? setTimeout(() => h.classList.add("words-in"), 900) : hio.observe(h); });

  /* ---------- counters ---------- */
  const cio = new IntersectionObserver(es => es.forEach(en => {
    if (!en.isIntersecting) return; cio.unobserve(en.target);
    const el = en.target, m = el.textContent.match(/^(\D*)(\d[\d,.]*)(.*)$/); if (!m) return;
    const end = parseFloat(m[2].replace(/,/g, "")), t0 = performance.now(), dur = 1400;
    const tick = t => { const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 4);
      el.textContent = m[1] + Math.round(end * e).toLocaleString("en") + m[3]; if (k < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }), { threshold: .6 });
  $$(".stat b").forEach(b => cio.observe(b));

  /* ---------- tilt + spotlight (fine pointers only) ---------- */
  if (fine) {
    $$(".disc, .prod, .proj, .stat, .model, .svc-detail, .info-card, .catalog").forEach(card => {
      const g = document.createElement("span"); g.className = "glow"; card.prepend(g); card.classList.add("has-glow");
      const strong = card.matches(".disc, .proj, .stat, .info-card");
      card.addEventListener("pointerenter", () => {
        if (!card.classList.contains("in")) return;
        setTimeout(() => card.classList.add("tilt-on"), 0); card.classList.remove("settle");
      });
      card.addEventListener("pointermove", e => {
        const r = card.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        card.style.setProperty("--mx", x * 100 + "%"); card.style.setProperty("--my", y * 100 + "%");
        if (strong && card.classList.contains("tilt-on"))
          card.style.transform = "perspective(900px) rotateX(" + ((0.5 - y) * 7).toFixed(2) + "deg) rotateY(" + ((x - 0.5) * 9).toFixed(2) + "deg) translateY(-6px)";
      });
      card.addEventListener("pointerleave", () => {
        card.classList.add("settle"); card.style.transform = "";
        setTimeout(() => card.classList.remove("tilt-on", "settle"), 600);
      });
    });
    /* magnetic buttons */
    $$(".btn, .lang-btn").forEach(b => {
      b.addEventListener("pointermove", e => { const r = b.getBoundingClientRect();
        b.style.setProperty("--tx", ((e.clientX - r.left - r.width / 2) * 0.18).toFixed(1) + "px");
        b.style.setProperty("--ty", ((e.clientY - r.top - r.height / 2) * 0.28).toFixed(1) + "px"); });
      b.addEventListener("pointerleave", () => { b.style.setProperty("--tx", "0px"); b.style.setProperty("--ty", "0px"); });
    });
    /* splash orbs follow the cursor with depth */
    const sp = $(".splash");
    if (sp) sp.addEventListener("pointermove", e => {
      const r = sp.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      $$(".h3d .o", sp).forEach((o, i) => { const d = (i + 1) * 12;
        o.style.setProperty("--mx2", (-x * d * 2).toFixed(1) + "px"); o.style.setProperty("--my2", (-y * d * 2).toFixed(1) + "px"); });
    });
  }

  /* ---------- product filter: cards pop back in ---------- */
  const mo = new MutationObserver(ms => {
    let i = 0;
    ms.forEach(m => { const el = m.target;
      if (m.attributeName === "hidden" && !el.hidden && el.matches("[data-cat]")) {
        el.classList.remove("pop"); void el.offsetWidth; el.style.setProperty("--d", (i++ * 0.06) + "s"); el.classList.add("pop"); } });
  });
  $$("[data-cat]").forEach(el => mo.observe(el, { attributes: true, attributeFilter: ["hidden"] }));
})();
