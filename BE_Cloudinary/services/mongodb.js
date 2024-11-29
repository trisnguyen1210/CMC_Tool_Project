import mongoose from "mongoose";

export const connectToMongoDB = async () => {
    const mongodbURL = "mongodb://localhost:27017/tool";

    try {
        const connection = await mongoose.connect(mongodbURL, {
            connectTimeoutMS: 10000,
            socketTimeoutMS: 10000,
            waitQueueTimeoutMS: 10000, 
        });
        console.log(`Mongoose is connect at ${connection.connection.host}`);
    } catch (error) {
        console.log("error.message", error);
    }
};
