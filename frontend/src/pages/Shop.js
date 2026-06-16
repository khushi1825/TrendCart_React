import React from 'react';
import ProductCard from '../components/ProductCard';
import { useAppContext } from '../context/AppContext';

const Shop = () => {
  const { products, searchTerm } = useAppContext();
  
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1 style={{ margin: '2rem 0 1rem' }}>Shop New Arrivals</h1>
      {filteredProducts.length === 0 ? (
        <p>No products match your search.</p>
      ) : (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;