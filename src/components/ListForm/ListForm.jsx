import { useState } from 'react';
import "../ListForm/ListForm.css"

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
    <main className="list-form-main">
      <h1 className="list-form-text">New List</h1>
      <form onSubmit={handleSubmit}>
        <label className="list-form-label" htmlFor='title'>Title</label>
        <input className="list-form-input" required  type='text' name='title' id='title' value={formData.title} onChange={handleChange}/>
        
        <label className="list-form-label" htmlFor='listType'>List Type</label>
        <select className="list-form-input" required name='listType' id='listType' value={formData.listType} onChange={handleChange}
>
          <option value="Purchase list">Purchase List</option>
          <option value="Inventory">Inventory list</option>

        </select>
        <button className="submit-button" type='submit'>SUBMIT</button>
      </form>
    </main>
  );
};

export default ListForm;