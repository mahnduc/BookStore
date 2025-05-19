const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/productRoutes')
const accountRoutes = require('./routes/accountRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes')

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/user', accountRoutes);
app.use('/api', bookRoutes); 
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);

app.listen(port, '0.0.0.0' , () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});