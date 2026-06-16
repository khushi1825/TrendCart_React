import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import MyAccount from './pages/MyAccount';
import AddFriends from './pages/AddFriends';
import Vote from './pages/Vote';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Orders from './pages/Orders';
import './index.css';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="container">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* Protected routes */}
      <Route path="/shop" element={<ProtectedRoute><Shop /></ProtectedRoute>} />
      <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
      <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
      <Route path="/contact" element={<ProtectedRoute><ContactUs /></ProtectedRoute>} />
      <Route path="/about" element={<ProtectedRoute><AboutUs /></ProtectedRoute>} />
      <Route path="/account" element={<ProtectedRoute><MyAccount /></ProtectedRoute>} />
      <Route path="/friends" element={<ProtectedRoute><AddFriends /></ProtectedRoute>} />
      <Route path="/vote" element={<ProtectedRoute><Vote /></ProtectedRoute>} />
      <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <Navbar />
          <AppRoutes />
          <footer>
            <p>&copy; 2026 TrendCart | Style that speaks volumes ✨</p>
          </footer>
        </AppProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;