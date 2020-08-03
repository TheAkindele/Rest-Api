const express = require('express')
const mongoose = require('mongoose')
//const router = require('./routers/playersRouter')
const router = require('./routers/secondRouter')

const app = express()
// middleware
app.use(express.json())

app.use('/api', router)

mongoose.connect(
    `mongodb+srv://muyi:IAoIqazOvNLbNF2f@cluster0.in9uh.mongodb.net/Players_Record`,
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
