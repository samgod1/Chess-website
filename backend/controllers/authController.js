import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../schema/userSchema.js";

export const Signup = async (req, res) => {
    try {
        const { email, password, username } = req.body;

        if ((!email, !password, !username)) {
            return res
                .status(401)
                .json({ message: "Please fill out all the fields" });
        }

        if (!email.includes("@")) {
            return res
                .status(401)
                .json({ message: "Email must contain @ symbol" });
        }

        if (password.length <= 6) {
            return res.status(401).json({
                message: "Password should be greater than 6 characters",
            });
        }

        if (username.length < 3) {
            return res.status(401).json({
                message: "Username should be greater than 2 characters",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            email,
            password: hashedPassword,
            username,
        });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.cookie("jwt", jwt, {
            httpOnly: true,
            sameSite: "none",
            maxAge: 604800000,
        });

        return res.status(200).json({ message: "endpoint reached" });
    } catch (error) {
        console.log(error);
        return res.status(500).json("Error during signup");
    }
};

export const Login = async (req, res) => {
    return;
};

export const Logout = async (req, res) => {
    return;
};
