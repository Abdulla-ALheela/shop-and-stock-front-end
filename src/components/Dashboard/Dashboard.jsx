import { useContext} from 'react';

import { UserContext } from '../../contexts/UserContext';

const Dashboard = (props) => {

  const { user } = useContext(UserContext);


  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>
        This is the dashboard page where you can see all lists.
      </p>
      {props.lists.map((list) => (
        <p key={list._id}>{list.title}</p>
      ))}
    </main>
  );
};

export default Dashboard