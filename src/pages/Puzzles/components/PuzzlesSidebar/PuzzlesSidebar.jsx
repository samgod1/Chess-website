import "./PuzzlesSidebar.css";
import PuzzlesSidebarHeader from "./components/PuzzlesSidebarHeader/PuzzlesSidebarHeader";
import PuzzlesSidebarBody from "./components/PuzzlesSidebarBody/PuzzlesSidebarBody";

const PuzzlesSidebar = () => {
    return (
        <div className="puzzles-sidebar">
            <PuzzlesSidebarHeader />
            <PuzzlesSidebarBody />
        </div>
    );
};

export default PuzzlesSidebar;
