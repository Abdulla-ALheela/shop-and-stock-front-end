import { Routes, Route, useNavigate } from 'react-router';
import { useContext, useState, useEffect} from 'react';
import NavBar from './components/NavBar/NavBar'
import SignUpForm from './components/SignUpForm/SignUpForm'
import Landing from './components/Landing/Landing'
import SignInForm from './components/SignInForm/SignInForm'
import Dashboard from './components/Dashboard/Dashboard'
import { UserContext } from './contexts/UserContext'
import ListForm from './components/ListForm/ListForm';
import * as listService from "./services/listService";

const App = () => {

  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchAllLists = async () => {
      const listsData = await listService.index();
  
      setLists(listsData)
    
    };
    if (user) fetchAllLists();
  }, [user]);
  

  const handleAddList = async (listFormData) => {
    const newList = await listService.create(listFormData);
    setLists([newList, ...lists]);
    navigate('/');
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={user ? <Dashboard lists={lists} /> : <Landing />} />
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/lists/new' element={<ListForm handleAddList={handleAddList} />} />
      </Routes>
    </>
  )
}

export default App