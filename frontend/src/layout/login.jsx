import  { ContextUser } from '../contextUser';
import {useState, useContext} from 'react' 
import '../css/login.css'
import  fetchData  from '../service/fectchData';
import {jwtDecode} from "jwt-decode";
const Login=()=>{
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const {setUser}=useContext(ContextUser)
    const HandleForm = async (event) => {
        event.preventDefault();
        try{
            const userToken = await fetchData(`users/login`,'POST',{username:userName,password:password}); 
            const decodedUser = jwtDecode(userToken.token);
            setUser({token:userToken.token,...decodedUser});
            localStorage.setItem("currentToken",userToken.token );
        }
         catch(error){
         }
    }
    return (
        <div >
            <form onSubmit={HandleForm}>
            <input
            type="text" 
            value={userName}
            placeholder='userName:'
            onChange={(e) => setUserName(e.target.value)}
            required
            />
            <br></br>
            <input
                type="password" 
                value={password}
                placeholder='password:'
                onChange={(e) => setPassword(e.target.value)}
                required
            />
             <button type="submit">Login</button>
        </form>
        </div>
    )
}

export default Login