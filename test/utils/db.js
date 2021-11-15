import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      dbName: process.env.MONGODB_DB
    });
  } catch (err) {
    throw err;
  }
};

export default connectDB;
