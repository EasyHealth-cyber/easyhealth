// EasyHealth_backend/models/Patient.js
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  condition: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
