import { Routes, Route } from 'react-router'
import { useContext } from 'react'
import NavBar from './components/NavBar/NavBar'
import SignUpForm from './components/SignUpForm/SignUpForm'
import Landing from './components/Landing/Landing'
import SignInForm from './components/SignInForm/SignInForm'
import Dashboard from './components/Dashboard/Dashboard'

import { UserContext } from './contexts/UserContext'

const App = () => {

  const { user } = useContext(UserContext)

  return (
    <>
      <NavBar />
      <Routes>
        {/* if user exists show dashboard otherwise show landing page */}
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/sign-up' element={<SignUpForm />} />
      </Routes>
    </>
  )
}

export default App