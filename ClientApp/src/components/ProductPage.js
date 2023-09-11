import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export function ProductPage() {
  const { categoryId } = useParams(); // Get the categoryId from the URL parameter
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products based on the categoryId
    axios.get(`https://localhost:7263/Products/${categoryId}`).then(function (res) {
      setProducts(res.data);
    });
  }, [categoryId]);

  return (
    <div>
      <h1>Products in Category</h1>
      <h2>Category ID: {categoryId}</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}
