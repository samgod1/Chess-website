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

// const getCompleted = async (req, res) => {
//     try {
//         const userId = req.userId;

//         const completed = await User.findOne({ _id: userId }).select(
//             "completed",
//         );

//         return res.status(200).json(completed);
//     } catch (error) {
//         return res
//             .status(500)
//             .json("Error during fetching completed course data");
//     }
// };

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
            .json("Error during fetching completed course data");
    }
};

export { getUser, updateCompleted };
