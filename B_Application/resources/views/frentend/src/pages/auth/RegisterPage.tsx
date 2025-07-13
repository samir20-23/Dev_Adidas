// src/pages/RegisterPage.tsx
import { useEffect } from "react";
import "../../css/Register.css";

export default function RegisterPage() {
  useEffect(() => {
    // 1) Toggle show/hide password
    const toggleIcons = document.querySelectorAll(".toggle-password");
    toggleIcons.forEach((eye) => {
      eye.addEventListener("click", () => {
        const targetId = eye.getAttribute("data-target");
        const input = document.getElementById(targetId) as HTMLInputElement | null;
        if (!input) return;

        if (input.type === "password") {
          input.type = "text";
          eye.classList.replace("fa-eye", "fa-eye-slash");
        } else {
          input.type = "password";
          eye.classList.replace("fa-eye-slash", "fa-eye");
        }
      });
    });

    // 2) Terms checkbox toggles text opacity
    const checkbox = document.getElementById("termsCheckbox") as HTMLInputElement | null;
    const textContent = document.getElementById("termsCheckboxcontent");
    if (checkbox && textContent) {
      checkbox.addEventListener("click", () => {
        textContent.style.opacity =
          textContent.style.opacity === "0.5" ? "1" : "0.5";
      });
    }

    // 3) Clear error messages on input
    const inputs = document.querySelectorAll<HTMLInputElement>(
      "input[type='text'], input[type='email'], input[type='password']"
    );
    inputs.forEach((inp) => {
      inp.addEventListener("input", () => {
        const errorSpan = document.getElementById(`error-${inp.id}`);
        if (errorSpan) errorSpan.textContent = "";
      });
    });

    // Optional cleanup
    return () => {
      // Cleanup logic if needed (e.g., remove listeners)
    };
  }, []);

  return (
    <div className="mainRegister">
      <div className="headeRegister">
        <div className="logoBar">
          <div className="mainBrand">
            <div className="brand">
              <div className="shape s1"></div>
              <div className="shape s2"></div>
              <div className="shape s3"></div>
            </div>
          </div>
        </div>
        <h2 className="titleRegister">Create your account</h2>
      </div>

      <form id="registerForm" action="#" method="post">
        {/* Full Name */}
        <div className="field-group">
          <label htmlFor="fullName">Full Name *</label>
          <div className="input-group">
            <i className="fa fa-user" id="iconsInputs"></i>
            <input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Type your full name"
              required
            />
          </div>
          <span className="error-msg" id="error-fullName"></span>
        </div>

        {/* Email */}
        <div className="field-group">
          <label htmlFor="emailRegister">Email *</label>
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

        {/* Password */}
        <div className="field-group">
          <label htmlFor="passwordRegister">Password *</label>
          <div className="input-group">
            <i className="fa fa-lock" id="iconsInputs"></i>
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
            ></i>
          </div>
          <span className="error-msg" id="error-passwordRegister"></span>
        </div>

        {/* Confirm Password */}
        <div className="field-group">
          <label htmlFor="coPasswordRegister">Confirm Password *</label>
          <div className="input-group">
            <i className="fa fa-lock" id="iconsInputs"></i>
            <input
              type="password"
              name="ConfirmPassword"
              id="coPasswordRegister"
              placeholder="Re-Type your password"
              required
            />
            <i
              className="fa fa-eye toggle-password"
              data-target="coPasswordRegister"
            ></i>
          </div>
          <span className="error-msg" id="error-coPasswordRegister"></span>
        </div>

        {/* Terms */}
        <div className="terms field-group">
          <input type="checkbox" id="termsCheckbox" />
          <label htmlFor="termsCheckbox" id="termsCheckboxcontent">
            I accept the Terms and Conditions
          </label>
          <span className="error-msg" id="error-termsCheckbox"></span>
        </div>

        <button type="submit" id="submitRegister">
          Sign up
        </button>
      </form>

      <div className="orRegister">
        <span>
          <hr />
        </span>
        <span>or</span>
        <span>
          <hr />
        </span>
      </div>

      <div className="logsWith">
        <button id="signupbtnAple" className="social-btn apple">
          <i className="fa fa-apple"></i>
          <span>Sign up with Apple</span>
        </button>
        <button id="signupbtnGoogle" className="social-btn google">
          <i className="fa fa-google"></i>
          <span>Sign up with Google</span>
        </button>
      </div>

      <p id="AlreadyRegister">
        Already have an account?{" "}
        <span>
          <a href="/login">Log in</a>
        </span>
      </p>
    </div>
  );
}
