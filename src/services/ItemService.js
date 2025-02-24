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

    if (!res.ok) {
      throw new Error(`Error adding item: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error adding item:', error);
    throw error;
  }
};

const showItem = async (listId, itemId) => {
  try {
    const response = await fetch(`${BASE_URL}/${listId}/items/${itemId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching item: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching item:', error);
    throw error;
  }
};

export default {
  addItem,
  showItem,
};
