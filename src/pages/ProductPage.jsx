import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductPage = ({ match }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product details from an API or use static data
    axios.get(`/api/products/${match.params.id}`).then(response => {
      setProduct(response.data);
    });
  }, [match.params.id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating}</p>
      <p>Discount: {product.discount}%</p>
      <p>Availability: {product.availability ? 'In Stock' : 'Out of Stock'}</p>
    </div>
  );
};

export default ProductPage;
