const PurchaseLists = (props) => {

    return (
        <>
        <h1>purchase</h1>
        {
         props.lists.map((list) => (
            list.listType === "Purchase list" ?
            <p key={list._id}>{list.title}</p> : null
          )) 
        }
          </>
    );
};

export default PurchaseLists;