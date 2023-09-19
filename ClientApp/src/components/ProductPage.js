import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export function ProductPage() {
  const { categoryId } = useParams(); // Get the categoryId from the URL parameter
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
  });

  useEffect(() => {
    // Fetch products based on the categoryId
    console.log(categoryId);
    axios.get(`https://localhost:7263/Categories/${categoryId}`).then(function (res) {
      setProducts(res.data.products);
    });
  }, [categoryId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('https://localhost:7263/api/Products', {
        categoryId: categoryId, // Include the category ID in the request
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
      });

      // Assuming the response includes the newly created product data,
      // you can update the products state with the new product.
      setProducts([...products, response.data]);

      // Clear the form inputs
      setNewProduct({
        name: '',
        description: '',
        price: '',
      });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`https://localhost:7263/api/Products/${productId}`);

      // Update the products state to remove the deleted product.
      const updatedProducts = products.filter((product) => product.id !== productId);
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  
  const handleEdit = async (productId) => {
    // Implement edit functionality, e.g., open a modal or navigate to an edit page
    console.log(`Edit product with ID ${productId}`);
  };

  return (
    <div>
      <h1>Products in Category {categoryName}</h1>
      <h2>Category ID: {categoryId}</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button onClick={() => handleEdit(product.id)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Add a New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            className="form-control"
            id="productName"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="productDescription">Description:</label>
          <textarea
            className="form-control"
            id="productDescription"
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="productPrice">Price:</label>
          <input
            type="text"
            className="form-control"
            id="productPrice"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Add Product
        </button>
      </form>
    </div>
  );
}
