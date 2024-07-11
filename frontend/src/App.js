import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import NewShipment from './components/NewShipment';
import TrackShipment from './components/TrackShipment';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function AuthenticatedRoute({ element, ...rest }) {
  const { currentUser } = useAuth();
  return currentUser ? element : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/new-shipment" element={<AuthenticatedRoute element={<NewShipment />} />} />
          <Route path="/track-shipment" element={<AuthenticatedRoute element={<TrackShipment />} />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
