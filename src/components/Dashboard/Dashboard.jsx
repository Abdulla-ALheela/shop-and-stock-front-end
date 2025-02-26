import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import "./Dashboard.css"
import { Link } from 'react-router'
import bgImage from '../../assets/LANDING.jpg'


const Dashboard = (props) => {

  const { user } = useContext(UserContext);
  const userLists = [];


  props.lists.forEach(list => {
    list.owner._id === user._id ? userLists.push(list) : null
  });


  let threeLists
  userLists.length >= 3 ? threeLists = userLists.slice(userLists.length - 3, userLists.length) : threeLists = userLists.slice(0, 3)


  return (
    <main className="landingpage" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="all-elements">
        <h1 className="text-title"><b>SHOP&STOCK</b></h1>
        <p className="text">
          Shop and Stock helps you keep track of everything you need. Create shopping lists for items you have or need to buy, so you always stay organized and never forget essentials.
        </p>
        <div className="dashboard-button-continer">
          <button className="dashboard-button-inventory "><Link to='/lists/inventory'>Inventory Lists</Link></button>
          <button className="dashboard-button-purchase"><Link to='/lists/purchase'>Purchase Lists</Link></button>
        </div>
        <div className="dashboard-cards">
          {threeLists.map((list) => (

              <Link key={list._id} to={`/lists/${list._id}`}>
                <div className="dashboard-card">
                  <h2 className="dashboard-listtitle">{list.title}</h2>
                  <h3 className="dashboard-listtype">{list.listType === "Inventory" ? "Inventory List" : "Purchase List"}</h3>
                </div>
              </Link>
              
          ))}
        </div>
      </div>
    </main>
  );
};


export default Dashboard