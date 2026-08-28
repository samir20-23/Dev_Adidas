"use client"
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { ChevronLeft, Heart, ShoppingCart, Check } from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import "../../css/productDetail.css";

// Product catalogue — same data used in the home page
const PRODUCTS: Record<string, { id: number; name: string; brand: string; price: string; priceNum: number; images: string[] }> = {
    "1": { id: 1, name: "Adizero F50", brand: "Adidas", price: "$799", priceNum: 799, images: ["https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=800&h=600&fit=crop"] },
    "2": { id: 2, name: "Stan West Korea", brand: "Adidas", price: "$170", priceNum: 170, images: ["https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=600&fit=crop"] },
    "3": { id: 3, name: "Barricola Shoes", brand: "Adidas", price: "$449", priceNum: 449, images: ["https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=800&h=600&fit=crop"] },
    "4": { id: 4, name: "Gazze 5", brand: "Adidas", price: "$490", priceNum: 490, images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=600&fit=crop"] },
    "5": { id: 5, name: "Superstar", brand: "Adidas", price: "$179", priceNum: 179, images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=800&h=600&fit=crop"] },
};

const colorNames = ["Black", "White"];

export default function ProductDetail() {
    const [selectedColorIdx, setSelectedColorIdx] = useState(0);
    const [selectedSize, setSelectedSize] = useState("43");
    const [isLiked, setIsLiked] = useState(false);
    const [added, setAdded] = useState(false);
    const router = useRouter();
    const params = useParams();
    const { id } = params as { id: string };
    const { t } = useTranslation();
    const { addToCart } = useCart();

    const product = PRODUCTS[id];

    useEffect(() => {
        if (!id) return;
        const storedLiked = localStorage.getItem("liked");
        if (storedLiked) {
            const likedItems: Record<string, boolean> = JSON.parse(storedLiked);
            setIsLiked(!!likedItems[id]);
        }
    }, [id]);

    if (!product) {
        return (
            <div className="product-detail-container" style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, paddingTop: 60 }}>
                <h2>Product not found</h2>
                <button className="add-to-cart-btn-main" style={{ width: "auto", padding: "14px 32px" }} onClick={() => router.push("/home")}>
                    Back to Home
                </button>
            </div>
        );
    }

    const toggleLike = () => {
        const newLikedState = !isLiked;
        setIsLiked(newLikedState);
        const storedLiked = localStorage.getItem("liked");
        const likedItems: Record<string, boolean> = storedLiked ? JSON.parse(storedLiked) : {};
        likedItems[id] = newLikedState;
        localStorage.setItem("liked", JSON.stringify(likedItems));
    };

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: `${product.brand} ${product.name}`,
            price: product.price,
            priceNum: product.priceNum,
            image: product.images[selectedColorIdx],
            size: selectedSize,
            color: colorNames[selectedColorIdx],
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const sizes = ["41", "42", "43", "44", "45"];

    return (
        <div className="product-detail-container">
            <header className="product-header">
                <button className="back-btn" onClick={() => router.back()} aria-label="Go back">
                    <ChevronLeft size={24} />
                </button>
                <button className="like-btn-header" onClick={toggleLike} aria-label="Toggle favourite">
                    <Heart size={24} fill={isLiked ? "currentColor" : "none"} />
                </button>
            </header>

            <div className="product-image-section">
                <img
                    src={product.images[selectedColorIdx]}
                    alt={`${product.brand} ${product.name}`}
                />
            </div>

            <div className="product-info-section">
                <div className="product-brand-price">
                    <div>
                        <h1 className="product-brand">{product.brand}</h1>
                        <h2 className="product-name">{product.name}</h2>
                    </div>
                    <div className="product-price">{product.price}</div>
                </div>

                <div className="color-section">
                    <label className="section-label">
                        {t('product.colors')} : <span className="selected-value">{colorNames[selectedColorIdx]}</span>
                    </label>
                    <div className="color-options">
                        {product.images.map((img, idx) => (
                            <button
                                key={idx}
                                className={`color-option ${selectedColorIdx === idx ? "active" : ""}`}
                                onClick={() => setSelectedColorIdx(idx)}
                                aria-label={colorNames[idx]}
                            >
                                <img src={img} alt={colorNames[idx]} />
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
                                className={`size-option ${selectedSize === size ? "active" : ""}`}
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
                        Step into speed with the {product.brand} {product.name}.
                        Designed for performance, these lightweight trainers combine agility and
                        comfort for every occasion. Featuring a breathable mesh upper and responsive
                        cushioning, they help you achieve your best with every stride.
                        <span className="read-more"> {t('product.readMore')}</span>
                    </p>
                </div>

                <div className="delivery-section">
                    <h3 className="details-title">{t('product.delivery')}</h3>
                    <p className="delivery-text">
                        Free delivery available for orders over $50. Standard delivery takes 3–5
                        business days. Express shipping options available at checkout.
                    </p>
                </div>

                <button
                    className={`add-to-cart-btn-main ${added ? "added" : ""}`}
                    onClick={handleAddToCart}
                >
                    {added ? <Check size={20} /> : <ShoppingCart size={20} />}
                    {added ? "Added to Cart!" : t('product.addToCart')}
                </button>
            </div>
        </div>
    );
}