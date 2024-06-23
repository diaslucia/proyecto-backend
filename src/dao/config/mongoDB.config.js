import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    mongoose.connect(process.env.NODE_ENV);
    console.log("Mongo connected");
  } catch (error) {
    console.log(`${error}`);
  }
};
