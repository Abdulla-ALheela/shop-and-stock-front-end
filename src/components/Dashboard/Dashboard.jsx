import { useContext, useEffect, useState } from 'react';

import { UserContext } from '../../contexts/UserContext';

import * as listService from "../../services/listService";

const Dashboard = (props) => {

  const { user } = useContext(UserContext);

  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchAllLists = async () => {
      const listsData = await listService.index();
  
      setLists(listsData)
    
    };
    if (user) fetchAllLists();
  }, [user]);
  

  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>
        This is the dashboard page where you can see all lists.
      </p>
      {lists.map((list) => (
        <p key={list._id}>{list.title}</p>
      ))}
    </main>
  );
};

export default Dashboard