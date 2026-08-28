"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Link from "next/link";
import "../css/auth.css";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { t } = useTranslation();

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!email.includes("@")) newErrors.email = "Enter a valid email";
        if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = () => {
        if (!validate()) return;
        setIsLoading(true);
        // Simulate login — no real API
        setTimeout(() => {
            setIsLoading(false);
            router.push("/home");
        }, 1200);
    };

    return (
        <div className="auth-page">
            <div className="auth-logo">
                <div className="auth-logo-shapes">
                    <div className="auth-logo-s1" />
                    <div className="auth-logo-s2" />
                    <div className="auth-logo-s3" />
                </div>
            </div>

            <h1 className="auth-title">{t('login.title')}</h1>
            <p className="auth-subtitle">Welcome back! Sign in to your account.</p>

            <div className="auth-form">
                <div className="auth-input-group">
                    <label>{t('login.email')}</label>
                    <div className="auth-input-wrap">
                        <Mail size={18} className="auth-input-icon" />
                        <input
                            type="email"
                            value={email}
                            onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: "" })); }}
                            placeholder="you@example.com"
                        />
                    </div>
                    {errors.email && <span className="auth-error">{errors.email}</span>}
                </div>

                <div className="auth-input-group">
                    <label>{t('login.password')}</label>
                    <div className="auth-input-wrap">
                        <Lock size={18} className="auth-input-icon" />
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: "" })); }}
                            placeholder="••••••••"
                        />
                        <button type="button" className="auth-eye-btn" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {errors.password && <span className="auth-error">{errors.password}</span>}
                </div>

                <button className="auth-forgot">{t('login.forgot')}</button>

                <button
                    className={`auth-submit-btn ${isLoading ? "loading" : ""}`}
                    onClick={handleLogin}
                    disabled={isLoading}
                >
                    {isLoading ? <span className="auth-spinner" /> : t('login.submit')}
                </button>

                <div className="auth-divider"><span>OR</span></div>

                <button className="auth-social-btn">
                    <img src="https://www.google.com/favicon.ico" alt="Google" width={18} />
                    Continue with Google
                </button>
                <button className="auth-social-btn auth-apple-btn">
                    🍎 Continue with Apple
                </button>
            </div>

            <p className="auth-switch">
                {t('login.noAccount')} <Link href="/register" className="auth-link">{t('login.register')}</Link>
            </p>
        </div>
    );
}
