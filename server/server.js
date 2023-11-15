const express = require('express')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 8888
app.use(express.json()) // thằng express có thể đọc hiểu được cái data mà th client gửi lên
app.use(express.urlencoded({extended: true}))

app.use('/',(req, res) => {
    res.send("Server On")
})

app.listen(port, () => {
    console.log('Server running:'+port)
})
