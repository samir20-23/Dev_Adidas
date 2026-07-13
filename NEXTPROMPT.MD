# Dev_Adidas — Full Fix Prompt (All Issues)

You are a senior React + TypeScript + Vite developer. Fix ALL the following issues completely. This is a real app not a test — everything must work 100%. Use localStorage as the only database.

---

## ISSUE 1 — Dark Mode Toggle Broken

**Problem:** Dark mode toggle requires many clicks, light mode doesn't apply to all elements.

**Fix:**
- In `src/contexts/ThemeContext.tsx`, the toggle must immediately flip between `'dark'` and `'light'` on a single click.
- Save the theme to `localStorage.setItem('theme', value)` and read it on app load.
- Apply the theme by setting a class on `document.documentElement`: `document.documentElement.classList.toggle('dark', isDark)`.
- In `src/index.css`, define ALL colors using CSS variables with two sets — default (light) and `.dark` overrides:

```css
:root {
  --bg: #F5F5F5;
  --surface: #FFFFFF;
  --text-primary: #111111;
  --text-secondary: #888888;
  --border: #E8E8E8;
  --nav-bg: #FFFFFF;
  --card-bg: #FFFFFF;
  --input-bg: #FFFFFF;
  --black-btn: #000000;
  --black-btn-text: #FFFFFF;
}

html.dark {
  --bg: #0F0F0F;
  --surface: #1A1A1A;
  --text-primary: #F0F0F0;
  --text-secondary: #AAAAAA;
  --border: #2A2A2A;
  --nav-bg: #1A1A1A;
  --card-bg: #1E1E1E;
  --input-bg: #252525;
  --black-btn: #FFFFFF;
  --black-btn-text: #000000;
}
```

- Every element in every CSS file must use these variables — no hardcoded `#fff`, `#111`, `#F5F5F5` anywhere. Replace ALL of them.
- The toggle in Settings must be a controlled component reading from `ThemeContext` and calling `toggleTheme()` on a single click.

---

## ISSUE 2 — App Not Responsive (Mobile-First + Desktop Support)

**Problem:** App appears mobile-sized only and doesn't scale for desktop.

**Fix in `src/index.css`:**
```css
* { box-sizing: border-box; margin: 0; padding: 0; }

html, body {
  height: 100%;
  background: #CCCCCC;
  font-family: 'Inter', system-ui, sans-serif;
}

#root {
  width: 100%;
  min-height: 100vh;
  background: var(--bg);
}

/* Mobile: full width */
@media (max-width: 768px) {
  #root { max-width: 100vw; }
  .page-container { padding: 0 16px; }
}

/* Desktop: centered mobile frame */
@media (min-width: 769px) {
  #root {
    max-width: 480px;
    margin: 0 auto;
    min-height: 100vh;
    box-shadow: 0 0 60px rgba(0,0,0,0.2);
    position: relative;
  }
}
```

- All fixed/sticky elements (navbar, bottom nav, add-to-cart bar) must use:
```css
left: 50%;
transform: translateX(-50%);
width: 100%;
max-width: 480px;
```

---

## ISSUE 3 — Buttons Not Working (Cart Icon, Like Icon) + localStorage Database

**All buttons must work with localStorage as the only database.**

### Cart Logic (`localStorage` key: `"cart"`):
```ts
// Get cart
const getCart = () => JSON.parse(localStorage.getItem('cart') || '[]');

// Add to cart
const addToCart = (product) => {
  const cart = getCart();
  const existing = cart.find(i => i.id === product.id && i.size === product.selectedSize);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Remove from cart
const removeFromCart = (productId, size) => {
  const cart = getCart().filter(i => !(i.id === productId && i.size === size));
  localStorage.setItem('cart', JSON.stringify(cart));
};
```

