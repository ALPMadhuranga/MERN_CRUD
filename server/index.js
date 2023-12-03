const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require("./models/Users");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://prasad1234:prasad1234@cluster01.zafamrt.mongodb.net/users?retryWrites=true&w=majority")

/* Create */
app.post("/createUser", (req, res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

/* Read All users */
app.get("/", (req, res) => {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

/*Read one user*/
app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

/*Update user*/
app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id: id}, {
        name: req.body.name, 
        email: req.body.email, 
        age: req.body.age})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

/* Delete User */
app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id: id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("Server is running");
})