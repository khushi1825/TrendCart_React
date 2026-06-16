import React from 'react';
import { Link } from 'react-router-dom';

const Orders = () => {
  return (
    <div
      className="container"
      style={{
        textAlign: 'center',
        padding: '3rem'
      }}
    >
      <h2>📦 Your Orders</h2>

      <p>You haven't placed any orders yet.</p>

      <Link
        to="/shop"
        className="btn btn-primary"
        style={{
          display: 'inline-block',
          marginTop: '20px'
        }}
      >
        Start Shopping
      </Link>
    </div>
  );
};

export default Orders;