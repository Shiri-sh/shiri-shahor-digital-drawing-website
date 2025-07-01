const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/api/portraits', express.static(path.join(__dirname, 'portraits')));
app.use("/api/ordersPic", express.static(path.join(__dirname, 'ordersPic')));

app.use('/api/users', require('./routes/usersRoute'));
app.use('/api/comments', require('./routes/commentsRoute'));
app.use('/api/drawings',  require('./routes/drawingsRoute'));
app.use('/api/orders', require('./routes/ordersRoute'));
app.use('/api/categories', require('./routes/categoriesRoute'));


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});