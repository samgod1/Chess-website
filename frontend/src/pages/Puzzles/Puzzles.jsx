import "./Puzzles.css";
import { Chessboard } from "../../components";
import PuzzlesSidebar from "./components/PuzzlesSidebar/PuzzlesSidebar";

const Puzzles = () => {
    return (
        <div className="puzzles-page">
            <Chessboard />
            <PuzzlesSidebar />
        </div>
    );
};

export default Puzzles;
