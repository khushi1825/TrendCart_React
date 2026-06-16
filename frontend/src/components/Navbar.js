
import {
  FaHeart,
  FaUser,
  FaBox,
  FaSignOutAlt
} from "react-icons/fa";
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart, wishlist, searchTerm, setSearchTerm } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const isShopPage = location.pathname === '/shop';

  const handleLogout = () => {
    logout();
    navigate('/login');
    setShowDropdown(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <nav className="navbar" style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <div className="nav-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem 2rem', flexWrap: 'wrap' }}>
        <Link to="/" className="logo" style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#e91e63' }}>TRENDCART<span style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>·women</span></Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <Link to="/" style={{ color: '#333', fontWeight: '500' }}>Home</Link>
          <Link to="/shop" style={{ color: '#333', fontWeight: '500' }}>Shop</Link>
          <Link to="/about" style={{ color: '#333', fontWeight: '500' }}>About Us</Link>
          <Link to="/contact" style={{ color: '#333', fontWeight: '500' }}>Contact Us</Link>
          
          {/* Friends and Vote links - only when logged in */}
          {user && (
            <>
              <Link to="/friends" style={{ color: '#333', fontWeight: '500' }}>👥 Friends</Link>
              <Link to="/vote" style={{ color: '#333', fontWeight: '500' }}>🗳️ Vote</Link>
            </>
          )}
          
          {isShopPage && (
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                placeholder="Search styles..." 
                value={searchTerm}
                onChange={handleSearch}
                style={{ padding: '0.4rem 1rem', borderRadius: '30px', border: '1px solid #ddd', outline: 'none', width: '200px' }}
              />
              <span style={{ position: 'absolute', right: '12px', top: '6px', color: '#888' }}>🔍</span>
            </div>
          )}
          
          {user ? (
            <div style={{ position: 'relative' }}>
              <button
  onClick={() => setShowDropdown(!showDropdown)}
  style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "6px 10px",
  }}
>
  <FaUser
    size={18}
    color="#444"
  />

  <span
    style={{
      fontSize: "14px",
      fontWeight: "500",
      color: "#333"
    }}
  >
    {user?.name || user?.username || user}
  </span>

  <span
    style={{
      fontSize: "10px",
      color: "#666"
    }}
  >
    ▼
  </span>
</button>
              {showDropdown && (
                <div style={{ position: 'absolute', right: 0, top: '40px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', minWidth: '180px', zIndex: 100, overflow: 'hidden' }}>
                  <Link
  to="/wishlist"
  onClick={() => setShowDropdown(false)}
  style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', color: '#333', textDecoration: 'none', borderBottom: '1px solid #f0f0f0' }}
>
  <FaHeart size={16} color="#222" />
  My Wishlist
</Link>
                  <Link
  to="/account"
  onClick={() => setShowDropdown(false)}
  style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', color: '#333', textDecoration: 'none', borderBottom: '1px solid #f0f0f0' }}
>
  <FaUser size={16} color="#222" />
  Account
</Link>
                  <Link
  to="/orders"
  onClick={() => setShowDropdown(false)}
  style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', color: '#333', textDecoration: 'none', borderBottom: '1px solid #f0f0f0' }}
>
  <FaBox size={16} color="#222" />
  Orders
</Link>
                  <button
  onClick={handleLogout}
  style={{
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    padding: '10px 16px',
    background: 'none',
    border: 'none',
    color: '#333',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: '1rem'
  }}
>
  <FaSignOutAlt size={16} color="#222" />
  Logout
</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" style={{ color: '#333', fontWeight: '500' }}>Login</Link>
          )}
          
          <Link to="/cart" style={{ color: '#333', position: 'relative', fontSize: '1.2rem' }}>
            🛒 {cartCount > 0 && <span className="badge" style={{ position: 'absolute', top: '-8px', right: '-12px', backgroundColor: '#e91e63', color: 'white', borderRadius: '50%', padding: '2px 6px', fontSize: '0.7rem' }}>{cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;