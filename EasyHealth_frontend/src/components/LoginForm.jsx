// src/components/LoginForm.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.message || 'Login failed');
        return;
      }

      const data = await res.json();
      localStorage.setItem('easyhealth_user', JSON.stringify({
        ...data.user,
        token: data.token,
      }));
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f4f4f4'
    }}>
      <div className={styles.container} style={{
        background: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <img src="/logo.png" alt="EasyHealth Logo" style={{ height: '80px' }} />
        </div>

        <h2 className={styles.title}>Login</h2>
        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
          </div>

          <button type="submit" className={styles.button}>Login</button>
        </form>

        <div className={styles.linkContainer}>
          <p>
            Don’t have an account?{' '}
            <span className={styles.link} onClick={() => navigate('/register')}>Register</span>
          </p>
        </div>
      </div>
    </div>
  );
}
