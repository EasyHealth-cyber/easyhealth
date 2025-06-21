// src/components/Sidebar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.css';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('easyhealth_user');
    navigate('/');
  };

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <h2 className={styles.logo}>EasyHealth</h2>
      <nav className={styles.nav}>
        <button onClick={() => { navigate('/dashboard'); onClose(); }} className={styles.navLink}>Dashboard</button>
        <button onClick={() => { navigate('/patients'); onClose(); }} className={styles.navLink}>Patients</button>
        <button onClick={() => { navigate('/settings'); onClose(); }} className={styles.navLink}>Settings</button>
        <button onClick={() => { handleLogout(); onClose(); }} className={styles.logoutBtn}>Logout</button>
      </nav>
    </aside>
  );
};

export default Sidebar;
