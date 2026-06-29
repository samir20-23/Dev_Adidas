import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, ShoppingBasket } from "lucide-react";
import "../css/productDetail.css";
import { products } from "../data/products";
import { addToCart, toggleWishlist, isWishlisted } from "../utils/storage";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === Number(id)) || products[0];

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [toast, setToast] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [wishlisted, setWishlisted] = useState(() => isWishlisted(product.id));

  useEffect(() => {
    setSelectedColor(product.colors[0]);
    setSelectedSize(null);
    setSizeError(false);
    setWishlisted(isWishlisted(product.id));
  }, [product.id]);

  const handleAddToCart = () => {
    if (!selectedSize) { setSizeError(true); return; }
    setSizeError(false);
    addToCart(product, selectedSize);
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  const handleWishlist = () => {
    toggleWishlist(product.id);
    setWishlisted(isWishlisted(product.id));
  };

  const shortDesc = product.description.slice(0, 100);

  return (
    <div className="product-detail-page">
      <div className="product-header-section">
        <div className="product-title-block">
          <div className="brand">{product.brand}</div>
          <div className="model">{product.model}</div>
          <button className="wishlist-btn" onClick={handleWishlist}>
            <Heart size={22} fill={wishlisted ? "#E53935" : "none"} stroke={wishlisted ? "#E53935" : "var(--text-primary)"} />
          </button>
        </div>
        <img src={selectedColor.image} alt={product.name} className="product-main-image" />
      </div>

      <div className="product-price">${product.price}</div>

      <div className="color-section">
        <div className="color-label">Color : <span>{selectedColor.name}</span></div>
        <div className="color-thumbnails">
          {product.colors.map(c => (
            <img
              key={c.name}
              src={c.image}
              alt={c.name}
              className={`color-thumb ${selectedColor.name === c.name ? 'selected' : ''}`}
              onClick={() => setSelectedColor(c)}
            />
          ))}
        </div>
      </div>

      <div className="size-section">
        <div className="size-label">Size</div>
        <div className="size-chips">
          {product.sizes.map(size => (
            <div
              key={size}
              className={`size-chip ${selectedSize === size ? 'selected' : ''}`}
              onClick={() => { setSelectedSize(size); setSizeError(false); }}
            >
              {size}
            </div>
          ))}
        </div>
        {sizeError && <p className="size-error">Please select a size</p>}
      </div>

      <div className="info-section">
        <h3>Product Details</h3>
        <p>
          {expanded ? product.description : shortDesc + (product.description.length > 100 ? '...' : '')}
          {product.description.length > 100 && (
            <span className="read-more" onClick={() => setExpanded(p => !p)}>
              {' '}{expanded ? 'Show less' : 'Read more'}
            </span>
          )}
        </p>
      </div>

      <div className="info-section">
        <h3>Delivery Options</h3>
        <p>Free standard delivery on orders over $50. Next day delivery available.</p>
      </div>

      <div className="add-to-cart-bar">
        <button className="btn-add-to-cart" onClick={handleAddToCart}>
          <ShoppingBasket size={18} />
          Add to cart
        </button>
      </div>

      {toast && (
        <div className="toast">Added to cart ✓</div>
      )}
    </div>
  );
}
