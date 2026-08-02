import { useEffect, useRef, useState, useContext } from "react";

import "./Progress.css";
import {
    ChessboardContext,
    VisionContext,
} from "../../../../../../../../contexts";
import updateBestScore from "../../../../../../../../../apis/user/updateBestScore";

const Progress = () => {
    const {
        hasStarted,
        setHasStarted,
        time,
        score,
        hasCountdownCompleted,
        setHasCountdownCompleted,
        checkForNewBest,
    } = useContext(VisionContext);

    const { mode } = useContext(ChessboardContext);
    const [seconds, setSeconds] = useState(time);

    const startTime = useRef(null);
    const finishTime = useRef(null);
    const timerInterval = useRef(null);
    const scoreRef = useRef(0); // For passing value inside updateTimer

    function updateTimer() {
        const remainingTime = finishTime.current - Date.now();
        const timer = Math.floor(remainingTime / 1000);
        setSeconds(String(timer).padStart(2, 0));

        //Stop timer
        if (timer <= 0) {
            endTimer();
        }
    }

    function endTimer() {
        clearInterval(timerInterval.current);
        checkForNewBest(scoreRef);
        setHasStarted(false);
        //Reset countdown completed
        setHasCountdownCompleted(false);
    }

    useEffect(() => {
        if (hasCountdownCompleted) {
            finishTime.current = Date.now() + time * 1000;
            timerInterval.current = setInterval(updateTimer, 1000);
        }
    }, [hasCountdownCompleted]);

    useEffect(() => {
        scoreRef.current = score;
    }, [score]);

    useEffect(() => {
        return () => {
            endTimer();
        };
    }, []);

    return (
        <div className="progress">
            <div className="score">{score}</div>
            <div className="time-display">
                <img src="/images/time-dark.png" alt="time" />
                <span>00:{seconds}</span>
            </div>
        </div>
    );
};

export default Progress;
