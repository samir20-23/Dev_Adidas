import { useNavigate } from "react-router-dom";
import { Search, ShoppingBasket, Heart, Footprints, Shirt, ShoppingBag, ChevronRight, X } from "lucide-react";
import "../css/home.css";
import { useState, useEffect, useRef } from "react";
import { products, type Product } from "../data/products";
import { addToCart, toggleWishlist, isWishlisted } from "../utils/storage";

type Category = 'Shoes' | 'T-shirt' | 'Bags' | 'Tracksuit';

// Hero slides per category — "main" image first, then others
const HERO_SLIDES: Record<Category, string[]> = {
  Shoes: [
    "/products/Shoes/shoes main.png",
    "/products/Shoes/Frame 202.png",
    "/products/Shoes/Rectangle 6.png",
    "/products/Shoes/Rectangle 72.png",
    "/products/Shoes/Rectangle 73.png",
  ],
  "T-shirt": [
    "/products/T-shirt/tshirt main .png",
    "/products/T-shirt/Rectangle 72.png",
    "/products/T-shirt/Rectangle 72 (copy 1).png",
    "/products/T-shirt/Rectangle 72 (copy 2).png",
    "/products/T-shirt/Rectangle 72 (copy 3).png",
  ],
  Bags: [
    "/products/Bags/bag adidas  main.png",
    "/products/Bags/Rectangle 72.png",
    "/products/Bags/Rectangle 72 (copy 1).png",
    "/products/Bags/Rectangle 72 (copy 2).png",
    "/products/Bags/Rectangle 72 (copy 3).png",
  ],
  Tracksuit: [
    "/products/Tracksuit/tracksuit main.png",
    "/products/Tracksuit/Z.N.E._Hoodie_Grey_JE3070_21_model.jpg",
    "/products/Tracksuit/jf2443_C.jpg",
    "/products/Tracksuit/Rectangle 72.png",
    "/products/Tracksuit/Rectangle 72 (copy 1).png",
  ],
};

const CATEGORIES: { label: Category; icon: React.ReactNode }[] = [
  { label: "Shoes",     icon: <Footprints size={24} /> },
  { label: "T-shirt",  icon: <Shirt size={24} /> },
  { label: "Bags",     icon: <ShoppingBag size={24} /> },
  { label: "Tracksuit",icon: <Shirt size={24} /> },
];

