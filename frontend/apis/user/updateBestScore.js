import { useContext } from "react";

import toast from "react-hot-toast";
import { VisionContext } from "../../src/contexts";

const updateBestScore = async (bestScore) => {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(
            import.meta.env.VITE_BACKEND_URL + "/api/user/best",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ bestScore: bestScore }),
            },
        );

        const data = response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }
    } catch (error) {
        toast.error(error?.message);
    }
};

export default updateBestScore;
