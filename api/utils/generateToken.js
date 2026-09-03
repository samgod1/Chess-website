import jwt from "jsonwebtoken";

const generateToken = (id) => {
    const token = jwt.sign({ userId: id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    return token;
};

export default generateToken;
