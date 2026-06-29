import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Register.css";
import Logo from "../../components/logo_Comp/Logo";
import AuthFooter from "../../components/AuthFooter";
import { login } from "../../utils/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = login(email, password);
    if (result.error) { setError(result.error); return; }
    navigate('/home');
  };

  return (
    <>
      <div className="mainRegister">
        <div className="headeRegister">
          <div className="logoBar"><Logo /></div>
          <h2 className="titleRegister">Login</h2>
        </div>

        <form id="registerForm" onSubmit={handleSubmit}>
          <div className="field-group">
            <p className="label">Email *</p>
            <div className="input-group">
              <i className="fa fa-envelope" id="iconsInputs" />
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field-group">
            <p className="label">Password *</p>
            <div className="input-group">
              <i className="fa fa-lock" id="iconsInputs" />
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <i
                className={`fa ${showPass ? 'fa-eye-slash' : 'fa-eye'} toggle-password`}
                style={{ cursor: 'pointer', pointerEvents: 'auto' }}
                onClick={() => setShowPass(p => !p)}
              />
            </div>
          </div>

          {error && <span className="error-msg" style={{ display: 'block', marginBottom: 8 }}>{error}</span>}

          <div className="terms field-group">
            <a href="#" style={{ textDecoration: 'none', color: 'var(--text-color)' }}>Forgot password?</a>
          </div>

          <button type="submit" id="submitRegister">Login</button>
        </form>

        <p id="AlreadyRegister">
          Don't have an account?{" "}
          <span><a href="/register">Register</a></span>
        </p>
      </div>
      <AuthFooter />
    </>
  );
}
