import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

function Layout() {
    return (
        <>
            <header className="sticky top-0 z-[7000]">
                <Navbar />
            </header>
            <main>
                <Outlet />
            </main>

            <Footer />
        </>
    );
}

export default Layout;
