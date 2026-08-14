import User from "../schema/userSchema.js";

const getUser = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findOne({ _id: userId }).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json("Error during fetching user data");
    }
};

const updateCompleted = async (req, res) => {
    try {
        const userId = req.userId;
        const { completed } = req.body;

        const user = await User.findByIdAndUpdate(userId, {
            completed: completed,
        });

        return res.status(200).json({ message: "Success" });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json("Error during updating completed course data");
    }
};

const updateBestScore = async (req, res) => {
    try {
        const userId = req.userId;
        const { bestScore } = req.body;

        const user = await User.findByIdAndUpdate(userId, {
            bestScore: bestScore,
        });

        return res.status(200).json({ message: "Success" });
    } catch (error) {
        console.log(error);
        return res.status(500).json("Error during updating best score");
    }
};

const updatePuzzleLevel = async (req, res) => {
    try {
        const userId = req.userId;
        const { puzzleLevel } = req.body;

        const user = await User.findByIdAndUpdate(userId, {
            puzzleLevel: puzzleLevel,
        });

        return res.status(200).json({ message: "Success" });
    } catch (error) {
        console.log(error);
        return res.status(500).json("Error during updating best score");
    }
};

export { getUser, updateCompleted, updateBestScore, updatePuzzleLevel };
