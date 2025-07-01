const con = require('../db.js');

const GetCategories = async () => {
    try{
        const sql='SELECT * FROM categories WHERE is_active = 1';
        const [rows] = await con.query(sql);
        return rows;
    }
    catch(err){
        throw err;
    }
};

const CreateCategory = async (name) => {
    try{
        const sql='INSERT INTO categories (name) VALUES (?)';
        const [result] = await con.query(sql, [name]);
        return {
            ID: result.insertId,
            Name: name
        };
    }
    catch(err){
        throw err;
    }
};
const SetUnActiveCategory = async (id) => {
    try{
        const sql='UPDATE categories SET is_active = 0 WHERE id = ?';
        const [result] = await con.query(sql, [id]);
        return result.affectedRows === 0 ? null : id;
    }
    catch(err){
        throw err;
    }
}
module.exports = {GetCategories, CreateCategory, SetUnActiveCategory};