const con = require('../db.js');
const GetDrawingsByCategory = async (categoryId,lastDrawing,limit) => {
    try{
        const sql='SELECT * FROM drawings WHERE categoryId = ? and is_active = 1 ORDER BY ID LIMIT ? OFFSET ?';
        const [rows] = await con.query(sql, [categoryId,limit, lastDrawing]);
        return rows;
    }
    catch(err){
        throw err;
    }
}
const UpdateDrawingCategory = async (drawingId,categoryId) => {
    try{
        const sql='UPDATE drawings SET categoryId = ? WHERE id = ?';
        const [result] = await con.query(sql, [categoryId,drawingId]);
        if(result.affectedRows === 0) throw new Error('update category failed');
        const [rows] = await con.query('SELECT * FROM drawings WHERE id = ?', [drawingId]);
        return rows;
    }
    catch(err){
        throw err;
    }
}
const UpdateDrawingDescription = async (drawingId,description) => {
    try{
        const sql='UPDATE drawings SET description = ? WHERE id = ?';
        const [result] = await con.query(sql, [description,drawingId]);
        if(result.affectedRows === 0) throw new Error('update description failed');
        const [rows] = await con.query('SELECT * FROM drawings WHERE id = ?', [drawingId]);
        return rows;
    }
    catch(err){
        throw err;
    }
}
const UpdateDrawingName = async (drawingId,name) => {
    try{
        const sql='UPDATE drawings SET name = ? WHERE id = ?';
        const [result] = await con.query(sql, [name,drawingId]);
        if(result.affectedRows === 0) throw new Error('update name failed');
        const [rows] = await con.query('SELECT * FROM drawings WHERE id = ?', [drawingId]);
        return rows;
    }
    catch(err){
        throw err;
    }
}
const DeleteDrawing = async (drawingId) => {
    try{
        const sql='DELETE FROM drawings WHERE id = ?';
        const [rows] = await con.query(sql, [drawingId]);
        return rows.affectedRows === 0 ? null : drawingId;  
    }
    catch(err){
        throw err;
    }
}
const CreateDrawing = async (categoryId, source, description, name) => {
    try{
        const sql='INSERT INTO drawings (categoryId, source, description, name) VALUES (?,?,?,?)';
        const [result] = await con.query(sql, [categoryId, source, description, name]);
        return {
            ID: result.insertId,
            CategoryId: Number(categoryId),
            Source: source,
            Description: description,
            Name: name
        };
    }
    catch(err){
        throw err;
    }
}
const SetDrawingNotActive = async (drawingId) => {
    try{
        const sql='UPDATE drawings SET is_active = 0 WHERE id = ?';
        const [rows] = await con.query(sql, [drawingId]);
        return rows.affectedRows === 0 ? null : drawingId;  
    }
    catch(err){
        throw err;
    }
}
module.exports = {SetDrawingNotActive,UpdateDrawingCategory,UpdateDrawingDescription,UpdateDrawingName,DeleteDrawing,CreateDrawing,GetDrawingsByCategory};