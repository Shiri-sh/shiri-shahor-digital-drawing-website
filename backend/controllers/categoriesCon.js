const model=require('../models/categoriesMod');
const GetCategories=async(req,res)=>{
    try {
        const data=await model.GetCategories();
        if(!data)
            return res.status(400).json({error:'categories not found. please try again'});
        res.status(200).json(data);
    }
    catch {
        res.status(500).json({error:'server error. please try again'});
    }
}
const CreateCategory=async(req,res)=>{
    try{
        const {name}=req.body;
        const data=await model.CreateCategory(name);
        if(!data)
            return res.status(400).json({error:'something went wrong. please try again'});
        res.status(200).json(data);
    }
    catch{
        res.status(500).json({error:'server error. please try again'});
    }
}
const DeleteCategory=async(req,res)=>{
    try{
        const id=req.params.id;
        data=await model.SetUnActiveCategory(id);
        if(!data)
            return res.status(400).json({error:'something went wrong. please try again'});
        res.status(200).json(data);
    }
    catch{
        res.status(500).json({error:'server error. please try again'});
    }
}
module.exports={GetCategories,CreateCategory,DeleteCategory};