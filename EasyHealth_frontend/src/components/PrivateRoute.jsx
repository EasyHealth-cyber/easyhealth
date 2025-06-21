import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function PrivateRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('easyhealth_user'));
  const token = user?.token;

  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    const decoded = jwtDecode(token);

    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp < now) {
      localStorage.removeItem('easyhealth_user');
      return <Navigate to="/" replace />;
    }

    return children;
  } catch (err) {
    console.error('Token decode error:', err);
    localStorage.removeItem('easyhealth_user');
    return <Navigate to="/" replace />;
  }
}
