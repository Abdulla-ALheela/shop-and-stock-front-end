// src/services/taskService.js

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/tasks`;

// Get all tasks from a specific list
const index = async (listId) => {
  try {
    const res = await fetch(`${BASE_URL}/lists/${listId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};


// Update an existing task
const update = async (taskId, taskData) => {
  try {
    const res = await fetch(`${BASE_URL}/${taskId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};


export { index, update};
