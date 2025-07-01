import Navbar from './navbar'
import About from './about'
import Login from './login'
import SignUp from './signUp'
import '../css/openSection.css'
import { useState ,useEffect,useContext} from 'react'
import { ContextUser } from '../contextUser'
import { useNavigate,Outlet } from 'react-router-dom'
import {LogIn,LogOut} from 'lucide-react'
const OpenSection = () => {
    const [login, setLogin] = useState(false);
    const [signUp, setSignUp] = useState(false);
    const [signUpClient, setSignUpClient] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const{user,setUser}=useContext(ContextUser);
    const navigate = useNavigate();
    const displayLogin = () =>{
        setLogin(!login); 
        setSignUp(false);
    }
    const displaySignUp = () =>{
        setSignUp(!signUp); 
        setLogin(false);
    }
    const logout = () =>{localStorage.setItem("currentToken", ""); setUser(null);navigate('/gallery')};
    useEffect(() => {
        const currentUserName = user?.name;
        setCurrentUser(currentUserName);
        setSignUpClient(user?.role === 'client');
    }, [user]);
    return (
        <>
        <div className="openSection">
            
            <button onClick={displayLogin}><LogIn size={20} strokeWidth={2}/></button>
            {user && <button onClick={logout}><LogOut size={20} strokeWidth={2}/></button>}
            <button onClick={()=>{setSignUpClient(true);displaySignUp();}}>signUp</button>
            {user?.role=='admin' && <button onClick={()=>{setSignUpClient(false);displaySignUp();}}>signUp admin</button>}
            {currentUser!=null && <p>welcom {currentUser}, lets make some art</p>}
        </div>
        <div className="authBox">
        {login && <div className="loginPopup"><Login /></div>}
        {signUp && signUpClient && <div className="signUpPopup"><SignUp position="client"/></div>}
        {signUp && !signUpClient && <div className="signUpPopup"><SignUp position="admin"/></div>}
        </div>
        <About/>
        <Navbar/>
        <Outlet />
        </>
      )
}

export default OpenSection