import { formatINR } from '../utils/currency';
import React from 'react';
import { useAppContext } from '../context/AppContext';

const ProductCard = ({ product }) => {
  const { addToCart, addToWishlist, wishlist, addVotingPost } = useAppContext();
  const isWishlisted = wishlist.some(item => item.id === product.id);

  // Price converter (avoid import issues)
  const formatPrice = (usdPrice) => {
    const inr = Math.round(usdPrice * 83);
    return `₹${inr.toLocaleString('en-IN')}`;
  };

  const handleAddForVote = async () => {
  const newPost = addVotingPost(product);
  const friendsList = JSON.parse(localStorage.getItem('trendcart_friends') || '[]');
  
  if (friendsList.length === 0) {
    alert('❌ No friends added. Go to Friends page first!');
    return;
  }
  
  const votingLink = `${window.location.origin}/vote`;
  
  // Create a single WhatsApp message
  let allFriendsMessage = "👗 *TrendCart Voting Alert!*\n\n";
  allFriendsMessage += `*${product.name}* has been added for voting!\n\n`;
  allFriendsMessage += `💰 Price: ${formatINR(product.price)}\n\n`;
  allFriendsMessage += `🔗 Vote here: ${votingLink}\n\n`;
  allFriendsMessage += `Vote options: 👍 Like | 👎 Dislike | 🌟 Excellent\n\n`;
  allFriendsMessage += `- TrendCart 🌸\n\n`;
  allFriendsMessage += `*Friends to vote:*\n`;
  
  friendsList.forEach(friend => {
    allFriendsMessage += `📱 ${friend.name} (${friend.mobile})\n`;
  });
  
  // Create WhatsApp group link? No, better to create a shareable text
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(allFriendsMessage)}`;
  
  // Open WhatsApp with the message (user will select whom to send)
  window.open(whatsappUrl, '_blank');
  
  alert(`📢 "${product.name}" added for voting!\n\n📱 WhatsApp opened with message.\n\n👉 You need to:\n1. Select your friends from WhatsApp contacts\n2. Click Send to notify them!`);
};

  // Button styles
  const btnPrimaryStyle = {
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    fontWeight: '500',
    transition: 'all 0.2s',
    cursor: 'pointer',
    backgroundColor: '#f5f5f5',
    color: '#333',
    border: 'none'
  };

  const btnOutlineStyle = {
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    fontWeight: '500',
    transition: 'all 0.2s',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    color: '#333',
    border: '1px solid #ddd'
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">{formatPrice(product.price)}</p>
        <div className="product-actions">
          <button 
            onClick={() => addToCart(product)} 
            style={btnPrimaryStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e91e63';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f5f5f5';
              e.currentTarget.style.color = '#333';
            }}
          >
            Add to Cart
          </button>
          
          <button 
            onClick={() => addToWishlist(product)} 
            style={btnOutlineStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#e91e63';
              e.currentTarget.style.color = '#e91e63';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#ddd';
              e.currentTarget.style.color = '#333';
            }}
          >
            {isWishlisted ? '❤️ Added' : '🤍 Wishlist'}
          </button>
          
          <button 
            onClick={handleAddForVote} 
            style={btnOutlineStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#e91e63';
              e.currentTarget.style.color = '#e91e63';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#ddd';
              e.currentTarget.style.color = '#333';
            }}
          >
            🗳️ Add for Vote
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;