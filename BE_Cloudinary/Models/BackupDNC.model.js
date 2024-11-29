import mongoose from "mongoose";

const BackupDNCSchema = new mongoose.Schema(
    {
        id: Number,
        e164: String,
        memo: String,
        type: String,
        status: String,
    }
)

const BackupDNCModel = mongoose.model("backupDNC", BackupDNCSchema, "backupDNC");

export default BackupDNCModel;
