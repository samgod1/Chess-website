import "./Coords.css";

const Coords = ({ files, ranks, color }) => {
    return (
        <div className={`coords ${color}`}>
            <div className="files">
                {files.map((file, i) => {
                    //Changing color of text according to color state
                    return color == "white" ? (
                        <div
                            className={
                                (i + 1) % 2 == 0 ? "file dark" : "file light"
                            }
                            key={i}
                        >
                            {file}
                        </div>
                    ) : (
                        <div
                            className={
                                (i + 1) % 2 == 0 ? "file light" : "file dark"
                            }
                            key={i}
                        >
                            {file}
                        </div>
                    );
                })}
            </div>
            <div className="ranks">
                {ranks.map((rank, i) => {
                    //Changing color of text according to color state
                    return color == "white" ? (
                        <div
                            className={
                                (i + 1) % 2 == 0 ? "rank dark" : "rank light"
                            }
                            key={i}
                        >
                            {rank}
                        </div>
                    ) : (
                        <div
                            className={
                                (i + 1) % 2 == 0 ? "rank light" : "rank dark"
                            }
                            key={i}
                        >
                            {rank}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Coords;
