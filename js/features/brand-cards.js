/* js/features/brand-cards.js — two flat 2D cards floating in the empty sides of the home splash (hero).
   Tap one and it opens, in place, into a brand message. On narrow screens they become round badges beside the sun. */
(function () {
  const header = document.querySelector(".header");
  if (!header || !document.querySelector(".lookbook") || !document.body.classList.contains("home-splash")) return;

  /* flat illustrations */
  const rays = Array.from({ length: 9 }, (_, i) => {
    const a = Math.PI + (i / 8) * Math.PI, c = Math.cos(a), s = Math.sin(a);
    return `<line x1="${(60 + c * 32).toFixed(1)}" y1="${(66 + s * 32).toFixed(1)}" x2="${(60 + c * (i % 2 ? 40 : 46)).toFixed(1)}" y2="${(66 + s * (i % 2 ? 40 : 46)).toFixed(1)}"/>`;
  }).join("");
  const SUNRISE = `<svg viewBox="0 0 120 80" aria-hidden="true"><g class="bc-rays" stroke="#e57193" stroke-width="3" stroke-linecap="round">${rays}</g>
    <path d="M34 66a26 26 0 0 1 52 0z" fill="#e57193"/><line x1="12" y1="66" x2="108" y2="66" stroke="#d17f97" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="30" y1="74" x2="90" y2="74" stroke="#f0bdcb" stroke-width="2.5" stroke-linecap="round"/></svg>`;
  const star = (x, y, s) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0-9C1-3 3-1 9 0 3 1 1 3 0 9-1 3-3 1-9 0-3-1-1-3 0-9z" fill="#f4a3bb"/>`;
  const SHIELD = `<svg viewBox="0 0 120 90" aria-hidden="true"><g class="bc-rays">${star(24, 22, 1)}${star(98, 56, .8)}${star(92, 18, .55)}</g>
    <path d="M60 8l28 11v21c0 17-11.5 29-28 36-16.5-7-28-19-28-36V19z" fill="#e57193"/>
    <path d="M47 43l9.5 9.5L74 33" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  const CARDS = [
    { side: "left",  label: "Our Story", short: "Story", art: SUNRISE, title: "Born from the sun",
      text: "Shams means sun. We began with one simple idea: skincare and makeup that bring out your natural glow, gently and beautifully.",
      cta: ["About us", "info.html?p=about"] },
    { side: "right", label: "Our Promise", short: "Promise", art: SHIELD, title: "Radiance, simply",
      text: "Carefully selected, dermatologically tested products, free shipping over 4,000 EGP and cash on delivery, so glowing feels easy.",
      cta: ["Shop now", "shop.html"] }
  ];

  const wrap = document.createElement("div");
  wrap.className = "bc-wrap";
  wrap.innerHTML = CARDS.map((c, i) => `
    <div class="bc bc-${c.side}" id="bc${i}">
      <div class="bc-card">
        <button class="bc-face" type="button" aria-expanded="false" aria-controls="bc${i}b" aria-label="${c.label}">
          <span class="bc-art">${c.art}</span>
          <span class="bc-label">${c.label}</span><span class="bc-short">${c.short}</span>
        </button>
        <div class="bc-body" id="bc${i}b" role="region" aria-label="${c.label}">
          <button class="bc-close" type="button" aria-label="Close">×</button>
          <span class="bc-kicker">${c.label}</span>
          <h3>${c.title}</h3>
          <p>${c.text}</p>
          <a class="btn solid bc-cta" href="${c.cta[1]}">${c.cta[0]}</a>
        </div>
      </div>
    </div>`).join("");
  header.appendChild(wrap);

  const cards = [...wrap.querySelectorAll(".bc")];
  const setOpen = (card, open) => {
    if (open) fit(card);
    card.classList.toggle("open", open);
    card.querySelector(".bc-face").setAttribute("aria-expanded", String(open));
  };
  /* phones: size the open card to its text so there is no empty space inside */
  const fit = card => {
    if (innerWidth > 860) { card.style.removeProperty("--oh"); return; }
    card.style.setProperty("--oh", Math.ceil(card.querySelector(".bc-body").offsetHeight) + "px");
  };
  const closeAll = except => cards.forEach(c => c !== except && setOpen(c, false));
  cards.forEach(card => {
    card.querySelector(".bc-face").addEventListener("click", () => { closeAll(card); setOpen(card, true); });
    card.querySelector(".bc-close").addEventListener("click", () => setOpen(card, false));
  });
  document.addEventListener("click", e => { if (!e.target.closest(".bc")) closeAll(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeAll(); });

  /* line the cards up with the logo: vertical centre of the whole logo (desktop) and of the sun (phones) */
  const place = () => {
    if (scrollY > 4) return;                       // the logo drifts while scrolling; measure only at the top
    const logo = header.querySelector(".logo"), sun = logo && logo.querySelector("svg");
    if (!logo || !sun) return;
    const hb = header.getBoundingClientRect(), lr = logo.getBoundingClientRect(), sr = sun.getBoundingClientRect();
    wrap.style.setProperty("--bc-y", (lr.top + lr.height / 2 - hb.top).toFixed(0) + "px");
    wrap.style.setProperty("--bc-sy", (sr.top + sr.height / 2 - hb.top).toFixed(0) + "px");
  };
  place();
  addEventListener("resize", place);
  addEventListener("resize", () => cards.forEach(c => c.classList.contains("open") && fit(c)));
  addEventListener("load", place);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(place);

  /* once the splash has scrolled away the cards stop being clickable (they fade with it via --sp) */
  let tick = false;
  addEventListener("scroll", () => {
    if (tick) return; tick = true;
    requestAnimationFrame(() => { wrap.classList.remove("gone"); tick = false; });
  }, { passive: true });

  /* spring in after the logo has settled */
  setTimeout(() => cards.forEach((c, i) => setTimeout(() => c.classList.add("ready"), i * 220)), 1500);
})();
