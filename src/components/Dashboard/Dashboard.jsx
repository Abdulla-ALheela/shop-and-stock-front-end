import { useContext} from 'react';
import { UserContext } from '../../contexts/UserContext';
import "../Dashboard/Dashboard.css"
import { Link } from 'react-router'
const Dashboard = (props) => {

  const { user } = useContext(UserContext); 
  const userLists = [];
  
  props.lists.forEach(list => {
    list.owner._id === user._id ? userLists.push(list) : null
  });

  let threeLists
    
  userLists.length >= 3? threeLists =userLists.slice(userLists.length - 3,userLists.length):threeLists =userLists.slice(0,3)

  return (
    <main >
      <h1 className="text-title"><b>SHOP&STOCK</b></h1>
      <p className="text">
        This is the dashboard page where you can access all your lists.
      </p>
      <div className="dashboard-button-continer">
      <button className="dashboard-button-inventory "><Link to='/lists/inventory'>Inventory Lists</Link></button>
      <button className="dashboard-button-purchase"><Link to='/lists/purchase'>Purchase Lists</Link></button>
      </div>
      <div className="dashboard-cards">
      {threeLists.map((list) => (
        <>
        <p className="dashboard-card" key={list._id}>{`Title: ${list.title}`}<br></br>
        {`Type:  ${list.listType === "Inventory" ? "Inventory List":"Purchase list"}`}</p>
        </>
      ))}
        </div>
    </main>
  );
};

export default Dashboard