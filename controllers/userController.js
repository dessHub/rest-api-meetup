const express = require('express');
const app = express();
const User = require('../models/user');
const mongoose = require('mongoose');

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/create', (req, res) => {
    res.render('create', {error: "", success: ""});
})

app.post('/create', (req, res) => {
    let name = req.body.name;
    let email = req.body.name;
    let gender = req.body.gender;
    let bio   = req.body.bio;

    let user = new User();
    user.name = name;
    user.email = email;
    user.gender = gender;
    user.bio = bio;
    user.save((err, user) => {
        if(err) {
            res.render('create', {error: err, success: ""});
        }else{
            res.render('create', {error:"", success: "Member Added Succesfully"});
        }
    })

});

app.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        if(err) throw err;
        res.render('users', {users: users});
    })
})

app.get('/edit:id', (req, res) => {
    let id = req.params.id;
    User.findOne({_id: id}, (err, user) => {
        if(err) throw err;
        console.log(user);
        res.render('edit', {user: user});
    })
})

//route for updating the member details
app.post('/edit:id', (req, res) => {
    
     let id = req.body.id;
     User.findById(id, (err, user)=>{
        if(err) throw err;
        user.name = req.body.name,
        user.email = req.body.email,
        user.gender = req.body.gender,
        user.bio = req.body.bio
        user.save(function(err){
        if(err) throw err;
        res.redirect('/users');     
         })
     })
})

app.get('/delete:id', (req, res) => {

    User.remove({_id: req.params.id}, (err) => {
        
        res.redirect('/users');
    })
})

module.exports = app;