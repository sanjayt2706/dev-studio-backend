const mongoose = require('mongoose');

const connectDB = async (retries = 5, delay = 2000) => {
  for (let i = 1; i <= retries; i++) {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 10000,
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return conn;
    } catch (error) {
      console.error(`MongoDB connection attempt ${i}/${retries} failed: ${error.message}`);
      if (i < retries) {
        console.log(`Retrying in ${delay / 1000}s...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        if (process.env.LOCAL_MONGODB_URI) {
          try {
            console.log('Atlas unreachable, falling back to LOCAL_MONGODB_URI...');
            const localConn = await mongoose.connect(process.env.LOCAL_MONGODB_URI);
            console.log(`MongoDB Connected (Local Fallback): ${localConn.connection.host}`);
            return localConn;
          } catch (localErr) {
            console.error(`Local fallback also failed: ${localErr.message}`);
          }
        }
        process.exit(1);
      }
    }
  }
};

module.exports = connectDB;