### Wishlist/Like Logic (`localStorage` key: `"wishlist"`):
```ts
const getWishlist = () => JSON.parse(localStorage.getItem('wishlist') || '[]');

const toggleWishlist = (productId) => {
  const list = getWishlist();
  const idx = list.indexOf(productId);
  if (idx > -1) list.splice(idx, 1);
  else list.push(productId);
  localStorage.setItem('wishlist', JSON.stringify(list));
};

const isWishlisted = (productId) => getWishlist().includes(productId);
```

- Heart icon on product cards: filled red if wishlisted, outline if not. Clicking toggles.
- Cart icon on product cards: clicking calls `addToCart` with default size (first available).
- Cart count badge on bottom nav cart icon: reads `getCart().length` from localStorage.

### Section Title Spacing Fix:
```css
.section-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 20px 0 12px;
  padding: 0; /* NO left padding — parent container handles 16px horizontal padding */
}

.page-content {
  padding: 0 16px;
}
```

---

## ISSUE 4 — "Explore More" Button + Hero Image Slider

### "Explore More" Button Logic:
- On first click: loads the next batch of products (e.g., 4 more) from the products data and appends them to the grid.
- When all products are loaded: change button text to "No more products" and disable it.
```tsx
const [visibleCount, setVisibleCount] = useState(4);
const handleExploreMore = () => {
  setVisibleCount(prev => Math.min(prev + 4, allProducts.length));
};
const displayedProducts = allProducts.slice(0, visibleCount);
```

### Hero Image Slider (Auto + Manual):
- The hero banner at the top of Home must be a real image slider/carousel.
- Show dot indicators below the image (5 dots, active dot is wider/filled).
- Auto-advance every 3 seconds.
- User can swipe left/right (touch) or click dots to switch.
- Images to use: use the product images available in `public/` or `src/assets/` — pick the best lifestyle/hero-style images.

```tsx
const [currentSlide, setCurrentSlide] = useState(0);
const slides = [img1, img2, img3, img4, img5]; // import actual images

useEffect(() => {
  const timer = setInterval(() => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  }, 3000);
  return () => clearInterval(timer);
}, []);

// Touch swipe support
let startX = 0;
const handleTouchStart = (e) => { startX = e.touches[0].clientX; };
const handleTouchEnd = (e) => {
  const diff = startX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    setCurrentSlide(prev => diff > 0
      ? (prev + 1) % slides.length
      : (prev - 1 + slides.length) % slides.length
    );
  }
};
```

CSS:
```css
.hero-slider {
  position: relative;
  margin: 0 16px;
  border-radius: 20px;
  overflow: hidden;
  height: 180px;
}
.hero-slide {
  position: absolute;
  inset: 0;
  transition: opacity 0.4s ease;
  opacity: 0;
}
.hero-slide.active { opacity: 1; }
.hero-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hero-dots {
  position: absolute;
  bottom: 12px;
  right: 16px;
  display: flex;
  gap: 5px;
  z-index: 3;
}
.hero-dot {
  height: 6px;
  border-radius: 3px;
  background: rgba(255,255,255,0.6);
  transition: width 0.3s, background 0.3s;
  width: 6px;
}
.hero-dot.active {
  width: 18px;
  background: #fff;
}
```

---

## ISSUE 5 — `/detail` Page Disorganized + No Real Products

**Fix the `/detail` page (Collection page) completely:**

- This page shows a specific product collection (e.g., "Campus 00s").
- It must receive a collection name/id via route params or navigation state.
- Show a real hero lifestyle image at the top (use available images from assets).
- Show all color variants of that collection in a 2-column grid.
- Each card shows: product name, price, image, heart icon, add-to-cart button.
- Add-to-cart on this page adds the product with default size to localStorage cart.
- If no collection param is passed, default to showing the "Campus 00s" collection.

Structure:
```tsx
// Route: /detail/:collectionId  OR  /detail with state
const products = allProducts.filter(p => p.collection === collectionName);
```

---

## ISSUE 6 — Auth: Register + Login + Logout with localStorage

