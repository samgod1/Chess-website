import { useDroppable } from "@dnd-kit/react";

const Square = ({
    squareColor,
    file,
    rank,
    handleSquareClick,
    selectedPiece,
}) => {
    const { ref } = useDroppable({
        id: file + rank,
    });

    return (
        <div
            className={"square " + squareColor}
            id={file + rank}
            onClick={handleSquareClick}
            key={file + rank}
            ref={ref}
        ></div>
    );
};

export default Square;
