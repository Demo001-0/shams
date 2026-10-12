/* js/data/products.js — product catalogue (edit here to add / change products)
   cat: suppression | alarm | pumps | water | safety */
const CATS = [
  ["all", "All products"], ["suppression", "Suppression systems"], ["alarm", "Fire alarm"],
  ["pumps", "Fire pumps"], ["water", "Sprinklers & valves"], ["safety", "Hydrants, extinguishers & monitoring"]
];

const P = "assets/products/";
const SYSTEMS = [
  { id: "fm200", cat: "suppression", name: "FM-200® Total Flood Fire Suppression System", catLabel: "Clean agent",
    desc: "Total-flood clean agent systems for protecting critical spaces — available as HYGOOD® FM-200 by Tyco and Safety Hi-Tech® FM-200.",
    brands: ["Tyco · HYGOOD®", "Safety Hi-Tech®"], wide: true,
    images: [[P + "fm200-system.jpg", "HYGOOD FM-200 cylinder bank by Tyco"], [P + "hi-tech-cylinders.jpg", "Safety Hi-Tech FM-200 cylinders"], [P + "fm200-label.jpg", "FM-200 nameplate"], [P + "hi-tech-global.jpg", "Safety Hi-Tech global reference"]] },
  { id: "sapphire", cat: "suppression", name: "FK-5-1-12 SAPPHIRE® Total Flood System", catLabel: "Clean agent",
    desc: "Fire suppression system with FK-5-1-12 agent, by Tyco.",
    brands: ["Tyco"], images: [[P + "sapphire-system.jpg", "SAPPHIRE FK-5-1-12 cylinder bank"], [P + "sapphire-label.jpg", "SAPPHIRE nameplate"]] },
  { id: "aerosol", cat: "suppression", name: "Aerosol Fire Suppression Systems", catLabel: "Aerosol",
    desc: "Compact aerosol generators: FirePro and Stat-X (by Fireaway LLC, made in the USA).",
    brands: ["FirePro", "Stat-X", "Fireaway LLC"], images: [[P + "firepro-canisters.jpg", "FirePro aerosol canisters"], [P + "firepro-generators.jpg", "FirePro generators"], [P + "statx-range.jpg", "Stat-X aerosol range"]] },
  { id: "alarm", cat: "alarm", name: "Fire Alarm System (Simplex)", catLabel: "Fire alarm",
    desc: "Simplex fire alarm control units are scalable, feature-rich and offer easier installation, lower lifecycle costs and operational efficiency.",
    brands: ["Simplex", "Johnson Controls"], wide: true,
    images: [[P + "alarm-architecture.jpg", "Fire alarm system architecture"], [P + "alarm-detector.jpg", "Smoke detector"], [P + "alarm-pull-station.jpg", "Simplex manual pull station"], [P + "alarm-horn-strobe.jpg", "Simplex horn strobe"]] },
  { id: "pumps", cat: "pumps", name: "Fire Fighting Pumps", catLabel: "Pumps",
    desc: "Fire pumps are an essential part of many water-based fire protection systems — they increase the pressure. Electrical, diesel and jockey pumps.",
    brands: ["Electrical", "Diesel", "Jockey"], wide: true,
    images: [[P + "pump-package.jpg", "Electric and diesel pump package"], [P + "pump-end-suction.jpg", "Horizontal split-case pump"], [P + "pump-vertical.jpg", "Vertical turbine pump"], [P + "pump-diesel-diagram.jpg", "Diesel engine driven pump layout"]] }
];

const CATALOG = [
  { id: "sprinklers", cat: "water", color: "r", title: "Sprinklers & Nozzles", icons: ["sprinkler-pendent", "sprinkler-concealed", "sprinkler-open", "sprinkler-upright"],
    items: ["Concealed Sprinklers", "Storage Sprinklers", "Open Nozzles", "Upright Sprinklers", "Pendent Sprinklers", "Dry Sprinklers", "Sidewall Sprinklers", "Foam-Water Sprinklers", "Special Sprinklers", "Escutcheons", "Sprinkler Guards & Shields", "Sprinkler Cabinets"] },
  { id: "valves", cat: "water", color: "b", title: "Valves", icons: ["valve-alarm", "valve-gate", "valve-prv", "valve-ball"],
    items: ["Butterfly Valves", "Pressure Reducing Valves", "Globe Valves", "Air Release Valves", "Test & Drain Valves", "Wet Alarm Valves", "Deluge Valves", "Preaction Valves", "Pressure Relief Valves", "Gate Valves", "Strainers"] },
  { id: "brass", cat: "water", color: "r", title: "Brass Valves & Accessories", icons: ["brass-gate", "fdc", "valve-ball", "valve-gate"],
    items: ["OS&Y Gate Valves", "Check Valves", "Fire Department Connections", "Angle Hose Valves", "Ball Valves", "Adjustable Fog Nozzles"] },
  { id: "hydrants", cat: "safety", color: "b", title: "Hydrants", icons: ["hydrant-dry", "hydrant-wet", "brass-gate", "fdc"],
    items: ["Valve Boxes", "Dry Barrel Hydrants", "Wet Barrel Hydrants", "Vertical Post Indicators", "Wall Post Indicators", "Monitor Style Hydrants"] },
  { id: "extinguishers", cat: "safety", color: "r", title: "Fire Extinguishers", icons: ["extinguisher-abc", "extinguisher-co2"],
    items: ["Dry Chemical Extinguishers", "Wet Chemical Extinguishers", "Foam Extinguishers", "Water Extinguishers", "CO2 Extinguishers", "Clean Agent Extinguishers"] },
  { id: "monitoring", cat: "safety", color: "b", title: "Measuring & Monitoring Devices", icons: ["flow-switch", "gauge"],
    items: ["Pressure Gauges", "Flow Meters", "Supervisory Switches", "Water Flow Switches", "Pressure Switches"] }
];
