import { useEffect,useContext ,useState} from "react";
import fetchData from "../service/fectchData";
import AddComment from "./addComment";
import { ContextUser } from "../contextUser";
import '../css/comment.css'
import { Trash2 } from "lucide-react";
const Comments =({drawingId})=>{
    const [comments, setComments] = useState([]);
    const {user}=useContext(ContextUser);
    const deleteComment=async(id)=>{
        try{
            const confirmed = window.confirm('Are you sure you want to delete this order?');
            if (!confirmed) return;
            await fetchData(`comments/${id}`,'DELETE');
            setComments(prevComments => prevComments.filter(comment => comment.ID !== id));
        }
        catch(err){
        }
    }
    const getComments=async()=>{
        try{
            const data=await fetchData('comments/'+drawingId);
            setComments(data);
        }
        catch(err){
        }
    }
    useEffect(() => {
        getComments();
    },[drawingId])
    console.log(comments);
    console.log(user);
    return(
        <div>
            <h2>Comments</h2>
            {
            user!==null&&
            <AddComment setComments={setComments} drawingId={drawingId} authorId={user.id}/>
            }
            {comments.map((comment)=>
            (   <div key={comment.ID} className="comment">
                {
                (user?.id===comment.AuthorID||user?.role=='admin')&&
                <Trash2 size={20} strokeWidth={2} onClick={() => deleteComment(comment.ID)}/>
                }
                <strong>{comment.name}:</strong>
                <p>{comment.CommentText}</p>
                </div>
            ))}
        </div>
    );
}

export default Comments