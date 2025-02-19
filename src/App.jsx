import { Routes, Route } from 'react-router'
import { useContext} from 'react';
import NavBar from './components/NavBar/NavBar'
import SignUpForm from './components/SignUpForm/SignUpForm'
import Landing from './components/Landing/Landing'
import SignInForm from './components/SignInForm/SignInForm'
import Dashboard from './components/Dashboard/Dashboard'
import { UserContext } from './contexts/UserContext'
import ListForm from './components/ListForm/ListForm';
import EditTaskForm from './components/EditTaskForm/EditTaskForm';

const App = () => {

  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/lists/new' element={<ListForm />} />
        <Route path="/lists/:listId/tasks/:taskId/edit" element={<EditTaskForm />} />
      </Routes>
    </>
  )
}

export default App