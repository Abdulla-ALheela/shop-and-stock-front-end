import { Routes, Route } from 'react-router'
import { useContext, useEffect, useState } from 'react';
import NavBar from './components/NavBar/NavBar'
import SignUpForm from './components/SignUpForm/SignUpForm'
import Landing from './components/Landing/Landing'
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
  
    useEffect(() => {
      const fetchAllLists = async () => {
        const listsData = await listService.index();
    
        setLists(listsData)
      
      };
      if (user) fetchAllLists();
    }, [user]);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={user ? <Dashboard lists={lists}/> : <Landing />} />
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/lists/new' element={<ListForm />} />
        <Route path='/lists/inventory' element={<InventoryLists lists={lists} />} />
        <Route path='/lists/purchase' element={<PurchaseLists lists={lists} />} />
      </Routes>
    </>
  )
}

export default App