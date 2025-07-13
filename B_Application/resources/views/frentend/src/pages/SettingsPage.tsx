// pages/SettingsPage.tsx
import { useEffect, useState } from "react";
import "../css/Settings.css"; 
export default function SettingsPage() {
    const [darkMode, setDarkMode] = useState(
        document.documentElement.getAttribute("data-theme") === "dark"
    );

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

    return (
        <div className="main">
            <div className="nav_section">
                <i className="fa fa-angle-left" aria-hidden="true"></i>
                <div className="title_section">
                    <p>Settings</p>
                </div>
            </div>
            <div className="section_main">
                <div className="user_section">
                    <div className="user_Profile">
                        <div className="img">
                            <svg
                                className="img"
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="100"
                                height="100"
                                viewBox="0,0,256,256"
                            >
                                <defs>
                                    <linearGradient
                                        x1="3.879"
                                        y1="3.879"
                                        x2="20.121"
                                        y2="20.121"
                                        gradientUnits="userSpaceOnUse"
                                        id="color-1_Ki9c1nedn2pV_gr1"
                                    >
                                        <stop
                                            offset="0"
                                            stop-color="#6a03b4"
                                            stop-opacity="0.81176"
                                        ></stop>
                                        <stop
                                            offset="1"
                                            stop-color="#ffffff"
                                            stop-opacity="0.30196"
                                        ></stop>
                                    </linearGradient>
                                    <linearGradient
                                        x1="3.879"
                                        y1="3.879"
                                        x2="20.121"
                                        y2="20.121"
                                        gradientUnits="userSpaceOnUse"
                                        id="color-2_Ki9c1nedn2pV_gr2"
                                    >
                                        <stop
                                            offset="0"
                                            stop-color="#6a03b4"
                                            stop-opacity="0.81176"
                                        ></stop>
                                        <stop
                                            offset="0.493"
                                            stop-color="#ffffff"
                                            stop-opacity="0"
                                        ></stop>
                                        <stop
                                            offset="0.997"
                                            stop-color="#ffffff"
                                            stop-opacity="0.30196"
                                        ></stop>
                                    </linearGradient>
                                    <linearGradient
                                        x1="15.586"
                                        y1="6.586"
                                        x2="18.414"
                                        y2="9.414"
                                        gradientUnits="userSpaceOnUse"
                                        id="color-3_Ki9c1nedn2pV_gr3"
                                    >
                                        <stop
                                            offset="0"
                                            stop-color="#ffffff"
                                            stop-opacity="0.70196"
                                        ></stop>
                                        <stop
                                            offset="0.519"
                                            stop-color="#ffffff"
                                            stop-opacity="0.45098"
                                        ></stop>
                                        <stop
                                            offset="1"
                                            stop-color="#ffffff"
                                            stop-opacity="0.54902"
                                        ></stop>
                                    </linearGradient>
                                    <linearGradient
                                        x1="6.292"
                                        y1="9.961"
                                        x2="16.373"
                                        y2="20.042"
                                        gradientUnits="userSpaceOnUse"
                                        id="color-4_Ki9c1nedn2pV_gr4"
                                    >
                                        <stop
                                            offset="0"
                                            stop-color="#ffffff"
                                            stop-opacity="0.70196"
                                        ></stop>
                                        <stop
                                            offset="0.519"
                                            stop-color="#ffffff"
                                            stop-opacity="0.45098"
                                        ></stop>
                                        <stop
                                            offset="1"
                                            stop-color="#ffffff"
                                            stop-opacity="0.54902"
                                        ></stop>
                                    </linearGradient>
                                </defs>
                                <g
                                    fill="none"
                                    fill-rule="nonzero"
                                    stroke="none"
                                    stroke-width="1"
                                    stroke-linecap="butt"
                                    stroke-linejoin="miter"
                                    stroke-miterlimit="10"
                                    stroke-dasharray=""
                                    stroke-dashoffset="0"
                                    font-family="none"
                                    font-weight="none"
                                    font-size="none"
                                    text-anchor="none"
                                >
                                    <g transform="scale(10.66667,10.66667)">
                                        <path
                                            d="M19,20h-14c-1.657,0 -3,-1.343 -3,-3v-10c0,-1.657 1.343,-3 3,-3h14c1.657,0 3,1.343 3,3v10c0,1.657 -1.343,3 -3,3z"
                                            fill="url(#color-1_Ki9c1nedn2pV_gr1)"
                                        ></path>
                                        <path
                                            d="M19,4.5c1.379,0 2.5,1.121 2.5,2.5v10c0,1.378 -1.121,2.5 -2.5,2.5h-14c-1.379,0 -2.5,-1.122 -2.5,-2.5v-10c0,-1.379 1.121,-2.5 2.5,-2.5h14M19,4h-14c-1.657,0 -3,1.343 -3,3v10c0,1.657 1.343,3 3,3h14c1.657,0 3,-1.343 3,-3v-10c0,-1.657 -1.343,-3 -3,-3z"
                                            fill="url(#color-2_Ki9c1nedn2pV_gr2)"
                                        ></path>
                                        <circle
                                            cx="17"
                                            cy="8"
                                            r="2"
                                            fill="url(#color-3_Ki9c1nedn2pV_gr3)"
                                        ></circle>
                                        <path
                                            d="M4,16c0,0.548 0.448,1 1,1h14c0.552,0 1,-0.444 1,-1c0,-1.364 -1.688,-3 -2.5,-3c-0.812,0 -1.548,1 -3.5,1c-2.442,0 -4,-5 -6,-5c-2,0 -4,4.362 -4,7z"
                                            fill="url(#color-4_Ki9c1nedn2pV_gr4)"
                                        ></path>
                                    </g>
                                </g>
                            </svg>
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
                        <div className="item danger">
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

                <div className="settings-footer">
                    <p> &copy; Adidas 2025</p>
                </div>
            </div>
        </div>
    );
}
