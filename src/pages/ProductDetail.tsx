import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Heart, ShoppingCart, Home as HomeIcon, User } from "lucide-react";
import '../css/productDetail.css'

export default function ProductDetail() {
    const [selectedColor, setSelectedColor] = useState("black");
    const [selectedSize, setSelectedSize] = useState("43");
    const [isLiked, setIsLiked] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const storedLiked = localStorage.getItem("liked");
        if (storedLiked) {
            const likedItems: Record<string, boolean> = JSON.parse(storedLiked);
            if (likedItems[id as string]) {
                setIsLiked(true);
            }
        }
    }, [id]);

    const toggleLike = () => {
        const newLikedState = !isLiked;
        setIsLiked(newLikedState);
        const storedLiked = localStorage.getItem("liked");
        const likedItems: Record<string, boolean> = storedLiked ? JSON.parse(storedLiked) : {};
        likedItems[id as string] = newLikedState;
        localStorage.setItem("liked", JSON.stringify(likedItems));
    };

    const sizes = ["41", "42", "43", "44"];
    const colors = [
        { name: "black", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop" },
        { name: "white", image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=400&h=300&fit=crop" }
    ];

    return (
        <div className="product-detail-container">
            {/* Header */}
            <header className="product-header">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <ChevronLeft size={24} />
                </button>
                <button className="like-btn-header" onClick={toggleLike}>
                    <Heart size={24} fill={isLiked ? "#000" : "none"} />
                </button>
            </header>

            {/* Product Image */}
            <div className="product-image-section">
                <img
                    src={selectedColor === "black"
                        ? "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=600&fit=crop"
                        : "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=800&h=600&fit=crop"
                    }
                    alt="Adidas Adizero EVO"
                />
            </div>

            {/* Product Info */}
            <div className="product-info-section">
                <div className="product-brand-price">
                    <div>
                        <h1 className="product-brand">Adidas</h1>
                        <h2 className="product-name">Adizero EVO</h2>
                    </div>
                    <div className="product-price">$799</div>
                </div>

                {/* Color Selection */}
                <div className="color-section">
                    <label className="section-label">Color : <span className="selected-value">{selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}</span></label>
                    <div className="color-options">
                        {colors.map((color) => (
                            <button
                                key={color.name}
                                className={`color-option ${selectedColor === color.name ? 'active' : ''}`}
                                onClick={() => setSelectedColor(color.name)}
                            >
                                <img src={color.image} alt={color.name} />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Size Selection */}
                <div className="size-section">
                    <label className="section-label">Size</label>
                    <div className="size-options">
                        {sizes.map((size) => (
                            <button
                                key={size}
                                className={`size-option ${selectedSize === size ? 'active' : ''}`}
                                onClick={() => setSelectedSize(size)}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Details */}
                <div className="product-details-section">
                    <h3 className="details-title">Product Details</h3>
                    <p className="details-text">
                        Step into speed with the Men's Adizero EVO SL Running Shoes by adidas.
                        Designed for performance, these lightweight trainers combine agility and
                        comfort for your daily runs. Featuring a breathable mesh upper and responsive
                        cushioning, they help you achieve your best with every stride...
                        <span className="read-more">Read more</span>
                    </p>
                </div>

                {/* Delivery Options */}
                <div className="delivery-section">
                    <h3 className="details-title">Delivery Options</h3>
                    <p className="delivery-text">
                        Free delivery available for orders over $50. Standard delivery takes 3-5
                        business days. Express shipping options available at checkout.
                    </p>
                </div>

                {/* Add to Cart Button */}
                <button className="add-to-cart-btn-main" onClick={() => alert("Added to cart!")}>
                    <ShoppingCart size={20} />
                    Add to cart
                </button>
            </div>

            {/* Bottom Navigation */}
            <nav className="bottom-nav">
                <button className="nav-item" onClick={() => navigate('/')}>
                    <HomeIcon size={24} />
                </button>
                <button className="nav-item active" onClick={() => navigate('/cart')}>
                    <ShoppingCart size={24} />
                </button>
                <button className="nav-item">
                    <Heart size={24} />
                </button>
                <button className="nav-item" onClick={() => navigate('/settings')}>
                    <User size={24} />
                </button>
            </nav>
        </div>
    );
}
