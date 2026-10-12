/* js/data/services.js — Scope of work (single source: company profile slide) */
const SCOPE = [
  ["Fire Suppression Systems", "FM200, NOVEC and Aerosol systems"],
  ["Water Suppression System", "Sprinklers · Hose Cabinet"],
  ["Fire Fighting Pump", "Electrical, Diesel and Jockey"],
  ["Foam System", ""],
  ["Fire Alarm System", "Addressable, Conventional and Suppression Release systems"],
  ["Kitchen Fire Suppression Systems", ""],
  ["Valve", "OS&Y Valves, Check Valve, Butterfly, NRS, Hydrant and Deluge"],
  ["Fire Curtain", ""]
];

/* ticker, footer and the contact form read the same list */
const SERVICES = SCOPE.map(([title], i) => ({ id: "scope-" + (i + 1), title }));
