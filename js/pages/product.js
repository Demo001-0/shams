/* js/pages/product.js — page logic for product.html (defines window.pageInit) */
window.pageInit = () => {
  const id = new URLSearchParams(location.search).get("id");
  const p = byId(id) || PRODUCTS[0];
  document.title = p.name + " – Shams Cosmetics";
  let qty = 1;
  const root = document.getElementById("root");
  root.innerHTML = `
    <div class="crumbs"><a href="home.html">Home</a> / <a href="shop.html?cat=${p.cat}">${p.cat}</a> / ${p.name}</div>
    <div class="product">
      <div class="gallery">${productVisual(p)}</div>
      <div>
        <h1>${p.name}</h1>
        <div class="price">${p.compare?`<s>${fmt(p.compare)}</s> `:""}${fmt(p.price)}</div>
        ${p.compare?`<p style="margin-bottom:16px;font-size:14px">Discounted item – non-returnable.</p>`:""}
        <div class="qty"><button id="minus">−</button><span id="q">1</span><button id="plus">+</button></div>
        <button class="btn solid full add" id="add" ${p.available?"":"disabled"}>${p.available?"Add to cart":"Sold out"}</button>
        <p class="desc" dir="auto">${p.desc}</p>
        <ul><li>Free shipping on orders over 4,000 EGP</li><li>Cash on delivery available</li></ul>
      </div>
    </div>`;
  const q = document.getElementById("q");
  document.getElementById("minus").onclick = () => q.textContent = qty = Math.max(1, qty-1);
  document.getElementById("plus").onclick = () => q.textContent = ++qty;
  document.getElementById("add").onclick = () => addToCart(p.id, qty);
  document.getElementById("related").innerHTML = PRODUCTS.filter(x=>x.id!==p.id).slice(0,4).map(card).join("");
};
