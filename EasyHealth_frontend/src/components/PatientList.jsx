import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('easyhealth_user'));
    const token = user?.token;

    axios.get('http://localhost:5000/api/patients', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
    .then(res => setPatients(res.data))
    .catch(err => {
      setError('Failed to load patients');
      console.error(err);
    });
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <ul>
      {patients.map((p) => (
        <li key={p._id}>{p.name}</li>
      ))}
    </ul>
  );
}