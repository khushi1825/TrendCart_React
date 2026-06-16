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

  const handleAddForVote = () => {
    addVotingPost(product);
    const friendsList = JSON.parse(localStorage.getItem('trendcart_friends') || '[]');
    
    if (friendsList.length === 0) {
      alert('❌ No friends added. Go to Friends page first!');
      return;
    }
    
    const votingLink = `${window.location.origin}/vote`;
    
    const messageTemplate = (friendName) => {
      return `👗 Hi ${friendName}!\n\n${product.name} has been added for voting on TrendCart!\n\n💰 Price: ${formatPrice(product.price)}\n\n🔗 Vote here: ${votingLink}\n\nVote options: 👍 Like | 👎 Dislike | 🌟 Excellent\n\n- TrendCart 🌸`;
    };
    
    let openedCount = 0;
    
    friendsList.forEach(friend => {
      let number = friend.mobile.replace(/\D/g, '');
      if (number.length === 10) number = '91' + number;
      
      const message = messageTemplate(friend.name);
      const whatsappUrl = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
      
      window.open(whatsappUrl, '_blank');
      openedCount++;
    });
    
    alert(`📢 "${product.name}" added for voting!\n\n📱 WhatsApp opened for ${openedCount} friend(s).\n\n👉 Click "Send" on each WhatsApp tab!`);
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