/* js/pages/info.js — page logic for info.html (defines window.pageInit) */
const PAGES = {
  about: { t:"About Us", h:`<p>Shams is a cosmetics brand built on one idea: radiance, simply. We select skincare and makeup that work beautifully and feel good to use every day.</p><p>Every product is chosen for quality, comfort, and a natural glow.</p>` },
  policy: { t:"Our Policy", h:`<h2>Shipping</h2><p>Free shipping on orders over 4,000 EGP. Orders are delivered within 2–5 working days.</p><h2>Returns</h2><p>Unopened products can be returned within 14 days. <b>All discounted items are non-returnable.</b></p><h2>Payment</h2><p>Cash on delivery is available.</p>` },
  contact: { t:"Contact", h:`<p>Questions about an order or a product? Send us a message.</p><form class="contact-form" id="cf"><input required placeholder="Name"><input type="email" required placeholder="Email"><input placeholder="Phone"><textarea rows="5" required placeholder="Message"></textarea><button class="btn solid">Send</button></form>` }
};
window.pageInit = () => {
  const k = new URLSearchParams(location.search).get("p");
  const d = PAGES[k] || PAGES.about;
  document.title = d.t + " – Shams Cosmetics";
  document.getElementById("content").innerHTML = `<h1 class="section-title" style="text-align:left">${d.t}</h1>${d.h}`;
  const cf = document.getElementById("cf");
  if (cf) cf.onsubmit = e => { e.preventDefault(); cf.reset(); toast("Message sent!"); };
};
