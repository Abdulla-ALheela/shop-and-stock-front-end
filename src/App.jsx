import { Routes, Route, useNavigate} from 'react-router';
import { useContext, useState, useEffect} from 'react';
import NavBar from './components/NavBar/NavBar'
import SignUpForm from './components/SignUpForm/SignUpForm'
import SignInForm from './components/SignInForm/SignInForm'
import Dashboard from './components/Dashboard/Dashboard'
import { UserContext } from './contexts/UserContext'
import ListForm from './components/ListForm/ListForm';
import * as listService from './services/listService';
import InventoryLists from './components/InventoryLists/InventoryLists';
import PurchaseLists from './components/PurchaseLists/PurchaseLists';
import ListDetails from './components/ListDetails/ListDetails';
import ItemEditForm from './components/EditItemForm/EditItemForm';
import * as itemService from './services/ItemService';
import AddItemForm from './components/AddItemForm/AddItemForm';


const App = () => {

  const { user } = useContext(UserContext);
  const [lists, setLists] = useState([]);
  const [listAdded, setListAdded] = useState(false);


   // Fetch all lists
    useEffect(() => {
      const fetchAllLists = async () => {
        const listsData = await listService.index();
    
        setLists(listsData)
        setListAdded(false);
      };
      if (user) fetchAllLists();
    }, [user,listAdded]);

      // Handle Add List
    const navigate = useNavigate();
    
    const handleAddList = async (listFormData) => {
      const newList = await listService.create(listFormData);
      setLists([newList, ...lists]);
      setListAdded(true);
      navigate('/');
    };

  const handleDeleteList = async (listId) => {
      try {
        await listService.deleteList(listId); 
        setLists((prevLists) => prevLists.filter((list) => list._id !== listId)); 
      } catch (error) {
        console.error('Error deleting list:', error);
      }
  };

    // Handle Edit Item
  const handleEditItem = async (listId, itemId, updatedItemData) => {
    try {
      const updatedItem = await itemService.updateItem(listId, itemId, updatedItemData);
      setLists((prevLists) =>
        prevLists.map((list) =>
          list._id === listId
            ? {
                ...list,
                items: list.items.map((item) =>
                  item._id === itemId ? updatedItem : item
                ),
              }
            : list
        )
      );
    } catch (error) {
      console.error('Error editing item:', error);
    }
  };

    // Handle Delete Item
  const handleDeleteItem = async (listId, itemId) => {
    try {
      await itemService.deleteItem(listId, itemId); 
      setLists((prevLists) =>
        prevLists.map((list) =>
          list._id === listId
            ? { ...list, items: list.items.filter((item) => item._id !== itemId) }
            : list
        )
      );
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <>
      {/* <NavBar /> */}
      <Routes>
        <Route path='/' element={user ? <Dashboard lists={lists}/> : <SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/lists/new' element={<ListForm handleAddList={handleAddList} />} />
        <Route path='/lists/inventory' element={<InventoryLists lists={lists} handleDeleteList={handleDeleteList}/>} />
        <Route path='/lists/purchase' element={<PurchaseLists lists={lists} handleDeleteList={handleDeleteList} />} />
        <Route path='/lists/:listId' element={
          <ListDetails
            handleDeleteList={handleDeleteList}
            handleDeleteItem={handleDeleteItem}
            handleEditItem={handleEditItem}
          />
        } />
        <Route path='/lists/:listId/items/add' element={<AddItemForm />} />
        <Route path='/lists/:listId/items/edit/:itemId' element={<ItemEditForm />} />
      </Routes>
    </>
  )
}

export default App