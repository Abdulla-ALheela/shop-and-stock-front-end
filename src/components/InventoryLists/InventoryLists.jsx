import { useContext} from 'react';
import { UserContext } from '../../contexts/UserContext';

const InventoryLists = (props) => {
  const { user } = useContext(UserContext); 
  return (
    <>
<h1>inventory</h1>
{
 props.lists.map((list) => (
    list.listType === "Inventory" && list.owner._id === user._id ?
    <p key={list._id}>{list.title}</p> : null
  )) 
}
  </>
  );
};

export default InventoryLists;