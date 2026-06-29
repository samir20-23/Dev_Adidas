import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import "../css/productDetail.css";
import "../css/detail.css";
import { products } from "../data/products";
import { addToCart, toggleWishlist, isWishlisted } from "../utils/storage";
import { useState } from "react";

export default function Detail() {
  const navigate = useNavigate();
  const [, forceUpdate] = useState(0);
  const campusProducts = products.filter(p => p.collection === "Campus");

  const handleLike = (id: number) => {
    toggleWishlist(id);
    forceUpdate(n => n + 1);
  };

  return (
    <div className="detail-page">
      <div className="detail-hero">
        <img
          src="/products/Shoes/shoes main.png"
          alt="Campus 00s"
          className="detail-hero-img"
        />
        <div className="detail-hero-overlay" />
        <div className="detail-hero-text">
          <h1 className="detail-hero-brand">Adidas</h1>
          <h2 className="detail-hero-model">Campus 00s</h2>
        </div>
      </div>

      <div className="detail-body">
        <h2 className="detail-collection-title">Collection colors</h2>
        <div className="detail-colors-grid">
          {campusProducts.map(product =>
            product.colors.map(color => (
              <div key={`${product.id}-${color.name}`} className="detail-color-card">
                <span className="detail-card-label">{product.name}</span>
                <span className="detail-card-price">{product.price} $</span>
                <div className="detail-card-image">
                  <img src={color.image} alt={color.name} />
                </div>
                <div className="detail-card-actions">
                  <button className="detail-like-btn" onClick={() => handleLike(product.id)}>
                    <Heart
                      size={20}
                      fill={isWishlisted(product.id) ? "#E53935" : "none"}
                      stroke={isWishlisted(product.id) ? "#E53935" : "var(--text-primary)"}
                    />
                  </button>
                  <button
                    className="detail-cart-btn"
                    onClick={() => { addToCart(product, product.sizes[0]); navigate('/cart'); }}
                  >
                    <ShoppingCart size={18} color="var(--black-btn-text)" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
