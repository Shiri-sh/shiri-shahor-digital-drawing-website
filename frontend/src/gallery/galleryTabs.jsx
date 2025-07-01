import { use } from "react";
import { useState } from "react"
import { useEffect } from "react";
import '../css/galleryGrid.css'
import fetchData from "../service/fectchData";
import handleAdd from "../service/handleAdd";
import { useContext } from "react";
import { ContextUser } from "../contextUser";
import { Trash } from "lucide-react";
const GalleryTabs=({setCategory})=>{
    const [selectedTab, setSelectedTab] = useState(3);
    const[categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const[add,setAdd]=useState(false);
    const {user}=useContext(ContextUser);
    const fetchCategories = async () => {
        try {
          const data = await fetchData('categories');
          setCategories(data);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
    };
    const addCategory=async()=>{
       await handleAdd(setCategories,'categories',{name:newCategory});
    }
    const deleteCategory=async(id)=>{
        try{
           await fetchData(`categories/${id}`,'DELETE');
           setCategories(prevCategories => prevCategories.filter(category => category.ID !== id));
        }
        catch(err){}
    }
    useEffect(() => {
        fetchCategories();
      }, []);
    return (
        <>
        {user?.role=='admin' &&
        <>
         <button onClick={()=>{setAdd(!add)}}>+</button>
         {add &&
              <>
              <input type="text" value={newCategory} onChange={(e)=>{setNewCategory(e.target.value)}}/>
              <button onClick={addCategory}>add</button>
              </>
        }
         </>
        }
        <br/>
        {categories.map((category) => (
            < >
           {user?.role=='admin' &&<Trash size={20} strokeWidth={2} onClick={()=>deleteCategory(category.ID)} className="icon"/>}
            <button 
                key={category.ID}
                onClick={() => {setCategory(category.ID); setSelectedTab(category.ID)}}
                className={selectedTab === category.ID ? 'active' : ''}
            >
                {category.Name}
                
            </button>
            </>
        ))}
        </>
    )
}

export default GalleryTabs