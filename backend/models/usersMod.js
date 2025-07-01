var con = require('../db.js');

const GetUserByPassword = async (username, password) => {
    try{
        const query='SELECT * FROM users u inner join passwords p  on u.id=p.userId  WHERE u.name = ? AND p.password = ?';
        const [rows] = await con.query(query, [username, password]);
        return rows[0];
    }
    catch(err){
        throw err;
    }
};
const GetUserByEmail = async (email) => {
    try{
        const query='SELECT * FROM users WHERE email = ?';
        const [rows] = await con.query(query, [email]);
        return rows[0];
    }
    catch(err){
        throw err;
    }
}
const CreateUser = async (name, role, address, email, phone, password) => {
    try{
        const query='INSERT INTO users (name, role, address, email, phone) VALUES (?,?,?,?,?)';
        const [result] = await con.query(query, [name,role,address,email,phone]);
        await con.query('INSERT INTO passwords (userId,password) VALUES (?,?)', [result.insertId,password]);
        return {
            ID: result.insertId,
            Name: name,
            Address: address,
            Email: email,
            Phone: phone,
            Role: role
        };
    } 
    catch(err){
        throw err;
    }
}
const GetUserById=async(id)=>{
    try{
        console.log(id);
        const query='SELECT * FROM users WHERE id = ?';
        const [rows] = await con.query(query, [id]);
        console.log(rows);
        return rows[0];
    }
    catch(err){
        throw err;
    }
}
module.exports={GetUserByPassword,CreateUser,GetUserById,GetUserByEmail};