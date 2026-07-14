import jwt from "jsonwebtoken";

const protectRoute = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Token not provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.userId = decoded.userId;

        next();
    } catch (error) {
        console.log(error);
        return res
            .status(401)
            .json({ message: "Error during token verification" });
    }
};

export default protectRoute;
