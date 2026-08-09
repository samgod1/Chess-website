import { useState, useRef, useEffect, useContext } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLocation } from "react-router";

import "./Chessboard.css";
import { VisionContext, ChessboardContext } from "../../contexts";
import Coords from "./components/Coords.jsx/Coords";

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
        chessboardRef,
        chessboardContainerRef,
        calculateChessboardWidth,
        chessboardWidth,
        squareWidth,
        displayCorrectPiece,
        destinationSquares,
        captureSquares,
        movePiece,
        capturePiece,
        handlePieceClick,
        handleSquareClick,
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

                {/* Mapping out pieces through fen */}
                {mode == "puzzles" &&
                    fen
                        .split(" ")[0]
                        .split("/")
                        .map((row, i) => {
                            // Looping through the rows
                            let squareIndex = 0;
                            return row.split("").map((piece, j) => {
                                // Mapping the pieces in the row

                                //Testing if the fen character is a number with regex
                                const isNumber = /^[0-9]+$/.test(piece);

                                if (!isNumber) {
                                    // squareIndex for skipping squares where there are no pieces
                                    squareIndex += 1;

                                    let xCoord =
                                        squareWidth * (squareIndex - 1);
                                    let yCoord = squareWidth * i;

                                    return (
                                        <div
                                            className="piece"
                                            style={{
                                                transform: `translate(${xCoord}px, ${yCoord}px)`,
                                            }}
                                            // Finding which square the piece
                                            squareid={`${files[squareIndex - 1]}${ranks[7 - i]}`}
                                            piece={piece}
                                            key={j}
                                            onClick={handlePieceClick}
                                        >
                                            {displayCorrectPiece(piece)}
                                        </div>
                                    );
                                } else {
                                    squareIndex += Number(piece);
                                    return;
                                }
                            });
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
                                onClick={movePiece}
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
                            onClick={capturePiece}
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
