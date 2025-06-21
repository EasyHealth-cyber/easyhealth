// src/components/AddPatientForm.jsx
import React, { useState } from 'react';
import styles from './Dashboard.module.css';

const AddPatientForm = ({ onAdd, token }) => {
  const [form, setForm] = useState({ name: '', age: '', gender: '', condition: '' });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [success, setSuccess] = useState('');

  const validate = (field, value) => {
    switch (field) {
      case 'name':
      case 'gender':
      case 'condition':
        if (!value.trim()) return 'This field is required.';
        break;
      case 'age':
        if (!value) return 'Age is required.';
        if (isNaN(value)) return 'Age must be a number.';
        break;
      default:
        return '';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: validate(name, value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(form).forEach((field) => {
      const error = validate(field, form[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const res = await fetch('http://localhost:5000/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Failed to add patient');

      setSuccess('Patient added successfully!');
      setSubmitError('');
      setForm({ name: '', age: '', gender: '', condition: '' });
      onAdd();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Add error:', err);
      setSubmitError('Could not add patient.');
      setSuccess('');
    }
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.subtitle}>Add New Patient</h2>
      {submitError && <p className={styles.error}>{submitError}</p>}
      {success && <p className={styles.success}>{success}</p>}
      <form onSubmit={handleSubmit} className={styles.gridForm}>
        {['name', 'age', 'gender', 'condition'].map((field) => (
          <div key={field} className={styles.fullWidth}>
            <input
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className={`${styles.input} ${styles[field]}`}
            />
            {errors[field] && <small className={styles.error}>{errors[field]}</small>}
          </div>
        ))}
        <div className={styles.fullWidth}>
          <button type="submit" className={styles.primaryBtn}>Add Patient</button>
        </div>
      </form>
    </div>
  );
};

export default AddPatientForm;
