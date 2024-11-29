import mongoose, { Schema } from "mongoose";

const ListMonitoringSchema = new Schema(
    {
        nameServer: String,
        IP: String,
        authorityUser: [
            {
                type: Schema.Types.ObjectId,
                ref: "Users",
            },
        ],
        proposer: {
            type: Schema.Types.ObjectId,
            ref: "Users",
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "Users",
        },
    },
    { timestamps: true }
);

const ListMonitoringModel = mongoose.model(
    "listMonitoring",
    ListMonitoringSchema,
    "listMonitoring"
);
export default ListMonitoringModel;
