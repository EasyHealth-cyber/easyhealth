// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import AddPatientForm from './AddPatientForm';
import EditPatientForm from './EditPatientForm';

const Dashboard = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [search, setSearch] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [conditionFilter, setConditionFilter] = useState('');

  const user = JSON.parse(localStorage.getItem('easyhealth_user'));
  const isAdmin = user?.role === 'admin';

  const handleLogout = () => {
    localStorage.removeItem('easyhealth_user');
    navigate('/');
  };

  const fetchPatients = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/patients', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to fetch patients');
      const data = await res.json();
      setPatients(data);
    } catch (err) {
      console.error('Error fetching patients:', err);
      setError('Failed to load patients.');
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>EasyHealth Dashboard</h1>
        <button onClick={handleLogout} className={styles.logout}>Logout</button>
      </div>

      {isAdmin && (
        <AddPatientForm onAdd={fetchPatients} token={user?.token} />
      )}

      <div className={styles.card}>
        <h2 className={styles.subtitle}>Search & Filter</h2>
        <div className={styles.filterGrid}>
          <input
            type="text"
            placeholder="Search by name"
            className={styles.input}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)} className={styles.input}>
            <option value="">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <select value={conditionFilter} onChange={(e) => setConditionFilter(e.target.value)} className={styles.input}>
            <option value="">All Conditions</option>
            {[...new Set(patients.map((p) => p.condition))].map((cond) => (
              <option key={cond} value={cond}>{cond}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.card}>
        <h2 className={styles.subtitle}>Patient List</h2>
        {success && <p className={styles.success}>{success}</p>}
        {error && <p className={styles.error}>{error}</p>}
        <ul className={styles.patientList}>
          {patients
            .filter((p) =>
              p.name.toLowerCase().includes(search.toLowerCase()) &&
              (genderFilter === '' || p.gender.toLowerCase() === genderFilter.toLowerCase()) &&
              (conditionFilter === '' || p.condition === conditionFilter)
            )
            .map((p) => (
              <li key={p._id} className={styles.patientItem}>
                {editingId === p._id ? (
                  <EditPatientForm
                    patient={p}
                    token={user?.token}
                    onCancel={() => setEditingId(null)}
                    onUpdate={() => {
                      setEditingId(null);
                      fetchPatients();
                    }}
                  />
                ) : (
                  <>
                    <p className={styles.patientName}>{p.name}</p>
                    <p className={styles.patientInfo}>
                      <span className={styles.badge}>{p.gender}</span>
                      <span className={styles.badge}>{p.condition}</span>
                      <strong>Age:</strong> {p.age}
                    </p>
                    {isAdmin && (
                      <div className={styles.actionLinks}>
                        <button onClick={() => setEditingId(p._id)} className={styles.linkBtn}>Edit</button>
                        <button
                          onClick={async () => {
                            const confirmed = window.confirm(`Are you sure you want to delete "${p.name}"?`);
                            if (!confirmed) return;

                            try {
                              const res = await fetch(`http://localhost:5000/api/patients/${p._id}`, {
                                method: 'DELETE',
                                headers: { Authorization: `Bearer ${user?.token}` },
                              });
                              if (!res.ok) throw new Error('Delete failed');
                              fetchPatients();
                            } catch (err) {
                              console.error('Delete failed:', err);
                            }
                          }}
                          className={styles.deleteBtn}
                        >Delete</button>
                      </div>
                    )}
                  </>
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
