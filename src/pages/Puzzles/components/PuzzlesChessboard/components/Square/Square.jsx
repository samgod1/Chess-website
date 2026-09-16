import { useDroppable } from "@dnd-kit/react";

const Square = ({ squareColor, file, rank, handleSquareClick }) => {
    const { ref } = useDroppable({
        id: file + rank,
    });

    return (
        <div
            className={"square " + squareColor}
            id={file + rank}
            onClick={handleSquareClick}
            ref={ref}
        ></div>
    );
};

export default Square;
