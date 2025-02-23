import { Link } from 'react-router'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import styles from './NavBar.module.css';


const NavBar = () => {
	const { user, setUser } = useContext(UserContext)

	const handleSignOut = () => {
		localStorage.removeItem('token')
		setUser(null)
	}

	return (
		<nav className={styles.container}>
			{user ? (
				<ul>
					<li><Link to="/" onClick={handleSignOut}>Sign Out</Link></li>
					<li><Link to='/lists/inventory'>Inventory Lists</Link></li>
					<li><Link to='/lists/purchase'>Purchase Lists</Link></li>
					<li><Link to="/">Home</Link></li>
					<li><Link to='/lists/new'>New List</Link></li>
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
