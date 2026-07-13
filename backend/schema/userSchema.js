import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: "String",
            required: function () {
                return !this.guestAcc;
            },
        },
        password: {
            type: "String",
            required: function () {
                return !this.guestAcc;
            },
        },
        username: {
            type: "String",
            required: true,
        },
        guestAcc: {
            type: "Boolean",
            required: true,
        },
    },
    { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