**localStorage keys:** `"users"` (array), `"currentUser"` (object or null)

### Register Logic:
```ts
const register = (name, email, password) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  if (users.find(u => u.email === email)) {
    return { error: 'Email already exists' };
  }
  const newUser = { id: Date.now(), name, email, password };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('currentUser', JSON.stringify(newUser));
  return { success: true };
};
```

### Login Logic:
```ts
const login = (email, password) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return { error: 'Invalid email or password' };
  localStorage.setItem('currentUser', JSON.stringify(user));
  return { success: true };
};
```

### Logout:
```ts
const logout = () => {
  localStorage.removeItem('currentUser');
  navigate('/login');
};
```

### Delete Account:
```ts
const deleteAccount = () => {
  const current = JSON.parse(localStorage.getItem('currentUser'));
  const users = JSON.parse(localStorage.getItem('users') || '[]')
    .filter(u => u.id !== current.id);
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.removeItem('currentUser');
  localStorage.removeItem('cart');
  localStorage.removeItem('wishlist');
  navigate('/login');
};
```

### Settings Page — "Delete my account / Log out" Button:
- Replace "Delete my account" with a button that opens a small modal/sheet with two options:
  1. **Log out** — calls `logout()`
  2. **Delete my account** — calls `deleteAccount()` after confirmation

Modal CSS:
```css
.action-sheet-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 200;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.action-sheet {
  width: 100%;
  max-width: 480px;
  background: var(--surface);
  border-radius: 20px 20px 0 0;
  padding: 20px 16px 40px;
}
.action-sheet-btn {
  width: 100%;
  padding: 16px;
  border: none;
  background: transparent;
  font-size: 16px;
  cursor: pointer;
  border-radius: 12px;
  margin-bottom: 8px;
}
.action-sheet-btn.logout { color: var(--text-primary); background: var(--bg); }
.action-sheet-btn.delete { color: #E53935; background: #FFF0F0; }
.action-sheet-btn.cancel { color: var(--text-secondary); }
```

---

## ISSUE 7 — Product Detail Page (`/product/:id`) Full Logic

**Everything on this page must work:**

1. **Load product** by `id` from URL params — find in products data array.
2. **Color selection:** clicking a color thumbnail updates the main image and updates "Color: **X**" label.
3. **Size selection:** clicking a size chip highlights it. Selected size is stored in component state.
4. **Add to Cart:** requires a size to be selected. If no size selected, show inline error "Please select a size". On success, show a toast "Added to cart ✓" for 2 seconds.
5. **Heart/Wishlist:** toggles wishlist in localStorage. Icon fills when wishlisted.
6. **Read More:** toggles the full description text.
7. **Cart badge** on navbar updates immediately after adding.

Toast CSS:
```css
.toast {
  position: fixed;
  bottom: 90px;
  left: 50%;
  transform: translateX(-50%);
  background: #000;
  color: #fff;
  padding: 12px 24px;
  border-radius: 50px;
  font-size: 14px;
  z-index: 300;
  animation: fadeInUp 0.3s ease;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateX(-50%) translateY(10px); }
  to { opacity: 1; transform: translateX(-50%) translateY(0); }
}
```

---

## ISSUE 8 — Bottom Nav Covers Buttons (Add to Cart Bar Hidden)

**Problem:** Fixed bottom nav overlaps the "Add to cart" fixed button and other bottom buttons.

**Fix:**
- Bottom nav z-index: `100`
- Add-to-cart bar z-index: `99`, bottom: `70px` (above the nav)
- All pages with fixed bottom buttons: add `padding-bottom: 140px` to page content
- The add-to-cart bar sits ABOVE the bottom nav, never behind it:

```css
.add-to-cart-bar {
  position: fixed;
  bottom: 70px; /* height of bottom nav */
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 480px;
  padding: 12px 16px;
  background: var(--bg);
  z-index: 99;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  z-index: 100;
}
```

---

