
import './index.css';

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { HashRouter } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <HashRouter>
  <App />
</HashRouter>
    </AuthProvider>
  </React.StrictMode>
)

// ...


