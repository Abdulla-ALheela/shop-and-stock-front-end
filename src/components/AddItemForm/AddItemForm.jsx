// src/components/AddItemForm/AddItemForm.jsx

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import * as itemService from '../../services/ItemService';
import "../AddItemForm/AddItemForm.css"
const AddItemForm = () => {
  const { listId } = useParams();
  const navigate = useNavigate();

  const [itemData, setItemData] = useState({
    name: '',
    quantity: '',
    unit: '',
    isPurchased: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await itemService.addItem(listId, itemData);
      navigate(`/lists/${listId}`); // Fixed template literals
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <main className="item-form-main">
    <form onSubmit={handleSubmit}>
      <h1 className="item-form-title">Add Item</h1>
      <label className="item-form-label">Name</label>
        <input
        className="item-form-input"
          type="text"
          value={itemData.name}
          onChange={(e) => setItemData({ ...itemData, name: e.target.value })}
        />
    
      <label className="item-form-label">Quantity</label>
        <input
         className="item-form-input"
          type="number"
          value={itemData.quantity}
          onChange={(e) => setItemData({ ...itemData, quantity: e.target.value })}
        />
   
      <label className="item-form-label">Unit</label>
        <select
         className="item-form-input"
          value={itemData.unit}
          onChange={(e) => setItemData({ ...itemData, unit: e.target.value })}
        >
          <option value="">Select a unit</option>
          <option value="kg">kg</option>
          <option value="g">g</option>
          <option value="liter">liter</option>
          <option value="ml">ml</option>
          <option value="piece">piece</option>
          <option value="box">box</option>
        </select>
     
      <button className="submit-button" type="submit">Add Item</button>
    </form>
    </main>
  );
};

export default AddItemForm;
