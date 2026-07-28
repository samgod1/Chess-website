import "./Vision.css";
import { Chessboard } from "../../components/index.js";
import VisionSidebar from "./components/VisionSidebar/VisionSidebar.jsx";

const Vision = () => {
    return (
        <div className="vision-page">
            <Chessboard />
            <VisionSidebar />
        </div>
    );
};

export default Vision;
