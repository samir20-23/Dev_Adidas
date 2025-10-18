import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../../css/Register.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Logo from "../../components/logo_Comp/Logo";
import AuthFooter from "../../components/AuthFooter";

export default function LoginPage() {
    const { t } = useTranslation();

    useEffect(() => {
        const toggleIcons = document.querySelectorAll<HTMLElement>(".toggle-password");
        toggleIcons.forEach((eye) => {
            const clickHandler = () => {
                const targetId = eye.getAttribute("data-target");
                if (!targetId) return;
                const input = document.getElementById(targetId) as HTMLInputElement | null;
                if (!input) return;

                if (input.type === "password") {
                    input.type = "text";
                    eye.classList.replace("fa-eye", "fa-eye-slash");
                } else {
                    input.type = "password";
                    eye.classList.replace("fa-eye-slash", "fa-eye");
                }
            };
            eye.addEventListener("click", clickHandler);
            return () => eye.removeEventListener("click", clickHandler);
        });
    }, []);

    return (
        <>
            <div className="mainRegister">
                <div className="headeRegister">
                    <div className="logoBar">
                        <Logo />
                    </div>
                    <h2 className="titleRegister">{t('login.title')}</h2>
                </div>

                <form id="registerForm" onSubmit={(e) => e.preventDefault()}>
                    <div className="field-group">
                        <p className="label">{t('login.email')} *</p>
                        <div className="input-group">
                            <i className="fa fa-envelope" id="iconsInputs" />
                            <input
                                type="email"
                                name="Email"
                                id="emailRegister"
                                placeholder="example@gmail.com"
                                required
                            />
                        </div>
                        <span className="error-msg" id="error-emailRegister"></span>
                    </div>

                    <div className="field-group">
                        <p className="label">{t('login.password')} *</p>
                        <div className="input-group">
                            <i className="fa fa-lock" id="iconsInputs" />
                            <input
                                type="password"
                                name="PasswordRegister"
                                id="passwordRegister"
                                placeholder={t('login.password')}
                                required
                            />
                            <i
                                className="fa fa-eye toggle-password"
                                data-target="passwordRegister"
                                id="iconsInputs"
                                style={{ cursor: "pointer" }}
                            />
                        </div>
                        <span className="error-msg" id="error-passwordRegister"></span>
                    </div>

                    <div className="terms field-group">
                        <a href="#" style={{ textDecoration: "none", color: "var(--text-color)" }}>{t('login.forgot')}</a>
                    </div>

                    <button type="submit" id="submitRegister">
                        {t('login.submit')}
                    </button>
                </form>

                <div className="orRegister">
                    <span>
                        <hr />
                    </span>
                    <span>{t('register.or')}</span>
                    <span>
                        <hr />
                    </span>
                </div>

                <div className="logsWith">
                    <button id="signupbtnAple" className="social-btn apple">
                        <i className="fa fa-apple" />
                        <span>{t('register.apple')}</span>
                    </button>
                    <button id="signupbtnGoogle" className="social-btn google">
                        <i className="fa fa-google" />
                        <span>{t('register.google')}</span>
                    </button>
                </div>

                <p id="AlreadyRegister">
                    {t('login.noAccount')}{" "}
                    <span>
                        <a href="/register">{t('login.register')}</a>
                    </span>
                </p>
            </div>
            <AuthFooter />
        </>
    );
}
