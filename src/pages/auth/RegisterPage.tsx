import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Register.css";
import Logo from "../../components/logo_Comp/Logo";
import AuthFooter from "../../components/AuthFooter";
import { register } from "../../utils/auth";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { setError('Passwords do not match'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    const result = register(name, email, password);
    if (result.error) { setError(result.error); return; }
    navigate('/home');
  };

  return (
    <>
      <div className="mainRegister">
        <div className="headeRegister">
          <div className="logoBar"><Logo /></div>
          <h2 className="titleRegister">Register</h2>
        </div>

        <form id="registerForm" onSubmit={handleSubmit}>
          <div className="field-group">
            <p className="label">Full Name *</p>
            <div className="input-group">
              <i className="fa fa-user" id="iconsInputs" />
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
          </div>

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

          <div className="field-group">
            <p className="label">Confirm Password *</p>
            <div className="input-group">
              <i className="fa fa-lock" id="iconsInputs" />
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
              />
              <i
                className={`fa ${showConfirm ? 'fa-eye-slash' : 'fa-eye'} toggle-password`}
                style={{ cursor: 'pointer', pointerEvents: 'auto' }}
                onClick={() => setShowConfirm(p => !p)}
              />
            </div>
          </div>

          {error && <span className="error-msg" style={{ display: 'block', marginBottom: 8 }}>{error}</span>}

          <button type="submit" id="submitRegister">Create Account</button>
        </form>

        <p id="AlreadyRegister">
          Already have an account?{" "}
          <span><a href="/login">Login</a></span>
        </p>
      </div>
      <AuthFooter />
    </>
  );
}
