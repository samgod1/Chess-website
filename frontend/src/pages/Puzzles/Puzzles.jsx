import { useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

import "./Puzzles.css";
import { Chessboard } from "../../components";
import PuzzlesSidebar from "./components/PuzzlesSidebar/PuzzlesSidebar";
import {
    UserContext,
    ChessboardContext,
    VisionContext,
    PuzzlesContext,
} from "../../contexts";

const Puzzles = () => {
    const navigate = useNavigate();

    const { user, loading } = useContext(UserContext);
    const { setMode } = useContext(ChessboardContext);
    const { color } = useContext(PuzzlesContext);

    useEffect(() => {
        if (!loading && !user) {
            navigate("/signup");
            toast.error("You have to signup / login first");
        }
    }, [loading]);

    useEffect(() => {
        setMode("puzzles");
    }, []);
    return (
        <div className="puzzles-page">
            <Chessboard color={color} />
            <PuzzlesSidebar />
        </div>
    );
};

export default Puzzles;
