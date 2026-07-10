import { Outlet } from "react-router";

import { Navbar } from "../components/index.js";

const RootLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
};

export default RootLayout;
