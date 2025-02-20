import { useContext} from 'react';
import { UserContext } from '../../contexts/UserContext';

const Dashboard = (props) => {

  const { user } = useContext(UserContext); 
  const userLists = [];

   props.lists.map((list) => {
    
console.log(list)
list.owner._id === user._id ? userLists.push(list) : null
})

const threeLists =userLists.slice(props.lists.length-3,props.lists.length)

  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>
        This is the dashboard page where you can see all lists.
      </p>
      {threeLists.map((list) => (
        <p key={list._id}>{`${list.title} - ${list.listType === "Inventory" ? "Inventory List":"Purchase list"}`}</p>
      ))}
    </main>
  );
};

export default Dashboard