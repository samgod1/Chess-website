import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/chess-website");
        console.log("Connected to db");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export default connectDB;
