import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronLeft, Heart, ShoppingCart } from "lucide-react";
import '../css/productDetail.css'
import Loading from "../components/loading";

export default function ProductDetail() {
    const [selectedColor, setSelectedColor] = useState("black");
    const [selectedSize, setSelectedSize] = useState("43");
    const [isLiked, setIsLiked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();
    const { t } = useTranslation();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        const storedLiked = localStorage.getItem("liked");
        if (storedLiked) {
            const likedItems: Record<string, boolean> = JSON.parse(storedLiked);
            if (likedItems[id as string]) {
                setIsLiked(true);
            }
        }
        return () => clearTimeout(timer);
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

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="product-detail-container">
            <header className="product-header">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <ChevronLeft size={24} />
                </button>
                <button className="like-btn-header" onClick={toggleLike}>
                    <Heart size={24} fill={isLiked ? "#000" : "none"} />
                </button>
            </header>

            <div className="product-image-section">
                <img
                    src={selectedColor === "black"
                        ? "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=600&fit=crop"
                        : "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=800&h=600&fit=crop"
                    }
                    alt="Adidas Adizero EVO"
                />
            </div>

            <div className="product-info-section">
                <div className="product-brand-price">
                    <div>
                        <h1 className="product-brand">Adidas</h1>
                        <h2 className="product-name">Adizero EVO</h2>
                    </div>
                    <div className="product-price">$799</div>
                </div>

                <div className="color-section">
                    <label className="section-label">{t('product.colors')} : <span className="selected-value">{selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}</span></label>
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

                <div className="size-section">
                    <label className="section-label">{t('product.sizes')}</label>
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

                <div className="product-details-section">
                    <h3 className="details-title">{t('product.details')}</h3>
                    <p className="details-text">
                        Step into speed with the Men's Adizero EVO SL Running Shoes by adidas.
                        Designed for performance, these lightweight trainers combine agility and
                        comfort for your daily runs. Featuring a breathable mesh upper and responsive
                        cushioning, they help you achieve your best with every stride...
                        <span className="read-more">{t('product.readMore')}</span>
                    </p>
                </div>

                <div className="delivery-section">
                    <h3 className="details-title">{t('product.delivery')}</h3>
                    <p className="delivery-text">
                        Free delivery available for orders over $50. Standard delivery takes 3-5
                        business days. Express shipping options available at checkout.
                    </p>
                </div>

                <button className="add-to-cart-btn-main" onClick={() => alert("Added to cart!")}>
                    <ShoppingCart size={20} />
                    {t('product.addToCart')}
                </button>
            </div>
        </div>
    );
}
