import { useState } from "react";

import "./CourseCard.css";

const CourseCard = ({ title, desc, thumbnail, link }) => {
    const [isCompleted, setIsCompleted] = useState(false);

    return (
        <div className="course-card">
            <div className="content">
                <img src="/images/thumbnail1.jpg" alt="thumbnail" />
                <div className="text">
                    <h1>{title}</h1>
                    <p>{desc}</p>
                </div>
            </div>
            {isCompleted ? (
                <img
                    src="/images/complete.png"
                    alt="complete"
                    width={40}
                    height={40}
                />
            ) : (
                <img
                    src="/images/incomplete.png"
                    alt="incomplete"
                    width={40}
                    height={40}
                />
            )}
        </div>
    );
};

export default CourseCard;
