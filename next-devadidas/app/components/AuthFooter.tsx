"use client"
import { useTranslation } from "react-i18next";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import "./css_comp/authFooter.css";
import Link from "next/link";

export default function AuthFooter() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <footer className="auth-footer" role="contentinfo" aria-label="Footer">
      <div className="auth-footer-inner">
        <div className="auth-left">
          <div className="auth-brand">
            <small className="brand-name">adidas</small>
            <small className="brand-sub">{t("footer.welcome") ?? "Welcome"}</small>
          </div>
        </div>

        <div className="auth-center">
          <span className="copyright">© {new Date().getFullYear()} adidas</span>
          <span className="dot" aria-hidden>•</span>
          <a
            className="small-note"
            href="https://github.com/samir20-23/Dev_Adidas"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </div>

        <div className="auth-right">
          <div className="auth-lang-switcher" role="tablist" aria-label="Language switcher">
            <button
              aria-pressed={i18n.language === "en"}
              className={i18n.language === "en" ? "active" : ""}
              onClick={() => changeLanguage("en")}
              title="English"
            >
              EN
            </button>
            <button
              aria-pressed={i18n.language === "ar"}
              className={i18n.language === "ar" ? "active" : ""}
              onClick={() => changeLanguage("ar")}
              title="Arabic"
            >
              AR
            </button>
          </div>

          <button
            className="auth-theme-btn"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Light" : "Dark"}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            <span className="theme-label">
              {theme === "dark" ? t("footer.light") ?? "Light" : t("footer.dark") ?? "Dark"}
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
