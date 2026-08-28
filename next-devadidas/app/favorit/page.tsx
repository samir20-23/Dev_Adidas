"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Heart } from "lucide-react";
import Link from "next/link";
import "../css/favorit.css";

const ALL_PRODUCTS = [
    { id: 1, name: "Adidas Adizero F50", price: "$799", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop" },
    { id: 2, name: "Adidas Stan West Korea", price: "$170", image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&h=300&fit=crop" },
    { id: 3, name: "Adidas Barricola Shoes", price: "$449", image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400&h=300&fit=crop" },
    { id: 4, name: "Adidas Gazze 5", price: "$490", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop" },
    { id: 5, name: "Superstar Shoes", price: "$179", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop" },
];

export default function FavoritPage() {
    const [liked, setLiked] = useState<Record<number, boolean>>({});
    const router = useRouter();
    const { t } = useTranslation();

    useEffect(() => {
        const stored = localStorage.getItem("liked");
        if (stored) setLiked(JSON.parse(stored));
    }, []);

    const unlikeItem = (id: number) => {
        const newLiked = { ...liked, [id]: false };
        setLiked(newLiked);
        localStorage.setItem("liked", JSON.stringify(newLiked));
    };

    const favourites = ALL_PRODUCTS.filter(p => liked[p.id]);

    return (
        <div className="favorit-container">
            <h2 className="favorit-title">My Favourites</h2>
            {favourites.length === 0 ? (
                <div className="favorit-empty">
                    <Heart size={72} strokeWidth={1.5} />
                    <h3>No favourites yet</h3>
                    <p>Tap the heart icon on any product to save it here.</p>
                    <button className="favorit-shop-btn" onClick={() => router.push("/home")}>
                        Browse Products
                    </button>
                </div>
            ) : (
                <div className="favorit-grid">
                    {favourites.map(product => (
                        <Link href={`/product/${product.id}`} key={product.id} className="favorit-card">
                            <button
                                className="favorit-heart-btn"
                                onClick={(e) => { e.preventDefault(); unlikeItem(product.id); }}
                                aria-label="Remove from favourites"
                            >
                                <Heart size={20} fill="currentColor" />
                            </button>
                            <div className="favorit-img">
                                <img src={product.image} alt={product.name} />
                            </div>
                            <div className="favorit-info">
                                <h3>{product.name}</h3>
                                <p>{product.price}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
