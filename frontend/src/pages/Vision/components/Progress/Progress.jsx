import { useEffect, useState } from "react";

import "./Progress.css";

const Progress = ({ score, time }) => {
    const [seconds, setSeconds] = useState(null);
    const [running, setRunning] = useState(false);

    let startTime = 0;
    let finishTime = 0;
    let timerInterval = null;

    function startTimer() {
        startTime = Date.now();
        finishTime = Date.now() + 30 * 1000;
        setRunning(true);
    }

    function updateTimer() {
        timerInterval = setInterval(() => {
            const remainingTime = finishTime - Date.now();
            const timer = Math.floor(remainingTime / 1000);
            setSeconds(timer);

            if (timer <= 0) {
                stopTimer();
            }
        }, 100);
    }

    function stopTimer() {
        setRunning(false);
        clearInterval(timerInterval);
    }

    // clearInterval(interval);
    useEffect(() => {
        startTimer();
        updateTimer();
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
