//SRC/COMPONENTS/MAINLISTS/MAINLISTS.JSX

import { Link } from 'react-router'

const MainList = (props) => {
  const handleDeleteClick = async (e, listId) => {
    await props.handleDeleteList(listId);
  }

    return (
      <main>
      {props.lists.length === 0 ? (
        <p>No lists available</p>
      ) : (
        props.lists.map((list) => (
          <article key={list._id}>
            <header>
              <h2>{list.title}</h2>
              <button onClick={(e) => handleDeleteClick(e, list._id)}>Delete List</button>
            </header>
            <Link to={`/lists/${list._id}`}>
              <p>{list.title}</p>
            </Link>
          </article>
        ))
      )}
    </main>
  );
};

export default MainList;