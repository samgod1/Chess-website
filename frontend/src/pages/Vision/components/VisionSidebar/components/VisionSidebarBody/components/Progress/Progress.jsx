import { useEffect, useRef, useState, useContext } from "react";

import "./Progress.css";
import { VisionContext } from "../../../../../../../../contexts";
import updateBestScore from "../../../../../../../../../apis/user/updateBestScore";

const Progress = () => {
    const {
        hasStarted,
        setHasStarted,
        time,
        score,
        hasCountdownCompleted,
        setHasCountdownCompleted,
    } = useContext(VisionContext);

    const [seconds, setSeconds] = useState(time);

    const timerInterval = useRef(null);

    function updateTimer() {
        setSeconds((prev) => prev - 1);
    }

    function endTimer() {
        clearInterval(timerInterval.current);
        setHasStarted(false);
        //Reset countdown completed
        setHasCountdownCompleted(false);
    }

    useEffect(() => {
        if (hasCountdownCompleted) {
            timerInterval.current = setInterval(updateTimer, 1000);
        }
    }, [hasCountdownCompleted]);

    useEffect(() => {
        if (seconds === 0) {
            endTimer();
        }
    }, [seconds]);

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
                <span>00:{String(seconds).padStart(2, 0)}</span>
            </div>
        </div>
    );
};

export default Progress;
