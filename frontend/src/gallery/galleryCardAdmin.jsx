import { useState} from "react";
import{ Pencil } from 'lucide-react'
import fetchData from "../service/fectchData";
import { Trash2 } from 'lucide-react';
import { useEffect } from "react";
import { useContext } from "react";
import { ContextDrawing } from "../contextDrawing";
const GalleryCardAdmin = ({ drawing, onClickOpen }) => {
    const [name,setName]=useState(drawing.Name);
    const [description,setDescription]=useState(drawing.Description);
    const [categoryId, setCategoryId] = useState(drawing.CategoryID);
    const [categories,setCategories]=useState([]);
    const {updateGeneralField,updateCategory,deleteDrawing}=useContext(ContextDrawing);
    const getCategories = async () => {
      try{
          const data= await fetchData('categories');
          setCategories(data);
      }
      catch(err){
      }
    }
    const confirmDelete = async (drawing) => {
      const confirmed = window.confirm('Are you sure you want to delete this drawing?');
      if (!confirmed) return;
      await deleteDrawing(drawing);
    }
    useEffect(() => {
      getCategories();
    },[]);
      return(
      <div className="galleryCard" >
         
        <img src={"http://localhost:3000/api/portraits/" + drawing.Source} alt={drawing.Source} onClick={onClickOpen}/>
        <Trash2 size={20} strokeWidth={2} onClick={()=>confirmDelete(drawing)}/>
          <br/>
        <input type="text" name="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
        <Pencil size={20} strokeWidth={2} onClick={()=>updateGeneralField(drawing,'Name',name)}/>

        <textarea type="text" name="Description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
        <Pencil size={20} strokeWidth={2} onClick={()=>updateGeneralField(drawing,'Description',description)}/>
          
        <select value={categoryId} name="categoryId" onChange={(e) => setCategoryId(e.target.value)}>
            {categories.map((category) => (
              <option key={category.ID} value={category.ID}>
                {category.Name}
              </option>
            ))}
          </select>
        <Pencil size={20} strokeWidth={2} onClick={()=>updateCategory(drawing,categoryId)}/>
      </div>
    )
  };
  
  export default GalleryCardAdmin;