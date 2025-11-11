const express = require('express')

const app = express()

// app.use('/', (req, res) => {
//     res.send('Sending from server at port 3000')
// })

app.get('/user', (req, res) => {
    res.send({firstName: 'Vishal', lastName: 'Kumar'})  
})

app.post('/user', (req, res) => {
    // saving Data to DataBase
    res.send('Data Suscessfully saved to DataBase');
})

app.delete('/user', (req, res) => {
    // Deleting Data from DataBase
    res.send('Data Suscessfully deleted from DataBase');
})

app.use('/test', (req, res) => {
    res.send('Sending Hello from server at port 3000')
})

app.listen(3000, () => {
    console.log("Server is listning on port 3000");
})