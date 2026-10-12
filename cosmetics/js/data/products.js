/* js/data/products.js — Product catalogue (edit here to add / change products) */
// Product data — edit here to add or change products
const PRODUCTS = [
  { id: "velvet-lip-rose", img: "https://images.unsplash.com/photo-1631214499500-2e34edcaccfe?auto=format&fit=crop&w=900&q=80", name: "Velvet Matte Lipstick – Rose", cat: "Lips", type: "lipstick", color: "#b5616a", bg: "#f8dde4", price: 450, compare: null, available: true,
    desc: "A matte lipstick with a velvet finish that lasts up to 12 hours, enriched with vitamin E to keep lips moisturised." },
  { id: "velvet-lip-nude", img: "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&w=900&q=80", name: "Velvet Matte Lipstick – Nude", cat: "Lips", type: "lipstick", color: "#a97f6a", bg: "#f9e1e7", price: 450, compare: 600, available: true,
    desc: "A warm nude shade made for everyday wear, with a light formula that never dries out." },
  { id: "glow-serum", img: "https://images.unsplash.com/photo-1713768704571-6aeb0d0e5105?auto=format&fit=crop&w=900&q=80", name: "Radiant Glow Vitamin C Serum", cat: "Skincare", type: "bottle", color: "#c9a24a", bg: "#fae4ea", price: 980, compare: null, available: true,
    desc: "A vitamin C serum that brightens the skin and evens out tone, suitable for all skin types." },
  { id: "hydra-cream", img: "https://images.unsplash.com/photo-1552046122-03184de85e08?auto=format&fit=crop&w=900&q=80", name: "Hydra Soft Day Cream", cat: "Skincare", type: "jar", color: "#8a7f69", bg: "#f7dbe3", price: 760, compare: 950, available: true,
    desc: "A hydrating day cream with hyaluronic acid for 24-hour moisture and a silky finish." },
  { id: "silk-foundation", img: "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&w=900&q=80", name: "Silk Skin Foundation", cat: "Face", type: "bottle", color: "#d3a98a", bg: "#f9e0e6", price: 1100, compare: null, available: true,
    desc: "A foundation with medium, buildable coverage and a soft, natural finish." },
  { id: "sunset-palette", img: "https://images.unsplash.com/photo-1768983224486-b4dcd179b4a5?auto=format&fit=crop&w=900&q=80", name: "Sunset Eyeshadow Palette", cat: "Eyes", type: "palette", color: "#b8734a", bg: "#f8dce5", price: 1250, compare: 1500, available: true,
    desc: "12 shades in matte and shimmer finishes, in warm tones inspired by the sunset." },
  { id: "lash-mascara", img: "https://images.unsplash.com/photo-1619749652035-d026e321389f?auto=format&fit=crop&w=900&q=80", name: "Lash Lift Mascara", cat: "Eyes", type: "mascara", color: "#2b2b2b", bg: "#f6dfe5", price: 420, compare: null, available: false,
    desc: "A waterproof mascara for long, full lashes with no clumping." },
  { id: "body-oil", img: "https://images.unsplash.com/photo-1696025522422-aa9a74e4f3d5?auto=format&fit=crop&w=900&q=80", name: "Golden Hour Body Oil", cat: "Body", type: "bottle", color: "#c58f3c", bg: "#fae0de", price: 680, compare: null, available: true,
    desc: "A dry-touch body oil with a light golden shimmer and a warm scent." }
];
