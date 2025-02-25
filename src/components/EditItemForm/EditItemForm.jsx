// src/components/EditItemForm/EditItemForm.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import * as itemService from '../../services/ItemService';
import "../EditItemForm/EditItemForm.css"
const ItemEditForm = () => {
  const { listId, itemId } = useParams();
  const navigate = useNavigate();

  const [itemData, setItemData] = useState({
    name: '',
    quantity: '',
    unit: '',
    isPurchased: false,
  });

  // Fetch item data on component mount
  useEffect(() => {
    console.log('Fetching item with ID:', itemId);
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



  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await itemService.updateItem(listId, itemId, itemData);
      navigate(`/lists/${listId}`);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
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
          onChange={(e) => setItemData({ ...itemData, name: e.target.value })}
        />


        <label className="edit-item-form-label" htmlFor='quantity'>Quantity </label>
        <input
         className="edit-item-form-input"
          required
          name='quantity'
          id='quantity'
          type="number"
          value={itemData.quantity}
          onChange={(e) => setItemData({ ...itemData, quantity: e.target.value })}
        />


        <label className="edit-item-form-label" htmlFor='unit'>Unit </label>
        <select
         className="edit-item-form-input"
          required
          name='unit'
          id='unit'
          value={itemData.unit}
          onChange={(e) => setItemData({ ...itemData, unit: e.target.value })}
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
  );
};

export default ItemEditForm;
