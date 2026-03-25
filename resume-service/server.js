const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const resumeRoutes = require('./routes/resumeRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/resume', resumeRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', service: 'Resume Service' });
});

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`✅ Resume Service running on port ${PORT}`);
});