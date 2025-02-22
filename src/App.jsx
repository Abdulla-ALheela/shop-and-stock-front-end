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

const App = () => {

  const { user } = useContext(UserContext);
  
    const [lists, setLists] = useState([]);
    const [listAdded, setListAdded] = useState(false);
  
    useEffect(() => {
      const fetchAllLists = async () => {
        const listsData = await listService.index();
    
        setLists(listsData)
        setListAdded(false);
      };
      if (user) fetchAllLists();
    }, [user,listAdded]);

    const navigate = useNavigate();
    
    const handleAddList = async (listFormData) => {
      const newList = await listService.create(listFormData);
      setLists([newList, ...lists]);
      setListAdded(true);
      navigate('/');
    };

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={user ? <Dashboard lists={lists}/> : null} />
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/sign-up' element={<SignUpForm />} />
      <Route path='/lists/new' element={<ListForm handleAddList={handleAddList} />} />
        <Route path='/lists/inventory' element={<InventoryLists lists={lists} />} />
        <Route path='/lists/purchase' element={<PurchaseLists lists={lists} />} />
      </Routes>
    </>
  )
}

export default App