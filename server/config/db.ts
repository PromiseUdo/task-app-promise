import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
  try {
    const mongoURI =
      "mongodb+srv://saas-user:Asaas_user123@cluster0.lksjill.mongodb.net/expectask";
    if (!mongoURI) {
      throw new Error("MongoDB URI is not defined.");
    }

    const conn = await mongoose.connect(mongoURI);
    console.log(`Mongo Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
