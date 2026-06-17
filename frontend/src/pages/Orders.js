import React from 'react';
import { useAppContext } from '../context/AppContext';
import { formatINR } from '../utils/currency';

const Orders = () => {
  const { orders } = useAppContext();

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '2rem' }}>📦 Your Orders</h2>

      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        orders.map(order => (
          <div
            key={order.id}
            style={{
              background: '#fff',
              padding: '1rem',
              marginBottom: '1.5rem',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <h4>Order ID: {order.id.slice(0, 8)}</h4>

            <p style={{ color: '#666' }}>
              📅 {order.orderedAt}
            </p>

            <hr style={{ margin: '1rem 0' }} />

            {order.items.map(item => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '80px',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                />

                <div>
                  <h4 style={{ margin: 0 }}>
                    {item.name}
                  </h4>

                  <p style={{ margin: '5px 0' }}>
                    Qty: {item.quantity}
                  </p>

                  <p
                    style={{
                      color: '#e91e63',
                      fontWeight: 'bold',
                      margin: 0
                    }}
                  >
                    {formatINR(item.price)}
                  </p>
                </div>
              </div>
            ))}

            <hr />

            <h3
              style={{
                textAlign: 'right',
                color: '#222'
              }}
            >
              Total: {formatINR(order.total)}
            </h3>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;