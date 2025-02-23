//SRC/COMPONENTS/LISTDETAILS/LISTDETAILS.JSX

import {useState, useEffect, useContext} from 'react'
import { useParams, Link } from 'react-router'
import { UserContext } from '../../contexts/UserContext';
import * as listService from '../../services/listService';

const ListDetails = (props) => {
    const { listId } = useParams()
    const { user } = useContext(UserContext)
    const [list, setList] = useState(null)

    useEffect(() => {
        const fetchList = async () => {
            try{
                console.log("list id: " +listId)
                const listData = await listService.show(listId)
                setList (listData)
            } catch (error) {
                console.error("Error fetching list:", error)
            }
        }
        fetchList()
    }, [listId])
    
    if (!list) return <main>Loading...</main>


//CHANGE OF INPUTS
    const handleChange = (itemId, field, value) => {
        const updatedItems = list.items.map
        (item => item._id === itemId ? 
        {...item, [field]: value } : item )
         setList(prevList => ({
            ...prevList,
            items: updatedItems
         }))
        }

//DELETE ITEM
         const handleDeleteItem = async (itemId) => {
            try {
              await listService.deleteList(listId, itemId); // Assuming you have a deleteItem function
              // Remove item from state
              const updatedItems = list.items.filter(item => item._id !== itemId);
              setList((prevList) => ({
                ...prevList,
                items: updatedItems,
              }));
            } catch (error) {
              console.error('Error deleting item:', error);
            }
          }

          

    return (
        <main>
            <section>
                <header>
                    <h1>{list.title}</h1>
                    <h3>{list.listType}</h3>
                    
                    <div>
                    <ul>
                        {list.items.map(item => (
                            <li key={item._id}>
                        
                        <label>
                            <input 
                            type="checkbox"
                            checked={item.purchased}
                            onChange={() => handleChange(item._id, 'purchased', !item.purchased)}
                            />
                            {item.name}
                        </label>
                        <button onClick = {() => handleDeleteItem (item._id)}>Delete</button>
                        <Link to = {`/lists/${listId}/items/${item._id}/edit`}>Edit</Link>
                        </li>
                        ))}
                      </ul>
                      </div>


              <Link to={`/lists/${list._id}/edit`}>
              <button>Edit</button></Link>

              <button onClick={() => props.handleDeleteList(listId)}>
                Delete
              </button>


              <Link to={`/lists/${list._id}/ItemForm`}>
              <button>Add Item</button></Link>


                </header>
            </section>
        </main>
    )
}

export default ListDetails