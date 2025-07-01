const con = require('../db.js');

const GetOrdersOfUser = async (drawingId) => {
    try{
      const sql='SELECT * FROM orders WHERE userId = ?';
      const [rows] = await con.query(sql, [drawingId]);
      return rows;
    }
    catch(err){
        throw err;
    }
};
const GetOrders = async () => {
    try{
      const sql='SELECT orders.*,u.name,u.email,u.phone FROM orders inner join users u on orders.userId = u.id';
      const [rows] = await con.query(sql);
      return rows;
    }
    catch(err){
        throw err;
    }
};
const UpdateOrderStatus = async (orderId,status) => {
    try{
        if(status=='completed'){
            const sql = 'UPDATE orders SET CompletionDate = ?,status = ? WHERE id = ?';
            const [result] = await con.query(sql, [new Date(), status,orderId]);
            if( result.affectedRows === 0 ){
                throw new Error('');
            };
        }
        else{
            const sql = 'UPDATE orders SET status = ? WHERE id = ?';
            const [result] = await con.query(sql, [status, orderId]);
            if( result.affectedRows === 0 ){
                throw new Error('');
            };
        }
        const [row]=await con.query('SELECT orders.*,u.name,u.email FROM orders inner join users u on orders.userId = u.id where orders.id=?', [orderId]);
        return row[0];
    }
     catch(err){
        throw err;
    }
}
const UpdateOrderPrice = async (orderId,price) => {
    try{
        const sql = 'UPDATE orders SET price = ? WHERE id = ?';
        const [result] = await con.query(sql, [price, orderId]);
        if( result.affectedRows === 0 ){
            throw new Error('');
        };
        const [row]=await con.query('SELECT orders.*,u.name,u.email FROM orders inner join users u on orders.userId = u.id where orders.id=?', [orderId]);
        return row[0];
    }
     catch(err){
        throw err;
    }
}
const CreateOrder = async ( userId, categoryId, description, status, OrderDate,price, ReferenceImagePath) => {

    try{
        const sql='INSERT INTO orders (userId, categoryId, description, status, OrderDate, CompletionDate,price,ReferenceImagePath) VALUES (?,?,?,?,?,?,?,?)';
        const [result] = await con.query(sql, [userId, categoryId, description, status, OrderDate,null,price,ReferenceImagePath]);
        return {
            id: result.insertId,
            userId: userId,
            categoryId: categoryId,
            description: description,
            status: status,
            OrderDate: OrderDate,
            CompletionDate: null,
            price: price,
            ReferenceImagePath: ReferenceImagePath
        };
    }
    catch(err){
        throw err;
    }
}
const DeleteOrder = async (orderId) => {
    try{
        const sql='DELETE FROM orders WHERE id = ?';
        const [result] = await con.query(sql, [orderId]);
        return result.affectedRows===0?null:orderId;
    }
    catch(err){
        throw err;
    }
}
module.exports={GetOrdersOfUser,GetOrders,UpdateOrderStatus,CreateOrder,UpdateOrderPrice,DeleteOrder};