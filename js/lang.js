/* js/lang.js — loads in <head>. Decides the language BEFORE first paint (no flash),
   sets <html lang/dir> and loads the Tajawal font for Arabic.
   Switch with the header button, or open any page with ?lang=ar / ?lang=en. */
(function () {
  "use strict";
  var q = /[?&]lang=(ar|en)/.exec(location.search), lang = q && q[1];
  try { if (lang) localStorage.setItem("shams-lang", lang); else lang = localStorage.getItem("shams-lang"); } catch (e) {}
  lang = lang === "ar" ? "ar" : "en";
  var h = document.documentElement;
  h.lang = lang; h.dir = lang === "ar" ? "rtl" : "ltr";
  window.__lang = lang;
  try { if (sessionStorage.getItem("shams-nav") === "1" && !matchMedia("(prefers-reduced-motion: reduce)").matches) h.classList.add("pt"); } catch (e) {}
  if (lang === "ar") {
    h.classList.add("ar");
    var l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap";
    document.head.appendChild(l);
  }
  window.__setLang = function (v) {
    try { localStorage.setItem("shams-lang", v); } catch (e) {}
    var u = new URL(location.href); u.searchParams.delete("lang"); location.href = u.toString();
  };
})();
