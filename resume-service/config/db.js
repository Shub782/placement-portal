const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ Resume Service DB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Resume Service DB Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;