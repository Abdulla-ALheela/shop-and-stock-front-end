// src/components/AddItemForm/AddItemForm.jsx

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import * as itemService from '../../services/ItemService';

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
      navigate(`/lists/${listId}`);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Item</h1>
      <label>Name:
        <input
          type="text"
          value={itemData.name}
          onChange={(e) => setItemData({ ...itemData, name: e.target.value })}
        />
      </label>
      <label>Quantity:
        <input
          type="number"
          value={itemData.quantity}
          onChange={(e) => setItemData({ ...itemData, quantity: e.target.value })}
        />
      </label>
      <label>Unit:
        <select
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
      </label>
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItemForm;
