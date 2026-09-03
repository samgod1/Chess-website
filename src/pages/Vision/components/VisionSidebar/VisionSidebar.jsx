import { useEffect, useContext } from "react";

import "./VisionSidebar.css";
import { VisionContext } from "../../../../contexts";
import { VisionSidebarHeader, VisionSidebarBody } from "./components";

const Sidebar = () => {
    const { hasStarted, setScore, setAttempts } = useContext(VisionContext);

    useEffect(() => {
        //Reset
        if (hasStarted) {
            setScore(0);
            setAttempts([]);
        }
    }, [hasStarted]);

    return (
        <div className="vision-sidebar">
            <VisionSidebarHeader />
            <VisionSidebarBody />
        </div>
    );
};

export default Sidebar;
