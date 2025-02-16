import { useContext, useEffect, useState } from 'react';

import { UserContext } from '../../contexts/UserContext';

import * as userService from '../../services/userService'

const Dashboard = () => {
  const { user } = useContext(UserContext);

  const [listOfUsers, setListOfUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
        try {
            const fetchedUsers = await userService.index()
            setListOfUsers(fetchedUsers)
        } catch (err) {
            console.log(err)
        }
    }

    if (user) fetchUsers()
  }, [user])

  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>
        This is the dashboard page where you can see a list of all the users.
      </p>
      {listOfUsers.map((userObj) => (
        <h4>{userObj.username}</h4>
      ))}
    </main>
  );
};

export default Dashboard