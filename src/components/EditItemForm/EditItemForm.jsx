// src/components/EditItemForm/EditItemForm.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import * as itemService from '../../services/ItemService';

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
    <form onSubmit={handleSubmit}>
      <h1>Edit Item</h1>
      
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

      <button type="submit">Save Changes</button>
    </form>
  );
};

export default ItemEditForm;
