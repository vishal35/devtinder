const express = require('express')

const app = express()

app.use('/', (req, res) => {
    res.send('Sending from server at port 3000')
})

app.listen(3000, () => {
    console.log("Server is listning on port 3000");
})