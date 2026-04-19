import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Verify from './pages/Verify';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import RequestDetail from './pages/RequestDetail';
import CreateRequest from './pages/CreateRequest';
import Messaging from './pages/Messaging';
import Leaderboard from './pages/Leaderboard';
import AICenter from './pages/AICenter';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/request/:id" element={<RequestDetail />} />
        <Route path="/create-request" element={<CreateRequest />} />
        <Route path="/messaging" element={<Messaging />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/ai-center" element={<AICenter />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
