// src/components/ProductCard.js
import { formatINR } from '../utils/currency';
import React from 'react';
import { useAppContext } from '../context/AppContext';

const ProductCard = ({ product }) => {
  const { addToCart, addToWishlist, wishlist, addVotingPost } = useAppContext();
  const isWishlisted = wishlist.some(item => item.id === product.id);

const handleAddForVote = async () => {
  const newPost = addVotingPost(product);
  const friendsList = JSON.parse(localStorage.getItem('trendcart_friends') || '[]');
  
  if (friendsList.length === 0) {
    alert('❌ No friends added. Go to Friends page first!');
    return;
  }
  
  const votingLink = `${window.location.origin}/vote`;
  
  // Keep it simple - WhatsApp will show emojis correctly
  let allFriendsMessage = `👗 TrendCart Voting Alert!\n\n`;
  allFriendsMessage += `${product.name} has been added for voting!\n\n`;
  allFriendsMessage += `💰 Price: ${formatINR(product.price)}\n\n`;
  allFriendsMessage += `🔗 Vote here: ${votingLink}\n\n`;
  allFriendsMessage += `👍 Like | 👎 Dislike | 🌟 Excellent\n\n`;
  allFriendsMessage += `- TrendCart 🌸\n\n`;
  
  friendsList.forEach(friend => {
    allFriendsMessage += `📱 ${friend.name} (${friend.mobile})\n`;
  });
  
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(allFriendsMessage)}`;
  window.open(whatsappUrl, '_blank');
  
  alert(`📢 "${product.name}" added for voting!\n\n📱 WhatsApp opened!\n\n👉 Select recipients and send!`);
};

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price"><p className="product-price">{formatINR(product.price)}</p></p>
        <div className="product-actions">
          <button onClick={() => addToCart(product)} className="btn btn-primary btn-sm">Add to Cart</button>
          <button onClick={() => addToWishlist(product)} className="btn btn-outline btn-sm">
            {isWishlisted ? '❤️ Added' : '🤍 Wishlist'}
          </button>
          <button onClick={handleAddForVote} className="btn btn-outline btn-sm">🗳️ Add for Vote</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;