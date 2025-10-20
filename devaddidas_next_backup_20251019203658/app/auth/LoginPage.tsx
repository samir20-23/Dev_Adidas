"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "../../css/Register.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
// Assuming Logo component will be created at this path
// import Logo from "../../components/logo_Comp/Logo";

export default function LoginPage() {
    const router = useRouter();

    useEffect(() => {
        const toggleIcons = document.querySelectorAll<HTMLElement>(".toggle-password");
        const handleClick = (event: MouseEvent) => {
            const eye = event.currentTarget as HTMLElement;
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

        toggleIcons.forEach((eye) => {
            eye.addEventListener("click", handleClick);
        });

        const checkbox = document.getElementById("termsCheckbox") as HTMLInputElement | null;
        const textContent = document.getElementById("termsCheckboxcontent");
        const handleCheckboxClick = () => {
            if (textContent) {
                textContent.style.opacity = textContent.style.opacity === "0.5" ? "1" : "0.5";
            }
        };

        if (checkbox) {
            checkbox.addEventListener("click", handleCheckboxClick);
        }

        const inputs = document.querySelectorAll<HTMLInputElement>(
            "input[type='email'], input[type='password']"
        );
        const handleInput = (event: Event) => {
            const inp = event.currentTarget as HTMLInputElement;
            const errorSpan = document.getElementById(`error-${inp.id}`);
            if (errorSpan) errorSpan.textContent = "";
        };

        inputs.forEach((inp) => {
            inp.addEventListener("input", handleInput);
        });

        return () => {
            toggleIcons.forEach((eye) => eye.removeEventListener("click", handleClick));
            if (checkbox) checkbox.removeEventListener("click", handleCheckboxClick);
            inputs.forEach((inp) => inp.removeEventListener("input", handleInput));
        };
    }, []);

    return (
        <div className="mainRegister">
            <div className="headeRegister">
                <div className="logoBar">
                    {/* <Logo /> */}
                </div>
                <h2 className="titleRegister">Welcome Back!</h2>
            </div>

            <form id="registerForm" onSubmit={(e) => e.preventDefault()}>
                <div className="field-group">
                    <p className="label">Email *</p>
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
                    <p className="label">Password *</p>
                    <div className="input-group">
                        <i className="fa fa-lock" id="iconsInputs" />
                        <input
                            type="password"
                            name="PasswordRegister"
                            id="passwordRegister"
                            placeholder="Type your password"
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
                    <input type="checkbox" id="termsCheckbox" />
                    <p
                        id="termsCheckboxcontent"
                        style={{ opacity: 0.5, cursor: "pointer" }}
                        className="label"
                    >
                        Remember me!
                    </p>
                    <span className="error-msg" id="error-termsCheckbox"></span>
                </div>

                <button type="submit" id="submitRegister">
                    Log in
                </button>
            </form>

            <div className="orRegister">
                <span><hr /></span>
                <span>or</span>
                <span><hr /></span>
            </div>

            <div className="logsWith">
                <button id="signupbtnAple" className="social-btn apple">
                    <i className="fa fa-apple" />
                    <span>Sign up with Apple</span>
                </button>
                <button id="signupbtnGoogle" className="social-btn google">
                    <i className="fa fa-google" />
                    <span>Sign up with Google</span>
                </button>
            </div>

            <p id="AlreadyRegister">
                Don’t have an account?{" "}
                <span>
                    <Link href="/auth/RegisterPage">Sign up</Link>
                </span>
            </p>
        </div>
    );
}