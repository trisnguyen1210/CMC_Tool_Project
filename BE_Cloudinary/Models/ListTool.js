import mongoose, { Schema } from "mongoose";

const ListToolsSchema = new Schema(
    {
        nameTool: String,
        slug: String,
        influenceLevel: Number,
        componentEffect: [
            {
                type: [String],
                default: [],
            },
        ],
        authorizeUser: {
            type: [String],
            default: []
        },
        createdBy: String,
        description: String
    },
    { timestamps: true }
);

const ListToolsModel = mongoose.model(
    "listTools",
    ListToolsSchema,
    "listTools"
);
export default ListToolsModel;
