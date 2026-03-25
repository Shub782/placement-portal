const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'API Gateway' });
});

// ===== PROXY TO AUTH SERVICE =====
app.post('/api/auth/register', async (req, res) => {
  try {
    const response = await axios.post(`${process.env.AUTH_SERVICE_URL}/api/auth/register`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Gateway Error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const response = await axios.post(`${process.env.AUTH_SERVICE_URL}/api/auth/login`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Gateway Error' });
  }
});

app.get('/api/auth/profile', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.AUTH_SERVICE_URL}/api/auth/profile`, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Gateway Error' });
  }
});

app.put('/api/auth/profile', async (req, res) => {
  try {
    const response = await axios.put(`${process.env.AUTH_SERVICE_URL}/api/auth/profile`, req.body, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Gateway Error' });
  }
});

// ===== PROXY TO STUDENT SERVICE =====
app.post('/api/student/profile', async (req, res) => {
  try {
    const response = await axios.post(`${process.env.STUDENT_SERVICE_URL}/api/student/profile`, req.body, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Gateway Error' });
  }
});

app.get('/api/student/profile', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.STUDENT_SERVICE_URL}/api/student/profile`, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Gateway Error' });
  }
});

app.post('/api/student/skills', async (req, res) => {
  try {
    const response = await axios.post(`${process.env.STUDENT_SERVICE_URL}/api/student/skills`, req.body, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Gateway Error' });
  }
});

// ===== PROXY TO JOB SERVICE =====
app.get('/api/jobs', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.JOB_SERVICE_URL}/api/jobs`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Gateway Error' });
  }
});

app.post('/api/jobs', async (req, res) => {
  try {
    const response = await axios.post(`${process.env.JOB_SERVICE_URL}/api/jobs`, req.body, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Gateway Error' });
  }
});

app.get('/api/jobs/:id', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.JOB_SERVICE_URL}/api/jobs/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Gateway Error' });
  }
});

app.put('/api/jobs/:id', async (req, res) => {
  try {
    const response = await axios.put(`${process.env.JOB_SERVICE_URL}/api/jobs/${req.params.id}`, req.body, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Gateway Error' });
  }
});

app.delete('/api/jobs/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${process.env.JOB_SERVICE_URL}/api/jobs/${req.params.id}`, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Gateway Error' });
  }
});

// ===== PROXY TO APPLICATION SERVICE =====
app.post('/api/applications', async (req, res) => {
  try {
    const response = await axios.post(`${process.env.APPLICATION_SERVICE_URL}/api/applications`, req.body, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Gateway Error' });
  }
});

app.get('/api/applications/my-applications', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.APPLICATION_SERVICE_URL}/api/applications/my-applications`, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Gateway Error' });
  }
});

app.get('/api/applications/job/:jobId', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.APPLICATION_SERVICE_URL}/api/applications/job/${req.params.jobId}`, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Gateway Error' });
  }
});

app.put('/api/applications/:id/status', async (req, res) => {
  try {
    const response = await axios.put(`${process.env.APPLICATION_SERVICE_URL}/api/applications/${req.params.id}/status`, req.body, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Gateway Error' });
  }
});

// ===== PROXY TO APPLICATION SERVICE - ANALYZE =====
app.post('/api/applications/:id/analyze', async (req, res) => {
  try {
    const response = await axios.post(`${process.env.APPLICATION_SERVICE_URL}/api/applications/${req.params.id}/analyze`, req.body, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Gateway analyze error:', error.message);
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Gateway Error' });
  }
});

// ===== PROXY TO RESUME SERVICE =====
app.get('/api/resume', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.RESUME_SERVICE_URL}/api/resume`, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Gateway Error' });
  }
});

app.post('/api/resume', async (req, res) => {
  try {
    const response = await axios.post(`${process.env.RESUME_SERVICE_URL}/api/resume`, req.body, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Gateway Error' });
  }
});

app.post('/api/resume/generate-pdf', async (req, res) => {
  try {
    const response = await axios.post(`${process.env.RESUME_SERVICE_URL}/api/resume/generate-pdf`, req.body, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Gateway Error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ API Gateway running on port ${PORT}`);
});