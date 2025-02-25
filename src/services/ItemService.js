// src/services/ItemService.js

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/lists`;

const addItem = async (listId, itemData) => {
    try {
    const res = await fetch(`${BASE_URL}/${listId}/items`, {
        method: 'POST',
        headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
});
    return res.json();
    } catch (error) {
    console.log('Error adding item:', error);
    }
};
  
  const showItem = async (listId, itemId) => {
    try {
        const response = await fetch(`${BASE_URL}/${listId}/items/${itemId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
    },
        });
    
        if (!response.ok) {
        throw new Error(`Error fetching item: ${response.statusText}`);
        }
    
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching item:', error);
        throw error;
    }
};

const updateItem = async (listId, itemId, itemData) => {
  try {
    const res = await fetch(`${BASE_URL}/${listId}/items/${itemId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemData),
    });


    return res.json();
  } catch (error) {
    console.log('Error adding item:', error);
    throw error;
  }
};




const deleteItem = async (listId, itemId) => {
  try {
    const res = await fetch(`${BASE_URL}/${listId}/items/${itemId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Error deleting item: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.log('Error deleting item:', error);
    throw error;
  }
};

export {

    addItem,
    showItem,
    updateItem,
    deleteItem,
};
