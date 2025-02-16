const mongoose = require("mongoose");


const MONGO_URI = "mongodb+srv://melophilemusics:ZTjDE0Twwf50ZjoJ@cluster0.gxqa4.mongodb.net/ringtoneDown?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
    try {
      await mongoose.connect(MONGO_URI);
      console.log("MongoDB connected ra dei!");
    } catch (error) {
      console.error("Error da , utradha manga adiche aganum", error);
      process.exit(1); // Exit the process if DB connection fails
    }
}; 
 
module.exports = connectDB;