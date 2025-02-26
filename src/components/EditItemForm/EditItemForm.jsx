// src/components/EditItemForm/EditItemForm.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import * as itemService from '../../services/ItemService';

import "../EditItemForm/EditItemForm.css"
import bgImage from '../../assets/NEW_EDITITEM.jpg'


const ItemEditForm = () => {


  const { listId, itemId } = useParams();
  const navigate = useNavigate();

  const [itemData, setItemData] = useState({
    name: '',
    quantity: '',
    unit: '',
    isPurchased: false,
  });


  useEffect(() => {
    const fetchItem = async () => {
      try {
        const item = await itemService.showItem(listId, itemId);
        setItemData(item);
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };
    fetchItem();
  }, [listId, itemId]);


  const handleChange = (event) => {
    setItemData({ ...itemData, [event.target.name]: event.target.value });

  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await itemService.updateItem(listId, itemId, itemData);
      if (!res) {
        throw new Error('Failed to update item');
      }

      navigate(`/lists/${listId}`);
    } catch (error) {
      console.error('Error updating item:', error);

      if (error.response) {
        const errorText = await error.response.text();
        console.error('Error response:', errorText);
      }
    }
  };


  return (

    <div className="bgImage" style={{ backgroundImage: `url(${bgImage})` }}>

      <main className="edit-item-form-main">
        <form onSubmit={handleSubmit}>
          <h1 className="edit-item-form-title">Edit Item</h1>

          <label className="edit-item-form-label" htmlFor='name'>Name </label>
          <input
            className="edit-item-form-input"
            required
            name='name'
            id='name'
            type="text"
            value={itemData.name}
            onChange={handleChange}
          />


          <label className="edit-item-form-label" htmlFor='quantity'>Quantity </label>
          <input
            className="edit-item-form-input"
            required
            name='quantity'
            id='quantity'
            type="number"
            value={itemData.quantity}
            onChange={handleChange}
          />


          <label className="edit-item-form-label" htmlFor='unit'>Unit </label>
          <select
            className="edit-item-form-inpu2"
            required
            name='unit'
            id='unit'
            value={itemData.unit}
            onChange={handleChange}
          >
            <option value="">Select a unit</option>
            <option value="kg">kg</option>
            <option value="g">g</option>
            <option value="liter">Liter</option>
            <option value="ml">ml</option>
            <option value="piece">Piece</option>
            <option value="box">Box</option>
          </select>


          <button className="edit-item-submit-button" type="submit">Save Changes</button>
        </form>
      </main>
    </div>
  );
};

export default ItemEditForm;
