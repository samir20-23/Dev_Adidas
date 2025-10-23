"use client"
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { ChevronLeft, Heart, ShoppingCart } from "lucide-react";
// import '@/app/css/ProductDetail.css'

export default function ProductDetail() {
    const [selectedColor, setSelectedColor] = useState("black");
    const [selectedSize, setSelectedSize] = useState("43");
    const [isLiked, setIsLiked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const params = useParams();
    const { id } = params;
    const { t } = useTranslation();

    useEffect(() => {
        const timer = setTimeout(() => {

        }, 1);

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



    return (
        <div className="product-detail-container">

            <header className="product-header">
                <button className="back-btn" onClick={() => router.back()}>
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
            <style jsx>{`
        .product-detail-container {
    min-height: 100vh;
    background: var(--background-color);
    padding-bottom: 80px;
    max-width: 1400px;
    margin: 0 auto;
}

.product-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: transparent;
    position: sticky;
    top: 0;
    z-index: 100;
    backdrop-filter: blur(10px);
}

.back-btn, .back-btn:hover,
.like-btn-header:hover {
    transform: scale(1.05);
}

.product-image-section {
    width: 100%;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--secondary-color);
    padding: 20px;
}

.product-image-section img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.product-info-section {
    background: var(--background-color);
    border-radius: 30px 30px 0 0;
    margin-top: -30px;
    padding: 30px 20px;
    position: relative;
    z-index: 2;
}

.product-brand-price {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 24px;
}

.product-brand {
    font-size: 28px;
    font-weight: 700;
    margin: 0;
    color: var(--text-color);
}

.product-name {
    font-size: 18px;
    font-weight: 400;
    margin: 4px 0 0;
    color: var(--text-color);
}

.product-price {
    font-size: 32px;
    font-weight: 700;
    color: var(--text-color);
}

.color-section {
    margin-bottom: 24px;
}

.section-label {
    display: block;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 12px;
    color: var(--text-color);
}

.selected-value {
    font-weight: 700;
}

.color-options {
    display: flex;
    gap: 12px;
}

.color-option {
    width: 70px;
    height: 70px;
    border-radius: 12px;
    border: 3px solid transparent;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.2s;
    padding: 0;
    background: none;
}

.color-option img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.color-option.active {
    border-color: var(--primary-color);
    transform: scale(1.05);
}

.color-option:hover {
    transform: scale(1.05);
}

.size-section {
    margin-bottom: 24px;
}

.size-options {
    display: flex;
    gap: 12px;
}

.size-option {
    min-width: 60px;
    height: 50px;
    border-radius: 12px;
    border: 2px solid #E0E0E0;
    background: var(--secondary-color);
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    transition: all 0.2s;
    color: var(--text-color);
}

.size-option.active {
    background: var(--primary-color);
    color: var(--secondary-color);
    border-color: var(--primary-color);
}

.size-option:hover {
    border-color: var(--primary-color);
}

.product-details-section,
.delivery-section {
    margin-bottom: 24px;
}

.details-title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 12px;
    color: var(--text-color);
}

.details-text,
.delivery-text {
    font-size: 14px;
    line-height: 1.6;
    color: var(--text-color);
}

.read-more {
    color: var(--primary-color);
    cursor: pointer;
    font-weight: 600;
}

.add-to-cart-btn-main {
    width: 100%;
    background: var(--primary-color);
    color: var(--secondary-color);
    border: none;
    padding: 18px;
    border-radius: 30px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    transition: transform 0.2s;
    margin-top: 20px;
}

.add-to-cart-btn-main:hover {
    transform: translateY(-2px);
}


@media (min-width: 768px) {
    .product-detail-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 40px;
        padding: 40px;
    }

    .product-header {
        grid-column: 1 / -1;
    }

    .product-image-section {
        height: 600px;
        grid-row: 2;
        position: sticky;
        top: 100px;
        border-radius: 20px;
    }

    .product-info-section {
        grid-row: 2;
        border-radius: 20px;
        margin-top: 0;
        padding: 40px;
    }

    
}

@media (min-width: 1024px) {
    .product-image-section {
        height: 700px;
    }

    .product-brand {
        font-size: 36px;
    }

    .product-price {
        font-size: 40px;
    }

    .color-option {
        width: 80px;
        height: 80px;
    }

    .size-option {
        min-width: 70px;
        height: 60px;
        font-size: 18px;
    }

    .details-text,
    .delivery-text {
        font-size: 15px;
    }
}

@media (min-width: 1400px) {
    .product-detail-container {
        padding: 40px 80px;
    }
}
      `}</style>
        </div>
    );
}