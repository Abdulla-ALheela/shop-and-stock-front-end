// src/components/AddItemForm/AddItemForm.jsx

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import * as itemService from '../../services/ItemService';

import "../AddItemForm/AddItemForm.css"
import bgImage from '../../assets/NEW_EDITITEM.jpg'


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
<div className="bgImage" style={{backgroundImage: `url(${bgImage})`}}>
    <main className="item-form-main">
      <form onSubmit={handleSubmit}>

        <h1 className="item-form-title">Add Item</h1>

        <label htmlFor='name' className="item-form-label">Name</label>
        <input
          required
          name='name'
          id='name'
          className="item-form-input"
          type="text"
          value={itemData.name}
          onChange={(e) => setItemData({ ...itemData, name: e.target.value })}
        />

        <label htmlFor='quantity' className="item-form-label">Quantity</label>
        <input
          required
          name='quantity'
          id='quantity'
          className="item-form-input"
          type="number"
          value={itemData.quantity}
          onChange={(e) => setItemData({ ...itemData, quantity: e.target.value })}
        />

        <label htmlFor='unit' className="item-form-label">Unit</label>
        <select
          required
          name='unit'
          id='unit'
          className="item-form-input2"
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
    </div>
  );
};

export default AddItemForm;
