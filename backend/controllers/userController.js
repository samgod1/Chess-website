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

export default getUser;
