import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';

// High-end synchronized color palette
const THEME = {
  bgNavbar: '#ffffff',
  gradientTextStart: '#2c3e50', // Deep Navy
  gradientTextEnd: '#802060',   // Rich Raspberry
  accentPink: '#B53389',        // Vibrant Berry Pink for buttons/badges
  goldHover: '#D4AF37',         // Subtle Gold accent
  textDark: '#2c3e50',          // Slate Navy instead of harsh black
  borderLight: 'rgba(44, 62, 80, 0.06)', 
};

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart, searchTerm, setSearchTerm } = useAppContext(); 
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
      backgroundColor: THEME.bgNavbar, 
      padding: '0.85rem 3rem', // Symmetrical luxury breathing space
      borderBottom: `1px solid ${THEME.borderLight}`,
      boxShadow: '0 4px 20px rgba(44, 62, 80, 0.04)', // Elegant premium drop shadow
      position: 'sticky',
      top: 0,
      zIndex: 1000, // Safe stack depth
      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        
        {/* LOGO - Now using an elegant dual-tone editorial presentation */}
        <Link to="/" style={{ 
          fontSize: '1.75rem', 
          fontWeight: '800', 
          textDecoration: 'none',
          letterSpacing: '1px',
          display: 'flex',
          alignItems: 'baseline',
          gap: '2px'
        }}>
          <span style={{
            background: `linear-gradient(135deg, ${THEME.gradientTextStart}, ${THEME.gradientTextEnd})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            TRENDCART
          </span>
          <span style={{ 
            fontSize: '0.8rem', 
            fontWeight: '600', 
            color: THEME.goldHover, 
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginLeft: '4px'
          }}>
            · women
          </span>
        </Link>
        
        {/* Navigation Links Group */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '2.5rem',
          flexWrap: 'wrap'
        }}>
          
          {/* Main Links Container with custom pseudo-hover tracking */}
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            {[
              { label: 'Home', path: '/' },
              { label: 'Shop', path: '/shop' },
              { label: 'About Us', path: '/about' },
              { label: 'Contact Us', path: '/contact' }
            ].map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  style={{ 
                    color: isActive ? THEME.accentPink : THEME.textDark, 
                    textDecoration: 'none', 
                    fontSize: '0.95rem', 
                    fontWeight: isActive ? '600' : '500',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    paddingBottom: '4px'
                  }}
                  onMouseEnter={(e) => { if(!isActive) e.target.style.color = THEME.accentPink; }}
                  onMouseLeave={(e) => { if(!isActive) e.target.style.color = THEME.textDark; }}
                >
                  {link.label}
                  {/* Subtle clean bottom indicator for active page */}
                  {isActive && (
                    <span style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '20%',
                      width: '60%',
                      height: '2px',
                      background: THEME.accentPink,
                      borderRadius: '2px'
                    }} />
                  )}
                </Link>
              );
            })}

            {/* Authenticated Links (Friends & Vote) */}
            {user && (
              <>
                <Link 
                  to="/friends" 
                  style={{ color: THEME.textDark, textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.target.style.color = THEME.accentPink}
                  onMouseLeave={(e) => e.target.style.color = THEME.textDark}
                >
                  👥 Friends
                </Link>
                <Link 
                  to="/vote" 
                  style={{ color: THEME.textDark, textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.target.style.color = THEME.accentPink}
                  onMouseLeave={(e) => e.target.style.color = THEME.textDark}
                >
                  🗳️ Vote
                </Link>
              </>
            )}
          </div>
          
          {/* Search Bar Block */}
          {isShopPage && (
            <div style={{ position: 'relative', marginLeft: '0.5rem' }}>
              <input 
                type="text" 
                placeholder="Search styles..." 
                value={searchTerm}
                onChange={handleSearch}
                style={{ 
                  padding: '0.6rem 1.2rem 0.6rem 2.8rem', 
                  borderRadius: '30px', 
                  border: '1px solid rgba(44, 62, 80, 0.12)', 
                  outline: 'none', 
                  width: '240px',
                  fontSize: '0.9rem',
                  backgroundColor: '#f8f9fa',
                  transition: 'all 0.3s ease',
                  color: THEME.textDark
                }}
                onFocus={(e) => {
                  e.target.style.backgroundColor = '#ffffff';
                  e.target.style.borderColor = THEME.accentPink;
                  e.target.style.boxShadow = '0 0 0 3px rgba(181, 51, 137, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.backgroundColor = '#f8f9fa';
                  e.target.style.borderColor = 'rgba(44, 62, 80, 0.12)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <span style={{ 
                position: 'absolute', 
                left: '14px', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: '#802060',
                fontSize: '0.95rem',
                opacity: 0.7
              }}>🔍</span>
            </div>
          )}
          
          {/* User Configuration Area */}
          {user ? (
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                style={{ 
                  background: 'none', 
                  border: `1px solid ${showDropdown ? THEME.accentPink : 'rgba(44, 62, 80, 0.15)'}`, 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px',
                  padding: '6px 16px',
                  borderRadius: '30px',
                  backgroundColor: showDropdown ? 'rgba(181, 51, 137, 0.05)' : 'transparent',
                  transition: 'all 0.2s ease',
                  fontWeight: '500'
                }}
              >
                <span style={{ fontSize: '1.1rem' }}>👤</span>
                <span style={{ fontSize: '0.9rem', color: THEME.textDark }}>{user.name?.split(' ')[0]}</span>
                <span style={{ fontSize: '0.65rem', color: showDropdown ? THEME.accentPink : '#999', transition: 'transform 0.2s', transform: showDropdown ? 'rotate(180deg)' : 'none' }}>▼</span>
              </button>
              
              {/* Dropdown Menu Overlay */}
              {showDropdown && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: '50px',
                  backgroundColor: '#fff',
                  borderRadius: '16px',
                  boxShadow: '0 10px 35px rgba(44, 62, 80, 0.12)',
                  minWidth: '220px',
                  zIndex: 1001,
                  overflow: 'hidden',
                  border: `1px solid ${THEME.borderLight}`,
                  animation: 'fadeIn 0.2s ease'
                }}>
                  {[
                    { label: 'My Wishlist', path: '/wishlist', icon: '❤️' },
                    { label: 'Account', path: '/account', icon: '👤' },
                    { label: 'Orders', path: '/orders', icon: '📦' }
                  ].map((item) => (
                    <Link 
                      key={item.path}
                      to={item.path} 
                      onClick={() => setShowDropdown(false)} 
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '14px 20px',
                        color: THEME.textDark,
                        textDecoration: 'none',
                        borderBottom: `1px solid ${THEME.borderLight}`,
                        fontSize: '0.9rem',
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#fdf8fa'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#fff'}
                    >
                      <span style={{ fontSize: '1.1rem' }}>{item.icon}</span> {item.label}
                    </Link>
                  ))}
                  
                  {/* Logout Button inside Dropdown */}
                  <button 
                    onClick={handleLogout} 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      width: '100%',
                      padding: '14px 20px',
                      background: 'none',
                      border: 'none',
                      color: '#c0392b',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#fff5f5'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#fff'}
                  >
                    <span style={{ fontSize: '1.1rem' }}>🚪</span> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Non-Logged In User Interface
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
              <Link to="/login" style={{ 
                color: THEME.textDark, 
                textDecoration: 'none', 
                fontSize: '0.95rem', 
                fontWeight: '500',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.color = THEME.accentPink}
              onMouseLeave={(e) => e.target.style.color = THEME.textDark}
              >
                Login
              </Link>
              <Link to="/signup" style={{ 
                color: '#fff', 
                backgroundColor: THEME.accentPink,
                textDecoration: 'none', 
                fontSize: '0.95rem', 
                fontWeight: '600',
                padding: '8px 20px',
                borderRadius: '30px',
                boxShadow: '0 4px 12px rgba(181, 51, 137, 0.25)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.opacity = '0.9';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = '1';
                e.target.style.transform = 'none';
              }}
              >
                Signup
              </Link>
            </div>
          )}
          
          {/* Cart Icon - Interactive Glassy Rounded Badge Counter */}
          <Link to="/cart" style={{ 
            color: THEME.textDark, 
            position: 'relative', 
            textDecoration: 'none', 
            fontSize: '1.35rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '6px',
            borderRadius: '50%',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.08)'}
          onMouseLeave={(e) => e.target.style.transform = 'none'}
          >
            🛒
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-6px',
                backgroundColor: THEME.accentPink,
                color: 'white',
                borderRadius: '50%',
                padding: '2px 6px',
                fontSize: '0.7rem',
                fontWeight: '700',
                minWidth: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(181, 51, 137, 0.4)',
                border: '1px solid #fff'
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