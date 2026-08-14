import { useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

import "./Vision.css";
import { Chessboard } from "../../components/index.js";
import VisionSidebar from "./components/VisionSidebar/VisionSidebar.jsx";
import { UserContext, ChessboardContext, VisionContext } from "../../contexts/";

const Vision = () => {
    const navigate = useNavigate();

    const { user, loading } = useContext(UserContext);
    const { setMode } = useContext(ChessboardContext);
    const { color } = useContext(VisionContext);

    useEffect(() => {
        if (!loading && !user) {
            navigate("/signup");
            toast.error("You have to signup / login first");
        }
    }, [loading]);

    useEffect(() => {
        setMode("vision");
    }, []);
    return (
        <div className="vision-page">
            <Chessboard color={color} />
            <VisionSidebar />
        </div>
    );
};

export default Vision;
