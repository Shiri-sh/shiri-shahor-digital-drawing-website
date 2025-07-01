const con = require('../db.js');

const getAllCommentsByDrawing = async (drawingId) => {
        try {
            const sql = 'SELECT comments.* , u.name FROM comments inner join users u on comments.AuthorId = u.id WHERE drawingId = ?';
            const [rows] = await con.query(sql, [drawingId]);
            return rows;
        } catch (err) {
            throw err;
        }
    };
const CreateComment = async (authorId, comment, drawingId) => {
    try {
        console.log(authorId, comment, drawingId);
        const sql = 'INSERT INTO comments (DrawingId, AuthorId, CommentText) VALUES (?,?,?)';
        const [result] = await con.query(sql, [drawingId, authorId, comment]);
        const [authorName] = await con.query('SELECT name FROM users WHERE id = ?', [authorId]);
        return {
            ID: result.insertId,
            DrawingId: drawingId,
            AuthorID: authorId,
            CommentText: comment,
            name: authorName[0].name
        };
    } catch (err) {
        console.log(err);
        throw err;
    }
};
const deleteComment = async (commentId) => {
    try {
        const sql = 'DELETE FROM comments WHERE id = ?';
        const [result] = await con.query(sql, [commentId]);
        return result.affectedRows === 0 ? null : commentId;
    } catch (err) {
        throw err;
    }
}
const DeleteComment = async (commentId) => {
    try {
        const sql = 'DELETE FROM comments WHERE id = ?';
        const [result] = await con.query(sql, [commentId]);
        return result.affectedRows === 0 ? null : commentId;
    } catch (err) {
        throw err;
    }
}
module.exports = { getAllCommentsByDrawing, CreateComment, deleteComment , DeleteComment };