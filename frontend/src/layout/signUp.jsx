import { useState,useContext } from 'react'
import { useNavigate } from "react-router-dom";
import fetchData from '../service/fectchData';
import { ContextUser } from '../contextUser';
import {jwtDecode} from "jwt-decode";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SignUp=({position})=>{
    const {setUser}=useContext(ContextUser);
    const [form , setForm] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        address: '',
        role: position,
    }) 
    const validate = () => {
        if(form.phone.length < 10){
            throw "invalid phone number";
        }
       if(form.password.length < 6){
           throw "Password must be at least 6 characters long";
       }
       if( !/[!@#$%^&*(),.?":{}|<>]/.test(form.password)){
           throw "Password must contain at least one special character";
       }
    }
    const HandleForm = async (event) => {
        event.preventDefault();
        try{
            validate();
            const userToken = await fetchData(`users/signup`,'POST',form); 
            const decodedUser = jwtDecode(userToken.token);
            setUser({token:userToken.token,...decodedUser});
            localStorage.setItem("currentToken",userToken.token );
        }
         catch(error){
          toast.error(error);
         }
    }
    return (
        <div>
        <h5>{position}</h5>
         <form onSubmit={HandleForm}>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Name"
            required
          />
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Password"
            required
          />
          <input
            type="text" 
            value={form.address}            
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            placeholder="Address"
            required
          />
          <input
            type="text" 
            value={form.phone}            
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="phone"
            required
          />
          <button type="submit">submit</button>
         </form>
        </div>
    )
}

export default SignUp