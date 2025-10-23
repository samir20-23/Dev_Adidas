"use client"
import "../css/navbar.css"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Heart, Moon, Sun } from "lucide-react";
import { useTranslation } from 'react-i18next';

import Logo from "../../public/assets/logoo.png"
import LogoWhite from "../../public/assets/logoWhite.png"
import CartIcon from "../../public/assets/cart.png"
import Left from "../../public/assets/left.png"
import { useState } from "react"
// import { useTheme } from "../contexts/ThemeContext";
import Image from "next/image";

export default function Navbar() {
  const location = usePathname()
  const navigate = useRouter()
  const { t, i18n } = useTranslation();
  const [isLiked, setIsLiked] = useState(false);
  // const { theme, toggleTheme } = useTheme();
  const theme = 'dark'
  const toggleTheme = () => { }

  const closeBurger = () => {
    const el = document.getElementById("burger-toggle") as HTMLInputElement | null
    if (el) el.checked = false
  }

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const isProductPath = location.startsWith("/product")
  const isDetailPath = location.startsWith("/detail")

  return (
    <>
      <nav className="navbarmain">
        {(() => {
          if (isProductPath || isDetailPath) {
            return (
              <>
                <div
                  className="vector"
                  onClick={() => navigate.back()}
                  style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}
                >
                  <Image src={Left} alt="Left" className="LeftIcon" />
                  <p style={{ margin: 0 }}>{isProductPath ? t('navbar.product') : t('navbar.detail')}</p>
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

                  <div className="hamburger-menu">
                    <div className="hamburger-menu-links">
                      <Link href="/home" onClick={closeBurger}>{t('navbar.home')}</Link>
                      <Link href="/product" onClick={closeBurger}>{t('navbar.product')}</Link>
                      <Link href="/cart" onClick={closeBurger}>{t('navbar.cart')}</Link>
                      <Link href="/settings" onClick={closeBurger}>{t('navbar.settings')}</Link>
                      <Link href="/login" onClick={closeBurger}>{t('navbar.login')}</Link>
                      <Link href="/register" onClick={closeBurger}>{t('navbar.register')}</Link>
                    </div>

                    <div className="hamburger-menu-controls">
                      <button
                        className="hamburger-theme-btn"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleTheme()
                        }}
                      >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                      </button>
                      <div className="hamburger-lang-switcher">
                        <button onClick={() => changeLanguage('en')} className={i18n.language === 'en' ? 'active' : ''}>EN</button>
                        <button onClick={() => changeLanguage('ar')} className={i18n.language === 'ar' ? 'active' : ''}>AR</button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          }
        })()}

        <div className="logonavbar" onClick={() => navigate.push("/home")} style={{ cursor: "pointer" }}>
          <Image src={theme === 'dark' ? LogoWhite : Logo} alt="logo" />
        </div>

        <div className="iconnavbar">
          {(() => {
            if (isProductPath) {
              return (
                <>
                  <Image
                    src={CartIcon}
                    className="CartIcon"
                    alt="CartIcon"
                    onClick={() => navigate.push("/cart")}
                    style={{ cursor: "pointer", width: 20, marginRight: 10 }}
                  />
                  <button className="like-btn-header" onClick={() => setIsLiked(!isLiked)}>
                    <Heart size={21} fill={isLiked ? (theme === 'dark' ? '#FFF' : '#000') : "none"} />
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