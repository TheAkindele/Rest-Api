const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
//const router = require('./routers/playersRouter')
const router = require('./routers/secondRouter')
require('dotenv').config()

const app = express()
// middleware
app.use(express.json())
app.use(cors())

app.use('/api', router)

mongoose.connect(
    process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    },
    () => console.log('connected to DB')
)
const port = process.env.port || 9000
app.listen(port, () => console.log(`server started on port ${port}`))
