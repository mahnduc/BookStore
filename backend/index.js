const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const auth = require('./routers/auth.js')
const bookRouter = require('./routers/bookRouter.js')
const billRouter = require('./routers/billRouter.js')
const { PORT, mongoDBURL } = require('./config.js')

const app = express();

app.use(express.json());
app.use(cors());
app.use('/auth', auth)
app.use('/book', bookRouter)
app.use('/bill', billRouter)

mongoose.connect(mongoDBURL)
.then(() => {
    console.log('connected')
})
.catch((err) => {
    console.log(err)
})

app.listen(PORT, () => {
    console.log("App is listening in port", PORT);
});