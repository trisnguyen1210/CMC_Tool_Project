import mongoose from "mongoose";

const MaxCCVosSchema = new mongoose.Schema(
    {
        nameTime: String,
        maxData: [{
            name: String,
            count: Number,
            snapTime: String,
        }],
        server: String
    },
    { timestamps: true }
)

const MaxCCVosModel = mongoose.model("maxCCVos", MaxCCVosSchema, "maxCCVos");

export default MaxCCVosModel;
