import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom'; // Fixed import
import { UserContext } from '../../contexts/UserContext';
import * as listService from '../../services/listService';

const ListDetails = (props) => {
  const { listId } = useParams();
  const { user } = useContext(UserContext);
  const [list, setList] = useState(null);

  useEffect(() => {
    const fetchList = async () => {
      try {
        console.log('list id: ' + listId);
        const listData = await listService.show(listId);
        setList(listData);
      } catch (error) {
        console.error('Error fetching list:', error);
      }
    };
    fetchList();
  }, [listId]);

  if (!list) return <main>Loading...</main>;

  // HANDLE CHECKBOX CHANGE
  const handleChange = (itemId, field, value) => {
    setList((prevList) => ({
      ...prevList,
      items: prevList.items.map((item) =>
        item._id === itemId ? { ...item, [field]: value } : item
      ),
    }));
  };

  // DELETE ITEM FUNCTION
  const handleDeleteItem = async (itemId) => {
    try {
      await listService.deleteList(listId, itemId);
      // Remove item from state
      setList((prevList) => ({
        ...prevList,
        items: prevList.items.filter((item) => item._id !== itemId),
      }));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <main>
      <section>
        <header>
          <h1>{list.title}</h1>
          <h3>{list.listType}</h3>

          <div>
            <ul>
              {list.items.map((item) => (
                <li key={item._id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={item.isPurchased} // Fixed key
                      onChange={() =>
                        handleChange(item._id, 'isPurchased', !item.isPurchased)
                      }
                    />
                    <span>{item.name}</span> - <span>{item.quantity}</span>{' '}
                    <span>{item.unit}</span>
                  </label>
                  <button onClick={() => handleDeleteItem(item._id)}>
                    Delete
                  </button>
                  <Link to={`/lists/${listId}/items/${item._id}/edit`}>Edit</Link>
                </li>
              ))}
            </ul>
          </div>
{/* 
          {/* Edit List Button */}
          <Link to={`/lists/${list._id}/edit`}>
            <button>Edit List</button>
          </Link>

          {/* Add Item Button */}
          <Link to={`/lists/${list._id}/items/add`}>
            <button>Add Item</button>
          </Link>

          {/* Delete List Button */}
          <button onClick={() => props.handleDeleteList(listId)}>
            Delete List
          </button>
        </header>
      </section>
    </main>
  );
};

export default ListDetails;
