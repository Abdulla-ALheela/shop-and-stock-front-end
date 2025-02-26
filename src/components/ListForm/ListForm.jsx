import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import * as listService from "../../services/listService";
import "../ListForm/ListForm.css"
import bgImage from '../../assets/PUR_LIST1.jpg'

const ListForm = (props) => {
  const { listId } = useParams(); 
  const [formData, setFormData] = useState({ title: "", listType: "Purchase list" });

  
  useEffect(() => {
    const fetchList = async () => {
      if (listId) {
        const list = await listService.show(listId);
        if (list) {
          setFormData({ title: list.title, listType: list.listType });
        }
      }
    };
    fetchList();
  }, [listId]);


  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });

  };

  
  const handleSubmit = async (event) => {

    event.preventDefault();

    if (listId) {
      
      props.handleEditList(listId, formData);
    } else {
     
      props.handleAddList(formData);
    }
  };

  return (
    <div className="bgImage" style={{backgroundImage: `url(${bgImage})`}}>
    <main className="list-form-main">
      <form onSubmit={handleSubmit}>
        <h1 className="list-form-title">{listId ? "Edit List" : "Create List"}</h1>

        <label className="list-form-label" htmlFor='title'>Title</label>
        <input
        className="list-form-input"
          required
          type='text'
          name='title'
          id='title'
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />

        <label className="list-form-label" htmlFor='listType'>List Type</label>
        <select
        className="list-form-input2"
          required
          name='listType'
          id='listType'
          value={formData.listType}
          onChange={(e) => setFormData({ ...formData, listType: e.target.value })}
        >
          <option value="Purchase list">Purchase List</option>
          <option value="Inventory">Inventory List</option>
        </select>

        <button className="submit-button" type='submit'>Save Changes</button>
      </form>
    </main>
    </div>
  );
};

export default ListForm;
