"use client"

import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Heart } from "lucide-react"
import { useState } from "react"
import "../css/navbar.css"

// Assuming images will be in the public folder
const Logo = "/logoo.png"
const CartIcon = "/cart.png"
const Left = "/left.png"

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isLiked, setIsLiked] = useState(false)

  const closeBurger = () => {
    const el = document.getElementById("burger-toggle") as HTMLInputElement | null
    if (el) el.checked = false
  }

  const isProductPath = pathname.startsWith("/product")
  const isDetailPath = pathname.startsWith("/detail")

  return (
    <nav className="navbarmain">
      {isProductPath || isDetailPath ? (
        <div
          className="vector"
          onClick={() => router.back()}
          style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}
        >
          <img src={Left} alt="Back" className="LeftIcon" />
          <p style={{ margin: 0 }}>{isProductPath ? "Product" : "Detail"}</p>
        </div>
      ) : (
        <div className="divhamburger">
          <input id="burger-toggle" type="checkbox" className="burger-toggle" />
          <label className="hamburger" htmlFor="burger-toggle">
            <svg viewBox="0 0 32 32">
              <path
                className="line line-top-bottom"
                d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
              ></path>
              <path className="line" d="M7 16 27 16"></path>
            </svg>
          </label>
          <div className="hamburger-menu" onClick={closeBurger}>
            <Link href="/">Home</Link>
            <Link href="/product">Product</Link>
            <Link href="/detail">Detail</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/settings">Settings</Link>
            <Link href="/auth/LoginPage">Login</Link>
            <Link href="/auth/RegisterPage">Register</Link>
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
              onChange={(e) => console.log("lang:", e.target.value)}
            >
              <option value="en">EN</option>
              <option value="fr">FR</option>
              <option value="ar">AR</option>
            </select>
          </div>
        </div>
      )}

      <div className="logonavbar" onClick={() => router.push("/home")} style={{ cursor: "pointer" }}>
        <img src={Logo} alt="logo" />
      </div>

      <div className="iconnavbar">
        {isProductPath && (
          <>
            <img
              src={CartIcon}
              className="CartIcon"
              alt="CartIcon"
              onClick={() => router.push("/cart")}
              style={{ cursor: "pointer" }}
            />
            <button className="like-btn-header" onClick={() => setIsLiked(!isLiked)}>
              <Heart size={24} fill={isLiked ? "#000" : "none"} />
            </button>
          </>
        )}
        {isDetailPath && <i className="fa fa-heart-o" id="icon" aria-hidden="true" />}
        {!isProductPath && !isDetailPath && <i className="fa fa-bell" id="icon" aria-hidden="true" />}
      </div>
    </nav>
  )
}