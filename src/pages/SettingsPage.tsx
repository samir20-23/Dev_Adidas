import { useState } from "react";
import { ChevronRight, Bell, Lock, Moon, Info, HelpCircle, Trash2 } from "lucide-react";
import "../css/Settings.css";

export default function SettingsPage() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
        if (!darkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    };

    return (
        <div className="settings-page">
            <div className="profile-card">
                <div className="avatar"></div>
                <div className="profile-name">user name</div>
                <ChevronRight size={20} color="#111" />
            </div>

            <h2 className="section-title" style={{ marginTop: 24, marginLeft: 4 }}>Other settings</h2>
            
            <div className="settings-group">
                <div className="settings-row">
                    <div className="settings-row-icon"><Bell size={20} /></div>
                    <div className="settings-row-label">Notification</div>
                    <ChevronRight size={18} color="#888" />
                </div>
                <div className="settings-row">
                    <div className="settings-row-icon"><Lock size={20} /></div>
                    <div className="settings-row-label">Password</div>
                    <ChevronRight size={18} color="#888" />
                </div>
                <div className="settings-row" onClick={toggleTheme}>
                    <div className="settings-row-icon"><Moon size={20} /></div>
                    <div className="settings-row-label">Dark mode</div>
                    <div className={`toggle ${!darkMode ? 'off' : ''}`}></div>
                </div>
            </div>

            <div className="settings-group">
                <div className="settings-row">
                    <div className="settings-row-icon"><Info size={20} /></div>
                    <div className="settings-row-label">About application</div>
                    <ChevronRight size={18} color="#888" />
                </div>
                <div className="settings-row">
                    <div className="settings-row-icon"><HelpCircle size={20} /></div>
                    <div className="settings-row-label">Help/FAQ</div>
                    <ChevronRight size={18} color="#888" />
                </div>
                <div className="settings-row">
                    <div className="settings-row-icon danger"><Trash2 size={20} /></div>
                    <div className="settings-row-label danger">Delete my account</div>
                    <ChevronRight size={18} color="#E53935" />
                </div>
            </div>

            <div className="settings-footer">
                © Adidas 2025
            </div>
        </div>
    );
}
