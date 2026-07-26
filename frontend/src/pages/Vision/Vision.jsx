import "./Vision.css";
import { Chessboard } from "../../components/index.js";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import VisionContextProvider from "../../contexts/VisionContext.jsx";

const Vision = () => {
    return (
        <VisionContextProvider>
            <div className="vision-page">
                <Chessboard />
                <Sidebar />
            </div>
        </VisionContextProvider>
    );
};

export default Vision;
