
// src/components/EditTaskForm/EditTaskForm.jsx

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import * as taskService from '../../services/taskService';

const EditTaskForm = () => {
  const { taskId, listId } = useParams();
  const navigate = useNavigate();
  
  const [taskData, setTaskData] = useState({
    name: '',
    quantity: '',
    unit: '',
    isPurchased: false,
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const task = await taskService.show(listId, taskId);
        setTaskData({
          name: task.name,
          quantity: task.quantity,
          unit: task.unit,
          isPurchased: task.isPurchased,
        });
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    if (taskId) fetchTask();
  }, [taskId, listId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedTask = { ...taskData };
      await taskService.update(listId, taskId, updatedTask);
      console.log('Updated Task:', response);
      navigate(`/lists/${listId}/tasks/${taskId}`);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Task</h1>
      
      <label>
        Name:
        <input
          type="text"
          value={taskData.name}
          onChange={(e) => setTaskData({ ...taskData, name: e.target.value })}
        />
      </label>

      <label>
        Quantity:
        <input
          type="number"
          value={taskData.quantity}
          onChange={(e) => setTaskData({ ...taskData, quantity: e.target.value })}
        />
      </label>

      <label>
        Unit:
        <input
          type="text"
          value={taskData.unit}
          onChange={(e) => setTaskData({ ...taskData, unit: e.target.value })}
        />
      </label>

      <label>
        Purchased:
        <input
          type="checkbox"
          checked={taskData.isPurchased}
          onChange={(e) => setTaskData({ ...taskData, isPurchased: e.target.checked })}
        />
      </label>

      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditTaskForm;