import React, { createContext, useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from './AuthContext';

const AppContext = createContext();

const initialProducts = [
  { id: '1', name: 'Floral Summer Dress', price: 49.99, image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&h=400&fit=crop', category: 'dress' },
  { id: '2', name: 'Elegant Blazer', price: 89.99, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=400&fit=crop', category: 'jacket' },
  { id: '3', name: 'Casual Denim Jeans', price: 59.99, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=400&fit=crop', category: 'jeans' },
  { id: '4', name: 'Silk Evening Gown', price: 129.99, image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=300&h=400&fit=crop', category: 'dress' },
  //{ id: '5', name: 'Cozy Winter Sweater', price: 69.99, image: 'https://images.unsplash.com/photo-1434389676691-211dd2d1ef1d?w=300&h=400&fit=crop', category: 'sweater' },
  { id: '6', name: 'Leather Handbag', price: 79.99, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=400&fit=crop', category: 'accessory' },
];

const dressImages = [
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&h=400&fit=crop",
  "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=300&h=400&fit=crop",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=300&h=400&fit=crop",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=400&fit=crop"
];

const topImages = [
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=400&fit=crop",
  "https://images.unsplash.com/photo-1434389676691-211dd2d1ef1d?w=300&h=400&fit=crop",
  "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=300&h=400&fit=crop"
];

const skirtImages = [
  "https://images.unsplash.com/photo-1551803091-e20673f15770?w=300&h=400&fit=crop",
  "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=300&h=400&fit=crop",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=400&fit=crop"
];

for (let i = 7; i <= 26; i++) {
  initialProducts.push({
    id: String(i),
    name: `Stylish Dress ${i}`,
    price: 999 + i * 50,
    image: dressImages[i % dressImages.length],
    category: "dress"
  });
}

for (let i = 27; i <= 41; i++) {
  initialProducts.push({
    id: String(i),
    name: `Fashion Top ${i}`,
    price: 699 + i * 30,
    image: topImages[i % topImages.length],
    category: "top"
  });
}

for (let i = 42; i <= 56; i++) {
  initialProducts.push({
    id: String(i),
    name: `Trendy Skirt ${i}`,
    price: 799 + i * 40,
    image: skirtImages[i % skirtImages.length],
    category: "skirt"
  });
}

export const AppProvider = ({ children }) => {
  const { user } = useAuth();
  const [products] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [friends, setFriends] = useState([]);
  const [votingPosts, setVotingPosts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Load user-specific data
  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem(`trendcart_cart_${user.id}`);
      setCart(savedCart ? JSON.parse(savedCart) : []);
      const savedWishlist = localStorage.getItem(`trendcart_wishlist_${user.id}`);
      setWishlist(savedWishlist ? JSON.parse(savedWishlist) : []);
      const savedFriends = localStorage.getItem(`trendcart_friends_${user.id}`);
      setFriends(savedFriends ? JSON.parse(savedFriends) : []);
      const savedPosts = localStorage.getItem(`trendcart_votingPosts_${user.id}`);
      setVotingPosts(savedPosts ? JSON.parse(savedPosts) : []);
      const savedOrders = localStorage.getItem(`trendcart_orders_${user.id}`);
setOrders(savedOrders ? JSON.parse(savedOrders) : []);
    } else {
      setCart([]);
      setWishlist([]);
      setFriends([]);
      setVotingPosts([]);
      setOrders([]);
    }
  }, [user]);

  // Save data
  useEffect(() => {
    if (user) localStorage.setItem(`trendcart_cart_${user.id}`, JSON.stringify(cart));
  }, [cart, user]);
  useEffect(() => {
    if (user) localStorage.setItem(`trendcart_wishlist_${user.id}`, JSON.stringify(wishlist));
  }, [wishlist, user]);
  useEffect(() => {
    if (user) localStorage.setItem(`trendcart_friends_${user.id}`, JSON.stringify(friends));
  }, [friends, user]);
  useEffect(() => {
    if (user) localStorage.setItem(`trendcart_votingPosts_${user.id}`, JSON.stringify(votingPosts));
  }, [votingPosts, user]);

  useEffect(() => {
  if (user)
    localStorage.setItem(
      `trendcart_orders_${user.id}`,
      JSON.stringify(orders)
    );
}, [orders, user]);

  // Cart functions
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  // Wishlist functions
  const addToWishlist = (product) => {
    if (!wishlist.find(item => item.id === product.id)) {
      setWishlist(prev => [...prev, product]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist(prev => prev.filter(item => item.id !== id));
  };

  // Friend functions
  const addFriend = (name, mobile) => {
    const newFriend = { id: uuidv4(), name, mobile };
    setFriends(prev => [...prev, newFriend]);
  };

  const removeFriend = (id) => {
    setFriends(prev => prev.filter(f => f.id !== id));
  };

  // Voting functions
  const addVotingPost = (product) => {
    const newPost = {
      id: uuidv4(),
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      productPrice: product.price,
      addedBy: user?.id || 'unknown',
      timestamp: Date.now(),
      votes: {}
    };
    setVotingPosts(prev => [...prev, newPost]);
    return newPost;
  };

  const removeVotingPost = (postId) => {
    setVotingPosts(prev => prev.filter(post => post.id !== postId));
  };

  const voteOnPost = (postId, friendId, voteValue) => {
    setVotingPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const updatedVotes = { ...post.votes };
        updatedVotes[friendId] = { vote: voteValue, votedAt: Date.now() };
        return { ...post, votes: updatedVotes };
      }
      return post;
    }));
  };

  const getFriendVoteStatus = (postId, friendId) => {
    const post = votingPosts.find(p => p.id === postId);
    return post?.votes[friendId]?.vote || null;
  };

  const getPendingVotesForFriend = (friendId) => {
    return votingPosts.filter(post => !post.votes[friendId]);
  };

  const getVoteCounts = (postId) => {
    const post = votingPosts.find(p => p.id === postId);
    if (!post) return { like: 0, dislike: 0, excellent: 0 };
    const counts = { like: 0, dislike: 0, excellent: 0 };
    Object.values(post.votes).forEach(v => {
      if (v.vote === 'like') counts.like++;
      else if (v.vote === 'dislike') counts.dislike++;
      else if (v.vote === 'excellent') counts.excellent++;
    });
    return counts;
  };

  const placeOrder = () => {
  if (cart.length === 0) return;

  const newOrder = {
    id: uuidv4(),
    items: cart,
    total: cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ),
    orderedAt: new Date().toLocaleString()
  };

  setOrders(prev => [newOrder, ...prev]);
  setCart([]);
};

  return (
    <AppContext.Provider value={{
      products,
      cart,
      wishlist,
      friends,
      votingPosts,
      searchTerm,
      setSearchTerm,
      addToCart,
      removeFromCart,
      updateQuantity,
      addToWishlist,
      removeFromWishlist,
      addFriend,
      removeFriend,
      addVotingPost,
      removeVotingPost,
      voteOnPost,
      getFriendVoteStatus,
      getPendingVotesForFriend,
      getVoteCounts,
      orders,
      placeOrder,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);