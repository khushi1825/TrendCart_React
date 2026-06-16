import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (session stored)
    const storedUser = localStorage.getItem('trendcart_current_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signup = (email, password, name) => {
    // Get existing users or create empty object
    const users = JSON.parse(localStorage.getItem('trendcart_users') || '{}');
    if (users[email]) {
      throw new Error('User already exists with this email');
    }
    // Create new user
    const userId = Date.now().toString();
    const newUser = { id: userId, email, name, password }; // In real app, hash password
    users[email] = newUser;
    localStorage.setItem('trendcart_users', JSON.stringify(users));
    // Auto login after signup
    localStorage.setItem('trendcart_current_user', JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  const login = (emailOrName, password) => {
  const users = JSON.parse(localStorage.getItem('trendcart_users') || '{}');
  // Check if input matches email OR name
  let user = null;
  for (let key in users) {
    if (users[key].email === emailOrName || users[key].name === emailOrName) {
      user = users[key];
      break;
    }
  }
  if (!user || user.password !== password) {
    throw new Error('Invalid email/username or password');
  }
  localStorage.setItem('trendcart_current_user', JSON.stringify(user));
  setUser(user);
  return user;
};

  const logout = () => {
    localStorage.removeItem('trendcart_current_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);