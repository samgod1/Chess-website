import toast from "react-hot-toast";

const updateBestScore = async (bestScore) => {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch("/api/user/best", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ bestScore: bestScore }),
        });

        const data = response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }
    } catch (error) {
        toast.error(error?.message);
    }
};

export default updateBestScore;