export default function Home() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [activeCategory, setActiveCategory] = useState<Category>("Shoes");
  const [searchQuery, setSearchQuery] = useState("");
  const [, forceUpdate] = useState(0);
  const touchStartX = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const slides = HERO_SLIDES[activeCategory];

  // Auto-advance slider — restart when category changes
  useEffect(() => {
    setCurrentSlide(0);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(
      () => setCurrentSlide(p => (p + 1) % slides.length),
      3000
    );
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [activeCategory]);

  // Re-render on wishlist/cart updates
  useEffect(() => {
    const h = () => forceUpdate(n => n + 1);
    window.addEventListener("wishlistUpdated", h);
    window.addEventListener("cartUpdated", h);
    return () => {
      window.removeEventListener("wishlistUpdated", h);
      window.removeEventListener("cartUpdated", h);
    };
  }, []);

  // Reset pagination when category or search changes
  useEffect(() => { setVisibleCount(4); }, [activeCategory, searchQuery]);

  // Touch swipe on hero
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      setCurrentSlide(p =>
        diff > 0 ? (p + 1) % slides.length : (p - 1 + slides.length) % slides.length
      );
    }
  };

  // Search: if query is active, search ALL products regardless of category
  // If no query, filter by active category
  const filtered: Product[] = searchQuery.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.collection.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products.filter(p => p.category === activeCategory);

  const popularProducts = filtered.filter(p => !p.trending);
  const trendingProducts = filtered.filter(p => p.trending);
  const displayed = popularProducts.slice(0, visibleCount);
  const allLoaded = visibleCount >= popularProducts.length;

  const handleCartClick = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product, product.sizes[0]);
  };

  const handleLike = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    toggleWishlist(id);
    forceUpdate(n => n + 1);
  };

  const isSearching = searchQuery.trim().length > 0;

  return (
    <div className="home-page">

      {/* Search Bar */}
      <div className="search-bar">
        <Search size={18} color="var(--text-muted)" />
        <input
          type="text"
          placeholder="Search shoes, bags, tracksuits..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        {isSearching && (
          <button className="search-clear" onClick={() => setSearchQuery("")}>
            <X size={16} />
          </button>
        )}
      </div>

      {/* Hero Slider — hidden while searching */}
      {!isSearching && (
        <div
          className="hero-slider"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {slides.map((src, i) => (
            <div key={src} className={`hero-slide ${i === currentSlide ? "active" : ""}`}>
              <img src={src} alt={`${activeCategory} slide ${i + 1}`} />
              <div className="hero-overlay" />
              <div className="hero-text">
                <span className="hero-label">NEW COLLECTION</span>
                <h1 className="hero-title">Adidas<br />{activeCategory}</h1>
              </div>
            </div>
          ))}
          <div className="hero-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`hero-dot ${i === currentSlide ? "active" : ""}`}
                onClick={() => setCurrentSlide(i)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Category buttons */}
      {!isSearching && (
        <>
          <h2 className="section-title">Categories</h2>
          <div className="categories-row">
            {CATEGORIES.map(c => (
              <button
                key={c.label}
                className="category-item"
                onClick={() => setActiveCategory(c.label)}
              >
                <div className={`category-circle ${activeCategory === c.label ? "active" : ""}`}>
                  {c.icon}
                </div>
                <span className="category-label">{c.label}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Section title */}
      <h2 className="section-title">
        {isSearching
          ? `Results for "${searchQuery}"`
          : `Popular ${activeCategory}`}
      </h2>

      {/* Product grid */}
      {popularProducts.length === 0 && trendingProducts.length === 0 ? (
        <div className="empty-category">
          <p>{isSearching ? `No results for "${searchQuery}"` : `No ${activeCategory.toLowerCase()} yet`}</p>
          {!isSearching && <span>Check back soon 👋</span>}
        </div>
      ) : (
        <>
          {popularProducts.length > 0 && (
            <div className="products-grid">
              {displayed.map(product => (
                <div
                  key={product.id}
                  className="product-card"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-price">{product.price} $</div>
                  <img src={product.images[0]} alt={product.name} className="product-img" />
                  <div className="card-actions">
                    <button className="btn-heart" onClick={e => handleLike(e, product.id)}>
                      <Heart
                        size={20}
                        fill={isWishlisted(product.id) ? "#E53935" : "none"}
                        stroke={isWishlisted(product.id) ? "#E53935" : "var(--text-primary)"}
                      />
                    </button>
                    <button className="btn-cart" onClick={e => handleCartClick(e, product)}>
                      <ShoppingBasket size={18} color="var(--black-btn-text)" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {popularProducts.length > 0 && (
            <button
              className="btn-explore"
              onClick={() => setVisibleCount(p => Math.min(p + 4, popularProducts.length))}
              disabled={allLoaded}
            >
              {allLoaded ? "No more products" : "Explore more"}
            </button>
          )}

          {/* Trending section */}
          {trendingProducts.length > 0 && (
            <>
              <h2 className="section-title">Trend of the moment</h2>
              <div className="trending-grid">
                {trendingProducts.map(product => (
                  <div
                    key={product.id}
                    className="trending-card"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <button className="trend-heart" onClick={e => handleLike(e, product.id)}>
                      <Heart
                        size={20}
                        fill={isWishlisted(product.id) ? "#E53935" : "none"}
                        stroke={isWishlisted(product.id) ? "#E53935" : "var(--text-primary)"}
                      />
                    </button>
                    <div className="trend-price">{product.price}$</div>
                    <img src={product.images[0]} alt={product.name} className="trend-img" />
                    <button
                      className="trend-shop-btn"
                      onClick={e => { e.stopPropagation(); navigate(`/product/${product.id}`); }}
                    >
                      Shop Now <ChevronRight size={14} />
                    </button>
                    <h3 className="trend-name">{product.name}</h3>
                    <p className="trend-sub">Mens · {product.category}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
