import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../schema/userSchema.js";
import generateToken from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { email, password, username } = req.body;

        if ((!email, !password, !username)) {
            return res
                .status(400)
                .json({ message: "Please fill out all the fields" });
        }

        if (!email.includes("@")) {
            return res
                .status(400)
                .json({ message: "Email must contain @ symbol" });
        }

        if (password.length <= 6) {
            return res.status(400).json({
                message: "Password should be greater than 6 characters",
            });
        }

        if (username.length < 3) {
            return res.status(400).json({
                message: "Username must be greater than 2 characters",
            });
        }

        if (username.length > 12) {
            return res.status(400).json({
                message: "Username cannot be greater than 12 characters",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            email,
            password: hashedPassword,
            username,
            guestAcc: false,
        });

        const jwt = generateToken(user._id);

        return res
            .status(201)
            .json({ message: "Signup successful", token: jwt });
    } catch (error) {
        console.log(error);
        return res.status(500).json("Error during signup");
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if ((!email, !password)) {
            return res
                .status(400)
                .json({ message: "Please fill out all the fields" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res
                .status(401)
                .json({ message: "Either email or password is invalid" });
        }

        const isCorrect = await bcrypt.compare(password, user.password);

        if (!isCorrect) {
            return res
                .status(401)
                .json({ message: "Either email or password is invalid" });
        }

        const jwt = generateToken(user._id);

        return res
            .status(200)
            .json({ message: "Login successful", token: jwt });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error during signup" });
    }
};

export const guest = async (req, res) => {
    try {
        const guestUser = await User.create({
            username: "Guest",
            guestAcc: true,
        });

        const jwt = generateToken(guestUser._id);

        return res
            .status(201)
            .json({ message: "Login as guest successful", token: jwt });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error during login as guest" });
    }
};
