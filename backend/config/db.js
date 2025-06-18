const mongoose = require("mongoose");

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI, {});
        console.log("MongoDB connected");
    }catch{
        console.error("Error connecting to mongoDB", err);
    }
};

module.exports = connectDB;