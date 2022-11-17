const express = require('express')
const port = 4002;
const cors = require('cors')
const app = express();
const connectDB = require('./database/db')
const dotenv = require('dotenv')

dotenv.config();
connectDB() 

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/addtodoCard', require('./routes/todoRoute'))
app.use('/gettodoCards', require('./routes/todoRoute'))
app.use('/deletetodoCard', require('./routes/todoRoute'))
// app.use('/updatetodoCard', require('./routes/todoRoute'))

app.listen(port, () => console.log(`listening on port ${port}`));