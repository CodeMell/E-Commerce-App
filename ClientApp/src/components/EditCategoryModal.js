import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function EditCategoryModal({
  show,
  handleClose,
  categoryName,
  description,
  handleCategoryNameChange,
  handleDescriptionChange,
  handleEditSubmit,
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <label htmlFor="editCategoryName">Category Name:</label>
          <input
            type="text"
            className="form-control"
            id="editCategoryName"
            name="editCategoryName"
            value={categoryName}
            onChange={handleCategoryNameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="editCategoryDescription">Description:</label>
          <textarea
            className="form-control"
            id="editCategoryDescription"
            name="editCategoryDescription"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleEditSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditCategoryModal;
