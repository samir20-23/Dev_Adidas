import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/subpage.css";
import { getCurrentUser, getUsers } from "../../utils/auth";

export default function ProfileEditPage() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);

  const handleSave = () => {
    if (!user) { setMsg({ text: 'Not logged in', ok: false }); return; }
    if (!name.trim()) { setMsg({ text: 'Name cannot be empty', ok: false }); return; }
    if (!email.trim()) { setMsg({ text: 'Email cannot be empty', ok: false }); return; }

    // Check email conflict (another user with same email)
    const users = getUsers();
    const conflict = users.find(u => u.email === email && u.id !== user.id);
    if (conflict) { setMsg({ text: 'Email already used by another account', ok: false }); return; }

    const updated = { ...user, name: name.trim(), email: email.trim() };
    const updatedUsers = users.map(u => u.id === user.id ? updated : u);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('currentUser', JSON.stringify(updated));
    setMsg({ text: 'Profile updated!', ok: true });
    setTimeout(() => navigate('/settings'), 1200);
  };

  return (
    <div className="subpage">
      <h1 className="subpage-title">Edit Profile</h1>

      <div className="subpage-section">
        <div style={{ padding: '20px' }}>
          <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Full name</label>
          <input className="subpage-input" type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />

          <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Email address</label>
          <input className="subpage-input" type="email" placeholder="example@gmail.com" value={email} onChange={e => setEmail(e.target.value)} />

          <button className="subpage-btn" onClick={handleSave}>Save changes</button>
          {msg && <p className={msg.ok ? 'subpage-success' : 'subpage-error'}>{msg.text}</p>}
        </div>
      </div>
    </div>
  );
}
