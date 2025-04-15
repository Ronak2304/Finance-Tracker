import mongoose from 'mongoose';

const connectDB = async(req,res) =>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Cconnected")
    } catch (error) {
        console.log("Error in mongodb.js: "+error.message);
    }
}

export default connectDB;