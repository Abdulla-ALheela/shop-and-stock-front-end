// src/components/ListDetails/ListDetails.jsx
import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import * as listService from '../../services/listService';
import * as itemService from '../../services/ItemService';

import styles from './ListDetails.module.css'
import editIcon from '../../assets/EDIT ICON.png';
import deleteIcon from '../../assets/X ICON.png';
import bgImage from '../../assets/NEW_EDITITEM.jpg'


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

  const handleCheck = async (itemData) => {
   await itemService.updateItem(listId, itemData._id, itemData);
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
    <div className={styles.listpagebg} style={{ backgroundImage: `url(${bgImage})` }}> 
    <main className={styles.listdetails}> 
      <section>
        <header>
          <h1 className={styles.listheader}>{list.title}</h1>
          <h3 className={styles.listsubheader}>{list.listType}</h3>
          <div className={styles.listcontainer}>
            <ul className={styles.listitems}>
              {list.items.map((item) => (
                <li key={item._id} className={styles.listitem}>
                  <label>
                    <input
                      type="checkbox"
                      className={styles.listitemcheckbox}
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
                    <span className={styles.listitemname}>{item.name}</span> - <span>{item.quantity}</span> <span>{item.unit}</span>
                  </label>

                  {/* Edit Item Button */}
                  <div className={styles.listbuttons}>
                  <Link to={`/lists/${listId}/items/edit/${item._id}`}>
                   <img src={editIcon} alt="Edit" className={styles.editIcon}/>
                  </Link>

                  {/* Delete Item Button */}
                  <button type="button" onClick={() => handleDeleteItemInternal(item._id)} className={styles.deleteButton}>
                      <img src={deleteIcon} alt="Delete" className={styles.deleteIcon} />
                  </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          

          {/* Add Item Button */}
          <Link to={`/lists/${listId}/items/add`}>
            <button className={styles.additembutton}>Add Item</button>
          </Link>

          
        </header>
      </section>
    </main>
    </div>
  );
};

export default ListDetails;
