import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Search, ChevronRight, Heart, ShoppingCart } from "lucide-react";
import "../css/home.css";
import Loading from "../components/loading";

export default function Home() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [liked, setLiked] = useState<{ [key: number]: boolean }>({});

    useEffect(() => {
        const storedLiked = localStorage.getItem("liked");
        if (storedLiked) {
            setLiked(JSON.parse(storedLiked));
        }
    }, []);

    const toggleLike = (id: number) => {
        const newLiked = { ...liked, [id]: !liked[id] };
        setLiked(newLiked);
        localStorage.setItem("liked", JSON.stringify(newLiked));
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
        },
        {
            id: 3,
            name: "Adidas Barricola Shoes",
            price: "449 $",
            image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400&h=300&fit=crop"
        }
    ];

    const trendShoes = [
        {
            id: 4,
            name: "Adidas Gazze 5",
            subtitle: "Mens - Shoes",
            tag: "490$",
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop"
        },
        {
            id: 5,
            name: "Superstar shoes",
            subtitle: "Mens - Shoes",
            tag: "179$",
            image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop"
        }
    ];

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="home-container">
            <header className="header">
                <div className="search-bar">
                    <Search size={20} />
                    <input type="text" placeholder={t('home.search')} />
                </div>
            </header>

            <div className="hero-banner">
                <div className="hero-content">
                    <span className="hero-label">{t('home.heroLabel')}</span>
                    <h1 className="hero-title">{t('home.heroTitle')}</h1>
                    <button className="shop-now-btn">
                        {t('home.shopNow')} <ChevronRight size={20} />
                    </button>
                </div>

                <button className="close-banner">×</button>
                <div className="hero-shoe-img">
                    <img src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&h=400&fit=crop" alt="Campus Shoes" />
                </div>
            </div>

            <section className="categories-section">
                <h2 className="section-title">{t('home.categories')}</h2>
                <div className="categories-grid">
                    {/* These could be translated as well if they are not dynamic */}
                    <div className="category-item">
                        <div className="category-icon"><img src="https://cdn-icons-png.flaticon.com/512/2818/2818324.png" alt="Shoes" /></div>
                        <span>Shoes</span>
                    </div>
                    <div className="category-item">
                        <div className="category-icon"><img src="https://cdn-icons-png.flaticon.com/512/892/892458.png" alt="T-shirt" /></div>
                        <span>T-shirt</span>
                    </div>
                    <div className="category-item">
                        <div className="category-icon"><img src="https://cdn-icons-png.flaticon.com/512/2609/2609368.png" alt="Bags" /></div>
                        <span>Bags</span>
                    </div>
                    <div className="category-item">
                        <div className="category-icon"><img src="https://cdn-icons-png.flaticon.com/512/3082/3082031.png" alt="Tracksuit" /></div>
                        <span>Tracksuit</span>
                    </div>
                </div>
            </section>

            <section className="popular-section">
                <div className="section-header">
                    <h2 className="section-title">{t('home.popular')}</h2>
                    <Link to="/see-all" className="see-all">{t('home.seeAll')}</Link>
                </div>
                <div className="products-grid">
                    {popularShoes.map((shoe) => (
                        <Link to={`/product/${shoe.id}`} key={shoe.id} className="product-card">
                            <button
                                className="like-btn"
                                onClick={(e) => { e.preventDefault(); toggleLike(shoe.id); }}
                            >
                                <Heart size={20} fill={liked[shoe.id] ? "#000" : "none"} />
                            </button>
                            <div className="product-image"><img src={shoe.image} alt={shoe.name} /></div>
                            <div className="product-info">
                                <h3>{shoe.name}</h3>
                                <p className="price">{shoe.price}</p>
                            </div>
                            <button className="add-to-cart-btn"><ShoppingCart size={20} /></button>
                        </Link>
                    ))}
                </div>
                <button className="explore-more-btn">{t('home.exploreMore')}</button>
            </section>

            <section className="trend-section">
                <h2 className="section-title">{t('home.trending')}</h2>
                <div className="trend-grid">
                    {trendShoes.map((shoe) => (
                        <Link to={`/product/${shoe.id}`} key={shoe.id} className="trend-card">
                            <button
                                className="like-btn-trend"
                                onClick={(e) => { e.preventDefault(); toggleLike(shoe.id) }}
                            >
                                <Heart size={18} fill={liked[shoe.id] ? "#000" : "none"} />
                            </button>
                            <span className="trend-tag">{shoe.tag}</span>
                            <div className="trend-image"><img src={shoe.image} alt={shoe.name} /></div>
                            <button className="trend-shop-btn">
                                {t('home.shopNow')} <ChevronRight size={16} />
                            </button>
                            <div className="trend-info">
                                <h3>{shoe.name}</h3>
                                <p>{shoe.subtitle}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}