import { useState, useEffect, useContext } from "react";

import "./Sidebar.css";
import { VisionContext } from "../../../../contexts";
import { SidebarHeader, SidebarBody } from "./components";
import {
    ColorMenu,
    TimeMenu,
    Progress,
} from "../Sidebar/components/SidebarBody/components/index";

const Sidebar = () => {
    const { hasStarted } = useContext(VisionContext);

    // useEffect(() => {
    //     //Reset
    //     if (hasStarted) {
    //         setIsColorMenuOpen(false);
    //         setIsTimeMenuOpen(false);
    //         setScore(0);
    //         setAttempts([]);
    //     }
    // }, [hasStarted]);

    return (
        <div className="sidebar">
            <SidebarHeader />
            <SidebarBody />
        </div>
    );
};

export default Sidebar;
