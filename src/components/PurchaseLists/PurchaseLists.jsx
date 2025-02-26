import { Link } from 'react-router';
import { useContext} from 'react';
import { UserContext } from '../../contexts/UserContext';

import styles from './PurchaseLists.module.css'
import editIcon from '../../assets/EDIT ICON.png';
import deleteIcon from '../../assets/X ICON.png';
import bgImage from '../../assets/INV + PUR MAIN LIST.jpg'

const PurchaseLists = (props) => {
  const { user } = useContext(UserContext); 


  return (
    <main className={styles.purchasePage} style={{ backgroundImage: `url(${bgImage})` }}> 
    <h1 className={styles.pageTitle}>Purchase List</h1>
    
    <div className={styles.purchaseGrid}>
      {props.lists.filter(list => list.listType === "Purchase list" && list.owner._id === user._id ).map((list) => (
        <article key={list._id} className={styles.purchaseCard}>
          <header className={styles.cardHeader}>

            <Link to={`/lists/${list._id}`}>
            <h2>{list.title}</h2>
            </Link>

            <div className={styles.actions}>
            <Link to={`/lists/${list._id}/edit`}>
            <img src={editIcon} alt="Edit" className={styles.editIcon}/>
            </Link>

            <button onClick={() => props.handleDeleteList(list._id)} className={styles.deleteButton}>
              <img src={deleteIcon} alt="Delete" className={styles.deleteIcon} />
              </button>

            </div>
          </header>
        </article>
      ))}
      {props.lists.filter(list => list.listType === "Purchase list" && list.owner._id === user._id ).length === 0 && (
        <p className={styles.noListsMessage}>No purchase lists available</p>
      )}

      <Link to='/lists/new'>
        <button className={styles.addlistbutton}>Add List</button>
      </Link>
      </div>
      {/* Add List Button */}


    </main>
  );
};

export default PurchaseLists;