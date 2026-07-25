import { useEffect, useState } from "react";

import "./Vision.css";
import { Chessboard } from "../../components/index.js";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import VisionContextProvider from "../../contexts/VisionContext.jsx";

const Vision = () => {
    const [color, setColor] = useState("white");

    return (
        <VisionContextProvider>
            <div className="vision-page">
                <Chessboard color={color} />
                <Sidebar />
            </div>
        </VisionContextProvider>
    );
};

export default Vision;
