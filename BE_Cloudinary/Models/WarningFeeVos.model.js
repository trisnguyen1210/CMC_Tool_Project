import mongoose from "mongoose";

const WarningFeeVosSchema = new mongoose.Schema(
    {
        ipServer: String,
        idAccount: Number,
        account: String,
        lastupdatetime: Number,
        money: Number,
        validtime: Number,
        limitmoney: Number,
        locktype: Number,
        percent: Number,
        statusWarning: String,
    },
    { timestamps: true }
);

const WarningFeeVosModel = mongoose.model("warningFeeVos", WarningFeeVosSchema, "warningFeeVos");

export default WarningFeeVosModel;
