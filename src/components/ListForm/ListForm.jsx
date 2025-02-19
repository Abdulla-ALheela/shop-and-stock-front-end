import { useState } from 'react';


const ListForm = (props) => {
  const [formData, setFormData] = useState({
    title: "",
    listType: "Purchase list",
  });


  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleAddList(formData);

  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title'>Title</label>
        <input required  type='text' name='title' id='title' value={formData.title} onChange={handleChange}/>
        
        <label htmlFor='listType'>List Type</label>
        <select required name='listType' id='listType' value={formData.listType} onChange={handleChange}
>
          <option value="Purchase list">Purchase List</option>
          <option value="Inventory">Inventory list</option>

        </select>
        <button type='submit'>SUBMIT</button>
      </form>
    </main>
  );
};

export default ListForm;