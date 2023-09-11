import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EditCategoryModal from './EditCategoryModal';

export function Home() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');
  const [clickedButton, setClickedButton] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [editCategoryId, setEditCategoryId] = useState(null);

  useEffect(() => {
    axios.get("https://localhost:7263/Categories").then(function (res) {
      const CategoriesArray = res.data.map((category) => (
        <div key={category.id} className="category-item">
          <Link
          className="btn btn-primary"
            to={`/category/${category.id}/${encodeURIComponent(category.name)}`}
          >
            {category.name}
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(category.id)}
          >
            Delete
          </button>
          <button
            className="btn btn-warning"
            onClick={() => handleEdit(category.name, category.id)}
          >
            Edit
          </button>
        </div>
      ));
      setCategories(CategoriesArray);
    });
  }, []);

  const handleButtonClick = (buttonName, categoryId) => {
    setClickedButton(buttonName);
    // You can do something when a category button is clicked here.
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'newCategory') {
      setNewCategory(value);
    } else if (name === 'newCategoryDescription') {
      setNewCategoryDescription(value);
    } else if (name === 'editCategoryName') {
      setEditCategoryName(value);
    }
  };

  const handleEdit = (categoryName, categoryId) => {
    setShowEditModal(true);
    setEditCategoryName(categoryName);
    setEditCategoryId(categoryId);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`https://localhost:7263/Categories/${editCategoryId}`, {
        name: editCategoryName,
        description: newCategoryDescription, // Update the description too.
      });

      // Update the category name in the UI.
      const updatedCategories = categories.map((category) => {
        if (category.key === editCategoryId) {
          return (
            <div key={editCategoryId} className="category-item">
              <button
                className="btn btn-primary"
                onClick={() => handleButtonClick(editCategoryName, editCategoryId)}
              >
                {editCategoryName}
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(editCategoryId)}
              >
                Delete
              </button>
              <button
                className="btn btn-warning"
                onClick={() => handleEdit(editCategoryName, editCategoryId)}
              >
                Edit
              </button>
            </div>
          );
        }
        return category;
      });

      setCategories(updatedCategories);
      setShowEditModal(false);
    } catch (error) {
      console.error('Error editing category:', error);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(`https://localhost:7263/Categories/${categoryId}`);

      // Update the categories state to remove the deleted category.
      const updatedCategories = categories.filter((category) => category.key !== categoryId);
      setCategories(updatedCategories);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:7263/Categories', {
        name: newCategory,
        description: newCategoryDescription,
      });

      // Assuming the response includes the newly created category data,
      // you can update the categories state with the new category.
      const newCategoryItem = (
        <div key={response.data.id} className="category-item">
          <button
            className="btn btn-primary"
            onClick={() => handleButtonClick(response.data.name, response.data.id)}
          >
            {response.data.name}
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(response.data.id)}
          >
            Delete
          </button>
          <button
            className="btn btn-warning"
            onClick={() => handleEdit(response.data.name, response.data.id)}
          >
            Edit
          </button>
        </div>
      );

      setCategories([...categories, newCategoryItem]);
      setNewCategory('');
      setNewCategoryDescription('');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <div>
      <h1>The Sells Store</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="newCategory">New Category:</label>
          <input
            type="text"
            className="form-control"
            id="newCategory"
            name="newCategory"
            value={newCategory}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="newCategoryDescription">Description:</label>
          <textarea
            className="form-control"
            id="newCategoryDescription"
            name="newCategoryDescription"
            value={newCategoryDescription}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Add Category
        </button>
      </form>
      <div className="category-list">{categories}</div>
      <EditCategoryModal
        show={showEditModal}
        handleClose={handleEditModalClose}
        categoryName={editCategoryName}
        description={newCategoryDescription} // Pass the description to the modal.
        handleCategoryNameChange={(e) => setEditCategoryName(e.target.value)}
        handleDescriptionChange={(e) => setNewCategoryDescription(e.target.value)} // Update the description.
        handleEditSubmit={handleEditSubmit}
      />
    </div>
  );
}
