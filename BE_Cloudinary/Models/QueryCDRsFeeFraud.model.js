import mongoose from "mongoose";

const feeFraudCDRsSchema = new mongoose.Schema(
    {
        nameFile: String,
        data: Array,
    },
    { timestamps: true }
);
const feeFraudCDRsModel = mongoose.model("feeFraudCDRs", feeFraudCDRsSchema, "feeFraudCDRs");

export default feeFraudCDRsModel;
