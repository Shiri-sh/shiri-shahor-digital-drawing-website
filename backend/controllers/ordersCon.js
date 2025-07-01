const model=require('../models/ordersMod')
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid'); 
const CreateOrder=async(req,res)=>{
    try {
        if (!req.file) {
            return res.status(401).json({ error: "No image uploaded" });
        }
        const referenceImageName = req.file.filename;
        const { userId, categoryId, description, status,price,OrderDate} = req.body;
        const result=await model.CreateOrder(userId, categoryId, description, status, OrderDate, price,referenceImageName);
        if (!result) 
            return res.status(400).json({ error: "creation failed" });  
        res.status(200).json(result);
    }
    catch (e){
        if(req.file&&fs.existsSync(req.file.path))
            fs.unlinkSync(req.file.path);
        console.error(e);
        res.status(500).json({error:'server error. please try again'});
    }
}
const GetOrders=async(req,res)=>{
    try {
        const data=await model.GetOrders();
        if(!data)
            return res.status(400).json({error:'orders not found. please try again'});
        res.status(200).json(data);
    }
    catch(err) {
        res.status(500).json({error:'server error. please try again'});
    }
}
const GetOrdersOfUser=async(req,res)=>{
    try {
        const data=await model.GetOrdersOfUser(req.user.id);
        if(!data)
            return res.status(400).json({error:'orders not found. please try again'});
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json({error:'server error. please try again'});
    }
}
const GetOrder=async(req,res)=>{
    try {
        const data=await model.GetOrder(req.params.drawingId);
        if(!data)
            return res.status(400).json({error:'order not found. please try again'});
        res.status(200).json(data);
    }
    catch(err) {
        res.status(500).json({error:'server error. please try again'});
    }
}
const UpdateOrderStatus=async(req,res)=>{
    try {
        const orderId=req.params.orderId;
        const { Status } = req.body;
        const data=await model.UpdateOrderStatus(orderId,Status);
        if(!data)
            return res.status(400).json({error:'order not found. please try again'});
        res.status(200).json(data);
    }
    catch(err) {
        res.status(500).json({error:`server error. please try again. ${err}`});
    }
}
const UpdateOrderPrice=async(req,res)=>{
    try {
        const orderId=req.params.orderId;
        const { price } = req.body;
        const data=await model.UpdateOrderPrice(orderId,price);
        if(!data)
            return res.status(400).json({error:'order not found. please try again'});
        res.status(200).json(data);
    }
    catch(err) {
        res.status(500).json({error:`server error. please try again. ${err}`});
    }
}
const DeleteOrder=async(req,res)=>{
    try {
        const orderId=req.params.orderId;
        const data=await model.DeleteOrder(orderId);
        if(!data)
            return res.status(400).json({error:'order not found. please try again'});
        res.status(200).json(data);
    }
    catch(err) {
        res.status(500).json({error:`server error. please try again. ${err}`});
    }
}
module.exports={CreateOrder,GetOrders,GetOrdersOfUser,GetOrder,UpdateOrderStatus,UpdateOrderPrice,DeleteOrder}