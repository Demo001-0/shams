/* js/data/services.js — the six MEP disciplines + the fire-protection scope of work (from the company profile) */
const SERVICES = [
  { id: "fire-protection", color: "red", icon: "flame", title: "Fire Protection",
    summary: "Gaseous, aerosol and water-based suppression, pumps, valves and fire curtains — supplied, installed and commissioned.",
    points: ["FM-200, NOVEC & aerosol suppression", "Sprinklers & hose cabinets", "Kitchen fire suppression", "Fire-fighting pumps", "Foam systems", "Fire curtains"] },
  { id: "fire-alarm", color: "red", icon: "bell", title: "Fire Alarm",
    summary: "Addressable and conventional fire alarm systems, including suppression release panels.",
    points: ["Addressable systems", "Conventional systems", "Suppression release systems", "Detection, manual call points & notification devices"] },
  { id: "hvac", color: "blue", icon: "wind", title: "HVAC",
    summary: "Heating, ventilation and air-conditioning works delivered by our MEP technical teams.",
    points: ["Supply only", "Supply & installation", "Testing", "Commissioning"] },
  { id: "low-current", color: "blue", icon: "plug", title: "Low Current",
    summary: "Low-current services delivered by our MEP technical teams.",
    points: ["Supply only", "Supply & installation", "Testing", "Commissioning"] },
  { id: "bms", color: "blue", icon: "chip", title: "BMS",
    summary: "Building management systems, supplied, implemented, tested and commissioned.",
    points: ["Supply only", "Supply & implementation", "Testing", "Commissioning"] },
  { id: "security", color: "red", icon: "shield", title: "Security Services",
    summary: "Security systems supplied, installed, tested and commissioned as part of one package.",
    points: ["Supply only", "Supply & installation", "Testing", "Commissioning"] }
];

const SCOPE = [
  ["Fire Suppression Systems", "FM200, NOVEC and Aerosol systems"],
  ["Fire Alarm System", "Addressable, Conventional and Suppression Release systems"],
  ["Water Suppression System", "Sprinklers · Hose Cabinet"],
  ["Kitchen Fire Suppression Systems", "Dedicated protection for commercial kitchens"],
  ["Fire Fighting Pump", "Electrical, Diesel and Jockey"],
  ["Valve", "OS&Y Valves, Check Valve, Butterfly, NRS, Hydrant and Deluge"],
  ["Foam System", "Foam-based fire protection"],
  ["Fire Curtain", "Smoke and fire curtains"]
];
