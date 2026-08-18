import { useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

import "./Puzzles.css";
import PuzzlesChessboard from "./components/PuzzlesChessboard/PuzzlesChessboard";
import PuzzlesSidebar from "./components/PuzzlesSidebar/PuzzlesSidebar";
import { UserContext, VisionContext, PuzzlesContext } from "../../contexts";

const Puzzles = () => {
    const navigate = useNavigate();

    const { user, loading } = useContext(UserContext);

    useEffect(() => {
        if (!loading && !user) {
            navigate("/signup");
            toast.error("You have to signup / login first");
        }
    }, [loading]);

    return (
        <div className="puzzles-page">
            <PuzzlesChessboard />
            <PuzzlesSidebar />
        </div>
    );
};

export default Puzzles;
