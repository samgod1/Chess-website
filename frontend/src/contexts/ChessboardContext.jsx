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
    const [fen, setFen] = useState("p7/8/8/8/B7/8/P7/8 b - - 0 1");
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
        let isSwitching = false;
        const clickedSquare = e.target.getAttribute("squareid");
        const piece = e.target.getAttribute("piece");
        const selectedPieceColor =
            piece == piece.toUpperCase() ? "white" : "black";

        // Do nothing if user is trying to select opponent's piece
        if (color != selectedPieceColor) return;

        // For checking if user is switching to another piece was a piece is already selected
        if (selectedSquare && selectedSquare != clickedSquare) {
            isSwitching = true;
            resetSquares(isSwitching);
        }

        // Only setting value of selectedPieceRef after checking for isSwitching
        selectedPieceRef.current = e.target;

        if (selectedSquare == clickedSquare) {
            resetSquares(isSwitching);
            return;
        }

        e.target.style.backgroundColor = "var(--c-highlight)";
        setSelectedSquare(clickedSquare);
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

    function resetSquares(isSwitching) {
        setDestinationSquares([]);
        setSelectedSquare(null);
        if (selectedPieceRef.current)
            selectedPieceRef.current.style.backgroundColor = "";
        if (!isSwitching) selectedPieceRef.current = null;
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
        const directions = [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0],
        ];

        for (let i = 0; i < 4; i++) {
            let coordOfFile = files.indexOf(file);
            let coordOfRank = ranks.indexOf(rank);

            while (true) {
                coordOfFile += directions[i][0];
                coordOfRank += directions[i][1];

                // Stopping the loop if destination square reaches to the edge
                if (
                    coordOfFile < 0 ||
                    coordOfFile > 7 ||
                    coordOfRank < 0 ||
                    coordOfRank > 7
                ) {
                    break;
                }

                const pieceOnDestinationSquare =
                    chessboardRef.current.querySelector(
                        `[squareid = "${files[coordOfFile]}${ranks[coordOfRank]}"]`,
                    );

                // Stopping the loop if destination square reaches on top of other piece
                if (pieceOnDestinationSquare) {
                    break;
                }
                updatedDestinationSquares.push(
                    `${files[coordOfFile]}${ranks[coordOfRank]}`,
                );
            }
        }
    }

    function createBishopDestSquares(file, rank, updatedDestinationSquares) {
        const directions = [
            [1, 1],
            [-1, -1],
            [-1, 1],
            [1, -1],
        ];

        for (let i = 0; i < 4; i++) {
            let coordOfFile = files.indexOf(file);
            let coordOfRank = ranks.indexOf(rank);

            while (true) {
                coordOfFile += directions[i][0];
                coordOfRank += directions[i][1];

                // Stopping the loop if destination square reaches to the edge
                if (
                    coordOfFile < 0 ||
                    coordOfFile > 7 ||
                    coordOfRank < 0 ||
                    coordOfRank > 7
                ) {
                    break;
                }

                const pieceOnDestinationSquare =
                    chessboardRef.current.querySelector(
                        `[squareid = "${files[coordOfFile]}${ranks[coordOfRank]}"]`,
                    );

                // Stopping the loop if destination square reaches on top of other piece
                if (pieceOnDestinationSquare) {
                    break;
                }

                updatedDestinationSquares.push(
                    `${files[coordOfFile]}${ranks[coordOfRank]}`,
                );
            }
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
        let pawnStartingSquares = [];

        const directions = [
            [0, 1],
            [0, 2],
        ];

        for (let i = 0; i < 7; i++) {
            piece == "P"
                ? pawnStartingSquares.push(files[i] + ranks[1])
                : pawnStartingSquares.push(files[i] + ranks[6]);
        }

        let noOfDestSquares = pawnStartingSquares.includes(selectedSquare)
            ? 2
            : 1;

        for (let i = 0; i < noOfDestSquares; i++) {
            let coordOfFile = files.indexOf(file);
            let coordOfRank = ranks.indexOf(rank);

            piece == "P"
                ? (coordOfRank += directions[i][1])
                : (coordOfRank -= directions[i][1]);

            if (coordOfRank < 0 || coordOfRank > 7) break;

            const pieceOnDestinationSquare =
                chessboardRef.current.querySelector(
                    `[squareid = "${files[coordOfFile]}${ranks[coordOfRank]}"]`,
                );

            if (pieceOnDestinationSquare) break;

            updatedDestinationSquare.push(
                piece == "P"
                    ? `${files[coordOfFile]}${ranks[coordOfRank]}`
                    : `${files[coordOfFile]}${ranks[coordOfRank]}`,
            );
        }
    }

    function createKnightDestSquares(file, rank, updatedDestinationSquare) {
        const directions = [
            [2, 1],
            [2, -1],
            [-2, 1],
            [-2, -1],
            [1, 2],
            [-1, 2],
            [1, -2],
            [-1, -2],
        ];

        for (let i = 0; i < 8; i++) {
            let coordOfFile = files.indexOf(file);
            let coordOfRank = ranks.indexOf(rank);

            coordOfFile += directions[i][0];
            coordOfRank -= directions[i][1];

            if (
                coordOfFile < 0 ||
                coordOfFile > 7 ||
                coordOfRank < 0 ||
                coordOfRank > 7
            ) {
                continue;
            }

            const pieceOnDestinationSquare =
                chessboardRef.current.querySelector(
                    `[squareid = "${files[coordOfFile]}${ranks[coordOfRank]}"]`,
                );

            if (pieceOnDestinationSquare) {
                continue;
            }

            updatedDestinationSquare.push(
                `${files[coordOfFile]}${ranks[coordOfRank]}`,
            );
        }
    }

    useEffect(() => {
        if (selectedSquare) {
            createDestSquares();
        }
    }, [selectedSquare]);

    useEffect(() => {
        let startColor = fen.split(" ")[1];
        startColor == "w" ? setColor("white") : setColor("black");
    }, [fen]);

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
