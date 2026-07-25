import { useEffect, useRef, useState, useContext } from "react";

import "./Progress.css";
import { VisionContext } from "../../../../../../../../contexts";

const Progress = ({ time, hasCountdownCompleted }) => {
    const [seconds, setSeconds] = useState(time);

    const { hasStarted, setHasStarted, score, isCountdownCompleted } =
        useContext(VisionContext);

    const startTime = useRef(null);
    const finishTime = useRef(null);
    const timerInterval = useRef(null);

    function updateTimer() {
        const remainingTime = finishTime.current - Date.now();
        const timer = Math.floor(remainingTime / 1000);
        setSeconds(String(timer).padStart(2, 0));

        //Stop timer
        if (timer <= 0) {
            clearInterval(timerInterval.current);
            setHasStarted(false);
        }
    }

    useEffect(() => {
        if (hasCountdownCompleted) {
            finishTime.current = Date.now() + time * 1000;
            timerInterval.current = setInterval(updateTimer, 100);
        }
    }, [hasCountdownCompleted]);

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
