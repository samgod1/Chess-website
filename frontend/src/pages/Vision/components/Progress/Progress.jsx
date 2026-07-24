import { useEffect, useRef, useState } from "react";

import "./Progress.css";

const Progress = ({ score, time, started, setStarted }) => {
    const [seconds, setSeconds] = useState(null);

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
            setStarted(false);
        }
    }

    useEffect(() => {
        finishTime.current = Date.now() + 30 * 1000;
        timerInterval.current = setInterval(updateTimer, 100);
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
