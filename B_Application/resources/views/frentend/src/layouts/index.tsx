import { Outlet, Link } from "react-router-dom";
import "./css_layouts/main.css";
import Logo from "../components/logo_Comp/Logo";
function Layout() {
    return (
        <div className="layout">
            {/* <header>
                <nav>
                    <ul>
                        <div className="logo">
                            <Link to="/">
                                <div className="h-12 w-auto">
                                    <Logo />
                                </div>
                            </Link>
                        </div>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/settings">Settings</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/Register">Register</Link>
                        </li>
                    </ul>
                </nav>
            </header> */}

            <main className="main">
                <Outlet />
            </main>

            {/* <footer>
                <p>&copy; 2023 My Website</p>
            </footer> */}
        </div>
    );
}

export default Layout;
