require('dotenv').config();


const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const patientRoutes = require('./routes/patients');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use('/api/patients', patientRoutes);

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => app.listen(5000, () => console.log('✅ Server running on http://localhost:5000')))
.catch(err => console.error('❌ MongoDB connection error:', err));
const authRoutes = require('./routes/auth'); // ✅ add this if missing
app.use('/api', authRoutes);                // ✅ this enables /api/login
