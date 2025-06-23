// src/components/PatientDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState('');

  const user = JSON.parse(localStorage.getItem('easyhealth_user'));

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/patients/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user?.token}`,
          },
        });
        if (!res.ok) throw new Error('Failed to fetch patient');
        const data = await res.json();
        setPatient(data);
      } catch (err) {
        console.error(err);
        setError('Patient not found or access denied.');
      }
    };

    fetchPatient();
  }, [id]);

  if (error) return <p className={styles.error}>{error}</p>;
  if (!patient) return <p>Loading...</p>;

  return (
    <div className={styles.card} style={{ maxWidth: '600px', margin: '40px auto' }}>
      <h2 className={styles.subtitle}>Patient Details</h2>
      <p><strong>Name:</strong> {patient.name}</p>
      <p><strong>Age:</strong> {patient.age}</p>
      <p><strong>Gender:</strong> {patient.gender}</p>
      <p><strong>Condition:</strong> {patient.condition}</p>
      <button onClick={() => navigate(-1)} className={styles.primaryBtn} style={{ marginTop: '20px' }}>← Back</button>
    </div>
  );
};

export default PatientDetails;
