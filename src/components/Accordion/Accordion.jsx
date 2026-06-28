import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import "./Accordion.css";

const Accordion = ({ text, image }) => {
    const [isOpen, setIsOpen] = useState(false);

    const hiddenInnerRef = useRef(null);
    const downArrowRef = useRef(null);

    useGSAP(() => {
        if (isOpen) {
            gsap.to(hiddenInnerRef.current, {
                height: "auto",
            });
            gsap.to(
                downArrowRef.current,
                {
                    rotate: 180,
                },
                "<",
            );
        } else {
            gsap.to(hiddenInnerRef.current, {
                height: 0,
            });
            gsap.to(downArrowRef.current, {
                rotate: 0,
            });
        }
    }, [isOpen]);

    return (
        <div className="accordion">
            <div
                className="card"
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
            >
                <div className="difficulty">
                    <img src={image} alt="medal" width={32} height={32} />
                    <p>{text}</p>
                </div>
                <img
                    src="images/down-arrow.png"
                    alt="down-arrow"
                    width={32}
                    height={32}
                    className="down-arrow"
                    ref={downArrowRef}
                />
            </div>
            <div className="hidden-inner" ref={hiddenInnerRef}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
                adipisci in eos qui labore molestiae unde aliquid nemo
                perferendis illo animi similique laborum maiores, tempore vitae
                ea omnis deserunt ipsam?
            </div>
        </div>
    );
};

export default Accordion;
