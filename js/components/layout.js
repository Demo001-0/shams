/* js/components/layout.js — Shared header, ticker, drawer, footer */
function layout() {
  const header = `
  <div class="bar one ann" id="annBar" aria-label="Announcements"><div class="ann-track" id="annTrack"></div></div>
  <header class="header"><div class="container">
    <div class="header-top">
      <div class="header-actions">
        <button class="icon-btn menu-btn" id="openMenu" aria-label="Menu">${icons.menu}</button>
        <button class="icon-btn" id="openSearch" aria-label="Search">${icons.search}</button>
      </div>
      <div class="header-actions">
        <a class="icon-btn" href="info.html?p=contact" aria-label="Account">${icons.user}</a>
        <button class="icon-btn" id="openCart" aria-label="Cart">${icons.bag}<span class="cart-count" id="cartCount">0</span></button>
      </div>
    </div>
    <a class="logo" href="home.html" aria-label="Shams Cosmetics">${sunLogo}<img src="assets/images/logo.png" alt="Shams" width="1500" height="500"><span class="sub">Cosmetics</span></a>
    <nav class="nav" id="nav"><button class="icon-btn nav-close" id="closeNav" aria-label="Close menu">×</button>${navLinks.map(([h,t])=>`<a href="${h}" class="${h===page?'active':''}">${t}</a>`).join("")}</nav>
  </div></header>
  <div class="search-panel" id="searchPanel"><div class="container">
    <input id="searchInput" placeholder="Search products..." autocomplete="off"><div class="search-results" id="searchResults"></div>
  </div></div>
  <div class="overlay" id="overlay"></div>
  <aside class="drawer" id="drawer" aria-label="Cart">
    <div class="drawer-head"><span>Your cart</span><button class="icon-btn" id="closeCart" aria-label="Close" style="font-size:26px">×</button></div>
    <div class="drawer-body" id="cartBody"></div>
    <div class="drawer-foot" id="cartFoot"></div>
  </aside><div class="toast" id="toast"></div>`;
  document.body.insertAdjacentHTML("afterbegin", header);

  // nav lives in the top row, between the left and right icon groups
  const topRow = document.querySelector(".header-top"), navEl = document.getElementById("nav");
  if (topRow && navEl) topRow.insertBefore(navEl, topRow.children[1]);

  /* ---- announcement ticker (continuous scrolling strip) ---- */
  (() => {
    const svg = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
    const truck = svg('<rect x="2" y="7" width="12" height="9" rx="1.5"/><path d="M14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.8"/><circle cx="17" cy="18" r="1.8"/>');
    const tag = svg('<path d="M3 12.5V4h8.5l9 9a1.5 1.5 0 010 2.1l-6.4 6.4a1.5 1.5 0 01-2.1 0z"/><circle cx="7.5" cy="8.5" r="1.3"/>');
    const msgs = [[truck, "Free shipping on orders over 4,000 EGP"], [tag, "Discounted items are non-returnable"]];
    const group = msgs.map(([ic, t]) => `<span class="ann-item"><span class="ann-ico">${ic}</span>${t}</span><span class="ann-dot" aria-hidden="true"></span>`).join("").repeat(3);
    const track = document.getElementById("annTrack");
    track.innerHTML = `<div class="ann-group">${group}</div><div class="ann-group" aria-hidden="true">${group}</div>`;
    const hero = document.querySelector(".lookbook, .hero");           // on pages with a hero, the strip replaces the divider line above it
    if (hero) {
      hero.before(document.getElementById("annBar")); document.body.classList.add("home-splash");
      const hc = document.querySelector(".header > .container");
      if (hc) {
        hc.insertAdjacentHTML("beforeend", `<div class="splash-copy">
          <p class="sp-tag"><span>Radiance, simply.</span></p>
          <p class="sp-sub">Skincare and makeup made to glow with you.</p>
        </div>`);
      }
    }
  })();

  document.body.insertAdjacentHTML("beforeend", `
  <footer class="footer"><div class="container">
    <div class="cols">
      <div><h5>Shams Cosmetics</h5><p>Radiance, simply. Skincare and makeup made to glow with you.</p>
        <form id="newsletter"><input type="email" required placeholder="Email address"><button>Join</button></form></div>
      <div><h5>Shop</h5><ul><li><a href="shop.html">All products</a></li><li><a href="shop.html?cat=Skincare">Skincare</a></li><li><a href="shop.html?cat=Lips">Lips</a></li><li><a href="shop.html?cat=Eyes">Eyes</a></li></ul></div>
      <div><h5>Help</h5><ul><li><a href="info.html?p=about">About Us</a></li><li><a href="info.html?p=policy">Our Policy</a></li><li><a href="info.html?p=contact">Contact</a></li></ul></div>
    </div>
    <p class="copy">© ${new Date().getFullYear()} Shams Cosmetics. All rights reserved.</p>
  </div></footer>`);
}
