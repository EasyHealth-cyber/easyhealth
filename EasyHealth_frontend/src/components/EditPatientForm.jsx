// src/components/EditPatientForm.jsx
import React, { useState } from 'react';
import styles from './Dashboard.module.css';

const EditPatientForm = ({ patient, token, onCancel, onUpdate }) => {
  const [form, setForm] = useState({ ...patient });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.age || !form.gender || !form.condition) {
      return alert('All fields must be filled out.');
    }
    if (isNaN(form.age)) {
      return alert('Age must be a number.');
    }

    try {
      const res = await fetch(`http://localhost:5000/api/patients/${form._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Update failed');
      onUpdate();
    } catch (err) {
      console.error('Edit failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.gridForm}>
      <input name="name" value={form.name} onChange={handleChange} className={styles.input} />
      <input name="age" value={form.age} onChange={handleChange} className={styles.input} />
      <input name="gender" value={form.gender} onChange={handleChange} className={styles.input} />
      <input name="condition" value={form.condition} onChange={handleChange} className={styles.input} />
      <div className={styles.editActions}>
        <button type="submit" className={styles.successBtn}>Save</button>
        <button type="button" onClick={onCancel} className={styles.cancelBtn}>Cancel</button>
      </div>
    </form>
  );
};

export default EditPatientForm;
