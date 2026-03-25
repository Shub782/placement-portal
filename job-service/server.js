const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const jobRoutes = require('./routes/jobRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/jobs', jobRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', service: 'Job Service' });
});

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`✅ Job Service running on port ${PORT}`);
});