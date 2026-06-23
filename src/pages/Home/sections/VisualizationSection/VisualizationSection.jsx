import "./VisualizationSection.css";
import { Thought } from "../../../../components/index.js";

const VisualizationSection = () => {
    return (
        <section className="visualization-section">
            <Thought move="e4" id="thought1" />
            <div className="img-container">
                <img
                    src="/images/visualization-person.png"
                    alt="visualization-person"
                />
            </div>
        </section>
    );
};

export default VisualizationSection;
