// src/components/ListDetails/ListDetails.jsx
import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import * as listService from '../../services/listService';
import * as itemService from '../../services/ItemService';

const ListDetails = ({ handleDeleteList, handleDeleteItem }) => {
  const { listId } = useParams();
  const { user } = useContext(UserContext);
  const [list, setList] = useState(null);

  useEffect(() => {
    const fetchList = async () => {
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

  const handleCheck = async (itemData) => {
   const updatedItem = await itemService.updateCheck(listId, itemData._id, itemData);
   console.log(updatedItem)
  }

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
                      onClick={() => handleCheck(item)}
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
                    <span>{item.name}</span> - <span>{item.quantity}</span> <span>{item.unit}</span>
                  </label>

                  {/* Edit Item Button */}
                  <Link to={`/lists/${listId}/items/edit/${item._id}`}>
                      <button>Edit Item</button>
                    </Link>

                {/* Delete Item Button */}
                <button onClick={() => handleDeleteItemInternal(item._id)}>Delete Item</button>

                </li>
              ))}
            </ul>
          </div>

          {/* Add Item Button */}
          <Link to={`/lists/${listId}/items/add`}>
            <button>Add Item</button>
          </Link>
        </header>
      </section>
    </main>
  );
};

export default ListDetails;
