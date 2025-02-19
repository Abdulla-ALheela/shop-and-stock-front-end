import { useParams, Link } from 'react-router'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

const NavBar = () => {
	const { user, setUser } = useContext(UserContext)
	const { listId, taskId } = useParams();

	const handleSignOut = () => {
		localStorage.removeItem('token')
		setUser(null)
	}

	return (
		<nav>
			{user ? (
				<ul>
					<li><Link to="/" onClick={handleSignOut}>Sign Out</Link></li>
					<li><Link to='/lists/inventory'>Inventory Lists</Link></li>
					<li><Link to='/lists/purchase'>Purchase Lists</Link></li>
					<li><Link to="/">Home</Link></li>
					<li><Link to='/lists/new'>New List</Link></li>
					<Link to={`/lists/${listId}/tasks/${taskId}/edit`}>Edit Task</Link>
				</ul>
			) : (
				<ul>
					<li><Link to="/sign-up">Sign Up</Link></li>
					<li><Link to="/sign-in">Sign In</Link></li>
					<li><Link to="/">Home</Link></li>
				</ul>
			)}
		</nav>
	)
}

export default NavBar
