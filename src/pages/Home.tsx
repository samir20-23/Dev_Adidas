import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal, ShoppingBasket, Heart, Footprints, Shirt, ShoppingBag, ChevronRight } from "lucide-react";
import "../css/home.css";
import { useState } from "react";

export default function Home() {
    const navigate = useNavigate();
    const [liked, setLiked] = useState<{ [key: number]: boolean }>({});

    const toggleLike = (id: number, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const popularShoes = [
        {
            id: 1,
            name: "Adidas Adizero F50",
            price: "799 $",
            image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop"
        },
        {
            id: 2,
            name: "Adidas Stan West Korea",
            price: "170 $",
            image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&h=300&fit=crop"
        }
    ];

    const trendShoes = [
        {
            id: 4,
            name: "Adidas Gazze 5",
            subtitle: "Mens · Shoes",
            price: "490$",
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop"
        },
        {
            id: 5,
            name: "Superstar shoes",
            subtitle: "Mens · Shoes",
            price: "179$",
            image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop"
        }
    ];

    return (
        <div className="home-page">
            {/* Search Bar */}
            <div className="search-bar">
                <Search size={18} color="#AAAAAA" />
                <input type="text" placeholder="Search..." />
                <SlidersHorizontal size={18} color="#111" />
            </div>

            {/* Hero Banner */}
            <div className="hero-banner">
                <img src="https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=800&h=400&fit=crop" alt="Campus Shoes" />
                <div className="hero-text">
                    <span className="hero-label">NEW COLLECTION</span>
                    <h1 className="hero-title">Adidas<br />Campus</h1>
                </div>
            </div>

            {/* Categories */}
            <h2 className="section-title">Categories</h2>
            <div className="categories-row">
                <div className="category-item">
                    <div className="category-circle active">
                        <Footprints size={24} />
                    </div>
                    <span className="category-label">Shoes</span>
                </div>
                <div className="category-item">
                    <div className="category-circle">
                        <Shirt size={24} />
                    </div>
                    <span className="category-label">T-shirt</span>
                </div>
                <div className="category-item">
                    <div className="category-circle">
                        <ShoppingBag size={24} />
                    </div>
                    <span className="category-label">Bags</span>
                </div>
                <div className="category-item">
                    <div className="category-circle">
                        {/* Placeholder for Tracksuit, using Shirt for now */}
                        <Shirt size={24} />
                    </div>
                    <span className="category-label">Tracksuit</span>
                </div>
            </div>

            {/* Popular Shoes */}
            <h2 className="section-title">Popular Shoes</h2>
            <div className="products-grid">
                {popularShoes.map((shoe) => (
                    <div 
                        key={shoe.id} 
                        className="product-card"
                        onClick={() => navigate(`/product/${shoe.id}`)}
                        style={{cursor: 'pointer'}}
                    >
                        <h3 className="product-name">{shoe.name}</h3>
                        <div className="product-price">{shoe.price}</div>
                        <img src={shoe.image} alt={shoe.name} className="product-img" />
                        <div className="card-actions">
                            <button className="btn-heart" onClick={(e) => toggleLike(shoe.id, e)}>
                                <Heart size={20} fill={liked[shoe.id] ? "#111" : "none"} stroke="#111" />
                            </button>
                            <button className="btn-cart" onClick={(e) => { e.stopPropagation(); navigate('/cart'); }}>
                                <ShoppingBasket size={18} color="#fff" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button className="btn-explore">Explore more</button>

            {/* Trend of the moment */}
            <h2 className="section-title">Trend of the moment</h2>
            <div className="trending-grid">
                {trendShoes.map((shoe) => (
                    <div 
                        key={shoe.id} 
                        className="trending-card"
                        onClick={() => navigate(`/product/${shoe.id}`)}
                        style={{cursor: 'pointer'}}
                    >
                        <button className="trend-heart" onClick={(e) => toggleLike(shoe.id, e)}>
                            <Heart size={20} fill={liked[shoe.id] ? "#111" : "none"} stroke="#111" />
                        </button>
                        <div className="trend-price">{shoe.price}</div>
                        <img src={shoe.image} alt={shoe.name} className="trend-img" />
                        <button className="trend-shop-btn" onClick={(e) => { e.stopPropagation(); navigate('/cart'); }}>
                            Shop Now <ChevronRight size={14} />
                        </button>
                        <h3 className="trend-name">{shoe.name}</h3>
                        <p className="trend-sub">{shoe.subtitle}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}