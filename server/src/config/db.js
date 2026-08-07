import mongoose, { connect } from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log(`mongoose connected ${connect.connection.host}`);
  } catch (error) {
    console.log(`Failed to connect`, error.message);
    process.exit(1);
  }
};

export default connectDB;
