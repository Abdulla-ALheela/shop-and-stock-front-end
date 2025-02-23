
import { Link } from 'react-router';
import { useContext} from 'react';
import { UserContext } from '../../contexts/UserContext';


const PurchaseLists = ({ lists, handleDeleteList }) => {
  return (
    <main>
      {lists.filter(list => list.listType === "Purchase list").map((list) => (
        <article key={list._id}>
          <header>
            <Link to={`/lists/${list._id}`}><h2>{list.title}</h2></Link>
            <Link to={`/lists/${list._id}/edit`}><button>Edit</button></Link>
            <button onClick={() => handleDeleteList(list._id)}>Delete</button>
          </header>
        </article>
      ))}
      {lists.filter(list => list.listType === "Purchase list").length === 0 && (
        <p>No inventory lists available</p>
      )}
    </main>
  );
};

export default PurchaseLists;









