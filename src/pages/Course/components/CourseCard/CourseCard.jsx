import { useNavigate } from "react-router";

import "./CourseCard.css";

const CourseCard = ({ courseId, title, desc, thumbnail, completed }) => {
    const navigate = useNavigate();

    return (
        <div
            className="course-card"
            onClick={() => {
                navigate("/course/" + courseId);
            }}
        >
            <div className="content">
                <img src={thumbnail} alt="thumbnail" />
                <div className="text">
                    <h1>{title}</h1>
                    <p>{desc}</p>
                </div>
            </div>
            {completed ? (
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
