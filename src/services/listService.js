const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/lists`;

const index = async () => {
    try {
      const res = await fetch(BASE_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const create = async (listFormData) => {
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(listFormData),
            });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  }

  const show = async (listId) => {
    try {
      const res = await fetch(`${BASE_URL}/${listId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  
  const deleteList = async (listId) => {
    try {
      const res = await fetch(`${BASE_URL}/${listId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };
  

  const updateList = async (listId, updatedData) => {
    try {
      const res = await fetch(`${BASE_URL}/${listId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!res.ok) {
        throw new Error(`Error updating list: ${res.statusText}`);
      }
  
      return res.json();
    } catch (error) {
      console.error("Error updating list:", error);
    }
  };
  

  export {
    index,
    create,
    show,
    deleteList,
    updateList
  };
  