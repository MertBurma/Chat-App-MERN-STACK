import mongoose from "mongoose";
const connectToMongoDb = async() =>  {
    try{
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected Mongo DB")
    } catch(error) {
        console.log("Error MonsgoDB",error.message)
    }
};
export default connectToMongoDb;