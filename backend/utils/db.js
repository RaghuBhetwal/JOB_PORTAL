import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected Successfully");
    }

    catch(error){
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); // Exit process with failure code
    }
}

export default connectDB;