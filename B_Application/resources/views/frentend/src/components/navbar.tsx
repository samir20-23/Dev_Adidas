// src/components/navbar.tsx
import React from "react"
import "../css/navbar.css"
import { Link, useLocation } from "react-router-dom"
import Logo from "../assets/logoo.png"
import CartIcon from "../assets/cart.png"
import Left from "../assets/left.png"

export default function Navbar() {
  const location = useLocation().pathname;
  const closeBurger = () => {
    const el = document.getElementById("burger-toggle") as HTMLInputElement | null
    if (el) el.checked = false
  }
  // determine icon based on current path
  const isProductOrDetail = location.pathname === "/product" || location.pathname === "/detail"
  const iconClass = isProductOrDetail ? "fa fa-heart-o" : "fa fa-bell"
  return (
    <>
      <nav className="navbarmain">
        {(() => {
          if (location === "/product" || location === "/detail") {
            return (
              <>
              
                <div className="vector">
                  <img src={Left} alt="Left" className="LeftIcon" />
                  <p>Detail</p>
                </div>
              </>
            )
          }
          else {
            return (
              <>
                <div className="divhamburger">
                  {/* hidden checkbox (must be sibling of label + menu) */}
                  <input id="burger-toggle" type="checkbox" className="burger-toggle" />

                  {/* your original label + svg (unchanged) */}
                  <label className="hamburger" htmlFor="burger-toggle">
                    <svg viewBox="0 0 32 32">
                      <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
                      <path className="line" d="M7 16 27 16"></path>
                    </svg>
                  </label>

                  {/* NEW: hamburger controlled menu (sibling of input) */}
                  <div className="hamburger-menu" onClick={closeBurger}>
                    <Link to="/" onClick={closeBurger}>Home</Link>
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
                        /* placeholder: wire your i18n code here */
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


        <div className="logonavbar">
          <img src={Logo} alt="logo" />
        </div>

        <div className="iconnavbar">
          {(() => {
            if (location === "/product") {
              return (
                <>
                  <img src={CartIcon} className="CartIcon" alt="CartIcon" />
                  <i className="fa fa-heart-o" id="icon" aria-hidden="true" />
                </>
              )
            }
            if (location === "/detail") {
              return <i className="fa fa-heart-o" id="icon" aria-hidden="true" />
            }
            else {
              return <i className="fa fa-bell" id="icon" aria-hidden="true" />
            }
          })()}
        </div>

      </nav>
    </>
  )
}
