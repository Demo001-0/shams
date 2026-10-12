/* js/components/layout.js — Shared header, ticker, drawer, footer */
function layout() {
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
