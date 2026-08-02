import { useEffect, useContext } from "react";

import "./Vision.css";
import { Chessboard } from "../../components/index.js";
import VisionSidebar from "./components/VisionSidebar/VisionSidebar.jsx";
import { ChessboardContext } from "../../contexts/";

const Vision = () => {
    const { setMode } = useContext(ChessboardContext);

    useEffect(() => {
        setMode("vision");
    }, []);
    return (
        <div className="vision-page">
            <Chessboard />
            <VisionSidebar />
        </div>
    );
};

export default Vision;
