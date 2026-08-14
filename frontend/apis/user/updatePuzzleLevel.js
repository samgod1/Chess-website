import toast from "react-hot-toast";

const updatePuzzleLevel = async (puzzleLevel) => {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(
            import.meta.env.VITE_BACKEND_URL + "/api/user/puzzleLevel",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ puzzleLevel: puzzleLevel }),
            },
        );
    } catch (error) {
        toast.error(error.message);
    }
};

export default updatePuzzleLevel;
