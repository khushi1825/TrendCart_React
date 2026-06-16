// src/pages/AddFriends.js
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const AddFriends = () => {
  const { friends, addFriend, removeFriend } = useAppContext();
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && mobile.trim()) {
      addFriend(name, mobile);
      setName('');
      setMobile('');
    } else {
      alert('Please enter both name and mobile number');
    }
  };

  return (
    <div className="container">
      <h1 style={{ margin: '2rem 0' }}>👭 My Friends</h1>
      <div className="vote-section">
        <h3>Add New Friend</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Mobile Number</label>
            <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary">Add Friend</button>
        </form>
      </div>

      <h3>Your Friends List ({friends.length})</h3>
      {friends.length === 0 ? (
        <p>No friends added yet. Add friends to get votes on dresses!</p>
      ) : (
        <ul className="friends-list">
          {friends.map(friend => (
            <li key={friend.id} className="friend-item">
              <div>
                <strong>{friend.name}</strong> 📞 {friend.mobile}
              </div>
              <button onClick={() => removeFriend(friend.id)} className="btn btn-outline btn-sm">Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddFriends;