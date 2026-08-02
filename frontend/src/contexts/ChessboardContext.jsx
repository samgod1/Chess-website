import { useState, useRef, createContext, useEffect } from "react";

export const ChessboardContext = createContext();

const ChessboardContextProvider = ({ children }) => {
    const [color, setColor] = useState("white");
    const [files, setFiles] = useState([
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
    ]);
    const [ranks, setRanks] = useState([
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
    ]);
    const [fen, setFen] = useState("8/8/8/8/2R5/8/8/8 w - - 0 1");
    const [selectedSquare, setSelectedSquare] = useState(null);
    const [chessboardWidth, setChessboardWidth] = useState(0);
    const [squareWidth, setSquareWidth] = useState(0);
    const [destinationSquares, setDestinationSquares] = useState([]);

    const chessboardRef = useRef(null);
    const chessboardContainerRef = useRef(null);
    const selectedPieceRef = useRef(null);

    function calculateChessboardWidth() {
        let chessboardContainerWidth =
            chessboardContainerRef.current.offsetWidth;

        while (chessboardContainerWidth % 4 != 0) {
            chessboardContainerWidth -= 1;
        }

        chessboardRef.current.style.width = `${chessboardContainerWidth}px`;
        chessboardRef.current.style.height = `${chessboardContainerWidth}px`;

        setChessboardWidth(chessboardContainerWidth);
        setSquareWidth(chessboardContainerWidth / 8);
    }

    function displayCorrectPiece(piece) {
        switch (true) {
            case piece == "p":
                return (
                    <img
                        src={`/images/chess-piece-set/black-pawn.png`}
                        alt={"black-pawn"}
                    />
                );
                break;
            case piece == "n":
                return (
                    <img
                        src={`/images/chess-piece-set/black-knight.png`}
                        alt={"black-knight"}
                    />
                );
                break;
            case piece == "b":
                return (
                    <img
                        src={`/images/chess-piece-set/black-bishop.png`}
                        alt={"black-bishop"}
                    />
                );
                break;
            case piece == "k":
                return (
                    <img
                        src={`/images/chess-piece-set/black-king.png`}
                        alt={"black-king"}
                    />
                );
                break;
            case piece == "q":
                return (
                    <img
                        src={`/images/chess-piece-set/black-queen.png`}
                        alt={"black-queen"}
                    />
                );
                break;
            case piece == "r":
                return (
                    <img
                        src={`/images/chess-piece-set/black-rook.png`}
                        alt={"black-rook"}
                    />
                );
                break;

            case piece == "P":
                return (
                    <img
                        src={`/images/chess-piece-set/white-pawn.png`}
                        alt={"white-pawn"}
                    />
                );
                break;
            case piece == "N":
                return (
                    <img
                        src={`/images/chess-piece-set/white-knight.png`}
                        alt={"black-pawn"}
                    />
                );
                break;
            case piece == "B":
                return (
                    <img
                        src={`/images/chess-piece-set/white-bishop.png`}
                        alt={"white-bishop"}
                    />
                );
                break;
            case piece == "K":
                return (
                    <img
                        src={`/images/chess-piece-set/white-king.png`}
                        alt={"white-king"}
                    />
                );
                break;
            case piece == "Q":
                return (
                    <img
                        src={`/images/chess-piece-set/white-queen.png`}
                        alt={"white-queen"}
                    />
                );
                break;
            case piece == "R":
                return (
                    <img
                        src={`/images/chess-piece-set/white-rook.png`}
                        alt={"white-rook"}
                    />
                );
                break;
        }
    }

    // function handleClick(e) {
    //     const hasClickedOnDestSquare =
    //         e.target.getAttribute("class").split(" ")[0] == "destSquare";

    //     // hasClickedOnSquare is false if a square has a piece on top of it
    //     const hasClickedOnSquare =
    //         e.target.getAttribute("class").split(" ")[0] == "square";

    //     // Nothing happens when user clicks outside the chessboard
    //     if (!pieceSquare && !hasClickedOnSquare && !hasClickedOnDestSquare)
    //         return;

    //     // If user clicks on a square element
    //     if (hasClickedOnSquare) {
    //         setSelectedSquare(null);
    //         setDestinationSquares([]);
    //     }

    //     if (hasClickedOnDestSquare) {
    //     }
    // }

    function handlePieceClick(e) {
        const pieceSquare = e.target.getAttribute("squareid");
        selectedPieceRef.current = e.target;

        if (selectedSquare == pieceSquare) {
            resetSquares();
            return;
        }

        setSelectedSquare(pieceSquare);
    }

    function handleSquareClick(e) {
        resetSquares();
    }

    function movePiece(e) {
        //Moves the piece
        const destination = e.target.style.transform;
        selectedPieceRef.current.style.transform = destination;

        const square = e.target.getAttribute("squareid");
        selectedPieceRef.current.setAttribute("squareid", square);

        resetSquares();
    }

    function resetSquares() {
        setDestinationSquares([]);
        setSelectedSquare(null);
        selectedPieceRef.current = null;
    }

    function createDestSquares() {
        const file = selectedSquare.split("")[0];
        const rank = selectedSquare.split("")[1];

        const updatedDestinationSquares = [];

        // For rook (Later add switch case for all pieces)
        for (let i = 0; i <= 7; i++) {
            if (i != files.indexOf(file)) {
                updatedDestinationSquares.push(`${files[i]}${rank}`);
            }
        }

        for (let i = 1; i <= 8; i++) {
            if (i != rank) {
                updatedDestinationSquares.push(`${file}${i}`);
            }
        }

        setDestinationSquares([
            ...destinationSquares,
            ...updatedDestinationSquares,
        ]);
    }

    useEffect(() => {
        if (selectedSquare) {
            createDestSquares();
        }
    }, [selectedSquare]);

    return (
        <ChessboardContext.Provider
            value={{
                color,
                setColor,
                files,
                ranks,
                fen,
                chessboardRef,
                chessboardContainerRef,
                calculateChessboardWidth,
                chessboardWidth,
                squareWidth,
                displayCorrectPiece,
                destinationSquares,
                movePiece,
                handlePieceClick,
                handleSquareClick,
            }}
        >
            {children}
        </ChessboardContext.Provider>
    );
};

export default ChessboardContextProvider;
