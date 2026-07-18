import { Outlet } from "react-router";
import { useContext } from "react";

import { Loading, Navbar } from "../components/index.js";
import { UserContext } from "../contexts/UserContext.jsx";

const RootLayout = () => {
    const { loading } = useContext(UserContext);
    if (loading) {
        return <Loading />;
    }
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
};

export default RootLayout;
