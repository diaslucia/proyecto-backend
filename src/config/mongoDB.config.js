import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    mongoose.connect("mongodb+srv://admin:1234@diaslucia.zbby1dz.mongodb.net/");
    console.log("Mongo connected");
  } catch (error) {
    console.log(`${error}`);
  }
};
