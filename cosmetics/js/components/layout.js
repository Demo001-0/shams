/* js/components/layout.js — Shared header, ticker, drawer, footer */
function layout() {
  const navIcons = { "index.html": '<path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/>', "services.html": '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>', "products.html": '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5l8 4.5 8-4.5M12 12v9"/>', "projects.html": '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18"/>', "about.html": '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>', "contact.html": '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>' };
  const header = `
  <header class="header"><div class="container">
    <div class="header-top">
      <div class="header-actions">
        <button class="icon-btn menu-btn" id="openMenu" aria-label="Menu">${icons.menu}</button>
        <button class="icon-btn" id="openSearch" aria-label="Search">${icons.search}</button>
      </div>
      <div class="header-actions">
        <button class="icon-btn" id="openCart" aria-label="Cart">${icons.bag}<span class="cart-count" id="cartCount">0</span></button>
      </div>
    </div>
    <nav class="sn" id="nav" aria-label="Main"><button class="icon-btn nav-close" id="closeNav" aria-label="Close menu">×</button><div class="sn-frame">${navLinks.map(([h,t])=>`<a class="snl${h.split("/").pop()===page?" active":""}" href="${h}"><svg class="nic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${navIcons[h.split("/").pop()]||""}</svg><span>${t}</span></a>`).join("")}</div><a class="sn-lang" href="../index.html?lang=ar" lang="ar">العربية</a><a class="sn-quote" href="../contact.html">Get a quote</a></nav>
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

  // compact brand logo — same look as the main Shams site header (logo at the start, search moves next to the cart)
  if (topRow) {
    topRow.insertAdjacentHTML("afterbegin", `<a class="brand" href="home.html" aria-label="Shams Cosmetics"><img src="assets/images/logo.png" alt="Shams Cosmetics" width="170" height="40"></a>`);
    const search = document.getElementById("openSearch"), right = topRow.querySelector(".header-actions:last-child");
    if (search && right) right.insertBefore(search, right.firstChild);
  }

  document.body.insertAdjacentHTML("beforeend", `
  <footer class="footer"><div class="container">
    <div class="cols">
      <div><h5>Shams Cosmetics</h5><p>Radiance, simply. Skincare and makeup made to glow with you.</p>
        <form id="newsletter"><input type="email" required placeholder="Email address"><button>Join</button></form></div>
      <div><h5>Shop</h5><ul><li><a href="home.html#products">All products</a></li><li><a href="home.html?cat=Skincare#products">Skincare</a></li><li><a href="home.html?cat=Lips#products">Lips</a></li><li><a href="home.html?cat=Eyes#products">Eyes</a></li></ul></div>
    </div>
    <p class="copy">© ${new Date().getFullYear()} Shams Cosmetics. All rights reserved.</p>
  </div></footer>`);
}
