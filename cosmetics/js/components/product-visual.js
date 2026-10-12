/* js/components/product-visual.js — Product image / SVG fallback */
function productSvg(p) {
  const c = p.color;
  const shapes = {
    lipstick: `<rect x="110" y="190" width="80" height="120" rx="6" fill="#3b3a36"/><rect x="118" y="130" width="64" height="62" fill="#a89f88"/><path d="M122 130 L122 90 Q150 60 178 90 L178 130Z" fill="${c}"/>`,
    bottle: `<rect x="125" y="70" width="50" height="40" rx="4" fill="#3b3a36"/><rect x="138" y="52" width="24" height="22" fill="#a89f88"/><rect x="100" y="108" width="100" height="190" rx="18" fill="${c}"/><rect x="115" y="170" width="70" height="60" rx="3" fill="#f5f2ea" opacity=".85"/>`,
    jar: `<rect x="85" y="150" width="130" height="30" rx="6" fill="#3b3a36"/><rect x="90" y="178" width="120" height="100" rx="16" fill="${c}"/><rect x="110" y="205" width="80" height="40" rx="3" fill="#f5f2ea" opacity=".85"/>`,
    palette: `<rect x="60" y="130" width="180" height="140" rx="12" fill="#3b3a36"/>` +
      [0,1,2,3].map(i => [0,1,2].map(j => `<rect x="${72+i*42}" y="${145+j*40}" width="34" height="32" rx="5" fill="${c}" opacity="${0.45+((i+j)%4)*0.18}"/>`).join("")).join(""),
    mascara: `<rect x="132" y="60" width="36" height="150" rx="6" fill="#3b3a36"/><rect x="125" y="205" width="50" height="90" rx="10" fill="${c}"/><rect x="142" y="215" width="16" height="50" fill="#a89f88"/>`
  };
  return `<svg viewBox="0 0 300 380" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs><radialGradient id="g${p.id}" cx="50%" cy="35%" r="80%"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="${p.bg}"/></radialGradient></defs>
    <rect width="300" height="380" fill="url(#g${p.id})"/><ellipse cx="150" cy="325" rx="90" ry="9" fill="#000" opacity=".1"/>${shapes[p.type]}</svg>`;
}

/* real Unsplash photo; falls back to the SVG drawing if the image fails to load */
function productVisual(p) {
  if (!p.img) return productSvg(p);
  return `<img src="${p.img}" alt="${p.name}" loading="lazy" decoding="async" onerror="this.onerror=null;this.outerHTML=productSvg(PRODUCTS.find(x=>x.id==='${p.id}'))">`;
}
