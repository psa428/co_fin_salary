require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const routes = require('./routes')

const port = 3001
const app = express()

app.use(cookieParser())
app.use(express.json())

app.use('/', routes)

mongoose.connect(
    'mongodb+srv://andrewsitnikov428:chuck_428@cluster0.wrudc.mongodb.net/co_fin_salary?retryWrites=true&w=majority&appName=Cluster0'
).then(() => {
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    })
});   