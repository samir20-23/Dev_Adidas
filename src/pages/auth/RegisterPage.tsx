import { useEffect } from "react";
import { useTranslation } from "react-i18next"; // fixed import
import "../../css/Register.css";
import Logo from "../../components/logo_Comp/Logo";
import AuthFooter from "../../components/AuthFooter";

export default function RegisterPage() {
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
                    <h2 className="titleRegister">{t('register.title')}</h2>
                </div>

                <form id="registerForm" action="#" method="post">
                    <div className="field-group">
                        <p className="label">{t('register.email')} *</p>
                        <div className="input-group">
                            <i className="fa fa-envelope" id="iconsInputs"></i>
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
                        <p className="label">{t('register.password')} *</p>
                        <div className="input-group">
                            <i className="fa fa-lock" id="iconsInputs"></i>
                            <input
                                type="password"
                                name="PasswordRegister"
                                id="passwordRegister"
                                placeholder={t('register.password')}
                                required
                            />
                            <i
                                className="fa fa-eye toggle-password"
                                data-target="passwordRegister"
                                id="iconsInputs"
                            ></i>
                        </div>
                        <span className="error-msg" id="error-passwordRegister"></span>
                    </div>

                    <div className="field-group">
                        <p className="label">{t('register.confirmPassword')} *</p>
                        <div className="input-group">
                            <i className="fa fa-lock" id="iconsInputs"></i>
                            <input
                                type="password"
                                name="ConfirmPassword"
                                id="coPasswordRegister"
                                placeholder={t('register.confirmPassword')}
                                required
                            />
                            <i
                                className="fa fa-eye toggle-password"
                                data-target="coPasswordRegister"
                            ></i>
                        </div>
                        <span className="error-msg" id="error-coPasswordRegister"></span>
                    </div>

                    <div className="terms field-group">
                        <input type="checkbox" id="termsCheckbox" />
                        <p className="label" id="termsCheckboxcontent">
                            {t('register.terms')}
                        </p>
                        <span className="error-msg" id="error-termsCheckbox"></span>
                    </div>

                    <button type="submit" id="submitRegister">
                        {t('register.submit')}
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
                        <i className="fa fa-apple"></i>
                        <span>{t('register.apple')}</span>
                    </button>
                    <button id="signupbtnGoogle" className="social-btn google">
                        <i className="fa fa-google"></i>
                        <span>{t('register.google')}</span>
                    </button>
                </div>

                <p id="AlreadyRegister">
                    {t('register.already')}{" "}
                    <span>
                        <a href="/login">{t('register.login')}</a>
                    </span>
                </p>
            </div>
            <AuthFooter />
        </>
    );
}
