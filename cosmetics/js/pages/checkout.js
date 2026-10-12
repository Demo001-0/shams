/* js/pages/checkout.js — front-end-only checkout (no backend): validates the form, saves the order in this browser, shows a confirmation */
const GOVERNORATES = ["Cairo","Giza","Alexandria","Qalyubia","Sharqia","Dakahlia","Gharbia","Monufia","Beheira","Kafr El Sheikh","Damietta","Port Said","Ismailia","Suez","North Sinai","South Sinai","Fayoum","Beni Suef","Minya","Asyut","Sohag","Qena","Luxor","Aswan","Red Sea","New Valley","Matrouh"];
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const cartTotals = () => {
  const subtotal = cart.reduce((s, i) => s + byId(i.id).price * i.qty, 0);
  const shipping = subtotal >= FREE_SHIPPING || !subtotal ? 0 : SHIPPING_FEE;
  return { subtotal, shipping, total: subtotal + shipping };
};
const summaryHTML = (items, t) => `
  <div class="co-lines">${items.map(i => `<div class="co-line">
    <div class="co-thumb">${i.visual}<span class="co-badge">${i.qty}</span></div>
    <div class="co-name">${esc(i.name)}</div>
    <div class="co-price">${fmt(i.price * i.qty)}</div></div>`).join("")}</div>
  <div class="co-row"><span>Subtotal</span><span>${fmt(t.subtotal)}</span></div>
  <div class="co-row"><span>Shipping</span><span>${t.shipping ? fmt(t.shipping) : "Free"}</span></div>
  <div class="co-row co-total"><span>Total</span><span>${fmt(t.total)}</span></div>`;

function renderConfirmation(order) {
  document.title = "Order confirmed – Shams Cosmetics";
  document.getElementById("coRoot").innerHTML = `
    <div class="co-done">
      <h1 class="co-title">Thank you, ${esc(order.customer.name.split(" ")[0])}!</h1>
      <p class="co-order-no">Order <b>${order.id}</b></p>
      <p>We received your order and will call you on <b>${esc(order.customer.phone)}</b> to confirm it. Delivery usually takes 2–5 working days.</p>
      <div class="co-card">
        <h3>Order summary</h3>${summaryHTML(order.items.map(i => ({ ...i, visual: productVisual(byId(i.id) || {}) })), order)}
        <h3>Delivery to</h3>
        <p>${esc(order.customer.name)}<br>${esc(order.customer.address)}<br>${esc(order.customer.city)}, ${esc(order.customer.governorate)}</p>
        <h3>Payment</h3><p>Cash on delivery — ${fmt(order.total)}</p>
      </div>
      <a class="btn solid" href="home.html#products">Continue shopping</a>
    </div>`;
}

function renderCheckout() {
  const root = document.getElementById("coRoot");
  if (!cart.length) {
    root.innerHTML = `<div class="co-empty"><h1 class="co-title">Your cart is empty</h1><p>Add something you like first.</p><a class="btn solid" href="home.html#products">Continue shopping</a></div>`;
    return;
  }
  const items = cart.map(i => { const p = byId(i.id); return { id: p.id, name: p.name, price: p.price, qty: i.qty, visual: productVisual(p) }; });
  const t = cartTotals();
  root.innerHTML = `
    <h1 class="co-title">Checkout</h1>
    <div class="co-grid">
      <form class="co-form" id="coForm" novalidate>
        <h3>Contact</h3>
        <div class="co-field"><label for="cName">Full name</label><input id="cName" name="name" autocomplete="name" required></div>
        <div class="co-two">
          <div class="co-field"><label for="cPhone">Phone (WhatsApp)</label><input id="cPhone" name="phone" inputmode="tel" autocomplete="tel" placeholder="01XXXXXXXXX" required></div>
          <div class="co-field"><label for="cEmail">Email <small>(optional)</small></label><input id="cEmail" name="email" type="email" autocomplete="email"></div>
        </div>
        <h3>Delivery</h3>
        <div class="co-two">
          <div class="co-field"><label for="cGov">Governorate</label>
            <select id="cGov" name="governorate" required><option value="">Select…</option>${GOVERNORATES.map(g => `<option>${g}</option>`).join("")}</select></div>
          <div class="co-field"><label for="cCity">City / area</label><input id="cCity" name="city" autocomplete="address-level2" required></div>
        </div>
        <div class="co-field"><label for="cAddr">Address</label><input id="cAddr" name="address" autocomplete="street-address" placeholder="Street, building, floor, apartment" required></div>
        <div class="co-field"><label for="cNote">Order notes <small>(optional)</small></label><textarea id="cNote" name="notes" rows="3"></textarea></div>
        <h3>Payment</h3>
        <label class="co-pay"><input type="radio" name="pay" checked><span>Cash on delivery<small>Pay in cash when your order arrives.</small></span></label>
        <p class="co-err" id="coErr" role="alert"></p>
        <button class="btn solid full" type="submit" id="coSubmit">Place order · ${fmt(t.total)}</button>
      </form>
      <aside class="co-card co-summary"><h3>Order summary</h3>${summaryHTML(items, t)}
        ${t.shipping ? `<p class="co-hint">Add <b>${fmt(FREE_SHIPPING - t.subtotal)}</b> more for free shipping.</p>` : ""}
        <a class="co-edit" href="home.html#products">← Continue shopping</a></aside>
    </div>`;

  const form = document.getElementById("coForm"), err = document.getElementById("coErr");
  form.addEventListener("input", e => e.target.classList.remove("bad"));
  form.onsubmit = e => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(form));
    const phone = (f.phone || "").replace(/[\s-]/g, "").replace(/^\+?20/, "0");
    const bad = [];
    if (f.name.trim().length < 3) bad.push("name");
    if (!/^01[0125]\d{8}$/.test(phone)) bad.push("phone");
    if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) bad.push("email");
    if (!f.governorate) bad.push("governorate");
    if (!f.city.trim()) bad.push("city");
    if (f.address.trim().length < 6) bad.push("address");
    form.querySelectorAll(".bad").forEach(x => x.classList.remove("bad"));
    if (bad.length) {
      bad.forEach(n => form.elements[n].classList.add("bad"));
      err.textContent = bad.includes("phone") && bad.length === 1 ? "Please enter a valid Egyptian mobile number (e.g. 01012345678)." : "Please fill in the highlighted fields.";
      form.elements[bad[0]].focus(); return;
    }
    err.textContent = "";
    const totals = cartTotals();
    const order = {
      id: "SH-" + Date.now().toString(36).toUpperCase(),
      date: new Date().toISOString(),
      customer: { name: f.name.trim(), phone, email: f.email.trim(), governorate: f.governorate, city: f.city.trim(), address: f.address.trim(), notes: f.notes.trim() },
      items: items.map(({ id, name, price, qty }) => ({ id, name, price, qty })),
      ...totals, payment: "cod", status: "new"
    };
    try { const all = JSON.parse(localStorage.getItem("shams_orders")) || []; all.push(order); localStorage.setItem("shams_orders", JSON.stringify(all)); } catch (x) {}
    cart = []; saveCart();
    history.replaceState(null, "", "checkout.html?order=" + order.id);
    renderConfirmation(order); scrollTo(0, 0);
  };
}

window.pageInit = () => {
  const done = new URLSearchParams(location.search).get("order");
  if (done) {
    try { const o = (JSON.parse(localStorage.getItem("shams_orders")) || []).find(x => x.id === done); if (o) return renderConfirmation(o); } catch (x) {}
  }
  renderCheckout();
};
