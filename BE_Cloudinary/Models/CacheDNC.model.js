import mongoose from "mongoose";

const CacheDNCSchema = new mongoose.Schema(
    {
        msisdn: String,
        telco: String,
        shortcode: String,
        info: String,
        info: String,
        mo_time: String,
        cmd_code: String,
        time_receive: Date,
        note: String,
        rn: String,
        processUpdate: String
    },
    { timestamps: true }
)

const CacheDNCModel = mongoose.model("cacheDNC", CacheDNCSchema, "cacheDNC");

export default CacheDNCModel;
