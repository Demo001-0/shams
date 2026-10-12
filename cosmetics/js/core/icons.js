/* js/core/icons.js — Brand sun and UI icons */
/* ---------- Shared layout + cart ---------- */
const sunLogo = `<svg viewBox="0 0 160 160" fill="#c4524a" aria-hidden="true">
  <circle cx="80" cy="80" r="30"/>
  ${Array.from({length:16},(_,i)=>{const a=i*22.5*Math.PI/180,l=i%2?10:18;const x1=80+Math.cos(a)*42,y1=80+Math.sin(a)*42,x2=80+Math.cos(a)*(42+l),y2=80+Math.sin(a)*(42+l);return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#c4524a" stroke-width="3" stroke-linecap="round"/>`}).join("")}
</svg>`;

const icons = {
  menu:`<svg viewBox="0 0 24 24"><path d="M3 7h18M3 12h18M3 17h18"/></svg>`,
  search:`<svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="7"/><path d="M16 16l5 5"/></svg>`,
  user:`<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.5 3.5-7 8-7s8 2.5 8 7"/></svg>`,
  bag:`<svg viewBox="0 0 24 24"><path d="M5 8h14l-1 13H6L5 8z"/><path d="M9 8V6a3 3 0 016 0v2"/></svg>`
};
