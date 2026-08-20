import { useContext, useEffect } from "react";

import "./VisionSidebarBody.css";
import { VisionContext } from "../../../../../../contexts";
import { Progress, Options, Info } from "./components";

const VisionSidebarBody = () => {
    const { attempts, setAttempts, hasStarted } = useContext(VisionContext);

    return (
        <div className="vision-sidebar-body">
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

export default VisionSidebarBody;
