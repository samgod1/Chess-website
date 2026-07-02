import { useParams } from "react-router";

import "./WatchCourse.css";

const WatchCourse = () => {
    const { courseId } = useParams();

    return (
        <div className="watch-course">
            <iframe
                src={`https://www.youtube.com/embed/${courseId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen={true}
            ></iframe>
        </div>
    );
};

export default WatchCourse;
