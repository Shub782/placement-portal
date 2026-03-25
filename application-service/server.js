const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const applicationRoutes = require('./routes/applicationRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/applications', applicationRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', service: 'Application Service' });
});

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
  console.log(`✅ Application Service running on port ${PORT}`);
});