import { useState, useRef, createContext, useEffect } from "react";

export const ChessboardContext = createContext();

const ChessboardContextProvider = ({ children }) => {
    const [mode, setMode] = useState("puzzles");
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
    const [fen, setFen] = useState("8/8/8/8/3B1P2/8/8/8 w - - 0 1");
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

    function handlePieceClick(e) {
        const pieceSquare = e.target.getAttribute("squareid");
        selectedPieceRef.current = e.target;

        if (selectedSquare == pieceSquare) {
            resetSquares();
            return;
        }

        e.target.style.backgroundColor = "var(--c-highlight)";
        setSelectedSquare(pieceSquare);
    }

    function handleSquareClick(e) {
        resetSquares();
    }

    function movePiece(e) {
        //Removes the background color
        selectedPieceRef.current.style.backgroundColor = "";

        //Moves the piece
        const destination = e.target.style.transform;
        selectedPieceRef.current.style.transform = destination;

        //Changes the selected piece squareid attribute
        const square = e.target.getAttribute("squareid");
        selectedPieceRef.current.setAttribute("squareid", square);

        resetSquares();
    }

    function resetSquares() {
        setDestinationSquares([]);
        setSelectedSquare(null);
        if (selectedPieceRef.current)
            selectedPieceRef.current.style.backgroundColor = "";
        selectedPieceRef.current = null;
    }

    function createDestSquares() {
        const file = selectedSquare.split("")[0];
        const rank = selectedSquare.split("")[1];

        let updatedDestinationSquares = [];

        const piece = selectedPieceRef.current.getAttribute("piece");

        switch (piece) {
            case "R":
            case "r":
                // For rook
                createRookDestSquares(file, rank, updatedDestinationSquares);
                break;

            case "B":
            case "b":
                // For bishop
                createBishopDestSquares(file, rank, updatedDestinationSquares);
                break;
            case "Q":
            case "q":
                // For queen
                createQueenDestSquares(file, rank, updatedDestinationSquares);
                break;
            case "K":
            case "k":
                // For king
                createKingDestSquares(file, rank, updatedDestinationSquares);
                break;
            case "P":
            case "p":
                // For pawn
                createPawnDestSquares(
                    file,
                    rank,
                    updatedDestinationSquares,
                    piece,
                );
                break;
            case "N":
            case "n":
                createKnightDestSquares(file, rank, updatedDestinationSquares);
                break;
        }

        setDestinationSquares([
            ...destinationSquares,
            ...updatedDestinationSquares,
        ]);
    }

    function createRookDestSquares(file, rank, updatedDestinationSquares) {
        let coordOfFile = files.indexOf(file);
        let coordOfRank = ranks.indexOf(rank);

        // RIGHT
        while (coordOfFile < 7) {
            coordOfFile += 1;

            // For not generating destination square on top of other pieces
            const pieceOnDestinationSquare =
                chessboardRef.current.querySelector(
                    `[squareid = "${files[coordOfFile]}${rank}"]`,
                );

            // For not generating destination square if another piece comes in between
            if (pieceOnDestinationSquare) {
                break;
            }
            updatedDestinationSquares.push(`${files[coordOfFile]}${rank}`);
        }

        coordOfFile = files.indexOf(file);

        // LEFT
        while (coordOfFile > 0) {
            coordOfFile -= 1;

            // For not generating destination square on top of other pieces
            const pieceOnDestinationSquare =
                chessboardRef.current.querySelector(
                    `[squareid = "${files[coordOfFile]}${rank}"]`,
                );
            if (pieceOnDestinationSquare) {
                break;
            }

            updatedDestinationSquares.push(`${files[coordOfFile]}${rank}`);
        }

        // BOTTOM
        while (coordOfRank > 0) {
            coordOfRank -= 1;

            // For not generating destination square on top of other pieces
            const pieceOnDestinationSquare =
                chessboardRef.current.querySelector(
                    `[squareid = "${file}${ranks[coordOfRank]}"]`,
                );
            if (pieceOnDestinationSquare) {
                break;
            }

            updatedDestinationSquares.push(`${file}${ranks[coordOfRank]}`);
        }

        coordOfRank = ranks.indexOf(rank);

        // TOP
        while (coordOfRank < 7) {
            coordOfRank += 1;

            // For not generating destination square on top of other pieces
            const pieceOnDestinationSquare =
                chessboardRef.current.querySelector(
                    `[squareid = "${file}${ranks[coordOfRank]}"]`,
                );
            if (pieceOnDestinationSquare) {
                break;
            }

            updatedDestinationSquares.push(`${file}${ranks[coordOfRank]}`);
        }
    }

    function createBishopDestSquares(file, rank, updatedDestinationSquares) {
        let coordOfFile = files.indexOf(file);
        let coordOfRank = ranks.indexOf(rank);

        // First diagonal
        while (coordOfFile < 7 && coordOfRank < 7) {
            coordOfFile += 1;
            coordOfRank += 1;

            // For not generating destination square on top of other pieces
            const pieceOnDestinationSquare =
                chessboardRef.current.querySelector(
                    `[squareid = "${files[coordOfFile]}${ranks[coordOfRank]}"]`,
                );

            if (pieceOnDestinationSquare) {
                break;
            }

            updatedDestinationSquares.push(
                `${files[coordOfFile]}${ranks[coordOfRank]}`,
            );
        }

        coordOfFile = files.indexOf(file);
        coordOfRank = ranks.indexOf(rank);

        while (coordOfFile > 0 && coordOfRank > 0) {
            coordOfFile -= 1;
            coordOfRank -= 1;

            // For not generating destination square on top of other pieces
            const pieceOnDestinationSquare =
                chessboardRef.current.querySelector(
                    `[squareid = "${files[coordOfFile]}${ranks[coordOfRank]}"]`,
                );

            if (pieceOnDestinationSquare) {
                break;
            }

            updatedDestinationSquares.push(
                files[coordOfFile] + ranks[coordOfRank],
            );
        }

        coordOfFile = files.indexOf(file);
        coordOfRank = ranks.indexOf(rank);

        // Second diagonal

        while (coordOfFile > 0 && coordOfRank < 7) {
            coordOfFile -= 1;
            coordOfRank += 1;

            // For not generating destination square on top of other pieces
            const pieceOnDestinationSquare =
                chessboardRef.current.querySelector(
                    `[squareid = "${files[coordOfFile]}${ranks[coordOfRank]}"]`,
                );

            if (pieceOnDestinationSquare) {
                break;
            }

            updatedDestinationSquares.push(
                `${files[coordOfFile]}${ranks[coordOfRank]}`,
            );
        }

        coordOfFile = files.indexOf(file);
        coordOfRank = ranks.indexOf(rank);

        while (coordOfFile < 7 && coordOfRank > 0) {
            coordOfFile += 1;
            coordOfRank -= 1;

            // For not generating destination square on top of other pieces
            const pieceOnDestinationSquare =
                chessboardRef.current.querySelector(
                    `[squareid = "${files[coordOfFile]}${ranks[coordOfRank]}"]`,
                );

            if (pieceOnDestinationSquare) {
                break;
            }

            updatedDestinationSquares.push(
                files[coordOfFile] + ranks[coordOfRank],
            );
        }
    }

    function createQueenDestSquares(file, rank, updatedDestinationSquares) {
        createRookDestSquares(file, rank, updatedDestinationSquares);
        createBishopDestSquares(file, rank, updatedDestinationSquares);
    }

    function createKingDestSquares(
        file,
        rank,
        updatedDestinationSquare,
        piece,
    ) {
        const indexOfFile = files.indexOf(file);
        const indexOfRank = ranks.indexOf(rank);

        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                let coordOfFile = files.indexOf(file);
                let coordOfRank = ranks.indexOf(rank);

                coordOfFile += j;
                coordOfRank += i;

                // To prevent unnecessary destination squares when the king is at the edges of the board
                if (
                    coordOfFile >= 0 &&
                    coordOfRank >= 0 &&
                    coordOfFile <= 7 &&
                    coordOfRank <= 7
                ) {
                    // To remove the central destination square
                    if (
                        `${coordOfFile} + ${coordOfRank}` !=
                        `${indexOfFile} + ${indexOfRank}`
                    ) {
                        updatedDestinationSquare.push(
                            `${files[coordOfFile]}${ranks[coordOfRank]}`,
                        );
                    }
                }
            }
        }
    }

    function createPawnDestSquares(
        file,
        rank,
        updatedDestinationSquare,
        piece,
    ) {
        let coordOfFile = files.indexOf(file);
        let coordOfRank = ranks.indexOf(rank);
        let pawnStartingSquares = [];

        if (piece == "P") {
            for (let i = 0; i < 7; i++) {
                pawnStartingSquares.push(files[i] + ranks[1]);
            }
        } else {
            for (let i = 0; i < 7; i++) {
                pawnStartingSquares.push(files[i] + ranks[6]);
            }
        }

        if (pawnStartingSquares.includes(selectedSquare)) {
            for (let i = 1; i <= 2; i++) {
                updatedDestinationSquare.push(
                    piece == "P"
                        ? `${files[coordOfFile]}${ranks[coordOfRank + i]}`
                        : `${files[coordOfFile]}${ranks[coordOfRank - i]}`,
                );
            }
        } else {
            if (
                (coordOfRank != 7 && piece == "P") ||
                (coordOfRank != 0 && piece == "p")
            ) {
                updatedDestinationSquare.push(
                    piece == "P"
                        ? `${files[coordOfFile]}${ranks[coordOfRank + 1]}`
                        : `${files[coordOfFile]}${ranks[coordOfRank - 1]}`,
                );
            }
        }
    }

    function createKnightDestSquares(file, rank, updatedDestinationSquare) {
        let coordOfFile = files.indexOf(file);
        let coordOfRank = ranks.indexOf(rank);

        let tempDestinationSquares = [];

        for (let i = 0; i < 2; i++) {
            // For left and right directions of knight
            for (let j = 0; j < 2; j++) {
                if (i == 0) {
                    if (j == 0) {
                        tempDestinationSquares.push(
                            files[coordOfFile + 2] + ranks[coordOfRank + 1],
                        );
                    }
                    if (j == 1) {
                        tempDestinationSquares.push(
                            files[coordOfFile + 2] + ranks[coordOfRank - 1],
                        );
                    }
                }
                if (i == 1) {
                    if (j == 0) {
                        tempDestinationSquares.push(
                            files[coordOfFile - 2] + ranks[coordOfRank + 1],
                        );
                    }
                    if (j == 1) {
                        tempDestinationSquares.push(
                            files[coordOfFile - 2] + ranks[coordOfRank - 1],
                        );
                    }
                }
            }

            // For top and bottom directions of knight
            for (let j = 0; j < 2; j++) {
                if (i == 0) {
                    if (j == 0) {
                        tempDestinationSquares.push(
                            files[coordOfFile + 1] + ranks[coordOfRank + 2],
                        );
                    }
                    if (j == 1) {
                        tempDestinationSquares.push(
                            files[coordOfFile - 1] + ranks[coordOfRank + 2],
                        );
                    }
                }
                if (i == 1) {
                    if (j == 0) {
                        tempDestinationSquares.push(
                            files[coordOfFile + 1] + ranks[coordOfRank - 2],
                        );
                    }
                    if (j == 1) {
                        tempDestinationSquares.push(
                            files[coordOfFile - 1] + ranks[coordOfRank - 2],
                        );
                    }
                }
            }
        }

        tempDestinationSquares = tempDestinationSquares.filter(
            (square) => square.length == 2,
        );

        updatedDestinationSquare.push(...tempDestinationSquares);
    }

    useEffect(() => {
        if (selectedSquare) {
            createDestSquares();
        }
    }, [selectedSquare]);

    return (
        <ChessboardContext.Provider
            value={{
                mode,
                setMode,
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
