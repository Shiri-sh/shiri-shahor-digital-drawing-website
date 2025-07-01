import { useState, useEffect } from "react";
import handleAdd from "../service/handleAdd";
import { Send } from "lucide-react";
import { useContext } from "react";
import { ContextDrawing } from "../contextDrawing";
import fetchData from "../service/fectchData";
import '../css/addDrawing.css'
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const AddDrawing=()=>{
    const {addDrawing,dictionaryDrawings}=useContext(ContextDrawing);
    const [categories, setCategories] = useState([]);
    const [form,setForm]=useState({
        CategoryId: 1,
        Name: '',
        Description: '',
        Source: null,
    });
    const handleFormChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.name==='CategoryId' ? Number(e.target.value): e.target.value,
        });
      }
      const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
          setForm({
            ...form,
            Source: e.target.files[0],
          })
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const okData=await handleAdd( null,'drawings', form);
        if(okData) {

          if(dictionaryDrawings[okData.CategoryId]) 
            dictionaryDrawings[okData.CategoryId].fetchComplete=false;
          addDrawing(okData.CategoryId, dictionaryDrawings[okData.CategoryId]?.lastDrawing || 0, dictionaryDrawings[okData.CategoryId]?.limit);
          toast.success('drawing added');
          setForm({
            CategoryId: 1,
            Name: '',
            Description: '',
            Source: null,
          })
        }
      };
      const fetchCategories = async () => {
        const data = await fetchData('categories');
        setCategories(data);
      };
      useEffect(() => {
        fetchCategories();
      },[])
    return(
        <div className="body">
        <ToastContainer />
        <p>add a drawing</p>
        <form className="addDrawing" onSubmit={handleSubmit}>
            <select value={form.CategoryId} name="CategoryId" onChange={(e) => handleFormChange(e)}>
                {categories.map((category) => (
                    <option key={category.ID} value={category.ID}>{category.Name}</option>
                ))}
            </select>
            <input value={form.Name} type="text" name="Name" placeholder="name" onChange={(e) => handleFormChange(e)} />
            <textarea value={form.Description} type="text" name="Description" placeholder="description" onChange={(e) => handleFormChange(e)} />
            <input  type="file" accept="image/*" name="Source" placeholder="source" onChange={(e) => handleImageChange(e)} />
            <button type="submit" > <Send/></button>
        </form>
        </div>
    )
}
export default AddDrawing;