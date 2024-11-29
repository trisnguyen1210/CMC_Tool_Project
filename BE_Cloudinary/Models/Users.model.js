import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        createdBy: String,
        permission: String,
        role: Number,
    },
    { timestamps: true }
);

const UsersModel = mongoose.model("users", UsersSchema, "users");

export default UsersModel;
