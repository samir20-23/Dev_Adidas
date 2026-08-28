"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import Link from "next/link";
import "../css/auth.css";

export default function RegisterPage() {
    const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { t } = useTranslation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(p => ({ ...p, [e.target.name]: e.target.value }));
        setErrors(p => ({ ...p, [e.target.name]: "" }));
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!form.name.trim()) newErrors.name = "Required";
        if (!form.email.includes("@")) newErrors.email = "Enter a valid email";
        if (form.password.length < 6) newErrors.password = "Minimum 6 characters";
        if (form.confirm !== form.password) newErrors.confirm = "Passwords do not match";
        if (!agreed) newErrors.agreed = "You must agree to the terms";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = () => {
        if (!validate()) return;
        setIsLoading(true);
        // Simulate registration — no real API
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

            <h1 className="auth-title">{t('register.title')}</h1>
            <p className="auth-subtitle">Create your account and start shopping.</p>

            <div className="auth-form">
                <div className="auth-input-group">
                    <label>Full Name</label>
                    <div className="auth-input-wrap">
                        <User size={18} className="auth-input-icon" />
                        <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" />
                    </div>
                    {errors.name && <span className="auth-error">{errors.name}</span>}
                </div>

                <div className="auth-input-group">
                    <label>{t('register.email')}</label>
                    <div className="auth-input-wrap">
                        <Mail size={18} className="auth-input-icon" />
                        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
                    </div>
                    {errors.email && <span className="auth-error">{errors.email}</span>}
                </div>

                <div className="auth-input-group">
                    <label>{t('register.password')}</label>
                    <div className="auth-input-wrap">
                        <Lock size={18} className="auth-input-icon" />
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={form.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                        />
                        <button type="button" className="auth-eye-btn" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {errors.password && <span className="auth-error">{errors.password}</span>}
                </div>

                <div className="auth-input-group">
                    <label>{t('register.confirmPassword')}</label>
                    <div className="auth-input-wrap">
                        <Lock size={18} className="auth-input-icon" />
                        <input
                            name="confirm"
                            type={showPassword ? "text" : "password"}
                            value={form.confirm}
                            onChange={handleChange}
                            placeholder="••••••••"
                        />
                    </div>
                    {errors.confirm && <span className="auth-error">{errors.confirm}</span>}
                </div>

                <div className="auth-terms-row">
                    <input
                        type="checkbox"
                        id="terms"
                        checked={agreed}
                        onChange={e => { setAgreed(e.target.checked); setErrors(p => ({ ...p, agreed: "" })); }}
                    />
                    <label htmlFor="terms">{t('register.terms')}</label>
                </div>
                {errors.agreed && <span className="auth-error">{errors.agreed}</span>}

                <button
                    className={`auth-submit-btn ${isLoading ? "loading" : ""}`}
                    onClick={handleRegister}
                    disabled={isLoading}
                >
                    {isLoading ? <span className="auth-spinner" /> : t('register.submit')}
                </button>

                <div className="auth-divider"><span>OR</span></div>

                <button className="auth-social-btn">
                    <img src="https://www.google.com/favicon.ico" alt="Google" width={18} />
                    {t('register.google')}
                </button>
                <button className="auth-social-btn auth-apple-btn">
                    🍎 {t('register.apple')}
                </button>
            </div>

            <p className="auth-switch">
                {t('register.already')} <Link href="/login" className="auth-link">{t('register.login')}</Link>
            </p>
        </div>
    );
}
