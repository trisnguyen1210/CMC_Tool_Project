import mongoose from "mongoose";

const ReceiverMailSchema = new mongoose.Schema(
    {
        reason: String,
        listReceiver: { type: [String], default: [] }
    },
    { timestamps: true }
);

const ReceiverMailModel = mongoose.model("receiverMail", ReceiverMailSchema, "receiverMail");

export default ReceiverMailModel;
