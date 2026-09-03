import { useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

import "./Vision.css";
import VisionSidebar from "./components/VisionSidebar/VisionSidebar.jsx";
import VisionChessboard from "./components/VisionChessboard/VisionChessboard.jsx";
import { UserContext, VisionContext } from "../../contexts/";

const Vision = () => {
    const navigate = useNavigate();

    const { user, loading } = useContext(UserContext);

    useEffect(() => {
        if (!loading && !user) {
            navigate("/signup");
            toast.error("You have to signup / login first");
        }
    }, [loading]);

    return (
        <div className="vision-page">
            <VisionChessboard />
            <VisionSidebar />
        </div>
    );
};

export default Vision;
