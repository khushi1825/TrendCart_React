import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart, searchTerm, setSearchTerm } = useAppContext(); // ← Removed wishlist
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
    <nav style={{ 
      backgroundColor: '#ffffff', 
      padding: '1rem 2rem',
      borderBottom: '1px solid #f0f0f0',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* Logo */}
        <Link to="/" style={{ 
          fontSize: '1.6rem', 
          fontWeight: '600', 
          color: '#e91e63',
          textDecoration: 'none',
          letterSpacing: '-0.5px'
        }}>
          TRENDCART<span style={{ fontSize: '0.8rem', fontWeight: '400', color: '#999' }}>·women</span>
        </Link>
        
        {/* Navigation Links */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '2rem',
          flexWrap: 'wrap'
        }}>
          <Link to="/" style={{ color: '#333', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500' }}>Home</Link>
          <Link to="/shop" style={{ color: '#333', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500' }}>Shop</Link>
          <Link to="/about" style={{ color: '#333', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500' }}>About Us</Link>
          <Link to="/contact" style={{ color: '#333', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500' }}>Contact Us</Link>
          
          {/* Friends and Vote links - only when logged in */}
          {user && (
            <>
              <Link to="/friends" style={{ color: '#333', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500' }}>👥 Friends</Link>
              <Link to="/vote" style={{ color: '#333', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500' }}>🗳️ Vote</Link>
            </>
          )}
          
          {/* Search Bar - only on shop page */}
          {isShopPage && (
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                placeholder="Search styles..." 
                value={searchTerm}
                onChange={handleSearch}
                style={{ 
                  padding: '0.5rem 1rem 0.5rem 2.5rem', 
                  borderRadius: '30px', 
                  border: '1px solid #e0e0e0', 
                  outline: 'none', 
                  width: '220px',
                  fontSize: '0.9rem',
                  backgroundColor: '#f9f9f9'
                }}
              />
              <span style={{ 
                position: 'absolute', 
                left: '12px', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: '#999',
                fontSize: '0.9rem'
              }}>🔍</span>
            </div>
          )}
          
          {/* User Section */}
          {user ? (
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  padding: '6px 12px',
                  borderRadius: '30px',
                  backgroundColor: showDropdown ? '#f5f5f5' : 'transparent',
                  transition: 'all 0.2s'
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>👤</span>
                <span style={{ fontSize: '0.85rem', color: '#333' }}>{user.name?.split(' ')[0]}</span>
                <span style={{ fontSize: '0.7rem', color: '#999' }}>▼</span>
              </button>
              
              {showDropdown && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: '45px',
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                  minWidth: '200px',
                  zIndex: 100,
                  overflow: 'hidden',
                  border: '1px solid #f0f0f0'
                }}>
                  <Link 
                    to="/wishlist" 
                    onClick={() => setShowDropdown(false)} 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 18px',
                      color: '#333',
                      textDecoration: 'none',
                      borderBottom: '1px solid #f5f5f5',
                      fontSize: '0.9rem',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#fafafa'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#fff'}
                  >
                    <span style={{ fontSize: '1.1rem' }}>❤️</span> My Wishlist
                  </Link>
                  <Link 
                    to="/account" 
                    onClick={() => setShowDropdown(false)} 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 18px',
                      color: '#333',
                      textDecoration: 'none',
                      borderBottom: '1px solid #f5f5f5',
                      fontSize: '0.9rem'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#fafafa'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#fff'}
                  >
                    <span style={{ fontSize: '1.1rem' }}>👤</span> Account
                  </Link>
                  <Link 
                    to="/orders" 
                    onClick={() => setShowDropdown(false)} 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 18px',
                      color: '#333',
                      textDecoration: 'none',
                      borderBottom: '1px solid #f5f5f5',
                      fontSize: '0.9rem'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#fafafa'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#fff'}
                  >
                    <span style={{ fontSize: '1.1rem' }}>📦</span> Orders
                  </Link>
                  <button 
                    onClick={handleLogout} 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      width: '100%',
                      padding: '12px 18px',
                      background: 'none',
                      border: 'none',
                      color: '#e91e63',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: '0.9rem'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#fafafa'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#fff'}
                  >
                    <span style={{ fontSize: '1.1rem' }}>🚪</span> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/login" style={{ color: '#333', textDecoration: 'none', fontSize: '0.95rem' }}>Login</Link>
              <Link to="/signup" style={{ color: '#e91e63', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500' }}>Signup</Link>
            </div>
          )}
          
          {/* Cart Icon */}
          <Link to="/cart" style={{ color: '#333', position: 'relative', textDecoration: 'none', fontSize: '1.2rem' }}>
            🛒
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-12px',
                backgroundColor: '#e91e63',
                color: 'white',
                borderRadius: '50%',
                padding: '2px 6px',
                fontSize: '0.7rem',
                minWidth: '18px',
                textAlign: 'center'
              }}>
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;