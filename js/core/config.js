/* js/core/config.js — Store config and money formatting */
const FREE_SHIPPING = 4000;
const fmt = n => Number(n).toLocaleString("en-US", { minimumFractionDigits: 2 }) + " EGP";
const SHIPPING_FEE = 60; // flat shipping (EGP) when the order is under FREE_SHIPPING
