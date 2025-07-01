import "../css/navbar.css"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { ContextUser } from "../contextUser"
import{Images,Logs,UserPen} from 'lucide-react'
const Navbar=()=>{
  const navigate=useNavigate();
  const {user}=useContext(ContextUser);
    return (
      <>
        <nav className="navbar">
        {
            user? 
                <>
                <button onClick={()=>{navigate('/gallery')}}><Images size={20} strokeWidth={2} /></button>
                <button onClick={()=>{navigate(`/${user?.id}/orders`)}}><Logs size={20} strokeWidth={2} /></button>
                {user?.role!='admin'?
                <button onClick={()=>{navigate(`/${user?.id}/contact`)}}><UserPen size={20} strokeWidth={2} /></button>
                :<button onClick={()=>{navigate(`/addDrawing`)}}>+</button>}
                </>
              :
              <p>wanna see your orders? make one? comment on a drawing? log-in or sign-up</p>
        }
       </nav>
      </>
    )
}
export default Navbar