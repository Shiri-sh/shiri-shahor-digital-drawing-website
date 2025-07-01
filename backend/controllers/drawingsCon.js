const model=require('../models/drawingsMod')
const commentModel=require('../models/commentsMod')
const fs=require('fs');
const path=require('path');

const CreateDrawing=async(req,res)=>{
    try {
        const { CategoryId, Description, Name } = req.body;
        if(!req.file) 
            return res.status(400).json({ error: 'No image uploaded' });;
        const source =req.file.filename;
        console.log(source);
        const data=await model.CreateDrawing(CategoryId, source, Description, Name);
        if(!data)
            return res.status(400).json({error:'something went wrong. please try again'});
        res.status(200).json(data);
    }
    catch(e) {
        if(req.file&&fs.existsSync(req.file.path))
            fs.unlinkSync(req.file.path);
        res.status(500).json({error:`server error. please try again.`});
    }
}
const UpdateDrawingName=async(req,res)=>{
    try {
        const { Name } = req.body;
        const drawingId=req.params.id;
        const data=await model.UpdateDrawingName(drawingId,Name);
        if(!data)
            return res.status(400).json({error:'something went wrong. please try again'});
        res.status(200).json(data);
    }
    catch(e) {
        res.status(500).json({error:'server error. please try again'});
    }
}
const UpdateDrawingDescription=async(req,res)=>{
    try {
        const { Description } = req.body;
        const drawingId=req.params.id;
        const data=await model.UpdateDrawingDescription(drawingId ,Description);
        if(!data)
            return res.status(400).json({error:'something went wrong. please try again'});
        res.status(200).json(data);
    }
    catch(e) {
        res.status(500).json({error:`server error. please try again ${e}`});
    }
}
const UpdateDrawingCategory=async(req,res)=>{
    try {
        const { CategoryId } = req.body;
        const drawingId=req.params.id;
        const data=await model.UpdateDrawingCategory(drawingId,CategoryId);
        if(!data)
            return res.status(400).json({error:'something went wrong. please try again'});
        res.status(200).json(data);
    }
    catch(e) {
        res.status(500).json({error:'server error. please try again'});
    }
}
const DeleteDrawing=async(req,res)=>{
    try {
        const drawing = await model.GetDrawing(req.params.id); 
        if (!drawing)
            return res.status(400).json({ error: "Drawing not found" });
        const existComments=await commentModel.getAllCommentsByDrawing(req.params.id);
        let data;
        if(existComments.length>0){
            data=await model.SetDrawingNotActive(req.params.id);
        }
        else{
            data=await model.DeleteDrawing(req.params.id);
        }
        if(!data)
            return res.status(400).json({error:'something went wrong. please try again'});
        res.status(200).json(data);
    }
    catch(e) {
        res.status(500).json({error:`server error. please try again`});
    }
}

const GetDrawingsByCategory=async(req,res)=>{
    try {
        const {lastDrawing,limit}=req.query;
        const data=await model.GetDrawingsByCategory(req.params.categoryId,Number(lastDrawing),Number(limit));
        if(!data)
            return res.status(400).json({error:'drawings not found in this category. please try different category'});
        res.status(200).json(data);
    }
    catch(e) {
        res.status(500).json({error:'server error. please try again'});
    }
}
module.exports={CreateDrawing,DeleteDrawing,UpdateDrawingName,UpdateDrawingDescription,GetDrawingsByCategory,UpdateDrawingCategory};