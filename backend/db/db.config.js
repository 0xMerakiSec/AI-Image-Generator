import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `successfully connected to the host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB service :: connectDB Error :: ", error);
  }
};

export default connectDB;
