const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// GET all patients (any authenticated user)
router.get('/', auth, async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ADD a new patient (admin only)
router.post('/', auth, admin, async (req, res) => {
  const { name, age, gender, condition } = req.body;
  try {
    const newPatient = new Patient({ name, age, gender, condition });
    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add patient' });
  }
});

// EDIT patient by ID (admin only)
router.put('/:id', auth, admin, async (req, res) => {
  try {
    const updated = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
});

// DELETE patient by ID (admin only)
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ message: 'Patient deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
});

module.exports = router;
