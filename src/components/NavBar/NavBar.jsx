import { Link } from 'react-router'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

const NavBar = () => {
	const { user, setUser } = useContext(UserContext)

	const handleSignOut = () => {
		localStorage.removeItem('token')
		setUser(null)
	}

	return (
		<nav>
			{user ? (
				<ul>
					<li><Link to="/sign-in" onClick={handleSignOut}>Sign Out</Link></li>
					<li><Link to='/lists/inventory'>Inventory Lists</Link></li>
					<li><Link to='/lists/purchase'>Purchase Lists</Link></li>
					<li><Link to="/">Home</Link></li>
					<li><Link to='/lists/new'>New List</Link></li>
				</ul>
			) : (
				<ul>
					
				</ul>
			)}
		</nav>
	)
}

export default NavBar
