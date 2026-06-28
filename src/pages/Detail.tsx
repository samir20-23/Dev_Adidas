import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import "../css/productDetail.css";

const campusColors = [
    {
        id: 1,
        name: "Men's Campus 00s",
        price: "379 $",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
        bg: "#E8EDE4"
    },
    {
        id: 2,
        name: "Men's Campus 00s",
        price: "379 $",
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=300&fit=crop",
        bg: "#EDE4DC"
    },
    {
        id: 3,
        name: "Men's Campus 00s",
        price: "379 $",
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop",
        bg: "#E4EDE4"
    },
    {
        id: 4,
        name: "Men's Campus 00s",
        price: "379 $",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop",
        bg: "#E4E4EF"
    }
];

export default function Detail() {
    const navigate = useNavigate();
    const [liked, setLiked] = useState<{ [key: number]: boolean }>({});

    const toggleLike = (id: number) => {
        setLiked(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="detail-page">
            {/* Hero Image */}
            <div className="detail-hero">
                <img
                    src="https://images.unsplash.com/photo-1605408499391-6368c628ef42?w=800&h=500&fit=crop"
                    alt="Adidas Campus 00s"
                    className="detail-hero-img"
                />
                <div className="detail-hero-overlay" />
                <div className="detail-hero-text">
                    <h1 className="detail-hero-brand">Adidas</h1>
                    <h2 className="detail-hero-model">Campus 00s</h2>
                </div>
                <div className="detail-hero-dots">
                    <span className="dot active" />
                    <span className="dot" />
                    <span className="dot" />
                    <span className="dot" />
                    <span className="dot" />
                </div>
            </div>

            {/* Collection Colors */}
            <div className="detail-body">
                <h2 className="detail-collection-title">Collection colors</h2>
                <div className="detail-colors-grid">
                    {campusColors.map((shoe) => (
                        <div key={shoe.id} className="detail-color-card">
                            <span className="detail-card-label">{shoe.name}</span>
                            <span className="detail-card-price">{shoe.price}</span>
                            <div className="detail-card-image">
                                <img src={shoe.image} alt={shoe.name} />
                            </div>
                            <div className="detail-card-actions">
                                <button
                                    className="detail-like-btn"
                                    onClick={() => toggleLike(shoe.id)}
                                >
                                    <Heart
                                        size={20}
                                        fill={liked[shoe.id] ? "#000" : "none"}
                                        stroke="#111"
                                    />
                                </button>
                                <button
                                    className="detail-cart-btn"
                                    onClick={() => navigate("/cart")}
                                >
                                    <ShoppingCart size={18} color="#fff" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}