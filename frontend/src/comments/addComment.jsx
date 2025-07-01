
import { useState } from "react";
import handleAdd from "../service/handleAdd";
import '../css/comment.css'
import { Plus } from 'lucide-react';
const AddComment=({setComments,authorId, drawingId})=>{
    const [comment, setComment] = useState('');
    const addComment = async () => {
        const ok=await handleAdd(setComments, 'comments', { CommentText: comment, AuthorId: authorId, DrawingId: drawingId });
        if(ok)
         setComment('');
    }
    return (
    <div className="addComment">
    <Plus onClick={() => addComment()}/>
    <input value={comment} onChange={(event) => setComment(event.target.value)} placeholder="share your thought:)"></input>
    </div>
)
}

export default AddComment