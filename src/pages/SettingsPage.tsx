import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Bell, Lock, Moon, Info, HelpCircle, LogOut, User } from "lucide-react";
import "../css/Settings.css";
import { useTheme } from "../contexts/ThemeContext";
import { getCurrentUser, logout, deleteAccount } from "../utils/auth";

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [showSheet, setShowSheet] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleLogout = () => { logout(); navigate('/login'); };
  const handleDelete = () => {
    if (!confirmDelete) { setConfirmDelete(true); return; }
    deleteAccount();
    navigate('/login');
  };

  return (
    <div className="settings-page">

      {/* Profile card — click to edit profile */}
      <div className="profile-card" onClick={() => navigate('/settings/profile')}>
        <div className="avatar">{user?.name?.[0]?.toUpperCase() || 'U'}</div>
        <div className="profile-info">
          <div className="profile-name">{user?.name || 'Guest'}</div>
          <div className="profile-email">{user?.email || 'Not logged in'}</div>
        </div>
        <ChevronRight size={20} color="var(--text-secondary)" />
      </div>

      <h2 className="section-title">Other settings</h2>

      <div className="settings-group">
        <div className="settings-row" onClick={() => navigate('/settings/notifications')}>
          <div className="settings-row-icon"><Bell size={20} /></div>
          <div className="settings-row-label">Notification</div>
          <ChevronRight size={18} color="var(--text-secondary)" />
        </div>
        <div className="settings-row" onClick={() => navigate('/settings/password')}>
          <div className="settings-row-icon"><Lock size={20} /></div>
          <div className="settings-row-label">Password</div>
          <ChevronRight size={18} color="var(--text-secondary)" />
        </div>
        <div className="settings-row" onClick={toggleTheme}>
          <div className="settings-row-icon"><Moon size={20} /></div>
          <div className="settings-row-label">Dark mode</div>
          <div className={`toggle ${theme === 'dark' ? '' : 'off'}`} />
        </div>
      </div>

      <div className="settings-group">
        <div className="settings-row" onClick={() => navigate('/settings/about')}>
          <div className="settings-row-icon"><Info size={20} /></div>
          <div className="settings-row-label">About application</div>
          <ChevronRight size={18} color="var(--text-secondary)" />
        </div>
        <div className="settings-row" onClick={() => navigate('/settings/help')}>
          <div className="settings-row-icon"><HelpCircle size={20} /></div>
          <div className="settings-row-label">Help / FAQ</div>
          <ChevronRight size={18} color="var(--text-secondary)" />
        </div>
        <div className="settings-row" onClick={() => setShowSheet(true)}>
          <div className="settings-row-icon" style={{ color: 'var(--danger)' }}><LogOut size={20} /></div>
          <div className="settings-row-label" style={{ color: 'var(--danger)' }}>Account options</div>
          <ChevronRight size={18} color="var(--danger)" />
        </div>
      </div>

      <div className="settings-footer">© Adidas 2025</div>

      {showSheet && (
        <div className="action-sheet-overlay" onClick={() => { setShowSheet(false); setConfirmDelete(false); }}>
          <div className="action-sheet" onClick={e => e.stopPropagation()}>
            <button className="action-sheet-btn logout" onClick={handleLogout}>Log out</button>
            <button className="action-sheet-btn delete" onClick={handleDelete}>
              {confirmDelete ? 'Tap again to confirm' : 'Delete my account'}
            </button>
            <button className="action-sheet-btn cancel" onClick={() => { setShowSheet(false); setConfirmDelete(false); }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
