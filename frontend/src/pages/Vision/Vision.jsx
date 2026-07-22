import "./Vision.css";
import { Chessboard } from "../../components/index.js";

const Vision = () => {
    return (
        <div className="vision-page">
            <Chessboard />
            <div className="sidebar">
                <div className="sidebar-header">
                    <img
                        src="/images/vision.png"
                        alt="vision"
                        width={40}
                        height={40}
                    />
                    <p>Vision</p>
                </div>
                <div className="sidebar-body">
                    <div className="moves">
                        <span className="move correct">d4</span>
                        <span className="move incorrect">d4</span>
                        <span className="move incorrect">d4</span>
                    </div>
                    <div className="options">
                        <div className="show-coordinates">
                            <input type="checkbox" />
                            <span>Show coordinates</span>
                        </div>
                        <div className="button-container">
                            <button className="time">
                                <img
                                    src="/images/time.png"
                                    alt="time"
                                    width={20}
                                    height={20}
                                />
                                <span>Time</span>
                            </button>
                            <button className="color">
                                <img
                                    src="/images/color.png"
                                    alt="pawn"
                                    width={20}
                                    height={20}
                                />
                                <span>Color</span>
                            </button>
                        </div>
                    </div>
                    <button className="start">Start</button>
                </div>
            </div>
        </div>
    );
};

export default Vision;
