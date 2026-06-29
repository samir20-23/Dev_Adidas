import { useState } from "react";
import "../../css/subpage.css";
import { getCurrentUser, getUsers } from "../../utils/auth";

export default function PasswordPage() {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);

  const handleSave = () => {
    const user = getCurrentUser();
    if (!user) { setMsg({ text: 'Not logged in', ok: false }); return; }
    if (user.password !== current) { setMsg({ text: 'Current password is incorrect', ok: false }); return; }
    if (next.length < 6) { setMsg({ text: 'New password must be at least 6 characters', ok: false }); return; }
    if (next !== confirm) { setMsg({ text: 'Passwords do not match', ok: false }); return; }

    // Update in users array and currentUser
    const users = getUsers().map(u => u.id === user.id ? { ...u, password: next } : u);
    const updated = { ...user, password: next };
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(updated));
    setCurrent(''); setNext(''); setConfirm('');
    setMsg({ text: 'Password updated successfully!', ok: true });
  };

  return (
    <div className="subpage">
      <h1 className="subpage-title">Change Password</h1>
      <div className="subpage-section">
        <div style={{ padding: '20px' }}>
          <input className="subpage-input" type="password" placeholder="Current password" value={current} onChange={e => setCurrent(e.target.value)} />
          <input className="subpage-input" type="password" placeholder="New password" value={next} onChange={e => setNext(e.target.value)} />
          <input className="subpage-input" type="password" placeholder="Confirm new password" value={confirm} onChange={e => setConfirm(e.target.value)} />
          <button className="subpage-btn" onClick={handleSave}>Save new password</button>
          {msg && <p className={msg.ok ? 'subpage-success' : 'subpage-error'}>{msg.text}</p>}
        </div>
      </div>
    </div>
  );
}
