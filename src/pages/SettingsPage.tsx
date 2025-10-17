import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Home, ShoppingCart, Heart, User } from "lucide-react";
import "../css/Settings.css";
import profileImg from "../assets/profile.png"

export default function SettingsPage() {
    const [darkMode, setDarkMode] = useState(
        document.documentElement.getAttribute("data-theme") === "dark"
    );
    const navigate = useNavigate();

    useEffect(() => {
        document.documentElement.classList.add("transition");
        window.setTimeout(() => {
            document.documentElement.classList.remove("transition");
        }, 300);
        document.documentElement.setAttribute(
            "data-theme",
            darkMode ? "dark" : "light"
        );
    }, [darkMode]);

    const handleToggle = () => {
        setDarkMode((prev) => !prev);
    };

    const handleDeleteAccount = () => {
        if (window.confirm("Are you sure you want to delete your account?")) {
            alert("Account deleted");
        }
    };

    return (
        <div className="SettingsPage">
            <div className="nav_section">
                <div onClick={() => navigate(-1)}>
                    <i
                        className="fa fa-angle-left"
                        id="backSettings"
                        aria-hidden="true"
                        style={{ cursor: "pointer" }}
                    ></i>
                </div>

                <div className="title_section">
                    <p>Settings</p>
                </div>
            </div>
            <div className="section_main">
                <div className="user_section">
                    <div className="user_Profile">
                        <div className="img">
                            <div className="img">

                                <img src={profileImg} alt="Profile" />

                            </div>

                        </div>
                        <p className="user_name"> User Name</p>
                    </div>
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                </div>

                <div className="section_main">
                    <div className="title_settings_section">Other Settings</div>
                    <div className="settings-items">
                        <div className="item">
                            <div className="item_content">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M21 6.5c0 1.93-1.57 3.5-3.5 3.5S14 8.43 14 6.5S15.57 3 17.5 3S21 4.57 21 6.5m-2 5.29c-.5.13-1 .21-1.5.21A5.51 5.51 0 0 1 12 6.5c0-1.47.58-2.8 1.5-3.79A1.93 1.93 0 0 0 12 2c-1.1 0-2 .9-2 2v.29C7.03 5.17 5 7.9 5 11v6l-2 2v1h18v-1l-2-2zM12 23c1.11 0 2-.89 2-2h-4a2 2 0 0 0 2 2"
                                    />
                                </svg>
                                <p className="settings_title">Notification</p>
                            </div>
                            <i
                                className="fa fa-angle-right"
                                aria-hidden="true"
                            ></i>
                        </div>

                        <div className="item">
                            <div className="item_content">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M12 17a2 2 0 0 0 2-2a2 2 0 0 0-2-2a2 2 0 0 0-2 2a2 2 0 0 0 2 2m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1V6a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2zm-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3"
                                    />
                                </svg>
                                <p className="settings_title">Password</p>
                            </div>
                            <i
                                className="fa fa-angle-right"
                                aria-hidden="true"
                            ></i>
                        </div>

                        <div className="item">
                            <div className="item_content">
                                <svg
                                    id="iconmode"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M9.272 2.406a1 1 0 0 0-1.23-1.355C6.59 1.535 5.432 2.488 4.37 3.55a11.4 11.4 0 0 0 0 16.182c4.518 4.519 11.51 4.261 15.976-.205c1.062-1.062 2.014-2.22 2.498-3.673A1 1 0 0 0 21.55 14.6c-3.59 1.322-7.675.734-10.433-2.025C8.35 9.808 7.788 5.744 9.272 2.406"
                                    />
                                </svg>
                                <p className="settings_title">Dark mode</p>
                            </div>
                            <div className="dark">
                                <input
                                    type="checkbox"
                                    className="container_toggle"
                                    id="switch"
                                    name="mode"
                                    checked={darkMode}
                                    onChange={handleToggle}
                                />
                                <label htmlFor="switch">Toggle</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="section_main">
                    <div className="settings-items">
                        <div className="item">
                            <div className="item_content">
                                <i
                                    className="fa fa-info-circle"
                                    aria-hidden="true"
                                ></i>
                                <p className="settings_title">
                                    About application
                                </p>
                            </div>
                            <i
                                className="fa fa-angle-right"
                                aria-hidden="true"
                            ></i>
                        </div>

                        <div className="item">
                            <div className="item_content">
                                <i
                                    className="fa fa-question-circle"
                                    aria-hidden="true"
                                ></i>
                                <p className="settings_title">Help/FAQ</p>
                            </div>
                            <i
                                className="fa fa-angle-right"
                                aria-hidden="true"
                            ></i>
                        </div>
                    </div>
                </div>

                <div className="section_main">
                    <div className="settings-items">
                        <div className="item danger" onClick={handleDeleteAccount}>
                            <div className="item_content">
                                <i
                                    className="fa fa-trash"
                                    aria-hidden="true"
                                ></i>
                                <p className="settings_title">
                                    Delete my account
                                </p>
                            </div>
                            <i
                                className="fa fa-angle-right"
                                aria-hidden="true"
                            ></i>
                        </div>
                    </div>
                </div>
            </div>
            {/* <nav className="bottom-nav">
                <button className="nav-item" onClick={() => navigate('/')}>
                    <Home size={24} />
                </button>
                <button className="nav-item" onClick={() => navigate('/cart')}>
                    <ShoppingCart size={24} />
                </button>
                <button className="nav-item">
                    <Heart size={24} />
                </button>
                <button className="nav-item active" onClick={() => navigate('/settings')}>
                    <User size={24} />
                </button>
            </nav> */}
        </div>
    );
}
