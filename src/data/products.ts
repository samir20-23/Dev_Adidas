export interface Product {
  id: number;
  name: string;
  brand: string;
  model: string;
  price: number;
  collection: string;
  category: 'Shoes' | 'T-shirt' | 'Bags' | 'Tracksuit';
  colors: { name: string; image: string }[];
  sizes: number[];
  description: string;
  trending: boolean;
  images: string[];
}

// ─── HOW TO ADD NEW PRODUCTS ────────────────────────────────────────────────
// 1. Drop your image into public/products/<Category>/
// 2. Add a new object below following the same shape
// ─────────────────────────────────────────────────────────────────────────────
export const products: Product[] = [

  // ── SHOES ──────────────────────────────────────────────────────────────────
  {
    id: 1,
    name: "Adidas Campus 00s",
    brand: "Adidas",
    model: "Campus 00s",
    price: 379,
    collection: "Campus",
    category: "Shoes",
    colors: [
      { name: "White",  image: "/products/Shoes/Rectangle 6.png" },
      { name: "Green",  image: "/products/Shoes/Rectangle 72.png" },
      { name: "Navy",   image: "/products/Shoes/Rectangle 6 (copy 1).png" },
    ],
    sizes: [40, 41, 42, 43, 44, 45],
    description:
      "The adidas Campus 00s brings back the iconic silhouette with a modern twist. Suede upper, gum sole, and timeless 3-Stripes design. A streetwear staple reimagined for today.",
    trending: true,
    images: [
      "/products/Shoes/Rectangle 6.png",
      "/products/Shoes/Rectangle 72.png",
      "/products/Shoes/Rectangle 6 (copy 1).png",
    ],
  },
  {
    id: 2,
    name: "Adidas Campus Classic",
    brand: "Adidas",
    model: "Campus 00s",
    price: 349,
    collection: "Campus",
    category: "Shoes",
    colors: [
      { name: "Brown",  image: "/products/Shoes/Rectangle 73.png" },
      { name: "Tan",    image: "/products/Shoes/Rectangle 73 (1).png" },
    ],
    sizes: [40, 41, 42, 43, 44],
    description:
      "Classic Campus silhouette in premium suede. The rubber cupsole and 3-Stripes branding make this a timeless choice for everyday wear.",
    trending: false,
    images: [
      "/products/Shoes/Rectangle 73.png",
      "/products/Shoes/Rectangle 73 (1).png",
    ],
  },
  {
    id: 3,
    name: "Adidas Adizero EVO",
    brand: "Adidas",
    model: "Adizero EVO",
    price: 799,
    collection: "Adizero",
    category: "Shoes",
    colors: [
      { name: "Black", image: "/products/Shoes/Frame 202.png" },
      { name: "White", image: "/products/Shoes/Rectangle 6.png" },
    ],
    sizes: [41, 42, 43, 44, 45],
    description:
      "Step into speed with the Adizero EVO SL Running Shoes by adidas. Lightweight, durable, and built for optimal energy return.",
    trending: false,
    images: [
      "/products/Shoes/Frame 202.png",
      "/products/Shoes/Rectangle 6.png",
    ],
  },
  {
    id: 4,
    name: "Adidas Superstar",
    brand: "Adidas",
    model: "Superstar",
    price: 279,
    collection: "Superstar",
    category: "Shoes",
    colors: [
      { name: "White/Black", image: "/products/Shoes/Rectangle 72.png" },
      { name: "Black/White", image: "/products/Shoes/Frame 202.png" },
    ],
    sizes: [40, 41, 42, 43, 44, 45],
    description:
      "The adidas Superstar — an icon since 1969. Shell toe, 3-Stripes, and legendary street cred.",
    trending: true,
    images: [
      "/products/Shoes/Rectangle 72.png",
      "/products/Shoes/Frame 202.png",
    ],
  },
  {
    id: 5,
    name: "Adidas Gazelle Bold",
    brand: "Adidas",
    model: "Gazelle",
    price: 319,
    collection: "Gazelle",
    category: "Shoes",
    colors: [
      { name: "Core Black",  image: "/products/Shoes/Rectangle 73 (2).png" },
      { name: "Cream White", image: "/products/Shoes/Rectangle 74.png" },
    ],
    sizes: [39, 40, 41, 42, 43, 44],
    description:
      "The Gazelle Bold — chunky sole, retro silhouette, suede upper with gold 3-Stripes.",
    trending: true,
    images: [
      "/products/Shoes/Rectangle 73 (2).png",
      "/products/Shoes/Rectangle 74.png",
    ],
  },
  {
    id: 6,
    name: "Adidas Stan Smith",
    brand: "Adidas",
    model: "Stan Smith",
    price: 249,
    collection: "Stan Smith",
    category: "Shoes",
    colors: [
      { name: "Cloud White", image: "/products/Shoes/Rectangle 6.png" },
      { name: "Green Sole",  image: "/products/Shoes/Rectangle 6 (copy 1).png" },
    ],
    sizes: [40, 41, 42, 43, 44, 45],
    description:
      "A tennis legend turned fashion icon. Clean, minimal, and versatile — perfect for any occasion.",
    trending: false,
    images: [
      "/products/Shoes/Rectangle 6.png",
      "/products/Shoes/Rectangle 6 (copy 1).png",
    ],
  },

  // ── T-SHIRTS ───────────────────────────────────────────────────────────────
  {
    id: 7,
    name: "Adidas 3-Stripes Tee",
    brand: "Adidas",
    model: "3-Stripes Tee",
    price: 59,
    collection: "Essentials",
    category: "T-shirt",
    colors: [
      { name: "White",  image: "/products/T-shirt/Rectangle 72.png" },
      { name: "Black",  image: "/products/T-shirt/Rectangle 72 (copy 1).png" },
    ],
    sizes: [36, 38, 40, 42, 44, 46],
    description:
      "The classic adidas 3-Stripes tee. Lightweight cotton blend with moisture-wicking finish — perfect for training or casual wear.",
    trending: true,
    images: [
      "/products/T-shirt/Rectangle 72.png",
      "/products/T-shirt/Rectangle 72 (copy 1).png",
      "/products/T-shirt/Rectangle 72 (copy 2).png",
    ],
  },
  {
    id: 8,
    name: "Adidas Trefoil Tee",
    brand: "Adidas",
    model: "Trefoil Tee",
    price: 49,
    collection: "Originals",
    category: "T-shirt",
    colors: [
      { name: "Navy",  image: "/products/T-shirt/Rectangle 72 (copy 2).png" },
      { name: "Grey",  image: "/products/T-shirt/Rectangle 72 (copy 3).png" },
      { name: "Green", image: "/products/T-shirt/Rectangle 72 (copy 4).png" },
    ],
    sizes: [36, 38, 40, 42, 44],
    description:
      "Iconic Trefoil logo tee from adidas Originals. Soft cotton jersey with a relaxed fit — a streetwear essential.",
    trending: false,
    images: [
      "/products/T-shirt/Rectangle 72 (copy 2).png",
      "/products/T-shirt/Rectangle 72 (copy 3).png",
      "/products/T-shirt/Rectangle 72 (copy 4).png",
    ],
  },

  // ── BAGS ───────────────────────────────────────────────────────────────────
  {
    id: 9,
    name: "Adidas Classic Backpack",
    brand: "Adidas",
    model: "Classic Backpack",
    price: 129,
    collection: "Daily",
    category: "Bags",
    colors: [
      { name: "Black",  image: "/products/Bags/Rectangle 72.png" },
      { name: "White",  image: "/products/Bags/Rectangle 72 (copy 1).png" },
    ],
    sizes: [0],
    description:
      "The adidas Classic Backpack — 21L capacity, padded laptop sleeve, and 3-Stripes branding. Built for daily use.",
    trending: true,
    images: [
      "/products/Bags/Rectangle 72.png",
      "/products/Bags/Rectangle 72 (copy 1).png",
      "/products/Bags/Rectangle 72 (copy 2).png",
    ],
  },
  {
    id: 10,
    name: "Adidas Linear Duffel",
    brand: "Adidas",
    model: "Linear Duffel",
    price: 89,
    collection: "Training",
    category: "Bags",
    colors: [
      { name: "Grey",  image: "/products/Bags/Rectangle 72 (copy 3).png" },
      { name: "Navy",  image: "/products/Bags/Rectangle 72 (copy 4).png" },
      { name: "Olive", image: "/products/Bags/Rectangle 72 (copy 5).png" },
    ],
    sizes: [0],
    description:
      "Spacious duffel bag with zip main compartment and separate shoe pocket. Perfect for gym and travel.",
    trending: false,
    images: [
      "/products/Bags/Rectangle 72 (copy 3).png",
      "/products/Bags/Rectangle 72 (copy 4).png",
      "/products/Bags/Rectangle 72 (copy 5).png",
    ],
  },

  // ── TRACKSUITS ─────────────────────────────────────────────────────────────
  {
    id: 11,
    name: "Adidas Z.N.E. Hoodie",
    brand: "Adidas",
    model: "Z.N.E. Hoodie",
    price: 189,
    collection: "Z.N.E.",
    category: "Tracksuit",
    colors: [
      { name: "Grey",  image: "/products/Tracksuit/Z.N.E._Hoodie_Grey_JE3070_21_model.jpg" },
      { name: "Black", image: "/products/Tracksuit/Rectangle 72.png" },
    ],
    sizes: [36, 38, 40, 42, 44, 46],
    description:
      "The adidas Z.N.E. Hoodie — athlete-tested pre-match design with a cosy double-knit construction and a premium spacious hood.",
    trending: true,
    images: [
      "/products/Tracksuit/Z.N.E._Hoodie_Grey_JE3070_21_model.jpg",
      "/products/Tracksuit/Rectangle 72.png",
    ],
  },
  {
    id: 12,
    name: "Adidas Track Jacket",
    brand: "Adidas",
    model: "Track Jacket",
    price: 149,
    collection: "Originals",
    category: "Tracksuit",
    colors: [
      { name: "Navy",  image: "/products/Tracksuit/jf2443_C.jpg" },
      { name: "Black", image: "/products/Tracksuit/JJ4893_41_detail.jpg" },
      { name: "Grey",  image: "/products/Tracksuit/Rectangle 72 (copy 1).png" },
    ],
    sizes: [36, 38, 40, 42, 44],
    description:
      "The classic adidas track jacket with iconic 3-Stripes down the sleeves. Relaxed fit, zip front, ribbed cuffs and hem.",
    trending: false,
    images: [
      "/products/Tracksuit/jf2443_C.jpg",
      "/products/Tracksuit/JJ4893_41_detail.jpg",
      "/products/Tracksuit/Rectangle 72 (copy 1).png",
    ],
  },
];
