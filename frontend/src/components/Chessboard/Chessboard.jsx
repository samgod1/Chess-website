import { useState, useRef, useEffect, useContext, Fragment } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLocation } from "react-router";

import "./Chessboard.css";
import { VisionContext, ChessboardContext } from "../../contexts";
import Coords from "./components/Coords.jsx/Coords";
import { pieceImages } from "../../constants";

const Chessboard = () => {
    const {
        hasStarted,
        setHasStarted,
        attempts,
        setAttempts,
        setScore,
        hasCountdownCompleted,
        setHasCountdownCompleted,
        randomSquare,
        setRandomSquare,
        isCoordinates,
        countdown,
        setCountdown,
        countdownInterval,
        correctAudioRef,
        incorrectAudioRef,
        countdownAudioRef,
        startAudioRef,
        checkUserInput,
    } = useContext(VisionContext);

    const {
        mode,
        color,
        files,
        ranks,
        fen,
        pieces,
        chessboardRef,
        chessboardContainerRef,
        calculateChessboardWidth,
        chessboardWidth,
        squareWidth,
        displayCorrectPiece,
        destinationSquares,
        captureSquares,
        selectedPiece,
        movePiece,
        capturePiece,
        handlePieceClick,
        handleSquareClick,
        moveOpponentPiece,
        hasPlacedPieces,
        setHasPlacedPieces,
    } = useContext(ChessboardContext);

    const { pathname } = useLocation();

    function handleSuddenPageChange() {
        setHasStarted(false);
        setAttempts([]);
        setScore(0);
        clearInterval(countdownInterval.current);
        setHasCountdownCompleted(false);
    }

    useEffect(() => {
        // To prevent any bugs if user decides to visit other page during vision practice
        if (pathname != "/vision" && hasStarted) {
            handleSuddenPageChange();
        }
    }, [pathname]);

    useEffect(() => {
        calculateChessboardWidth();
    }, []);

    useEffect(() => {
        if (pieces.length > 0) {
            setHasPlacedPieces(true);
        }
    }, [pieces]);

    return (
        <div className="chessboard-container" ref={chessboardContainerRef}>
            {hasStarted && !hasCountdownCompleted && (
                <div className="display">{countdown}</div>
            )}
            {hasStarted && hasCountdownCompleted && (
                <div className="display">{randomSquare}</div>
            )}
            <div className={`chessboard ${color}`} ref={chessboardRef}>
                {/* Ranks and Files */}
                {ranks.map((rank, i) => {
                    //Alternating ranks
                    return i % 2 == 0 ? (
                        <div className="rank" key={i}>
                            {files.map((file, i) => {
                                //Alternating squares
                                return i % 2 == 0 ? (
                                    <div
                                        className="square dark"
                                        id={file + rank}
                                        onClick={
                                            mode == "vision"
                                                ? checkUserInput
                                                : handleSquareClick
                                        }
                                        key={i}
                                    ></div>
                                ) : (
                                    <div
                                        className="square light"
                                        id={file + rank}
                                        onClick={
                                            mode == "vision"
                                                ? checkUserInput
                                                : handleSquareClick
                                        }
                                        key={i}
                                    ></div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="rank" key={i}>
                            {files.map((file, i) => {
                                // Alternating squares
                                return (i + 1) % 2 == 0 ? (
                                    <div
                                        className="square dark"
                                        id={file + rank}
                                        onClick={
                                            mode == "vision"
                                                ? checkUserInput
                                                : handleSquareClick
                                        }
                                        key={i}
                                    ></div>
                                ) : (
                                    <div
                                        className="square light"
                                        id={file + rank}
                                        onClick={
                                            mode == "vision"
                                                ? checkUserInput
                                                : handleSquareClick
                                        }
                                        key={i}
                                    ></div>
                                );
                            })}
                        </div>
                    );
                })}

                {isCoordinates && (
                    <Coords files={files} ranks={ranks} color={color} />
                )}

                {/* Mapping out pieces*/}
                {mode == "puzzles" &&
                    pieces.length > 0 &&
                    squareWidth > 0 &&
                    pieces.map((piece) => {
                        let coordOfFile = files.indexOf(
                            piece.square.split("")[0],
                        );
                        let coordOfRank =
                            7 - ranks.indexOf(piece.square.split("")[1]);

                        let x = coordOfFile * squareWidth;
                        let y = coordOfRank * squareWidth;
                        return (
                            <div
                                key={piece.id}
                                className={
                                    selectedPiece?.id == piece.id
                                        ? "piece selected"
                                        : "piece"
                                }
                                style={{
                                    transform: `translate(${x}px, ${y}px)`,
                                    transition: hasPlacedPieces
                                        ? "transform 0.1s ease-in-out"
                                        : "none",
                                }}
                                onClick={() => {
                                    handlePieceClick(piece);
                                }}
                            >
                                <img
                                    src={`/images/chess-piece-set/${pieceImages[piece.pieceNotation]}`}
                                    alt="piece"
                                />
                            </div>
                        );
                    })}

                {/* Mapping out destination squares */}
                {mode == "puzzles" &&
                    destinationSquares.map((square, i) => {
                        const fileNumber = files.indexOf(square.split("")[0]);
                        const rankNumber = 7 - Number(square.split("")[1] - 1);

                        return (
                            <div
                                className="destSquare"
                                style={{
                                    transform: `translate(${fileNumber * squareWidth}px, ${rankNumber * squareWidth}px)`,
                                }}
                                key={i}
                                squareid={square}
                                onClick={() => {
                                    movePiece(square);
                                }}
                            >
                                <img src="/images/dot.png" alt="dot" />
                            </div>
                        );
                    })}

                {/* Mapping out capture squares */}
                {captureSquares.map((square, i) => {
                    const fileNumber = files.indexOf(square.split("")[0]);
                    const rankNumber = 7 - Number(square.split("")[1] - 1);

                    return (
                        <div
                            className="captureSquare"
                            style={{
                                transform: `translate(${fileNumber * squareWidth}px, ${rankNumber * squareWidth}px)`,
                            }}
                            key={i}
                            squareid={square}
                            onClick={() => {
                                capturePiece(square);
                            }}
                        >
                            <img
                                className="top-left"
                                src="/images/triangle.png"
                            />
                            <img
                                className="top-right"
                                src="/images/triangle.png"
                            />
                            <img
                                className="bottom-left"
                                src="/images/triangle.png"
                            />
                            <img
                                className="bottom-right"
                                src="/images/triangle.png"
                            />
                        </div>
                    );
                })}
            </div>
            <audio src="/sounds/success.mp3" ref={correctAudioRef} />
            <audio src="/sounds/error.mp3" ref={incorrectAudioRef} />
            <audio src="/sounds/countdown.mp3" ref={countdownAudioRef} />
            <audio src="/sounds/start.mp3" ref={startAudioRef} />
        </div>
    );
};

export default Chessboard;
