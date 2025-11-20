const express = require('express')
const { isAuthenticated } = require('./middlewares/auth');
const app = express()

// app.use('/', (req, res) => {
//     res.send('Sending from server at port 3000')
// })

// app.get('/user/:userId/:name/:password', (req, res) => {
//     // localhost:3000/user/123/Vish/abcd
//     console.log(req.params);
//     res.send({firstName: 'Vishal', lastName: 'Kumar'})  
// })

// app.get('/user', (req, res) => {
//     // localhost:3000/user?userId=123&name=Vish
//     console.log(req.query);
//     res.send({firstName: 'Vishal', lastName: 'Kumar'})  
// })

// app.use('/user', [(req, res, next) => {
//     console.log('Middleware executed');
//     // res.send({firstName: 'Vishal1', lastName: 'Kumar'})
//     next();
// }, (req, res, next) => {
//     // res.send({firstName: 'Vishal22', lastName: 'Kumar'})
//     next();
// }, (req, res, next) => {
//     // res.send({firstName: 'Vishal333', lastName: 'Kumar'})
//     next();
// }, (req, res, next) => {
//     res.send({firstName: 'Vishal4444', lastName: 'Kumar'})
//     // next();
// }])

// app.get('/user', (req, res) => {
//     res.send({firstName: 'Vishal', lastName: 'Kumar'})  
// })

// app.post('/user', (req, res) => {
//     // saving Data to DataBase
//     res.send('Data Suscessfully saved to DataBase');
// })

// app.delete('/user', (req, res) => {
//     // Deleting Data from DataBase
//     res.send('Data Suscessfully deleted from DataBase');
// })

// app.use('/test', (req, res) => {
//     res.send('Sending Hello from server at port 3000')
// })

app.use('/user', isAuthenticated, (req, res) => {
    res.send({firstName: 'Vishal', lastName: 'Kumar'})
})

app.listen(3000, () => {
    console.log("Server is listning on port 3000");
})