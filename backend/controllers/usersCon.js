const model = require('../models/usersMod')
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

const generateToken = (user) => {
    return jwt.sign(
        { id: user.ID, role: user.Role ,name:user.Name},
        SECRET_KEY,
        { expiresIn: "1h" }
    );
};

const GetUserByPassword = async (req, res) => {
    try {
        const { username, password } = req.body;
        const data = await model.GetUserByPassword(username, password);
        if (!data)
            return res.status(400).json({ error: 'user with this username and password not found. please signup' });
        const token = generateToken(data);
        res.status(200).json({ token });
    }
    catch {
        res.status(500).json({ error: 'server error. please try again' });
    }
}
const CreateUser = async (req, res) => {
    try {
        const existEmail = await model.GetUserByEmail(req.body.email);
        if (existEmail)
            return res.status(400).json({ error: 'user with this email already exist. please login' });
        const { name, address, email, phone, password, role } = req.body;
        const data = await model.CreateUser(name, role, address, email, phone, password);
        if (!data)
            return res.status(400).json({ error: 'something went wrong. please try again' });
        const token = generateToken(data);
        res.status(200).json({ token });
    }
    catch (err) {
        res.status(500).json({ error: `server error. please try again.`});
    }
}
module.exports = { GetUserByPassword, CreateUser };