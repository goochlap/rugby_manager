import mongoose from 'mongoose';

const connectDB = async () => {
  const connect = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    dbName: process.env.MONGODB_DB
  });

  console.log(`MongoDB connected: ${connect.connection.host}`);
};

export default connectDB;
