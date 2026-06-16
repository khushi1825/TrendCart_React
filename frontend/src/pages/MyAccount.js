import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const MyAccount = () => {
  const { user } = useAuth();
  const { friends, votingPosts, cart, wishlist } = useAppContext();

  if (!user) return <div className="container">Please login</div>;

  const joinDate = new Date(parseInt(user.id)).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const cartItemCount = cart.reduce((s, i) => s + i.quantity, 0);

  const stats = [
    { icon: '👭', label: 'Friends', value: friends.length, link: '/friends', color: '#e91e63' },
    { icon: '🗳️', label: 'Shared for Vote', value: votingPosts.length, link: '/vote', color: '#ff9800' },
    { icon: '🛒', label: 'Cart Items', value: cartItemCount, link: '/cart', color: '#4caf50' },
    { icon: '❤️', label: 'Wishlist', value: wishlist.length, link: '/wishlist', color: '#f44336' },
  ];

  // Button style - no unused variables
  const buttonStyle = {
    padding: '0.6rem 1.2rem',
    backgroundColor: '#f5f5f5',
    color: '#333',
    borderRadius: '30px',
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'all 0.2s',
    display: 'inline-block'
  };

  return (
    <div className="container" style={{ maxWidth: '1000px', marginTop: '2rem', marginBottom: '3rem' }}>
      
      {/* Welcome Header with Profile Icon */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '20px',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        border: '1px solid #f0f0f0',
        textAlign: 'center'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          backgroundColor: '#FFFAF3',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1rem auto',
          fontSize: '2.5rem',
          color: '#fff'
        }}>
          👤
        </div>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: '#333' }}>
          Welcome back, <span style={{ color: '#e91e63' }}>{user.name}</span>
        </h1>
        <p style={{ color: '#666', marginBottom: '0.5rem' }}>{user.email}</p>
        <p style={{ color: '#999', fontSize: '0.85rem' }}>Member since {joinDate}</p>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {stats.map((stat, index) => (
          <Link to={stat.link} key={index} style={{ textDecoration: 'none' }}>
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '16px',
              padding: '1.5rem',
              textAlign: 'center',
              border: '1px solid #f0f0f0',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: stat.color }}>{stat.value}</div>
              <div style={{ color: '#666', marginTop: '0.25rem' }}>{stat.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions Section */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '16px',
        padding: '1.5rem',
        border: '1px solid #f0f0f0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <h3 style={{ marginBottom: '1rem', color: '#333' }}>Quick Actions</h3>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <Link 
            to="/shop" 
            style={buttonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e91e63';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f5f5f5';
              e.currentTarget.style.color = '#333';
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
            🛍️ Continue Shopping
          </Link>

          <Link 
            to="/friends" 
            style={buttonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e91e63';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f5f5f5';
              e.currentTarget.style.color = '#333';
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
            👥 Manage Friends
          </Link>

          <Link 
            to="/vote" 
            style={buttonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e91e63';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f5f5f5';
              e.currentTarget.style.color = '#333';
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
            🗳️ View Votes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;