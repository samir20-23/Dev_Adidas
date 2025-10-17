// src/components/navbar.tsx
// import React, { useState } from "react"
import "../css/navbar.css"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { ChevronLeft, Heart, ShoppingCart, Home, User } from "lucide-react";

import Logo from "../assets/logoo.png"
import LogoWhite from "../assets/logoWhite.png"
import CartIcon from "../assets/cart.png"
import Left from "../assets/left.png"
import heartRed from "../assets/heart.png"
import { useState } from "react"
import { useTheme } from "../contexts/ThemeContext";

export default function Navbar() {
  const location = useLocation()   // full location object
  const navigate = useNavigate()
  const [liked, setLiked] = useState(false)
  const [isLiked, setIsLiked] = useState(false);
  const { theme } = useTheme();

  const closeBurger = () => {
    const el = document.getElementById("burger-toggle") as HTMLInputElement | null
    if (el) el.checked = false
  }

  // helper to check dynamic product/detail paths
  const isProductPath = location.pathname.startsWith("/product")
  const isDetailPath = location.pathname.startsWith("/detail")

  return (
    <>
      <nav className="navbarmain">
        {(() => {
          if (isProductPath || isDetailPath) {
            return (
              <>
                <div
                  className="vector"
                  onClick={() => navigate(-1)}
                  style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}
                >
                  <img src={Left} alt="Left" className="LeftIcon" />
                  <p style={{ margin: 0 }}>{isProductPath ? "Product" : "Detail"}</p>
                </div>
              </>
            )
          } else {
            return (
              <>
                <div className="divhamburger">
                  <input id="burger-toggle" type="checkbox" className="burger-toggle" />

                  <label className="hamburger" htmlFor="burger-toggle">
                    <svg viewBox="0 0 32 32">
                      <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
                      <path className="line" d="M7 16 27 16"></path>
                    </svg>
                  </label>

                  <div className="hamburger-menu" onClick={closeBurger}>
                    <Link to="/" onClick={closeBurger}>Home</Link>
                    <Link to="/product" onClick={closeBurger}>Product</Link>
                    <Link to="/detail" onClick={closeBurger}>Detail</Link>
                    <Link to="/cart" onClick={closeBurger}>Cart</Link>
                    <Link to="/settings" onClick={closeBurger}>Settings</Link>
                    <Link to="/login" onClick={closeBurger}>Login</Link>
                    <Link to="/register" onClick={closeBurger}>Register</Link>

                    <button
                      className="hamburger-theme-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        document.body.classList.toggle("dark-mode")
                      }}
                    >
                      Dark / Light
                    </button>

                    <select
                      className="hamburger-lang"
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => {
                        const v = (e.target as HTMLSelectElement).value
                        console.log("lang:", v)
                      }}
                    >
                      <option value="en">EN</option>
                      <option value="fr">FR</option>
                      <option value="ar">AR</option>
                    </select>
                  </div>
                </div>
              </>
            )
          }
        })()}

        <div className="logonavbar" onClick={() => navigate("/home")} style={{ cursor: "pointer" }}>
          <img src={theme === 'dark' ? LogoWhite : Logo} alt="logo" />
        </div>

        <div className="iconnavbar">
          {(() => {
            if (isProductPath) {
              return (
                <>
                  <img
                    src={CartIcon}
                    className="CartIcon"
                    alt="CartIcon"
                    onClick={() => navigate("/cart")}
                    style={{ cursor: "pointer", width: 28, marginRight: 10 }}
                  />

                  {/* heart toggle: both icon and image toggle liked state */}

                  <button className="like-btn-header" onClick={() => setIsLiked(!isLiked)}>
                    <Heart size={24} fill={isLiked ? (theme === 'dark' ? '#FFF' : '#000') : "none"} />
                  </button>
                </>
              )
            }

            if (isDetailPath) {
              return <i className="fa fa-heart-o" id="icon" aria-hidden="true" />
            }

            return <i className="fa fa-bell" id="icon" aria-hidden="true" />
          })()}
        </div>
      </nav>
    </>
  )
}
