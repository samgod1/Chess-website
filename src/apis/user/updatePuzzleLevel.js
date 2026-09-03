import toast from "react-hot-toast";

const updatePuzzleLevel = async (puzzleLevel) => {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch("/api/user/puzzleLevel", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ puzzleLevel: puzzleLevel }),
        });

        const data = response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }
    } catch (error) {
        toast.error(error?.message);
    }
};

export default updatePuzzleLevel;
