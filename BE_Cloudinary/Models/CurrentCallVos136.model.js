import mongoose from "mongoose";

const CurrentCallVos136Schema = new mongoose.Schema(
    {
        nameTime: String,
        length: Number,
        groupByMappingGW: [
            {
                callerGatewayId: String,
                count: Number
            }
        ]
    },
    { timestamps: true }
)

const CurrentCallVos136Model = mongoose.model("currentCallVos136", CurrentCallVos136Schema, "currentCallVos136");

export default CurrentCallVos136Model;
