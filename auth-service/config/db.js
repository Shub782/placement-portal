const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ Auth Service DB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Auth Service DB Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;