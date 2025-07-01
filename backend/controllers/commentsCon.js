const model=require('../models/commentsMod')

const getAllCommentsByDrawing=async(req,res)=>{
    try {
        const data = await model.getAllCommentsByDrawing(req.params.drawingId);
        res.status(200).json(data);
      }
      catch {
          res.status(500).json({error:'server error. please try again'});
      }
}
const CreateComment=async(req,res)=>{
    try {
        const {AuthorId, CommentText, DrawingId } = req.body;
        const data = await model.CreateComment(AuthorId, CommentText, DrawingId);
        res.status(200).json(data);
      }
      
      catch(e) {
          console.log(e);
          res.status(500).json({error:'server error. please try again'});
      }
}
const DeleteComment=async(req,res)=>{
    try {
        const data = await model.DeleteComment(req.params.id);
        res.status(200).json(data);
      }
      catch(e) {
          console.log(e);
          res.status(500).json({error:'server error. please try again'});
      }
}
module.exports={getAllCommentsByDrawing,CreateComment,DeleteComment}