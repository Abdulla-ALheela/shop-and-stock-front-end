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
		<nav className={styles.navbar}>
			{user ? (
				<ul className={styles.navList}>
					<li><Link to="/" className={styles.logo}>SHOP&STOCK</Link></li>
					<div className={styles.navCenter}>
					<li><Link to='/lists/inventory' className={styles.navItem}>Inventory Lists</Link></li>
					<li><Link to='/lists/purchase' className={styles.navItem}>Purchase Lists</Link></li>
					<li><Link to='/lists/new' className={styles.navItem}>New List</Link></li>
					</div>
					<li><Link to="/" onClick={handleSignOut} className={styles.signOut}>Sign Out</Link></li>
				</ul>
			) : (
				<ul>
					
				</ul>
			)}
		</nav>
	)
}

export default NavBar
