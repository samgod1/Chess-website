import { useContext } from "react";

import "./SidebarBody.css";
import { VisionContext } from "../../../../../../contexts";
import { Progress, Options, Info } from "./components";

const SidebarBody = () => {
    const {
        attempts,
        setAttempts,
        hasStarted,
        setHasStarted,
        score,
        setScore,
        hasCountdownCompleted,
        setHasCountdownCompleted,
        time,
        setTime,
    } = useContext(VisionContext);

    return (
        <div className="sidebar-body">
            <Info />
            <div className="attempts-container">
                <div className="attempts">
                    {attempts.map(({ square, isCorrect }, i) => {
                        return isCorrect ? (
                            <div className="square correct" key={i}>
                                {square}
                            </div>
                        ) : (
                            <div className="square incorrect" key={i}>
                                {square}
                            </div>
                        );
                    })}
                </div>
            </div>
            {hasStarted ? <Progress /> : <Options />}
        </div>
    );
};

export default SidebarBody;
