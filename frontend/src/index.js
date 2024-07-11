import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext'; // Import AuthProvider
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { createRoot } from 'react-dom/client'; // Import createRoot from "react-dom/client"

const root = createRoot(document.getElementById('root')); // Use createRoot

root.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
