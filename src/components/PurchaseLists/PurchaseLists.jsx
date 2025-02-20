import { useContext} from 'react';
import { UserContext } from '../../contexts/UserContext';

const PurchaseLists = (props) => {

  const { user } = useContext(UserContext); 

    return (
        <>
        <h1>purchase</h1>
        {
         props.lists.map((list) => (
            list.listType === "Purchase list" && list.owner._id === user._id ?
            <p key={list._id}>{list.title}</p> : null
          )) 
        }
          </>
    );
};

export default PurchaseLists;