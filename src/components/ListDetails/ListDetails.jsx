// src/components/ListDetails/ListDetails.jsx
import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import * as listService from '../../services/listService';

const ListDetails = ({ handleDeleteList, handleDeleteItem }) => {
  const { listId } = useParams();
  const { user } = useContext(UserContext);
  const [list, setList] = useState(null);

  useEffect(() => {
    const fetchList = async () => {
      console.log('Fetching list with listId:', listId);
      try {
        const listData = await listService.show(listId);
        setList(listData);
      } catch (error) {
        console.error('Error fetching list:', error);
      }
    };

    if (listId) {
      fetchList();
    }
  }, [listId]);

  if (!list) return <main>Loading...</main>;

  const handleDeleteItemInternal = async (itemId) => {
    try {
      await handleDeleteItem(listId, itemId);
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
                      checked={item.isPurchased}
                      onChange={() =>
                        setList((prevList) => ({
                          ...prevList,
                          items: prevList.items.map((i) =>
                            i._id === item._id
                              ? { ...i, isPurchased: !i.isPurchased }
                              : i
                          ),
                        }))
                      }
                    />
                    {/* Display item name, quantity, and unit */}
                    <span>{item.name}</span> -
                    <span>{item.quantity}</span>
                    <span>{item.unit}</span>
                  </label>

                </li>
              ))}
            </ul>
          </div>
          {/* Edit List Button */}
          <Link to={`/lists/${listId}/edit`}>
            <button>Edit List</button>
          </Link>
          {/* Delete List Button */}
          <button onClick={() => handleDeleteList(listId)}>Delete List</button>
        </header>
      </section>
    </main>
  );
};

export default ListDetails;
