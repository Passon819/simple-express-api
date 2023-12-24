const express = require('express')
const users = require('./db.json')
const app = express()
const port = 3030

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/',(req,res)=>{
    res.send(`<h1>Hellooo</h1>`)
})

app.get('/users',(req,res)=>{
    res.send(users)
    console.log(`Response data 'users' to client`);
})

app.get('/users/:id',(req,res)=>{
    console.log(req.params['id']); //req.params.id
    res.json(users.find(users=>users.id === Number(req.params['id'])))
})

app.post('/users',(req,res)=>{
    users.push(req.body)
    let json = req.body
    res.send(`Add new user '${json.username}' complete`);
})

app.put('/users/:id',(req,res)=>{
    const updateIndex = users.findIndex(users=>users.id === Number(req.params.id))
    res.send(`Update user id: ${users[updateIndex].id} completed.`)
})

app.delete('/users/:id',(req,res)=>{
    const deletedIndex = users.findIndex(users=>users.id === Number(req.params.id))
    res.send(`Delete user ${users[deletedIndex].username} completed.`)
})

app.listen(port,(err)=>{
    console.log(`Server is runing port:${port}`);
})