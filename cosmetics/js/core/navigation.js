/* js/core/navigation.js — Current page and navigation links */
const page = location.pathname.split("/").pop() || "index.html";
/* same navigation as the main Shams site (pages live one folder up) */
const navLinks = [["../index.html","Home"],["../services.html","Services"],["../products.html","Products"],["../projects.html","Projects"],["../about.html","About"],["../contact.html","Contacts"]];
