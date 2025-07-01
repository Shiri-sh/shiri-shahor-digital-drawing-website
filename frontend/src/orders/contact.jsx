import "../css/contact.css";
import fetchData from "../service/fectchData";
import {useContext,useEffect,useState} from "react";
import { ContextUser } from "../contextUser";
import handleAdd from "../service/handleAdd";
import { ContextOrders } from "./contextOrders";
import{Send} from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Contact = () => {
  const {user}=useContext(ContextUser);
  const [categories, setCategories] = useState([]);
  const {setOrders}=useContext(ContextOrders);
  const [form, setForm] = useState({
      userId: user?.id,
      categoryId: 1,
      description: "",
      status: "open",
      OrderDate: new Date().toISOString().slice(0, 10),
      ReferenceImagePath: null,
  });
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setForm({
        ...form,
        ReferenceImagePath: e.target.files[0],
      })
    }
  };
  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }
  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log("New order:", form);
    const ok = await handleAdd(setOrders, 'orders', form);
    if(ok){
      toast.success('thank you for your order!. you can check your order in  the orders page');
      setForm({
        userId: user?.id,
        categoryId: 1,
        description: "",
        status: "open",
        OrderDate: new Date().toISOString().slice(0, 10),
        ReferenceImagePath: null,
      });
    }
  };
    const getCategories = async () => {
        try{
            const data= await fetchData('categories');
            setCategories(data);
        }
        catch(err){}
    }
    useEffect(() => {
        getCategories();
    },[])
  return (
    <div className="container">
       <ToastContainer />
      <form className="form-card" onSubmit={handleSubmit}>
        <h1>Order</h1>
        <label>
          Category:
          <select value={form.categoryId} name="categoryId" onChange={(e) => handleFormChange(e)}>
            {categories.map((category) => (
              <option key={category.ID} value={category.ID}>
                {category.Name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Description:
          <textarea
            value={form.description}
            name="description"
            onChange={(e) => handleFormChange(e)}
            placeholder="Describe your vision..."
          />
        </label>

        <label>
          Upload Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>

        <button type="submit" className="submit-btn">
        <Send size={40} strokeWidth={2}/>
        </button>

         {form.ReferenceImagePath && (
          <div className="preview-container">
            <h3>Preview:</h3>
            <img src={URL.createObjectURL(form.ReferenceImagePath)} alt="Uploaded preview" />
          </div>
        )} 
      </form>
    </div>
  );
};

export default Contact;