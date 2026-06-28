import { useState } from "react";
import { ShoppingBasket } from "lucide-react";
import "../css/productDetail.css";

export default function ProductDetail() {
    const [selectedColor, setSelectedColor] = useState("Black");
    const [selectedSize, setSelectedSize] = useState("43");

    return (
        <div className="product-detail-page">
            <div className="product-header-section">
                <div className="product-title-block">
                    <div className="brand">Adidas</div>
                    <div className="model">Adizero EVO</div>
                </div>
                <img 
                    src={selectedColor === "Black" ? "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop" : "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop"} 
                    alt="Shoe" 
                    className="product-main-image" 
                />
            </div>

            <div className="product-price">$799</div>

            <div className="color-section">
                <div className="color-label">Color : <span>{selectedColor}</span></div>
                <div className="color-thumbnails">
                    <img 
                        src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=100&h=100&fit=crop" 
                        className={`color-thumb ${selectedColor === "Black" ? "selected" : ""}`}
                        onClick={() => setSelectedColor("Black")}
                        alt="Black"
                    />
                    <img 
                        src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop" 
                        className={`color-thumb ${selectedColor === "White" ? "selected" : ""}`}
                        onClick={() => setSelectedColor("White")}
                        alt="White"
                    />
                </div>
            </div>

            <div className="size-section">
                <div className="size-label">Size</div>
                <div className="size-chips">
                    {["41", "42", "43", "44"].map((size) => (
                        <div 
                            key={size}
                            className={`size-chip ${selectedSize === size ? "selected" : ""}`}
                            onClick={() => setSelectedSize(size)}
                        >
                            {size}
                        </div>
                    ))}
                </div>
            </div>

            <div className="info-section">
                <h3>Product Details</h3>
                <p>
                    Step into speed with the Men's Adizero EVO SL Running Shoes by adidas. 
                    Designed for performance, these lightweight trainers combine durability, 
                    comfort, and cutting-edge technology for optimal energy return. <span className="read-more">Read more</span>
                </p>
            </div>

            <div className="info-section">
                <h3>Delivery Options</h3>
                <p>Free standard delivery on orders over $50. Next day delivery available.</p>
            </div>

            <div className="add-to-cart-bar">
                <button className="btn-add-to-cart" onClick={() => alert("Added to cart")}>
                    <ShoppingBasket size={18} />
                    Add to cart
                </button>
            </div>
        </div>
    );
}
