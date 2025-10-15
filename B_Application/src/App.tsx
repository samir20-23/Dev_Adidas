// import Page from "./pages/StartPage";
// import Logo from "./components/logo_Comp/Logo";
// import line_loader from "./components/logo_Comp/line_loader";
// import LoginPage from "./pages/auth/LoginPage";
// import RegisterPage from "./pages/auth/RegisterPage";
// import RegisterPage from "./pages/SettingsPage";

import { RouterProvider } from "react-router-dom";
import { router } from "./route/web.tsx";
import "./App.css";
function App() {
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
