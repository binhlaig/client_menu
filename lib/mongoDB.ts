import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async () => {
    mongoose.set("strictQuery", true);
    
    if (isConnected) {
        console.log("MongoDB is already connected");
        return;
    }
    try {
        await  mongoose.connect(process.env.MONGODB_URL || "",{
            dbName: "food"
        })
        
    } catch (error: any) {
        console.log("MongoDB connection error:", error.message);
    }
}