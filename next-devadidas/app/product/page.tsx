"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Heart, ShoppingCart, Search } from "lucide-react";
import Link from "next/link";
import "../css/products.css";

const ALL_PRODUCTS = [
    { id: 1, name: "Adidas Adizero F50", price: "$799", priceNum: 799, image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop", category: "shoes" },
    { id: 2, name: "Adidas Stan West Korea", price: "$170", priceNum: 170, image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&h=300&fit=crop", category: "shoes" },
    { id: 3, name: "Adidas Barricola Shoes", price: "$449", priceNum: 449, image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400&h=300&fit=crop", category: "shoes" },
    { id: 4, name: "Adidas Gazze 5", price: "$490", priceNum: 490, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop", category: "shoes" },
    { id: 5, name: "Superstar Shoes", price: "$179", priceNum: 179, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop", category: "shoes" },
];

export default function ProductsPage() {
    const [search, setSearch] = useState("");
    const [liked, setLiked] = useState<Record<number, boolean>>(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("liked");
            return stored ? JSON.parse(stored) : {};
        }
        return {};
    });
    const { t } = useTranslation();

    const toggleLike = (e: React.MouseEvent, id: number) => {
        e.preventDefault();
        const newLiked = { ...liked, [id]: !liked[id] };
        setLiked(newLiked);
        localStorage.setItem("liked", JSON.stringify(newLiked));
    };

    const filtered = ALL_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="products-page">
            <header className="products-header">
                <h1 className="products-heading">All Products</h1>
                <div className="products-search-bar">
                    <Search size={18} className="products-search-icon" />
                    <input
                        type="text"
                        placeholder={t('home.search')}
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
            </header>

            {filtered.length === 0 ? (
                <div className="products-empty">
                    <p>No products found for "{search}"</p>
                    <button onClick={() => setSearch("")}>Clear search</button>
                </div>
            ) : (
                <div className="products-grid-page">
                    {filtered.map(product => (
                        <Link href={`/product/${product.id}`} key={product.id} className="product-card-page">
                            <button
                                className="like-btn-page"
                                onClick={(e) => toggleLike(e, product.id)}
                                aria-label="Toggle favourite"
                            >
                                <Heart size={18} fill={liked[product.id] ? "currentColor" : "none"} />
                            </button>
                            <div className="product-card-page-img">
                                <img src={product.image} alt={product.name} />
                            </div>
                            <div className="product-card-page-info">
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
