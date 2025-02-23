import { Link } from 'react-router';
import { useContext} from 'react';
import { UserContext } from '../../contexts/UserContext';

const InventoryLists = (props) => {
  const { user } = useContext(UserContext); 
  return (
    <main>
      {props.lists.filter(list => list.listType === "Inventory" && list.owner._id === user._id).map((list) => (
        <article key={list._id}>
          <header>
            <Link to={`/lists/${list._id}`}>
            <h2>{list.title}</h2></Link>
            <Link to={`/lists/${list._id}/edit`}>
            <button>Edit</button></Link>

            <button onClick={() => props.handleDeleteList(list._id)}>Delete</button>
          </header>
        </article>
      ))}
      
      {props.lists.filter(list => list.listType === "Inventory" && list.owner._id === user._id).length === 0 && (
        <p>No inventory lists available</p>
      )}
    </main>
  );
};

export default InventoryLists;