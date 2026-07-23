import "./Progress.css";

const Progress = ({ score }) => {
    return (
        <div className="progress">
            <div className="score">{score}</div>
            <div className="time-display">
                <img src="/images/time-dark.png" alt="time" />
                <span>00:30</span>
            </div>
        </div>
    );
};

export default Progress;
