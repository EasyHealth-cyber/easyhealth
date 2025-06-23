import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RegisterForm.module.css';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');

      localStorage.setItem('easyhealth_user', JSON.stringify(data));
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      {/* ✅ Logo on top */}
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img src="/logo.png" alt="EasyHealth Logo" style={{ height: '80px' }} />
      </div>

      <h2 className={styles.title}>Register</h2>

      {error && <p className={styles.error}>{error}</p>}

      <form onSubmit={handleRegister} className={styles.form}>
        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className={styles.input}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className={styles.button}>Sign Up</button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '14px' }}>
        Already have an account?{' '}
        <span
          style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
          onClick={() => navigate('/')}
        >
          Log in here
        </span>
      </p>
    </div>
  );
};

export default RegisterForm;