## ISSUE 9 — Products Data + Images

**Create a central products data file at `src/data/products.ts`:**

```ts
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
  images: string[]; // all image paths
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Adidas Adizero EVO',
    brand: 'Adidas',
    model: 'Adizero EVO',
    price: 799,
    collection: 'Adizero',
    category: 'Shoes',
    colors: [
      { name: 'Black', image: '/images/adizero-black.png' },
      { name: 'White', image: '/images/adizero-white.png' },
    ],
    sizes: [41, 42, 43, 44],
    description: 'Step into speed with the Men\'s Adizero EVO SL Running Shoes by adidas. Designed for performance, these lightweight trainers combine durability, comfort, and cutting-edge technology for optimal energy return.',
    trending: false,
    images: ['/images/adizero-black.png', '/images/adizero-white.png'],
  },
  {
    id: 2,
    name: 'Adidas Campus 00s',
    brand: 'Adidas',
    model: 'Campus 00s',
    price: 379,
    collection: 'Campus',
    category: 'Shoes',
    colors: [
      { name: 'Green', image: '/images/campus-green.png' },
      { name: 'Brown', image: '/images/campus-brown.png' },
      { name: 'Dark Green', image: '/images/campus-darkgreen.png' },
      { name: 'Navy', image: '/images/campus-navy.png' },
    ],
    sizes: [40, 41, 42, 43, 44, 45],
    description: 'The adidas Campus 00s brings back the iconic silhouette with a modern twist. Suede upper, gum sole, and timeless 3-Stripes design.',
    trending: true,
    images: ['/images/campus-green.png'],
  },
  // Add more products using images found in public/ or src/assets/
  // Scan all image files in the project and assign them to products
];
```

**Instructions for image assignment:**
1. Scan `public/` and `src/assets/` for all `.png`, `.jpg`, `.webp` image files.
2. Match each image to the most appropriate product by filename.
3. Move all product images to `public/images/` if not already there.
4. Update the `products.ts` file with the correct image paths.
5. Use these real products everywhere in the app — Home, Detail, ProductDetail pages all read from `src/data/products.ts`.

---

## ISSUE 10 — Payment Page Full Flow

**Make the full payment flow work (no real payment, just UX flow):**

1. Cart page → "Checkout" button → navigates to `/payment`
2. Payment page shows saved cards from localStorage key `"paymentMethods"` (default: empty, user can add)
3. "Add new card" → simple form: card number (masked), cardholder name, expiry → saves to localStorage
4. "Pay now" → shows success screen:

```tsx
// Success screen after Pay Now
<div className="payment-success">
  <div className="success-icon">✓</div>
  <h2>Order Placed!</h2>
  <p>Your order has been confirmed.</p>
  <p>Estimated delivery: 3-5 business days</p>
  <button onClick={() => {
    localStorage.removeItem('cart');
    navigate('/home');
  }}>Continue Shopping</button>
</div>
```

CSS:
```css
.payment-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 16px;
  padding: 32px;
  text-align: center;
}
.success-icon {
  width: 72px;
  height: 72px;
  background: #000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: #fff;
}
```

---

## FINAL RULES

1. **localStorage is the only database** — no API calls, no backend needed for data persistence.
2. **Every button must do something real** — no placeholder `onClick={() => {}}`.
3. **Dark mode must work on first click** and apply to every single element.
4. **Responsive:** mobile full width, desktop centered 480px frame.
5. **Products data** is imported from `src/data/products.ts` everywhere.
6. **No hardcoded colors** — all use CSS variables from `:root` / `html.dark`.
7. **Active nav** uses `useLocation()` from react-router-dom.
8. **All fixed bottom elements** stacked correctly: nav at bottom (z:100), add-to-cart above nav (z:99, bottom:70px).
9. **Images** scanned from project assets, assigned to products, moved to `public/images/`.
10. **Auth flow:** register → login → protected routes → logout/delete from settings.