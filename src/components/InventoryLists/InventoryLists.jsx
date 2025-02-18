const InventoryLists = (props) => {
 
  return (
    <>
<h1>inventory</h1>
{
 props.lists.map((list) => (
    list.listType === "Inventory" ?
    <p key={list._id}>{list.title}</p> : null
  )) 
}
  </>
  );
};

export default InventoryLists;